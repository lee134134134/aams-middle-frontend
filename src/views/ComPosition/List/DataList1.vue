<template>
	<el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="tableData" stripe
		style="width: 100%" ref="tableRef1" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }" border @sort-change="handleSortChange">
		<el-table-column v-for="(item, i) in data" :key="i" :prop="item.key" :label="item.name" :min-width="item.width"
			:sortable="item.sortable" :align="item.align" :show-overflow-tooltip="item.tooltip" :fixed="item.fixed">
		</el-table-column>
		<template #empty>
			<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
				<img src="../../../assets/images/empty.png" style="height:200px;" />
				<div v-if="downloadBool">请输入查询条件并点击查询</div>
				<div v-else>暂无数据</div>
			</div>
		</template>
	</el-table>
	<el-pagination v-model:current-page="pageNo2" v-model:page-size="pageSize2" :page-sizes="[10, 20, 30, 50, 100]"
		layout="->, total,jumper,prev, pager, next, sizes" :total="total2" background popper-class="select_bottom"
		data-track-id="ComPosition-pagination1-btn" data-track-name="权益类组合持仓表-股票-分页" />
</template>

<script lang="ts" setup>
	import { ref,watch } from "vue";
	import { storeToRefs } from "pinia";
	import { data } from "./common.js";
	import ComPosition from "@/stores/modules/ComPosition.js";
	let _ComPosition = ComPosition();
	let { pageSize2, pageNo2, total2, isLoading, getContentList2 } = storeToRefs(_ComPosition);

	const formattedNumber = (num : any) => {
		if (!num) return "";
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	// 表格数据
	const props = defineProps({
		downloadBool: {
			type: Boolean,
			default: true,
		}
	});

	watch(() => getContentList2.value, (newVal, oldVal) => {
		tableData.value = newVal;
		// console.log(tableData.value)
	})
	const tableData = ref([]);
	const tableRef1 = ref<TableInstance>();
	const tableHeight = ref(window.innerHeight - 280);
	// 获取列表数据

	// 排序
	const handleSortChange = (obj) => {
		pageSize2.value = 10;
		pageNo2.value = 1;
		_ComPosition.sortList1(obj)
	}
	defineExpose({
		tableRef1,
	});
</script>

<style scoped lang="scss">
	.btnArr {
		margin: 10px 0;
	}

	.el-table {
		margin-bottom: 10px;
	}

	.upload-demo {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
		border-right: 1px solid #ddd !important;
	}
</style>