export let data = [
    // {
    //     key: 'assetType',
    //     name: '资产类型',
    //     width: '180px',
    //     align: 'right',
    // },
    {
        key: 'year',
        name: '年度',
        width: '180px',
        align: 'left',
    },
    {
        key: "quarter",
        name: '季度',
        width: '180px',
        tooltip: true,
        align: 'left'
    },
    {
        key: "amount",
        name: '配置额度',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "actualAmount",
        name: '已上账额度',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "leftAmount",
	    name: '剩余额度',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "completeness",
	    name: '配置完成度',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
]

export let rule = {
	insuranceType: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
	year: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
	quarter: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
}