<template>
  <el-table ref="tableRef" v-loading="isLoading" :data="pageTableData" stripe :expand-row-keys="expandedKeys" :header-cell-style="{ background: '#E4EFFF', color: '#333333', height: '48px !important' }" :max-height="tableHeight" :row-key="getRowKey" :tree-props="{ children: 'children' }" border class="equity-table" empty-text="暂无数据" show-overflow-tooltip style="width: 100%">
    <el-table-column align="left" fixed="left" label="日期" min-width="180" prop="insuranceType" show-overflow-tooltip>
      <template #default="{ row }">
        {{ DateFormat(row.businessDate) }}
      </template>
    </el-table-column>
    <el-table-column v-for="item in tabcolums" :key="item.key" :align="item.align" :fixed="item.fixed" :label="item.name" :min-width="item.width" :prop="item.key" :resizable="false" show-overflow-tooltip>
      <template #header>
        <!--   eslint-disable-next-line     -->
        <span v-html="item.name"></span>
      </template>
    </el-table-column>
    <template #empty>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <img alt="" src="../../../assets/images/empty.png" style="height: 200px" />
        <div>暂无数据</div>
      </div>
    </template>
  </el-table>
  <el-pagination v-model:current-page="tableInstanceData.pageNo" v-model:page-size="tableInstanceData.pageSize" :page-sizes="[10, 20, 30, 50, 100]" :total="tableInstanceData.total" background data-track-id="EquityPortfolioNetValue-pagination-btn" data-track-name="权益类组合持仓净值表-分页" layout="->, total,jumper,prev, pager, next, sizes" popper-class="select_bottom" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { computed, inject, reactive, ref, Ref, watch } from "vue"
import { data } from "./common.js"
import type { TableInstance } from "element-plus"
import { DateFormat } from "@/utils/date"

const tableRef = ref<TableInstance>()
const tableInstanceData = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0,
})
const tableHeight = ref(800)
const tabcolums = ref(data)
const expandedKeys = ref([] as unknown)
let tableData = ref([])

//多选
let getRowKey = (row: unknown): unknown => {
  return row.investManager
}

// 表格数据
const isLoading = inject<Ref<boolean>>("pageLoading")
const pageData = inject<Ref<Record<string, unknown> | unknown[] | null | undefined>>("pageData")
const tabsName = inject<Ref<string>>("tabsName")

// 分页
const handleSizeChange = (val: number): void => {
  tableInstanceData.pageNo = 1
  tableInstanceData.pageSize = val
}
const handleCurrentChange = (val: number): void => {
  tableInstanceData.pageNo = val
}

// 前端实现分页
const pageTableData = computed(() => {
  const start = (tableInstanceData.pageNo - 1) * tableInstanceData.pageSize
  const end = start + tableInstanceData.pageSize
  return tableData.value.slice(start, end)
})

watch(
  [() => pageData.value, () => tabsName.value],
  ([newPageData, newTabsName]) => {
    tableData.value = newPageData[newTabsName].bottomTableTextualList
    tableInstanceData.total = newPageData[newTabsName].bottomTableTextualList.length
  },
  { deep: true },
)

watch(
  () => isLoading.value,
  newVal => {
    if (newVal) {
      tableInstanceData.pageNo = 1
    }
  },
)
</script>

<style lang="scss" scoped>
.equity-table {
  margin-bottom: 20px !important;

  :deep(th .cell) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  :deep(td.el-table__cell) {
    height: 40px !important;
  }

  :deep(.el-switch--small .el-switch__core) {
    width: 45px !important;
  }

  :deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
    border-right: 1px solid #ddd !important;
  }

  :deep(.el-table__header-wrapper .el-table__header .is-center) {
    border-bottom: 1px solid #ddd !important;
  }
}
</style>
