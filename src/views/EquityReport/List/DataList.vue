<template>
  <el-table
    class="table-container"
    ref="tableRef"
    v-loading="isLoading"
    :data="tableData"
    :expand-row-kes="expandedKeys"
    :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '48px !important',
    }"
    :max-height="tableHeight"
    :row-class-name="setRowClassName"
    :row-key="getRowKey"
    :row-style="handleRowStyle"
    :tree-props="{ children: 'children' }"
    border
    empty-text="请输入查询条件并点击查询"
    show-overflow-tooltip
    style="width: 100%">
    <el-table-column align="left" fixed="left" label="投资经理" min-width="180" prop="investManager" show-overflow-tooltip>
      <template #default="{ row }">
        <span :style="{ marginLeft: getIndent(row) + 'px' }">
          {{ row.investManager }}
        </span>
      </template>
    </el-table-column>
    <el-table-column v-for="(item, i) in tabcolums" :key="item.key" :align="item.align" :fixed="item.fixed" :label="item.name" :min-width="item.width" :prop="item.key" :resizable="false" show-overflow-tooltip>
      <!-- <template #default="scope">
                {{ scope.row[item.key] === null ? "-" : scope.row[item.key] }}
            </template> -->
    </el-table-column>
    <template #empty>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <img alt="" src="../../../assets/images/empty.png" style="height: 200px" />
        <div v-if="downloadBool">请输入查询条件并点击查询</div>
        <div v-else>暂无数据</div>
      </div>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { inject, nextTick, Ref, ref } from "vue"
import { TableColumnCtx, TableInstance } from "element-plus"
import { getList } from "@/api/EquityReport.js"
import { data } from "./common.js"
// 表格数据
const props = defineProps({
  tableData: {
    type: Object,
    default: [],
  },
})
let formInline = ref({
  pageSize: 10,
  pageNo: 1,
})
const total = ref(0)
const tableData = ref([])
const tableRef = ref<TableInstance>()
const tableHeight = ref(window.innerHeight - 280)
const tabcolums = ref(data)
const ids = ref<number[]>([])
let isLoading = ref(false)
const downloadBool = inject<Ref<boolean>>("downloadBool")
//多选
const selectedIds = ref<number[]>([]) // 选中的行ID
const emit = defineEmits(["DateListEvent", "upDataList"])

//多选
let getRowKey = (row: any) => {
  return row.investManager
}

const expandedKeys = ref([] as any)

// 获取列表数据
let getContentList = async (obj: any) => {
  if (obj.order == "") {
    tableRef.value.clearSort()
  }
  isLoading.value = true
  let res = await getList(obj)
  isLoading.value = false
  if (res && res.code === "00000") {
    tableData.value = res.data || []
    await nextTick()
    if (tableData.value.length > 0) {
      expandedKeys.value = tableData.value.filter(el => el.expand).map(item => item.investManager)
    }
    nextTick(() => {
      tableData.value.forEach(el => {
        if (el.expand) {
          tableRef.value?.toggleRowExpansion(el, true)
        }
      })
    })
  }
}
const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
  if (row.level === 0 && row.investManager === "合计") {
    return { fontWeight: "bold", color: "#2173f7" }
  } else if (row.level === 0 || (row.level === 1 && row.nodeType !== "1")) {
    return { fontWeight: "bold", color: "#666" }
  } else {
    return { color: "#666" }
  }
}
const setRowClassName = ({ row, rowIndex }) => {
  if (row.level === 0) {
    if (row.investManager !== "合计") {
      return "changeClass11"
    }
  } else if (row.level === 1 && row.nodeType !== "1") {
    return "changeClass22"
  }
  return ""
}

// 分页
const handleSizeChange = async (val: number) => {
  formInline.value.pageNo = 1
  await getContentList({
    ...formInline.value,
    pageSize: val,
  })
}
const handleCurrentChange = async (val: number) => {
  await getContentList({
    ...formInline.value,
    pageNo: val,
  })
}

interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
  amount4: number
}
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}

// const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
//     if (row.level === 0 || (row.level === 1 && row.nodeType !== '1')) {
//         return { fontWeight: 'bold' }
//     }
// }

const getIndent = (row: any) => {
  if (row.level === 1 && row.nodeType === "1") {
    return 15
  }
  return 0
}

defineExpose({
  tableRef,
  tableData,
  getContentList,
})
</script>

<style lang="scss" scoped>
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

.table-container {
  :deep(td.el-table__cell) {
    height: 40px !important;
  }
}
</style>
<style lang="scss">
.el-table tr.changeClass11 {
  background-color: #f2f7ff !important;
}

.el-table tr.changeClass22 {
  background-color: #fafafa !important;
}
</style>
