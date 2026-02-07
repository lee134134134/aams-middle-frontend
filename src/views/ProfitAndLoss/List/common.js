export let data = [
    // {
    //     key: "assetCategory",
    //     name: '资产大类',
    //     width: '150px',
    //     tooltip: true,
    //     align: 'left'
    // },
    {
        key: "assetSubcategory",
        name: '资产细类',
        width: '300px',
        tooltip: true,
        align: 'left',
		fixed:'left'
    },
    {
        key: "interestIncome",
        name: '利息收入',
        width: '150px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "dividendIncome",
        name: '红利收入',
        width: '150px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "priceDiffIncome",
	    name: '价差收入',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "fairValueChangeGainLoss",
	    name: '公允价值变动损益',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "impairmentProvision",
	    name: '减值准备',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "taxesAndOthers",
	    name: '税费及其他',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "accountingProfit",
	    name: '会计收益',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "capitalReserveChangeYearly",
	    name: '当年资本公积变动',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "comprehensiveIncome",
	    name: '综合收益',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "monthlyAccountingProfit",
	    name: '当月会计收益',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "monthlyComprehensiveIncome",
	    name: '当月综合收益',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "avgFundsOccupied",
	    name: '平均资金占用',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "monthlyFundsOccupied",
	    name: '当月资金占用',
	    width: '150px',
	    tooltip: true,
	    align: 'right'
	},
]
export let rule = {
    selectTime: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
	investType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	currencyUnit: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	treeType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
}