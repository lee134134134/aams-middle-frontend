<template>
	<el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="tableData" border
		style="width: 100%" ref="tableRef" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }" :row-style="handleRowStyle">
		<el-table-column v-for="(item, i) in tabcolums1" :key="i" :prop="item.key" :label="item.name"
			:min-width="item.width" :sortable="item.sortable" :align="item.align" :fixed="item.fixed"
			show-overflow-tooltip>
			<template #default="scope">
				{{
          (scope.row[item.key] === null || scope.row[item.key] === '')
          ? "-"
          : typeof scope.row[item.key] === "number" &&
            scope.row[item.key] !== 0
            ? formattedNumber(scope.row[item.key])
            : scope.row[item.key]
        }}
			</template>
		</el-table-column>
		<template #empty>
			<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
				<img src="../../../assets/images/empty.png" style="height:200px;" />
				<div>请输入查询条件并点击查询</div>
			</div>
		</template>
	</el-table>
	<el-pagination v-model:current-page="formInline.pageNo" v-model:page-size="formInline.pageSize"
		:page-sizes="[10, 20, 30, 50, 100]" layout="->, total,jumper,prev, pager, next, sizes" :total="total" background
		popper-class="select_bottom" data-track-id="DetailAssets-pagination-btn" data-track-name="明细资产时序查询-分页"
		@size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
	import { ref, watch, nextTick, computed, onMounted } from "vue";
	import { tabcolums1 } from "./common.js";
	import { getList } from "@/api/DetailAssets.js";

	const formattedNumber = (num : any) => {
		if (!num) return "";
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const tableHeight = ref(window.innerHeight - 300);

	const tableRef = ref<TableInstance>();
	// 表格数据
	const props = defineProps({
		formInline: {
			type: Object,
			default: {},
		},
		selfAcountArr:{
			type: Object,
			default: [],
		},
	});
	watch(
		() => props.formInline,
		(newvalue, oldvalue) => {
			formInline.value = { ...formInline.value, ...newvalue };
		},
		{
			deep: true, // 开启深度监听
		},
	);
	let formInline = ref({
		treeType: '3',
		sobCodeList: [],
		startDate: '',
		assetsType: [],
		endDate: '',
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		currencyUnit: '2',
		pageSize: 10,
		pageNo: 1,
	});


	let isLoading = ref(false);
	const tableData = ref([]);
	const total = ref(0);
	// 获取列表数据
	let getContentList = async (obj : any, val ?: any) => {
		isLoading.value = true;
		let res = await getList(obj);
		isLoading.value = false;
		if (res && res.code === '00000') {
			tableData.value = res.data.list || [];
			total.value = res.data.total;
			if (val) {
				formInline.value.pageNo = 1;
				formInline.value.pageSize = 10;
			}
		}
	};

	interface SpanMethodProps {
		row : User;
		column : TableColumnCtx<User>;
		rowIndex : number;
		columnIndex : number;
	}
	const handleRowStyle = ({ row, rowIndex } : SpanMethodProps) => {
		if (row.totalFlag === '0') {
			return { fontWeight: 'bold', background: '#f2f7ff' }
		} else if (row.totalFlag === '1') {
			return { fontWeight: 'bold', background: '#fafafa' }
		} else if (row.totalFlag === '2') {
			return { fontWeight: 'bold' }
		} else {
			return {}
		}
	}


	// 分页
	const handleSizeChange = async (val : number) => {
		formInline.value.pageNo = 1;
		await getContentList({
			...formInline.value,
			selfAcountTree:props.selfAcountArr,
			pageSize: val,
		});
	};
	const handleCurrentChange = async (val : number) => {
		await getContentList({
			...formInline.value,
			selfAcountTree:props.selfAcountArr,
			pageNo: val,
		});
	};
	defineExpose({
		getContentList,
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
</style>