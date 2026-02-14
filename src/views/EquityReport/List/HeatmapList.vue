<template>
  <div class="header">
    <el-row :gutter="20" align="middle">
      <el-col :span="4">
        <el-tree-select v-model="formInline.investManagerList" :data="formattedTreeData" :props="treeProps" multiple filterable clearable collapse-tags collapse-tags-tooltip show-checkbox node-key="value" popper-class="heatmap-tree-popper" placeholder="请选择投资经理" class="heatmap-select" style="width: 100%" :filter-method="handleFilterMethod" @blur="blurSelect" @focus="recordOldValue" @visible-change="handleVisibleChange">
          <template #header>
            <div class="select-all-header">
              <el-checkbox v-model="isAllSelected" :indeterminate="isIndeterminate" @change="handleSelectAll"> 全选{{ filterText ? "(筛选结果)" : "" }} </el-checkbox>
            </div>
          </template>
        </el-tree-select>
      </el-col>

      <el-col :span="6" class="info-wrapper">
        <span class="text">查询的交易日天数需大于1</span>

        <el-tooltip placement="bottom" effect="light" popper-class="color-scale-popper">
          <template #content>
            <div class="color-scale-legend">
              <div v-for="item in colorScaleList" :key="item.color" class="legend-item">
                <span class="color-box" :style="{ backgroundColor: item.color }"></span>
                <span class="color-text">{{ item.label }}</span>
              </div>
            </div>
          </template>
          <div class="legend-trigger">
            <el-icon class="info-icon"><WarningFilled /></el-icon>
            <span class="legend-text">色阶</span>
          </div>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>

  <section v-if="tableData?.length > 0">
    <el-table v-loading="tableLoading" :cell-style="handleCellStyle" :data="tableData" :header-cell-style="handleHeaderCellStyle" border class="table-container" max-height="700" style="width: 100%">
      <el-table-column align="left" fixed label="" prop="rowName" width="148" />

      <el-table-column v-for="col in tableColumns" :key="col.name" :label="col.name" :prop="col.name" align="center" min-width="122">
        <template #default="scope">
          {{ scope.row[col.name] }}
        </template>
      </el-table-column>
    </el-table>
  </section>

  <section v-else>
    <div v-loading="tableLoading" class="empty-table" style="display: flex; justify-content: center; align-items: center; flex-direction: column">
      <img alt="" src="../../../assets/images/empty.png" style="height: 200px" />
      <div v-if="downloadBool">请输入查询条件并点击查询</div>
      <div v-else>暂无数据</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, inject, reactive, Ref, ref, watch } from "vue"
import { WarningFilled } from "@element-plus/icons-vue"

// --- 类型定义 ---
interface InvestManagerHeader {
  name: string
  level: number
}

interface InvestManagerItem {
  investManager: string
  show?: boolean
  children?: InvestManagerItem[]
  [key: string]: unknown
}

interface TreeSelectNode {
  label: string
  value: string
  children?: TreeSelectNode[]
}

interface HeatmapRow {
  rowName: string
  rowLevel: number
  [key: string]: number | string | null
}

interface HeadDataContent {
  list?: InvestManagerItem[]
  tableList?: {
    selectInvestManagerList: InvestManagerHeader[]
    selectHeatMapDataList: (number | string | null)[][]
  }
}

interface TableColumnCtx {
  property: string
  [key: string]: unknown
}

interface CellStyleParams {
  row: HeatmapRow
  column: TableColumnCtx
  columnIndex: number
  rowIndex: number
}

interface HeaderCellStyleParams {
  column: TableColumnCtx
  columnIndex: number
  rowIndex: number
}

// --- 注入与响应式变量 ---
const isLoading = inject<Ref<boolean>>("pageLoading")
const headData = inject<Ref<HeadDataContent>>("headData")
const tableLoading = inject<Ref<boolean>>("tableLoading")
const downloadBool = inject<Ref<boolean>>("downloadBool")

const formInline = reactive<{ investManagerList: string[] }>({
  investManagerList: [],
})
const previousValue = ref<string[]>([])
const filterText = ref("")
const emit = defineEmits<{ (e: "updateList", value: string[]): void }>()

const treeProps = { label: "label", children: "children" }

