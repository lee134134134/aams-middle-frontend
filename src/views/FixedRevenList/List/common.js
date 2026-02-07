export let data = [
	// {
	//     key: "investManager",
	//     name: '投资经理',
	//     width: '180px',
	//     tooltip: true,
	//     align: 'left',
	//     fixed: 'left'
	// },
	{
		key: "portfolioScale",
		name: '期末规模',
		width: '180px',
		align: 'right'
	},
	{
		key: 'proportion',
		name: '规模占比',
		width: '180px',
		align: 'right',
	},
	{
		key: 'marketValueYtm',
		name: '估值YTM',
		width: '180px',
		align: 'right',
	},
	{
		key: "costYtm",
		name: '成本YTM',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "remainingTerm",
		name: '剩余期限',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "bondDuration",
		name: '债券久期',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "accountingIncome",
		name: '会计收益额',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "accountingIncomeYield",
		name: '会计收益率',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "comprehensiveIncome",
		name: '综合收益额',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "comprehensiveIncomeYield",
		name: '综合收益率',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "interestIncome",
		name: '利息收入',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "dividendIncome",
		name: '红利收入',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "spreadIncome",
		name: '价差收入',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "fairValueChange",
		name: '公允价值变动损益',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "capitalReserve",
		name: '资本公积变动',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "floatingProfitAndLoss",
		name: '浮盈亏',
		width: '180px',
		tooltip: true,
		align: 'right'
	},

]
export function sort(n, m) {
	if (n === "roadshowDate") {
		if (m === 'descending') {
			return 'ROADSHOW_DATE desc'
		} else if (m === "ascending") {
			return "ROADSHOW_DATE asc"
		} else {
			return ''
		}
	} else {
		return ''
	}
}

export let rule = {
	selectTime: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
	investType: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
	currencyUnit: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
	treeType: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
}

