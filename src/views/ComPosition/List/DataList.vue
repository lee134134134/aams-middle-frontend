<template>
	<el-table v-loading="isLoading" ref="tableRef" style="width: 100%" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
		:max-height="tableHeight" :data="tableData" :header-cell-style="{
            background: '#E4EFFF',
            color: '#333333',
            height: '38px',
        }" border stripe @sort-change="handleSortChange">
		<el-table-column v-for="(item, i) in tabcolums" :key="item.key" :prop="item.key" :label="item.name"
			:sortable="item.sortable" :fixed="item.fixed" :min-width="item.width" show-overflow-tooltip
			:align="item.align" :resizable="false">
		</el-table-column>
		<template #empty>
			<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
				<img src="../../../assets/images/empty.png" style="height:200px;" />
				<div v-if="downloadBool">请输入查询条件并点击查询</div>
				<div v-else>暂无数据</div>
			</div>
		</template>
	</el-table>
	<el-pagination v-model:current-page="pageNo1" v-model:page-size="pageSize1" :page-sizes="[10, 20, 30, 50, 100]"
		layout="->, total,jumper,prev, pager, next, sizes" :total="total1" background popper-class="select_bottom"
		data-track-id="ComPosition-pagination-btn" data-track-name="权益类组合持仓表-权益类基金-分页" />
</template>

<script lang="ts" setup>
	import { ref, computed, onMounted, watch, nextTick } from "vue";
	import { ElMessage } from "element-plus";
	import { getList } from "@/api/ComPosition.js";
	import { data } from "./common.js";
	import { storeToRefs } from "pinia";
	import ComPosition from "@/stores/modules/ComPosition.js";
	let _ComPosition = ComPosition();
	let { pageSize1, pageNo1, total1, isLoading, getContentList1, list1 } = storeToRefs(_ComPosition);
	// 表格数据
	const props = defineProps({
		tabsName: {
			type: String,
			default: 'equity',
		},
		downloadBool: {
			type: Boolean,
			default: true,
		}
	});

	watch(() => getContentList1.value, (newVal, oldVal) => {
		tableData.value = newVal;
		// console.log(tableData.value)
	})
	const tableData = ref([]);
	const tableRef = ref<TableInstance>();
	const tableHeight = ref(window.innerHeight - 280);
	const tabcolums = ref(data);
	// 排序
	const handleSortChange = (obj) => {
		pageSize1.value = 10;
		pageNo1.value = 1;
		_ComPosition.sortList(obj)
	}


	defineExpose({
		tableRef,
	});
</script>

<style scoped lang="scss">
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

	:deep(.customColor) {
		.cell {
			color: #2173F7 !important;
			font-weight: 600;
		}
	}

	:deep(.customBold) {
		font-weight: 600;
	}
</style>