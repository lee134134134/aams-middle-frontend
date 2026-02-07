<template>
	<el-table v-loading="isLoading" :max-height="tableHeight" empty-text="暂无数据" :data="tableData" border
		style="width: 100%" ref="tableRef" :header-cell-style="{
			background: '#E4EFFF',
			color: '#333333',
			height: '38px',
		}" :row-style="handleRowStyle" stripe>
		<el-table-column v-for="(item, i) in tabcolums1" :key="i" :prop="item.key" :label="item.name" :align="item.align"
			:fixed="item.fixed" show-overflow-tooltip>
		</el-table-column>
		<template #empty>
			<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
				<img src="../../../assets/images/empty.png" style="height:200px;" />
				<div>暂无数据</div>
			</div>
		</template>
		<el-table-column fixed="right" label="操作" align="center">
			<template #default="scope">
				<el-button type="text" plain size="small" @click="handelClick(scope.row)"
					data-track-id="WeeklyReport-download-btn" data-track-name="资产配置部周报-下载">下载</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination v-model:current-page="formInline.pageNo" v-model:page-size="formInline.pageSize"
		:page-sizes="[10, 20, 30, 50, 100]" layout="->, total,jumper,prev, pager, next, sizes" :total="total" background
		popper-class="select_bottom" data-track-id="WeeklyReport-pagination-btn" data-track-name="资产配置部周报-分页"
		@size-change="handleSizeChange" @current-change="handleCurrentChange" />

	<v-chart v-show="false" ref="echartsRef" id="echartsRefId" style="width: 800px;height: 500px;" :option="option"
		autoresize></v-chart>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import { tabcolums1 } from "./common.js";
import { getList, handleFillAndDownload } from "@/api/WeeklyReport.js";
import VChart from 'vue-echarts';
import { ElMessage, ElMessageBox } from "element-plus";

const tableHeight = ref(window.innerHeight - 300);

const tableRef = ref<TableInstance>();
// 表格数据
const props = defineProps({
	formInline: {
		type: Object,
		default: {},
	},
	selfAcountArr: {
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
	reportDate: '',
	pageSize: 10,
	pageNo: 1,
});


let isLoading = ref(false);
const tableData = ref([]);
const total = ref(0);
// 获取列表数据
let getContentList = async (obj: any, val?: any) => {
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

// 分页
const handleSizeChange = async (val: number) => {
	formInline.value.pageNo = 1;
	await getContentList({
		...formInline.value,
		selfAcountTree: props.selfAcountArr,
		pageSize: val,
	});
};
const handleCurrentChange = async (val: number) => {
	await getContentList({
		...formInline.value,
		selfAcountTree: props.selfAcountArr,
		pageNo: val,
	});
};


let option = ref({
	animation: false,
	title: {
		text: '交易盘债券久期',
		left: 'center'
	},
	grid: {
		left: '70', // 左边的宽度
		right: '80', // 右边的宽度
		bottom: '80',
		top: '80',
		containLabel: false
	},
	tooltip: {
		trigger: 'axis',
		confine: true,
		extraCssText: 'max-height:400px;overflow:auto;',
		enterable: true,
		order: 'valueDesc'
	},
	legend: {
		data: [],
		// type: 'scroll',
		width: "90%",
		// bottom: '0px',
		top: '35px',
		textStyle: {
			lineHeight: 16
		},
		itemStyle: {
			opacity: 0
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: [],
		axisLabel: { rotate: 40 },
		axisTick: {
			alignWithLabel: true, // 使得刻度线和标签对齐
		},
	},
	yAxis: [
		{
			type: 'value',
			position: 'left',
			name: '单位：年',
			// alignTicks: true,
			min: 'dataMin',
			max: 'dataMax',
			axisLabel: {
				formatter: function (value: any) {
					return value.toFixed(1)
				}
			}
		},
		{
			type: 'value',
			position: 'right',
			name: '单位：%',
			// alignTicks: true,
			min: 'dataMin',
			max: 'dataMax',
			axisLabel: {
				formatter: function (value: any) {
					return value.toFixed(2)
				}
			}
		},
	],
	color: ['#4cc799', '#4c87e1',],
	series: [
		{
			name: '',
			type: 'line',
			yAxisIndex: 0,
			data: [],
			symbol: 'none'
		},
		{
			name: '',
			type: 'line',
			yAxisIndex: 1,
			data: [],
			symbol: 'none'
		},
	]
});

let echartsRef = ref(null);
let echarsImg = ref('')

const handelClick = async (val) => {
	option.value.xAxis.data = val.reportData ? JSON.parse(val.reportData).xaxis : []
	option.value.legend.data = val.reportData ? JSON.parse(val.reportData).legend : []
	option.value.series[0].data = val.reportData ? JSON.parse(val.reportData).series[0].data : []
	option.value.series[0].name = val.reportData ? JSON.parse(val.reportData).series[0].name : ''
	option.value.series[1].data = val.reportData ? JSON.parse(val.reportData).series[1].data : []
	option.value.series[1].name = val.reportData ? JSON.parse(val.reportData).series[1].name : ''
	console.log(option.value)
	await nextTick()
	if (echartsRef.value && echartsRef.value.chart) {
		const chartInstance = echartsRef.value.chart
		const base64Data = chartInstance.getDataURL({
			type: 'png',
			backgroundColor: '#fff'
		})
		// console.log(base64Data)
		let str = `数据使用提示：<br/>相关数据严格按照业务需求逻辑进行加工，请务必结合使用场景确认数据准确性后使用。`
		ElMessageBox.confirm(str, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
			confirmButtonClass: "confirm-btn",
			cancelButtonClass: "confirm-btn",
			dangerouslyUseHTMLString: true
		}).then(({ value }) => {
			handleFillAndDownload({
				fileCode: val.fileCode,
				base64: base64Data.replaceAll('data:image/png;base64,', '')
			}).then(res => {
				console.log(res)
			})
		}).catch((error) => {
			ElMessage({
				type: "info",
				message: `取消导出`,
			});
		});

	} else {
		ElMessage({
			message: "图例数据未找到",
			type: "error",
		});
	}
}


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