export let ecahrtsArr = {
	data1: {
		tooltip: {
			trigger: 'item',
			formatter: function(param) {
				return param.marker + " " + param.name + " : " +
					param.value + "%";
			}
		},
		legend: {
			type: 'scroll',
			pageIconSize: 12,
			orient: 'vertical', // 图例列表的布局朝向，'horizontal'为水平,'vertical'为垂直
			icon: 'circle',
			right: '10%', // 图例组件离容器左侧的距离
			top: '10%',
			height: '270',
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
			formatter: function(name) {
				var data = ecahrtsArr.data1.series[0].data;
				for (var i = 0; i < data.length; i++) {
					if (data[i].name == name) {
						name = name.length > 15 ? name.substring(0,
							15) + '...' : name;
						return `{a|${name}}  {b|${data[i].value}%}`;
					}
				}
			},
		},
		series: [{
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['30%', '50%'],
			data: [],
			label: {
				show: false,
			},
			itemStyle: {
				borderWidth: 3, // 饼图之间的间距
				borderColor: '#ffffff', // 分隔颜色
			},
			color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
				'#FD7B03', '#0F9888', '#7DB542'
			]
		}],
		title: {}
	},
	data2: {
		tooltip: {
			trigger: 'item',
			formatter: function(param) {
				return param.marker + " " + param.name + " : " +
					param.value + "%";
			}
		},
		legend: {
			type: 'scroll',
			pageIconSize: 12,
			orient: 'vertical', // 图例列表的布局朝向，'horizontal'为水平,'vertical'为垂直
			icon: 'circle',
			right: '10%', // 图例组件离容器左侧的距离 
			top: '10%',
			height: '270',
			tooltip: {
				show: true, // 设置图例鼠标移入时显示工具提示
				trigger: 'item',
			},
			textStyle: {
				rich: {
					a: {
						align: "left",
						width: 100
					},
					b: {
						align: "right",
						fontWeight: "bold",
						width: 80
					}
				}
			},
			formatter: function(name) {
				var data = ecahrtsArr.data2.series[0].data;
				if (!data.length) {
					return '';
				}
				for (var i = 0; i < data.length; i++) {
					if (data[i].name == name) {
						name = name.length > 7 ? name.substring(0,
							7) + '...' : name;
						return `{a|${name}}  {b|${data[i].value}%}`;
					}
				}
			},
		},
		series: [{
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['30%', '50%'],
			data: [],
			label: {
				show: false,
			},
			itemStyle: {
				borderWidth: 3, // 饼图之间的间距
				borderColor: '#ffffff', // 分隔颜色
			},
			color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
				'#FD7B03', '#0F9888', '#7DB542'
			]
		}],
		title: {}
	},
	data3: {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: function(param) {
				return param[0].marker + " " + param[0].name + " : " +
					param[0].value + "%";
			}
		},
		grid: {
			left: '50', // 左边的宽度
			right: '20', // 右边的宽度
			containLabel: false
		},
		xAxis: {
			type: 'category',
			data: [],
			axisLabel: {
				rotate: 45
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value}%'
			}
		},
		series: [{
			type: 'bar',
			data: [],
			barWidth: 40,
			// itemStyle: {
			// 	normal: {
			// 		barBorderRadius: [100, 100, 0, 0],
			// 		color:'#19d68c',
			// 	}
			// }
			color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
				'#FD7B03', '#0F9888', '#7DB542'
			],
			label: {
				show: true,
				position: 'top',
				formatter: '{c}%'
			}
		}, ],
		title: {}

	},
	data4: {
		tooltip: {
			trigger: "axis",
			formatter: function(params) {
				let toolTipStr = params[0].name;
				params.forEach(function(item) {
					if (item.seriesName == '中债国债到期收益率' || item.seriesName == '中长期纯债基金收益率') {
						toolTipStr +=
							`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`
					} else {
						toolTipStr +=
							`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}</b></div>`
					}
				})
				return toolTipStr;
			}
		},
		xAxis: {
			type: "category",
			data: [],
			axisTick: {
				alignWithLabel: true, // 使得刻度线和标签对齐
			},
		},
		yAxis: [{
				type: "value",
				name: "单位：年",
				position: "left",
			},
			{
				type: 'value',
				position: 'right',
				name: '单位：%',
				min: 'dataMin',
				max: 'dataMax',
			},
		],
		dataZoom: [{
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
		grid: {
			// top: '50px',
			left: '60',
			// bottom: '50px',
			right: '80',
			containLabel: false
		},
		color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
			'#FD7B03', '#0F9888', '#7DB542'
		],
		series: [{
				name: "久期历史波动",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 0
			},
			{
				name: "中债国债到期收益率",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 1
			},
			{
				name: "中长期纯债基金收益率",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 1
			},
		],
	},
	data5: {
		tooltip: {
			trigger: "axis",
			formatter: function(params) {
				let toolTipStr = params[0].name;
				params.forEach(function(item) {
					if (item.seriesName == '中债国债到期收益率' || item.seriesName == '中长期纯债基金收益率') {
						toolTipStr +=
							`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`
					} else {
						toolTipStr +=
							`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`
					}
				})
				return toolTipStr;
			}
		},
		xAxis: {
			type: "category",
			data: [],
			axisTick: {
				alignWithLabel: true, // 使得刻度线和标签对齐
			},
		},
		yAxis: [{
				type: "value",
				name: "单位：%",
				position: "left",
			},
			{
				type: 'value',
				position: 'right',
				name: '单位：%',
				min: 'dataMin',
				max: 'dataMax',
			},
		],
		dataZoom: [{
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
		grid: {
			// top: '50px',
			left: '60',
			// bottom: '50px',
			right: '80',
			containLabel: false
		},
		color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
			'#FD7B03', '#0F9888', '#7DB542'
		],
		series: [{
				name: "时间加权收益率",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 0
			},
			{
				name: "中债国债到期收益率",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 1
			},
			{
				name: "中长期纯债基金收益率",
				type: "line",
				symbol: "none",
				smooth: true,
				data: [],
				yAxisIndex: 1
			},
		],
	},
	data6: {
		tooltip: {
			trigger: "axis",
			formatter: function(params) {
				let toolTipStr = params[0].name;
				params.forEach(function(item) {
					toolTipStr +=
						`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`

				})
				return toolTipStr;
			}
		},
		xAxis: {
			type: "category",
			data: [],
			axisTick: {
				alignWithLabel: true, // 使得刻度线和标签对齐
			},
		},
		yAxis: {
			type: "value",
			name: "单位：%",
			position: "left",
		},
		grid: {
			// top: '50px',
			left: '50',
			// bottom: '50px',
			right: '50',
			containLabel: false
		},
		color: ['#2173F7', '#00D17F', '#22CCFF', '#9A51FC', '#FF4547', '#259DFF', '#AD85F7',
			'#FD7B03', '#0F9888', '#7DB542'
		],
		series: [{
			name: "久期分布",
			type: "line",
			symbol: "none",
			smooth: true,
			data: [],
		}, ],
	}
}