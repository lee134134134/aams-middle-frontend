<template>
  <el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="wholeFloatingPnlList"  border
    style="width: 100%" ref="tableRef" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }" :tree-props="{ children: 'children' }" :row-key="getRowKey" :row-class-name="setRowClassName"
    :expand-row-kes="expandedKeys" :row-style="handleRowStyle">
    <el-table-column prop="assetType" label="资产类型" min-width="180" show-overflow-tooltip align="left" fixed="left"
      :resizable="false">
      <template #default="{ row }">
        {{ row.assetType }}
      </template>
    </el-table-column>
    <el-table-column v-for="(item, i) in tabcolums1" :key="i" :prop="item.key" :label="item.name" :min-width="item.width"
      :sortable="item.sortable" :align="item.align" :fixed="item.fixed" :show-overflow-tooltip="item.tooltip"
      :resizable="false">
    </el-table-column>
    <template #empty>
      <div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
        <img src="../../../assets/images/empty.png" style="height:200px;" />
        <div>请输入查询条件并点击查询</div>
      </div>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import { tabcolums1 } from "./common.js";
// 表格数据
const props = defineProps({
  wholeFloatingPnlList: {
    type: Array,
    default: [],
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});
// let isLoading = ref(false);
const tableHeight = ref(window.innerHeight - 180);
//多选
let getRowKey = (row: any) => {
  return row.assetType;
};

// const rowClassName = ({ row, rowIndex }: SpanMethodProps) => {
//   if (row.assetType === "合计") {
//     return 'customColor'
//   } else {
//     return ''
//   }
// }

const expandedKeys = ref([] as any)
const isBood = ['权益类资产', '固收类资产']
watch(() => props.wholeFloatingPnlList, (newval, oldval) => {
  nextTick();
  if (props.wholeFloatingPnlList.length > 0) {
    expandedKeys.value = props.wholeFloatingPnlList.filter(el => isBood.includes(el.assetType)).map(item => item.assetType)

  }
  nextTick(() => {
    props.wholeFloatingPnlList.forEach(el => {
      if (el.assetType) {
        tableRef.value?.toggleRowExpansion(el, true)
      }
    })
  })
})

// const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
//   if (row.level === 1 || row.level === 0) {
//     return { fontWeight: 'bold', color: '#666' }
//   } else {
//     return {}
//   }
// }

	const handleRowStyle = ({ row, rowIndex } : SpanMethodProps) => {
		if (row.level === 0 && row.assetType === '合计') {
			return { fontWeight: 'bold', color: '#2173f7' }
		} else if (row.level === 0 || row.level === 1) {
			return { fontWeight: 'bold', color: '#666' }
		} else {
			return { color: '#666' }
		}
	}
	const setRowClassName = ({ row, rowIndex }) => {
		if (row.level === 0 && row.assetType !== '合计') {
			return 'changeClass1'
		} else if (row.level === 1) {
			return 'changeClass2'
		}
		return ''
	}
const tableRef = ref<TableInstance>();

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

  :deep(.cell) {
    // text-align: left;
    // white-space: pre-wrap;
  }
}

.upload-demo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.customColor) {
  .cell {
    color: #2173F7 !important;
    font-weight: 600;
  }
}
</style>
<style>
	.el-table tr.changeClass1 {
		background-color: #f2f7ff !important;
	}
	.el-table tr.changeClass2 {
		background-color: #fafafa !important;
	}
</style>