const colorScaleList = [
  { color: "#ffffff", label: "x = 1" },
  { color: "#E94641", label: "0.95 ≤ x < 1" },
  { color: "#EF7471", label: "0.9 ≤ x < 0.95" },
  { color: "#F7BAB8", label: "0.85 ≤ x < 0.9" },
  { color: "#FAD1D0", label: "0.8 ≤ x < 0.85" },
  { color: "#FFA65E", label: "0.75 ≤ x < 0.8" },
  { color: "#FFCA9E", label: "0.5 ≤ x < 0.75" },
  { color: "#FFDBBF", label: "0 ≤ x < 0.5" },
  { color: "#F2F2F2", label: "x = 0" },
  { color: "#ECFAEE", label: "-0.5 < x < 0" },
  { color: "#C5F0CD", label: "-0.75 < x ≤ -0.5" },
  { color: "#8BE29B", label: "-1 < x ≤ -0.75" },
  { color: "#3DCE58", label: "x = -1" },
]

// --- 树形选择逻辑 ---
const formatTreeData = (data: InvestManagerItem[]): TreeSelectNode[] => {
  if (!Array.isArray(data)) return []
  const result: TreeSelectNode[] = []
  data.forEach(item => {
    if (item.show === false) return
    const node: TreeSelectNode = { label: item.investManager, value: item.investManager }
    if (item.children?.length) {
      const childrenNodes = formatTreeData(item.children)
      if (childrenNodes.length) node.children = childrenNodes
    }
    result.push(node)
  })
  return result
}
const formattedTreeData = computed(() => formatTreeData(headData?.list || []))

const handleFilterMethod = (val: string) => {
  filterText.value = val
}
const handleVisibleChange = (visible: boolean) => {
  if (!visible) filterText.value = ""
}

const getVisibleLeafValues = (nodes: TreeSelectNode[]): string[] => {
  let ids: string[] = []
  nodes.forEach(node => {
    const isMatch = !filterText.value || node.label.toLowerCase().includes(filterText.value.toLowerCase())
    if (!node.children?.length) {
      if (isMatch) ids.push(node.value)
    } else {
      ids.push(...getVisibleLeafValues(node.children))
    }
  })
  return ids
}
const currentVisibleLeafValues = computed(() => getVisibleLeafValues(formattedTreeData.value))

const isAllSelected = computed({
  get: () => {
    const visibleIds = currentVisibleLeafValues.value
    return visibleIds.length > 0 && visibleIds.every(id => formInline.investManagerList.includes(id))
  },
  set: () => {},
})
const isIndeterminate = computed(() => {
  const visibleIds = currentVisibleLeafValues.value
  const selectedCount = visibleIds.filter(id => formInline.investManagerList.includes(id)).length
  return selectedCount > 0 && selectedCount < visibleIds.length
})

const handleSelectAll = (val: boolean | string | number) => {
  const visibleIds = currentVisibleLeafValues.value
  const currentSelected = new Set(formInline.investManagerList)
  if (val) visibleIds.forEach(id => currentSelected.add(id))
  else visibleIds.forEach(id => currentSelected.delete(id))
  formInline.investManagerList = Array.from(currentSelected)
}

// --- 表格样式逻辑核心 ---

/** 1. 表头样式逻辑：0左，1中，2右；且 level=2 时字体变细 */
const getHeaderLevelStyle = (level: number): CSSProperties => {
  const style: CSSProperties = {}
  // 对齐逻辑
  if (level === 0) style.textAlign = "left"
  else if (level === 1) style.textAlign = "center"
  else if (level === 2) style.textAlign = "center"

  // 字体逻辑：level=2 变细，其余加粗
  style.fontWeight = level === 2 ? "normal" : "bold"

  return style
}

/** 2. 第一列样式逻辑：全左对齐，1右移20px，2右移40px；且 level=2 时字体变细 */
const getFirstColumnLevelStyle = (level: number): CSSProperties => {
  const style: CSSProperties = { textAlign: "left" }
  // 位移逻辑
  if (level === 1) style.paddingLeft = "20px !important"
  else if (level === 2) style.paddingLeft = "40px !important"

  // 字体逻辑：level=2 变细，其余加粗
  style.fontWeight = level === 2 ? "normal" : "bold"

  return style
}

const tableData = ref<HeatmapRow[]>([])
const tableColumns = ref<InvestManagerHeader[]>([])

watch(
  () => headData?.tableList,
  newVal => {
    if (newVal) {
      const headers = newVal.selectInvestManagerList || []
      const matrix = newVal.selectHeatMapDataList || []
      tableColumns.value = headers
      tableData.value = headers.map((rowHeader, i) => {
        const rowObj: HeatmapRow = { rowName: rowHeader.name, rowLevel: rowHeader.level }
        headers.forEach(colHeader => {
          rowObj[colHeader.name] = matrix[i] ? matrix[i][headers.indexOf(colHeader)] : null
        })
        return rowObj
      })
    }
  },
  { deep: true, immediate: true },
)

