<template>
	<div class="echartsBox">
		<v-chart :style="{width: '100%',height: echartsH+'px'}" v-loading="isLoading" :option="option1"
			autoresize></v-chart>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, reactive, onUnmounted, watch } from "vue";
	import { querylist, echartsExport } from "@/api/AssetsAllDepart.js";
	import VChart from 'vue-echarts';
	let isLoading = ref(false);
	
	let echartsH = ref(window.innerHeight - 270);
	let option1 = ref({})
	const option = reactive({
		color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7', '#FD7B03', '#0F9888', '#7DB542'],
		title: {
			text: '流动性资产占比对比图',
			left: 'center'
		},
		grid: {
			left: '30', // 左边的宽度
			right: '50', // 右边的宽度
			containLabel: false
		},
		
		legend: {
			left: "right",
			data: ["资配", "公司"],
		},
		xAxis: {
			type: "category",
			data: [],
			axisLabel: {
				interval: "auto",
			},
			name:'日期',
			axisTick: {
				alignWithLabel: true, // 使得刻度线和标签对齐
			},
		},
		yAxis: [
			{
				type: "value",
				name: "占比%",
				position: "left",
			},
		],
		series: [
			{
				name: "资配",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				barGap: "0%",
			},
			{
				name: "公司",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				barGap: "0%",
			},
		],
		tooltip: {
			trigger: 'axis',
			formatter: function (params:any) {
				// params 是一个数组，包含了多个折线图数据
				let result = params[0].name + '<br/>';
				params.forEach(function (item:any) {
					// item 是每一个系列的数据信息
					result +=
						`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`
				});
				return result;
			}
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 100,
				height: 12,
				bottom: 15
			},
			{
				type: 'slider',
				start: 0,
				end: 100,
				height: 12,
				bottom: 15
			}
		],
	});
	// 获取列表数据
	let getEchartsList = async (obj : any) => {
		isLoading.value = true;
		let res = await querylist(obj);
		isLoading.value = false;
		if (res && res.code === '00000') {
			if (res.data.companyProportion && res.data.companyProportion.length > 0) {
				option.series[0].data = res.data.assetAllocationProportion;
				option.series[1].data = res.data.companyProportion;
				option.xAxis.data = res.data.date;
			} else {
				option.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option.series[0].data = [];
				option.series[1].data = [];
				option.xAxis.data = [];
			}
		}
		option1.value = JSON.parse(JSON.stringify(option))
	};
	defineExpose({
		getEchartsList,
	});
</script>

<style lang="scss" scoped>
	.echartsBox {
		padding: 0px 50px;
		box-sizing: border-box;
		margin-top: 50px;
	}

	.el-button-group .el-button {
		width: 48px;
		height: 26px;
		font-size: 12px;
	}

	.el-button-group {
		position: absolute;
		right: 16px;
		top: 15px;
	}

	.el-button--primary {
		--el-button-bg-color: #2272f7 !important
	}
</style>