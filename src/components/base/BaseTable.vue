<template>
  <div class="base-table-container">
    <el-table ref="tableRef" v-loading="loading" :data="data" :height="height" :max-height="maxHeight" :header-cell-style="headerCellStyle" v-bind="$attrs" stripe border show-overflow-tooltip>
      <slot></slot>
      <template #empty>
        <div class="empty-container">
          <img :src="emptyImage" class="empty-img" alt="暂无数据" />
          <div v-if="downLoading" class="empty-text">请输入查询条件并点击查询</div>
          <div v-else class="empty-text">暂无数据</div>
        </div>
      </template>
    </el-table>

    <div class="pagination-container" v-if="showPagination">
      <el-pagination v-model:current-page="currentPageValue" v-model:page-size="pageSizeValue" :page-sizes="pageSizes" :total="total" background layout="->, total,jumper,prev, pager, next, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import type { TableInstance } from "element-plus"
import emptyImage from "@/assets/images/empty.png"

/**
 * 基础表格组件
 * @name BaseTable
 */
interface Props {
  /** 表格数据 */
  data: unknown[]
  /** 加载状态 */
  loading?: boolean
  downLoading?: boolean
  /** 表格高度 */
  height?: string | number
  /** 表格最大高度 */
  maxHeight?: string | number
  /** 总条数 */
  total?: number
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  pageSize?: number
  /** 每页显示条数选择器的选项设置 */
  pageSizes?: number[]
  /** 是否显示分页 */
  showPagination?: boolean
  /** 空状态图片地址 */
  emptyImage?: string
  /** 表头单元格样式 */
  headerCellStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  downLoading: true,
  height: "auto",
  maxHeight: "",
  total: 0,
  page: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 30, 50, 100],
  showPagination: true,
  emptyImage: emptyImage,
  headerCellStyle: () => ({ background: "#E4EFFF", color: "#333333", height: "48px !important" }),
})

/**
 * 表格事件
 */
const emit = defineEmits([
  /** 更新当前页码 */
  "update:page",
  /** 更新每页条数 */
  "update:pageSize",
  /** 分页变化事件 */
  "change",
])

const tableRef = ref<TableInstance>()

/** 当前页码计算属性 */
const currentPageValue = computed({
  get: () => props.page,
  set: val => emit("update:page", val),
})

/** 每页条数计算属性 */
const pageSizeValue = computed({
  get: () => props.pageSize,
  set: val => emit("update:pageSize", val),
})

/**
 * 处理每页条数变化
 * @param {number} val - 新的每页条数
 */
const handleSizeChange = (val: number): void => {
  emit("change", { page: 1, pageSize: val })
}

/**
 * 处理当前页码变化
 * @param {number} val - 新的页码
 */
const handleCurrentChange = (val: number): void => {
  emit("change", { page: val, pageSize: pageSizeValue.value })
}

defineExpose({
  /** 表格实例 */
  tableRef,
})
</script>

<style lang="scss" scoped>
.base-table-container {
  width: 100%;

  :deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
    border-right: 1px solid #ddd !important;
  }
}
.pagination-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;

  .empty-img {
    height: 200px;
  }
  .empty-text {
    color: #909399;
  }
}
</style>
