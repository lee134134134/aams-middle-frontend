<template>
  <el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="pageData" stripe border
    style="width: 100%" ref="tableRef" :header-cell-style="headerRowClassName" show-overflow-tooltip
    @sort-change="handleSortChange" :key="tableKey">
    <el-table-column v-for="(item, i) in tabcolums2" :key="i" :prop="item.key" :label="item.name" :min-width="item.width"
      :align="item.align" :fixed="item.fixed" :sortable="item.sortable" :class-name="getColumnClass(item.key)"
      :resizable="false">
    </el-table-column>
    <template #empty>
      <div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
        <img src="../../../assets/images/empty.png" style="height:200px;" />
        <div>请输入查询条件并点击查询</div>
      </div>
    </template>
  </el-table>
  <el-pagination v-model:current-page="currnetPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50, 100]"
    layout="->, total,jumper,prev, pager, next, sizes" :total="sortData.length" background popper-class="select_bottom"
    data-track-id="FloatingPL-pagination6-btn" data-track-name="浮盈亏情况跟踪表-市值基金-分页" @size-change="handleSizeChange"
    @current-change="handlePageChange" />
</template>

<script lang="ts" setup>
import { ref, watch, reactive, computed } from "vue";
import { tabcolums2 } from "./common.js";
import { getContentList } from "@/utils/index.js";

// 表格数据
const props = defineProps({
  marketCapFundList: {
    type: Array,
    default: [],
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const pageAll = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})

watch(() => props.marketCapFundList, (newVal, oldVal) => {
  currnetPage.value = 1
  pageSize.value = 10
  pageAll.total = props.marketCapFundList.length;
  tableData.value = newVal
})


const tableRef = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 280);

const tableData = ref([])

const parseNumber = (value) => {
  if (typeof value === 'number') return value
  const stringValue = value.toString().trim()
  const isNegative = stringValue.startsWith('-')
  let cleanValue = stringValue.replace(/[^\d.]/g, '');
  if (isNegative && cleanValue) {
    cleanValue = '-' + cleanValue
  }

  const numValue = parseFloat(cleanValue)
  return isNaN(numValue) ? 0 : numValue
}

const tableKey = ref(0);
const sortParams = ref(null);
const currnetPage = ref(1);
const pageSize = ref(10);
const activeColumn = ref(null);


const compareNumbers = (a, b) => {
  if (Object.is(a, -0) && Object.is(b, 0)) return -1
  if (Object.is(a, 0) && Object.is(b, -0)) return 1
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const sortData = computed(() => {
  if (!sortParams.value) return [...tableData.value]
  return [...tableData.value].sort((a, b) => {
    const { prop, order } = sortParams.value
    let valA = a[prop];
    let valB = b[prop];
    valA = parseNumber(valA)
    valB = parseNumber(valB)
    const comparison = compareNumbers(valA, valB)
    return order === 'ascending' ? comparison : -comparison
  })
});

const pageData = computed(() => {
  const start = (currnetPage.value - 1) * pageSize.value
  return sortData.value.slice(start, start + pageSize.value)
})

const handleSortChange = ({ prop, order }) => {
  currnetPage.value = 1
  sortParams.value = order ? { prop, order } : null;
  activeColumn.value = order ? prop : null;
  tableKey.value++
}

const handlePageChange = (page) => {
  currnetPage.value = page
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currnetPage.value = 1;
  tableKey.value++
}

const getColumnClass = (propName) => {
  if (activeColumn.value === propName) {
    return sortParams.value?.order === 'ascending' ? 'sort-column ascending' : 'sort-column descending'
  }
  return ''
}

const headerRowClassName = ({ row, column, rowIndex, columnIndex }) => {
  if (column.property === 'floatingProfitLoss') {
    return {
      background: '#E4EFFF',
      color: '#2272F7',
      height: '38px'
    }
  } else {
    return {
      background: '#E4EFFF',
      color: '#333333',
      height: '38px'
    }
  }
}

defineExpose({
  tableRef,
});
</script>

<style scoped lang="scss">
.btnArr {
  margin: 10px 0;
}

.el-table {
  margin-bottom: 10px;

  :deep(tr td:nth-child(1) .cell) {
    // text-align: left;
    white-space: pre-wrap;
  }
}

.upload-demo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-table .sort-column .caret-wrapper) {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

:deep(.el-table .sort-column .sort-caret) {
  position: absolute;
}

:deep(.el-table th.sort-column .sort-caret.ascending) {
  border-bottom-color: #a8abb2 !important;
}

:deep(.el-table th.sort-column .sort-caret.descending) {
  border-top-color: #a8abb2 !important;
}

:deep(.el-table th.sort-asc .sort-caret.ascending) {
  border-bottom-color: #2272F7 !important;
}

:deep(.el-table th.sort-desc .sort-caret.descending) {
  border-top-color: #2272F7 !important;
}
</style>


