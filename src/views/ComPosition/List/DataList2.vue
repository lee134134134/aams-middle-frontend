<template>
	<div class="container">
		<el-table class="left-module" v-loading="isLoading" ref="tableRef"  show-overflow-tooltip empty-text="请输入查询条件并点击查询"
        :max-height="tableHeight" :data="tableData" :row-key="getRowKey" :header-cell-style="{
            background: '#E4EFFF',
            color: '#333333',
            height: '38px',
        }" border :tree-props="{ children: 'children' }" :expand-row-kes="expandedKeys"
        :row-class-name="setRowClassName" :row-style="handleRowStyle">
			<el-table-column prop="assetType" label="资产类型" min-width="180" show-overflow-tooltip align="left" fixed="left">
            <template #default="{ row }">
                <span>
                    {{ row.assetType }}
                </span>
            </template>
        </el-table-column>
        <el-table-column v-for="(item, i) in tabcolums2" :key="item.key" :prop="item.key" :label="item.name"
            :min-width="item.width" show-overflow-tooltip :align="item.align" :resizable="false" :fixed="item.fixed">
        </el-table-column>
        <template #empty>
            <div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
                <img src="../../../assets/images/empty.png" style="height:200px;" />
                <div>请输入查询条件并点击查询</div>
            </div>
        </template>
		</el-table>
		<div class="right-module">
			<div class="echartsBox">
				<Title class="top-10" title="资产占比"></Title>
				<v-chart style="height: 450px;width: 100%;" v-loading="isLoading" :option="option1" autoresize></v-chart>
			</div>
			
			<div class="echartsBox">
				<Title class="top-10" title="股票+基金"></Title>
				<v-chart style="height: 450px;width: 100%;" v-loading="isLoading" :option="option2" autoresize></v-chart>
			</div>
			<div class="echartsBox">
				<Title class="top-10" title="A股行业"></Title>
				<v-chart style="height: 450px;width: 100%;" v-loading="isLoading" :option="option3" autoresize></v-chart>
			</div>
			
			<div class="echartsBox">
				<Title class="top-10" title="H股行业"></Title>
				<v-chart style="height: 450px;width: 100%;" v-loading="isLoading" :option="option4" autoresize></v-chart>
			</div>
			
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { getPageList } from "@/api/ComPosition.js";
import { tabcolums2 } from "./common.js";
import Title from "@/components/Title.vue";
import VChart from 'vue-echarts';
const emit = defineEmits(['changeLoading'])
import _ from "lodash"
const isLoading = ref(false)
const tableData = ref([])
const expandedKeys = ref([] as any)
let getRowKey = (row: any) => {
	return row.assetTypePath;
};
const tableRef = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 280);
// 表格数据
const props = defineProps({
	downloadBool: {
		type: Boolean,
		default: true,
	}
});
const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
    if (row.level === 0 && row.assetTypePath === '合计') {
        return { fontWeight: 'bold', color: '#2173f7' }
    } else if (row.level === 0 || (row.level === 1 && (row.children.length !== 0 || row.assetType === '其他'))) {
		return { fontWeight: 'bold', color: '#666' }
    } else {
        return { color: '#666' }
    }
}

