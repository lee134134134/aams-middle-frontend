export let data = [
    // {
    //     key: 'assetType',
    //     name: '资产类型',
    //     width: '180px',
    //     align: 'right',
    // },
    {
        key: 'endBalance',
        name: '资产余额（全价）',
        width: '180px',
        align: 'right',
    },
    {
        key: "endBalanceRatio",
        name: '资产占比',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "accountingIncome",
        name: '会计收益',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "comprehensiveIncome",
        name: '综合收益',
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
	    key: "comprehensiveIncomeYield",
	    name: '综合收益率',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
]

export let rule = {
	queryDate: [{
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