const handleHeaderCellStyle = ({ column }: HeaderCellStyleParams): CSSProperties => {
  const colMeta = tableColumns.value.find(c => c.name === column.property)
  const baseStyle: CSSProperties = {
    background: "#E4EFFF",
    color: "#333333",
    height: "48px !important",
    borderRight: "1px solid #ddd",
    // 注意：这里移除了之前判断 isSelected 的 fontWeight 逻辑
  }
  return Object.assign(baseStyle, colMeta ? getHeaderLevelStyle(colMeta.level) : { textAlign: "left", fontWeight: "bold" })
}

const handleCellStyle = ({ row, column, columnIndex }: CellStyleParams): CSSProperties => {
  // 第一列（行名列）处理
  if (columnIndex === 0) {
    const baseStyle: CSSProperties = { color: "#666" }
    // 应用第一列左对齐+位移+level=2变细规则
    return Object.assign(baseStyle, getFirstColumnLevelStyle(row.rowLevel))
  }

  // 热力图数据列处理
  const val = row[column.property]
  if (val === null || val === undefined) return {}

  let backgroundColor = ""
  const newVal = Number(val)
  if (newVal === 1) backgroundColor = `#fff`
  else if (0.95 <= newVal && newVal < 1) backgroundColor = `#e94641`
  else if (0.9 <= newVal && newVal < 0.95) backgroundColor = `#ef7471`
  else if (0.85 <= newVal && newVal < 0.9) backgroundColor = `#f7bab8`
  else if (0.8 <= newVal && newVal < 0.85) backgroundColor = `#fad1d0`
  else if (0.75 <= newVal && newVal < 0.8) backgroundColor = `#ffa65e`
  else if (0.5 <= newVal && newVal < 0.75) backgroundColor = `#ffca9e`
  else if (0 < newVal && newVal < 0.5) backgroundColor = `#ffdbbf`
  else if (newVal === 0) backgroundColor = "#f2f2f2"
  else if (-0.5 < newVal && newVal < 0) backgroundColor = `#ecfaee`
  else if (-0.75 < newVal && newVal <= -0.5) backgroundColor = `#c5f0cd`
  else if (-1 < newVal && newVal <= -0.75) backgroundColor = `#8be29b`
  else if (newVal === -1) backgroundColor = `#3dce58`

  return { backgroundColor, color: "#666", transition: "all 0.3s", textAlign: "center" }
}

const blurSelect = (): void => {
  const currentValue = formInline.investManagerList
  const isChanged = JSON.stringify([...currentValue].sort()) !== JSON.stringify([...previousValue.value].sort())
  if (isChanged) {
    emit("updateList", [...currentValue])
    previousValue.value = [...currentValue]
  }
}
const recordOldValue = (): void => {
  previousValue.value = [...formInline.investManagerList]
}
const resetSelect = (): void => {
  formInline.investManagerList = []
}

defineExpose({ resetSelect })
</script>

<style lang="scss">
.heatmap-tree-popper {
  .el-tree-node__content {
    > .el-icon:last-child,
    .el-tree-node__suffix {
      display: none !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.header {
  margin-top: 32px;
  margin-bottom: 12px;
  width: 100%;
  .heatmap-select {
    max-width: 300px;
  }
  .select-all-header {
    padding: 0 12px;
    height: 32px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .info-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    white-space: nowrap;
    .text {
      font-size: 14px;
      color: #666;
    }
    .legend-trigger {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: #409eff;
      .legend-text {
        font-size: 14px;
        user-select: none;
      }
      .info-icon {
        font-size: 18px;
      }
    }
  }
}
.color-scale-legend {
  padding: 8px 4px;
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
    .color-box {
      width: 18px;
      height: 18px;
      border: 1px solid #eee;
      margin-right: 12px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .color-text {
      font-size: 13px;
      color: #333;
      min-width: 100px;
    }
  }
}
.table-container {
  :deep(td.el-table__cell) {
    height: 40px !important;
  }
  :deep(.el-table__row td.el-table__cell:hover) {
    outline: 2px solid #409eff !important;
    outline-offset: -2px;
    z-index: 1;
  }
}
:deep(.el-table__fixed-column--left) {
  background-color: #fff !important;
  font-weight: inherit;
}
.empty-table {
  border: 1px solid #dfdfdf;
  padding: 40px 0;
  & > div {
    font-size: 14px;
    color: #999;
    padding-bottom: 20px;
  }
}
:global(.el-select-dropdown.is-multiple .el-select-dropdown__item.is-selected:after) {
  display: none;
}
</style>