const setRowClassName = ({ row, rowIndex }) => {
    if (row.level === 0) {
        if (row.assetTypePath !== '合计') {
            return 'changeClass11'
        }
    } else if (row.level === 1 && (row.children.length !== 0 || row.assetType === '其他')) {
        return 'changeClass22'
    }
    return ''
}
const option1 = ref({})
const option2 = ref({})
const option3 = ref({})
const option4 = ref({})
const option = ref({
	graphic: [
		{
			type: 'text',
			right: '20px',
			top: '120px',
			textAlign: 'left',
			style: {
				text: '',
				fill: "#333",
				fontSize: 12
			}
		}
	],
	tooltip: {
		trigger: 'item',
		formatter: function (param) {
			return `${param.marker}${param.name} : ${new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(param.value)}%`;
		}
	},
	legend: {
		type: 'scroll',
		pageIconSize: 12,
		orient: 'vertical', // 图例列表的布局朝向，'horizontal'为水平,'vertical'为垂直
		// icon: 'circle',
		right: '20px', // 图例组件离容器左侧的距离
		top: '40px',
		height: '260',
		data: [],
		tooltip: {
			show: true, // 设置图例鼠标移入时显示工具提示
			trigger: 'item',
		},
		textStyle: {
			rich: {
				a: {
					align: "left",
					width: 150
				},
				b: {
					align: "right",
					fontWeight: "bold",
					width: 80
				}
			}
		},
	},
	series: [{
		type: 'pie',
		center: ['35%', '45%'],
		radius: ['0%', '45%'],
		data: [],
		label: {
			show: true,
		},
		labelLine: {
			show: true
		},
		color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7', '#FD7B03', '#0F9888', '#7DB542']
	}],
	title: {
		// text: '资产占比',
		left: 'center'
	}
})
let getContentList = async (obj: any) => {
	isLoading.value = true;
	emit('changeLoading', true)
	let res = await getPageList(obj).catch(() => {
		isLoading.value = false;
	    emit('changeLoading', false)
	});
	isLoading.value = false;
	emit('changeLoading', false)
	if (res && res.code === '00000') {
		tableData.value = res.data.assetPosition
		expandedKeys.value = tableData.value.filter(el => el.children.length).map(item => item.assetType)
		nextTick(() => {
            tableData.value.forEach(el => {
                if (el.level == 0 || el.level == 1) {
                    tableRef.value?.toggleRowExpansion(el, true)
                }
            })
        })
		// 资产占比
		option1.value = _.cloneDeep(option.value);
		if (res.data && res.data.assetProportion.length > 0) {
			let option1Data = []
			let option1SeriesData = []
			res.data.assetProportion.map(item => {
				option1Data.push(item.assetType)
				option1SeriesData.push({
					name: item.assetType,
					value: item.endBalanceRatioNumQuery,
				})
			})
			option1.value.graphic[0].style.text = `杠杆: ${res.data.assetProportionLever.endBalanceRatio}`
			// option1.value.title.text = '资产占比'
			option1.value.legend.data = option1Data
			option1.value.series[0].data = option1SeriesData
		} else {
			option1.value.title = {
				text: '暂无数据',
				x: 'center',
				y: 'center',
			};
			option1.value.series[0].data = [];
		}
		// 股票+基金
		option2.value = _.cloneDeep(option.value);
		if (res.data && res.data.assetProportionStockAndFund.length > 0) {
			let option2Data = []
			let option2SeriesData = []
			res.data.assetProportionStockAndFund.map(item => {
				option2Data.push(item.assetType)
				option2SeriesData.push({
					name: item.assetType,
					value: item.endBalanceRatioNumQuery,
				})
			})
			// option2.value.title.text = '股票+基金'
			option2.value.legend.data = option2Data
			option2.value.series[0].data = option2SeriesData
		} else {
			option2.value.title = {
				text: '暂无数据',
				x: 'center',
				y: 'center',
			};
			option2.value.series[0].data = [];
		}
		// A股
		option3.value = _.cloneDeep(option.value);
		if (res.data && res.data.assetProportionStockIndustryA.length > 0) {
			let option3Data = []
			let option3SeriesData = []
			res.data.assetProportionStockIndustryA.map(item => {
				option3Data.push(item.assetType)
				option3SeriesData.push({
					name: item.assetType,
					value: item.endBalanceRatioNumQuery,
				})
			})
			// option3.value.title.text = 'A股行业'
			option3.value.legend.data = option3Data
			option3.value.series[0].data = option3SeriesData
		} else {
			option3.value.title = {
				text: '暂无数据',
				x: 'center',
				y: 'center',
			};
			option3.value.series[0].data = [];
		}
		// H股
		option4.value = _.cloneDeep(option.value);
		if (res.data && res.data.assetProportionStockIndustryH.length > 0) {
			let option4Data = []
			let option4SeriesData = []
			res.data.assetProportionStockIndustryH.map(item => {
				option4Data.push(item.assetType)
				option4SeriesData.push({
					name: item.assetType,
					value: item.endBalanceRatioNumQuery,
				})
			})
			// option4.value.title.text = 'H股行业'
			option4.value.legend.data = option4Data
			option4.value.series[0].data = option4SeriesData
		} else {
			option4.value.title = {
				text: '暂无数据',
				x: 'center',
				y: 'center',
			};
			option4.value.series[0].data = [];
		}
	}
}

defineExpose({
	tableRef,
	getContentList
});
</script>

<style scoped lang="scss">
.upload-demo {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	display: flex;
}

.left-module {
	width: 32%;
	margin-right: 16px;
}

.right-module {
	width: 68%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
	background-color: #f2f7ff;
	padding: 16px;
}

.right-module .echartsBox {
	background-color: #fff;
	padding: 16px;
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

:deep(.el-table tr.changeClass11) {
    background-color: #f2f7ff !important;
}

:deep(.el-table tr.changeClass22) {
    background-color: #fafafa !important;
}
:deep(.el-table__body tr:last-child .cell) {
	color: #2173F7 !important;
	font-weight: bold;
}
</style>