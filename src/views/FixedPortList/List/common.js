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
		key: "buyScale",
		name: '买入规模',
		width: '180px',
		align: 'right'
	},
	{
		key: 'buyTerm',
		name: '买入期限',
		width: '180px',
		align: 'right',
	},
	{
		key: 'buyDuration',
		name: '买入久期',
		width: '180px',
		align: 'right',
	},
	{
		key: "buyYield",
		name: '买入收益率',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "sellScale",
		name: '卖出规模',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "sellTerm",
		name: '卖出期限',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "sellYield",
		name: '卖出收益率',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "netScale",
		name: '净买入规模',
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
	startDate: [{
		type: "date",
		required: true,
		message: "",
		trigger: "change",
	}, ],
	endDate: [{
		type: "date",
		required: true,
		message: "",
		trigger: "change",
	}, ],
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

export let ecahrtsData = {
	tooltip: {
		trigger: "axis",
		formatter: function(params) {
			let toolTipStr = params[0].name;
			params.forEach(function(item){
				if(item.seriesName=='中债国债到期收益率' || item.seriesName=='中长期纯债基金收益率'){
					toolTipStr+=
					`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${item.value}%</b></div>`
				}else{
					toolTipStr+=
					`<div style="width:250px;display : flex;justify-content:space-between;"><span>${item.marker}${item.seriesName}</span><b>${new Intl.NumberFormat('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2}).format(item.value)}</b></div>`
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
		name: "单位：亿元",
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
			name: "买入",
			type: "bar",
			itemStyle: {
				color: "#EE6E7B",
			},
			smooth: true,
			data: [],
			barGap: "0%",
			yAxisIndex: 0
		},
		{
			name: "卖出",
			type: "bar",
			itemStyle: {
				color: "#F5BA18",
			},
			smooth: true,
			data: [],
			barGap: "0%",
			yAxisIndex: 0
		},
		{
			name: "净买入",
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
}