export let data = [
    // {
    //     key: 'assetType',
    //     name: '资产类型',
    //     width: '180px',
    //     align: 'right',
    // },
    {
        key: 'previousAssetBalance',
        name: '上期资产余额（全价）',
        width: '180px',
        align: 'right',
    },
    {
        key: "previousAssetBalanceProportion",
        name: '上期资产余额占比',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "transactionChange",
        name: '交易变动',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "earningsChange",
        name: '收益变动',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "currentAssetBalance",
	    name: '本期资产余额（全价）',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "currentAssetBalanceProportion",
	    name: '本期资产余额占比',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
]

export let rule = {
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