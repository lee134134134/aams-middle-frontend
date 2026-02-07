<template>
  <el-table ref="tableRef" v-loading="props.isLoading" :data="pageData" stripe :expand-row-keys="expandedKeys" :header-cell-style="{ background: '#E4EFFF', color: '#333333', height: '48px !important' }" :max-height="tableHeight" :row-key="getRowKey" :tree-props="{ children: 'children' }" border class="equity-table" empty-text="暂无数据" show-overflow-tooltip style="width: 100%">
    <el-table-column align="left" fixed="left" label="日期" min-width="180" prop="insuranceType" show-overflow-tooltip>
      <template #default="{ row }">
        {{ row.date }}
      </template>
    </el-table-column>
    <el-table-column v-for="item in tabcolums" :key="item.key" :align="item.align" :fixed="item.fixed" :label="item.name" :min-width="item.width" :prop="item.key" :resizable="false" show-overflow-tooltip> </el-table-column>
    <template #empty>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <img src="../../../assets/images/empty.png" style="height: 200px" alt="" />
        <div v-if="props.downloadBool">请输入查询条件并点击查询</div>
        <div v-else>暂无数据</div>
      </div>
    </template>
  </el-table>
  <el-pagination v-model:current-page="tableInstanceData.pageNo" v-model:page-size="tableInstanceData.pageSize" :page-sizes="[10, 20, 30, 50, 100]" :total="tableInstanceData.total" background data-track-id="EquityHoldingAttribution-pagination-btn" data-track-name="权益类组合持仓归因分析表-分页" layout="->, total,jumper,prev, pager, next, sizes" popper-class="select_bottom" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue"
import { data } from "./common.js"
import type { TableInstance } from "element-plus"
import { getList } from "@/api/EquityHoldingAttribution.js"

interface Props {
  isLoading: boolean
  downloadBool: boolean
}

const props = defineProps<Props>()

const tableRef = ref<TableInstance>()
const tableData = ref([])
interface TablePagination {
  pageNo: number
  pageSize: number
  total: number
}
const tableInstanceData = reactive<TablePagination>({
  pageNo: 1,
  pageSize: 10,
  total: 0,
})
const tableHeight = ref(window.innerHeight - 280)
const tabcolums = ref(data)
const expandedKeys = ref([] as unknown)

//多选
let getRowKey = (row: Record<string, unknown>): string => {
  return row.investManager
}

// 前端实现分页
const pageData = computed(() => {
  const start = (tableInstanceData.pageNo - 1) * tableInstanceData.pageSize
  const end = start + tableInstanceData.pageSize
  return tableData.value.slice(start, end)
})

// 获取列表数据
let getContentList = async (obj: unknown): Promise<void> => {
  let res = await getList(obj)
  if (res && res.code === "00000") {
    tableData.value = res.data || []
    tableInstanceData.total = tableData.value.length
    tableInstanceData.pageNo = 1
  } else {
    tableData.value = []
    tableInstanceData.total = 0
  }
}
// 分页
const handleSizeChange = (val: number): void => {
  tableInstanceData.pageNo = 1
  tableInstanceData.pageSize = val
}
const handleCurrentChange = (val: number): void => {
  tableInstanceData.pageNo = val
}

defineExpose({
  getContentList,
})
</script>

<style lang="scss" scoped>
.equity-table {
  margin-bottom: 20px !important;

  :deep(td.el-table__cell) {
    height: 40px !important;
  }
}

.btnArr {
  margin-bottom: 10px;
}

.upload-demo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
