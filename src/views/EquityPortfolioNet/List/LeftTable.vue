<script lang="ts" setup>
import { computed, onMounted, ref, inject, Ref, watch } from "vue"
import { TABLE_CONFIG } from "./common"

/**
 * @description 接口返回数据的类型定义
 */
interface StatisticsData {
  [key: string]: any
}
const rawData = ref<StatisticsData>({}) // 存储接口返回的原始数据

// 表格数据
const isLoading = inject<Ref<boolean>>("pageLoading")
const pageData = inject<Ref<StatisticsData>>("pageData")
const tabsName = inject<Ref<string>>("tabsName")

watch(
  [() => pageData.value, () => tabsName.value],
  ([newPageData, newTabsName]) => {
    rawData.value = newPageData[newTabsName]?.dataItemTextualVo
  },
  { deep: true },
)

/**
 * @description 计算属性：将接口数据转化为 el-table 需要的行格式
 * el-table 接收的是数组，每一行是一个对象
 */
const tableData = computed(() => {
  return TABLE_CONFIG.map(config => {
    return {
      name: config.label,
      value: rawData.value[config.prop] ?? "--", // 如果接口没返回则显示 --
    }
  })
})
</script>

<template>
  <div class="table-container">
    <el-table v-loading="isLoading" :data="tableData" :header-cell-style="{ backgroundColor: '#e4efff', color: '#333', height: '48px !important' }" border stripe style="width: 100%">
      <el-table-column align="left" label="数据项" prop="name" />
      <el-table-column align="right" label="合计" prop="value">
        <template #default="scope">
          <span class="value-text">{{ scope.row.value }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  background: #fff;

  /* 斑马纹和边框颜色自定义（可选，匹配图片效果） */
  :deep(.el-table) {
    --el-table-border-color: #ebeef5;
    --el-table-header-bg-color: #f0f5ff;
  }

  :deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
    border-right: 1px solid #ddd !important;
  }

  :deep(.el-table td.el-table__cell) {
    height: 40px !important;
  }

  .value-text {
    color: #333;
  }
}
</style>
