export let data = [
	{
		key: "code",
		name: '代码',
		width: '180px',
		tooltip: true,
		align: 'left',
		fixed: 'left'
	},
	{
		key: "name",
		name: '名称',
		width: '220px',
		tooltip: true,
		fixed: 'left'
	},
	{
		key: "accountingCategory",
		name: '会计分类',
		width: '180px',
		tooltip: true,
	},
	{
		key: "holdingQuantity",
		name: '持仓数量（万）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "bookCost",
		name: '账面成本（亿元）',
		width: '200px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "bookValue",
		name: '账面市值（亿元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "individualCost",
		name: '个股成本（元）',
		width: '200px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "pricePerShare",
		name: '每股单价（元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "floatingProfitLoss",
		name: '浮动盈亏（万元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "accountingProfit",
		name: '会计收益（万元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "comprehensiveProfit",
		name: '综合收益（万元）',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "accountingYield",
		name: '会计收益率',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "comprehensiveYield",
		name: '综合收益率',
		width: '180px',
		tooltip: true,
		align: 'right',
		sortable: 'custom',
	},
	{
		key: "account",
		name: '账户',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "subAccount",
		name: '子账户',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "individualCostByFund",
		name: '个股成本（元，基金层）',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "priceDifferenceIncome",
		name: '价差收入（万元，调整）',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "accountingProfitAdjust",
		name: '会计收益（万元，调整）',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "accountingYieldAdjust",
		name: '会计收益率（调整）',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "averageCapitalOccupied",
		name: '平均资产占用（亿元）',
		width: '200px',
		tooltip: true,
		align: 'left',
		sortable: 'custom'
	},
	{
		key: "industryName",
		name: '申万一级行业',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "industryNameI",
		name: '申万二级行业',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "typeNameI",
		name: '证券二级分类',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
]
export let rule = {
	// selectTime: [
	// 	{ required: true, message: '', trigger: ['blur', 'change'] },
	// ],
	// investType: [
	// 	{ required: true, message: '', trigger: ['blur', 'change'] },
	// ],
	// currencyUnit: [
	// 	{ required: true, message: '', trigger: ['blur', 'change'] },
	// ],
}

export let tabcolums2 = [
// 	{
// 	key: "assetType",
// 	name: '资产类型',
// 	// width: '80px',
// 	sortable: false,
// 	align: 'left'
// },
{
	key: "endBalance",
	name: '余额',
	width: '200px',
	sortable: false,
	align: 'right'
},
{
	key: "endBalanceRatio",
	name: '余额占比',
	// width: '220px',
	sortable: false,
	align: 'right'
}
]

export let tabcolums3 = [{
	key: "industryName",
	name: '行业',
	// width: '80px',
	sortable: false,
	align: 'left'
},
{
	key: "marketValue",
	name: '市值',
	// width: '50px',
	sortable: false,
	align: 'right'
},
{
	key: 'a1',
	name: '浮盈',
	align: 'center',
	child: [{
		key: "floatingProfitByA",
		name: 'A股',
		// width: '220px',
		sortable: false,
		align: 'right'
	},
	{
		key: "floatingProfitByH",
		name: 'H股',
		// width: '220px',
		sortable: false,
		align: 'right'
	},]
},
{
	key: 'a2',
	name: '浮亏',
	align: 'center',
	child: [{
		key: "floatingLossByA",
		name: 'A股',
		// width: '50px',
		sortable: false,
		align: 'right'
	},
	{
		key: "floatingLossByH",
		name: 'H股',
		// width: '50px',
		sortable: false,
		align: 'right'
	}
	]
},
{
	key: 'a3',
	name: '净浮盈',
	align: 'center',
	child: [{
		key: "netFloatingProfitByA",
		name: 'A股',
		// width: '220px',
		sortable: false,
		align: 'right'
	},
	{
		key: "netFloatingProfitByH",
		name: 'H股',
		// width: '220px',
		sortable: false,
		align: 'right'
	}]
}
]

export let tabcolums4 = [{
	key: "fundType",
	name: '基金类型',
	// width: '80px',
	sortable: false,
	align: 'left'
},
{
	key: "marketValue",
	name: '市值',
	// width: '50px',
	sortable: false,
	align: 'right'
},
{
	key: "floatingProfit",
	name: '浮盈',
	// width: '220px',
	sortable: false,
	align: 'right'
},
{
	key: "floatingLoss",
	name: '浮亏',
	// width: '220px',
	sortable: false,
	align: 'right'
},
{
	key: "netFloatingProfit",
	name: '净浮盈',
	// width: '220px',
	sortable: false,
	align: 'right'
}
]

export let tabcolums5 = [{
	key: "rank",
	name: '股票\n占比排名',
	width: '85px',
	sortable: false,
	align: 'left'
},
{
	key: "secuId",
	name: '证券代码',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "secuName",
	name: '证券名称',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "endBalanceRatio",
	name: '余额占比',
	width: '100px',
	sortable: false,
	align: 'right'
},
{
	key: "endBalanceRatioTotal",
	name: '累计\n余额占比',
	width: '85px',
	sortable: false,
	align: 'right'
}
]

export let tabcolums6 = [{
	key: "rank",
	name: '基金\n占比排名',
	width: '85px',
	sortable: false,
	align: 'left'
},
{
	key: "secuId",
	name: '证券代码',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "secuName",
	name: '证券名称',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "endBalanceRatio",
	name: '余额占比',
	width: '100px',
	sortable: false,
	align: 'right'
},
{
	key: "endBalanceRatioTotal",
	name: '累计\n余额占比',
	width: '85px',
	sortable: false,
	align: 'right'
}
]

export let tabcolums7 = [{
	key: "rank",
	name: '行业\n占比排名',
	width: '85px',
	sortable: false,
	align: 'left'
},
{
	key: "marketName",
	name: '市场',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "industryName",
	name: '行业',
	width: '160px',
	sortable: false,
	align: 'left'
},
{
	key: "endBalanceRatio",
	name: '余额占比',
	width: '100px',
	sortable: false,
	align: 'right'
},
{
	key: "endBalanceRatioTotal",
	name: '累计\n余额占比',
	width: '85px',
	sortable: false,
	align: 'right'
}
]