export let tabcolums1 = [
	// {
	// 	key: 'assetType',
	// 	name: '资产类型',
	// 	width: '180px',
	// 	align: 'right',
	// },
	{
		key: 'marketValue',
		name: '市值',
		width: '180px',
		align: 'right',
	},
	{
		key: "floatingProfitLossTotal",
		name: '浮盈亏合计',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "floatingProfitTotal",
		name: '浮盈合计',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "floatingProfitAssetSize",
		name: '浮盈资产规模',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "floatingLossTotal",
		name: '浮亏合计',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "floatingLossAssetSize",
		name: '浮亏资产规模',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
]

export let tabcolums2 = [
	{
		key: 'secuName',
		name: '名称',
		width: '280px',
		align: 'left',
		fixed: 'left',
		tooltip: true,
	},
	{
		key: 'amount',
		name: '数量（亿股）',
		width: '180px',
		align: 'right',
		tooltip: true,
		sortable: true,
	},
	{
		key: "costPerShare",
		name: '每股成本（元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
	{
		key: "marketPrice",
		name: '市价（元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
	{
		key: "totalCost",
		name: '成本（亿元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
	{
		key: "marketValue",
		name: '市值（亿元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
	{
		key: "floatingProfitLoss",
		name: '浮盈亏（亿元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
	{
		key: "floatingProfitLossRate",
		name: '浮盈亏率',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: true,
	},
]


export const rule = {
	startTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	endTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	selectTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	queryDate: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	currencyUnit: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	investType: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	treeType: [
		{ required: true, message: '', trigger: ['blur', 'change'] },
	],
}