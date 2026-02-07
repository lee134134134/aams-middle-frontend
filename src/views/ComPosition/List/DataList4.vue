<template>
	<div class="container">
		<div class="left-module">
			<el-table v-loading="isLoading" ref="tableRef" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
				:max-height="tableHeight" :data="tableData" :header-cell-style="{
					background: '#E4EFFF',
					color: '#333333',
					height: '38px',
				}" border stripe>
				<el-table-column v-for="(item, i) in tabcolums5" :key="item.key" :prop="item.key" :label="item.name"
					:sortable="item.sortable" :fixed="item.fixed" :min-width="item.width" show-overflow-tooltip
					:align="item.align" :resizable="false">
					<template v-if="item.child">
						<el-table-column v-for="(items, index) in item.child" :key="items.key" :prop="items.key"
							:label="items.name" :min-width="items.width" show-overflow-tooltip :align="items.align"
							:resizable="false"></el-table-column>
					</template>
				</el-table-column>
				<template #empty>
					<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
						<img src="../../../assets/images/empty.png" style="height:200px;" />
						<div v-if="downloadBool">请输入查询条件并点击查询</div>
						<div v-else>暂无数据</div>
					</div>
				</template>
			</el-table>
			<el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
				layout="->, total,jumper,prev, pager, next, sizes" :pager-count="4" background popper-class="select_bottom"
				:page-sizes="[10, 20, 30, 50, 100]" :total="total" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" data-track-id="BidManagement-pagination-btn"
				data-track-name="权益类组合持仓表-持仓集中度-股票-分页" />
		</div>
		<div class="center-module">
			<el-table v-loading="isLoading" ref="tableRef1" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
				:max-height="tableHeight" :data="tableData1" :header-cell-style="{
					background: '#E4EFFF',
					color: '#333333',
					height: '38px',
				}" border stripe>
				<el-table-column v-for="(item, i) in tabcolums6" :key="item.key" :prop="item.key" :label="item.name"
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
			<el-pagination v-model:current-page="pageNo1" v-model:page-size="pageSize1"
				layout="->, total,jumper,prev, pager, next, sizes" :pager-count="4" background popper-class="select_bottom"
				:page-sizes="[10, 20, 30, 50, 100]" :total="total1" @size-change="handleSizeChange1"
				@current-change="handleCurrentChange1" data-track-id="BidManagement-pagination-btn"
				data-track-name="权益类组合持仓表-持仓集中度-基金-分页" />
		</div>
		<div class="right-module">
			<el-table v-loading="isLoading" ref="tableRef2" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
				:max-height="tableHeight" :data="tableData2" :header-cell-style="{
					background: '#E4EFFF',
					color: '#333333',
					height: '38px',
				}" border stripe>
				<el-table-column v-for="(item, i) in tabcolums7" :key="item.key" :prop="item.key" :label="item.name"
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
			<el-pagination v-model:current-page="pageNo2" v-model:page-size="pageSize2"
				layout="->, total,jumper,prev, pager, next, sizes" :pager-count="4" background popper-class="select_bottom"
				:page-sizes="[10, 20, 30, 50, 100]" :total="total2" @size-change="handleSizeChange2"
				@current-change="handleCurrentChange2" data-track-id="BidManagement-pagination-btn"
				data-track-name="权益类组合持仓表-持仓集中度-行业-分页" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { getPositionPageList } from "@/api/ComPosition.js";
import { tabcolums5, tabcolums6, tabcolums7 } from "./common.js";
import VChart from 'vue-echarts';
const emit = defineEmits(['changeLoading'])
import _ from "lodash"
const isLoading = ref(false)
const allTableData = ref([])
const allTableData1 = ref([])
const allTableData2 = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const pageNo1 = ref(1)
const pageSize1 = ref(10)
const pageNo2 = ref(1)
const pageSize2 = ref(10)
let total = ref(0);
let total1 = ref(0);
let total2 = ref(0);
const tableRef = ref<TableInstance>();
const tableRef1 = ref<TableInstance>();
const tableRef2 = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 280);
// 表格数据
const props = defineProps({
	downloadBool: {
		type: Boolean,
		default: true,
	},
	formInline: {
		type: Object,
		default: {},
	},
});
let formInline = ref({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	accountSet: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
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
const tableData = computed(() => {
	const start = (pageNo.value - 1) * pageSize.value
	const end = start + pageSize.value
	return allTableData.value.slice(start, end)
});
const tableData1 = computed(() => {
	const start1 = (pageNo1.value - 1) * pageSize1.value
	const end1 = start1 + pageSize1.value
	return allTableData1.value.slice(start1, end1)
});
const tableData2 = computed(() => {
	const start2 = (pageNo2.value - 1) * pageSize2.value
	const end2 = start2 + pageSize2.value
	return allTableData2.value.slice(start2, end2)
});
let getContentList = async (obj: any) => {
	isLoading.value = true;
	pageNo.value = 1;
	pageSize.value = 10;
	pageNo1.value = 1;
	pageSize1.value = 10;
	pageNo2.value = 1;
	pageSize2.value = 10;
	allTableData.value = []
	allTableData1.value = []
	allTableData2.value = []
	emit('changeLoading', true)
	let res = await getPositionPageList({ ...obj }).catch(() => {
		isLoading.value = false;
	    emit('changeLoading', false)
	});
	isLoading.value = false;
	emit('changeLoading', false)
	if (res && res.code === '00000') {
		allTableData.value = res.data.stockList
		allTableData1.value = res.data.fundList
		allTableData2.value = res.data.industryList
		total = res.data.stockList.length
		total1 = res.data.fundList.length
		total2 = res.data.industryList.length
	}
}
//分页
const handleSizeChange = (val: number) => {
	pageNo.value = 1;
	pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
	pageNo.value = val;
};
const handleSizeChange1 = (val: number) => {
	pageNo1.value = 1;
	pageSize1.value = val;
};
const handleCurrentChange1 = (val: number) => {
	pageNo1.value = val;
};
const handleSizeChange2 = (val: number) => {
	pageNo2.value = 1;
	pageSize2.value = val;
};
const handleCurrentChange2 = (val: number) => {
	pageNo2.value = val;
};
defineExpose({
	tableRef,
	tableRef1,
	tableRef2,
	getContentList
});
</script>

<style scoped lang="scss">
.btnArr {
	margin-bottom: 10px;
}
:deep(.el-table__header .cell) {
	white-space: pre-line !important;
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

.container {
	display: flex;
	gap: 22px;
}

.left-module,
.center-module,
.right-module {
	width: calc((100% - 40px) / 3);
	box-sizing: border-box;
}

:deep(.el-pagination) {
	width: 100%;
	overflow-x: auto;
}
</style>