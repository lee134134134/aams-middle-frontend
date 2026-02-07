<template>
	<el-table v-loading="isLoading" ref="tableRef" style="width: 100%" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
		:max-height="tableHeight" :data="tableData" :row-key="getRowKey" :header-cell-style="{
            background: '#E4EFFF',
            color: '#333333',
            height: '38px',
        }" border :tree-props="{ children: 'children' }" :expand-row-kes="expandedKeys"
		:row-class-name="setRowClassName" :row-style="handleRowStyle">
		<el-table-column prop="assetType" label="资产类型" min-width="180" show-overflow-tooltip align="left"
			fixed="left">
			<template #default="{ row }">
				{{ row.assetType }}
			</template>
		</el-table-column>
		<el-table-column v-for="(item, i) in tabcolums" :key="item.key" :prop="item.key" :label="item.name"
			:min-width="item.width" show-overflow-tooltip :align="item.align" :resizable="false" :fixed="item.fixed">
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
	import { ref, computed, nextTick } from "vue";
	import { getList } from "@/api/CombinationChange.js";
	import { data } from "./common.js";
	const tableData = ref([]);
	const tableRef = ref<TableInstance>();
	const tableHeight = ref(window.innerHeight - 270);
	const tabcolums = ref(data);
	let isLoading = ref(false);
	const expandedKeys = ref([] as any)
	// 获取列表数据
	let getContentList = async (obj : any) => {
		isLoading.value = true;
		let res = await getList(obj);
		isLoading.value = false;
		if (res && res.code === '00000') {
			tableData.value = res.data || [];
			await nextTick();
			if (tableData.value.length > 0) {
				expandedKeys.value = tableData.value.filter(el => el.expand).map(item => item.assetType)
			}
			nextTick(() => {
				tableData.value.forEach(el => {
					if (el.expand) {
						tableRef.value?.toggleRowExpansion(el, true)
					}
				})
			})
		}
	};

	//多选
	let getRowKey = (row : any) => {
		return row.assetType;
	};


	interface User {
		id : string;
		name : string;
		amount1 : string;
		amount2 : string;
		amount3 : number;
		amount4 : number;
	}
	interface SpanMethodProps {
		row : User;
		column : TableColumnCtx<User>;
		rowIndex : number;
		columnIndex : number;
	}

	const handleRowStyle = ({ row, rowIndex } : SpanMethodProps) => {
		 if (row.level === 0 && row.assetType === '净资产合计'){
			return { fontWeight: 'bold', color: '#2173f7' }
		}else if (row.level === 0 || row.level === 1){
			return { fontWeight: 'bold', color: '#666' }
		} else {
			return {color: '#666'}
		}
	}
	const setRowClassName = ({ row, rowIndex }) => {
		if (row.level === 0 && row.assetType !== '净资产合计') {
			return 'changeClass1'
		} else if(row.level === 1 ){
			return 'changeClass2'
		}
		return ''
	}
	defineExpose({
		tableRef,
		tableData,
		getContentList
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
</style>
<style>
	.el-table tr.changeClass1 {
		background-color: #f2f7ff !important;
	}
	.el-table tr.changeClass2 {
		background-color: #fafafa !important;
	}
</style>