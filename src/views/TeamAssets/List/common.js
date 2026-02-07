export let tabcolums1 = [{
	key: "businessDate",
	name: '日期',
	width: '150px',
	sortable: false,
	fixed: 'left'
},
{
	key: "fullPriceMarketValue",
	name: '全价市值',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "dailyAccountingProfit",
	name: '会计收益',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "dailyComprehensiveProfit",
	name: '综合收益',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "activeBuyQuantity",
	name: '买入数量',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "activeBuyTransactionAmount",
	name: '买入成交金额',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "activeSellQuantity",
	name: '卖出数量',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "activeSellTransactionAmount",
	name: '卖出成交金额',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "transactionBuyQuantity",
	name: '交易买入数量',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "transactionBuyAmount",
	name: '交易买入金额',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "transactionSellQuantity",
	name: '交易卖出数量',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "transactionSellAmount",
	name: '交易卖出金额',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "netCashInflowPeriod",
	name: '期间资金净流入',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "interestExpense",
	name: '利息支出',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "interestIncome",
	name: '利息收入',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "dividendIncome",
	name: '红利收入',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "spreadIncome",
	name: '价差收入',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "impairmentLoss",
	name: '减值准备损失',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "capitalReserve",
	name: '资本公积',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "transactionFee",
	name: '交易费用',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "otherIncomeExpenses",
	name: '其他收支',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "foreignExchangeGainLoss",
	name: '汇兑损益',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "fairValueChangeProfitLoss",
	name: '公允价值变动损益',
	width: '180px',
	sortable: false,
	align: 'right'
},

{
	key: "floatingProfitLoss",
	name: '浮动盈亏',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "averageCapitalOccupancy",
	name: '平均资金占用',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "dailyReturnRate",
	name: '当日收益率',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "convexity",
	name: '凸性',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "duration",
	name: '修正久期',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "financialCost",
	name: '财务成本',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "bookCost",
	name: '账面成本',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "bookBalance",
	name: '账面余额',
	width: '180px',
	sortable: false,
	align: 'right'
},
]
export const rule = {
	startDate: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	endDate: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],

	assetType: [
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
	assetsType: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	dataType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	treeType: [
		{ required: true, message: '', trigger: ['blur', 'change'] },
	],
	investType: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	},],
}
