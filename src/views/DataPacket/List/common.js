export let data = [
	{
		key: "code",
		name: '统计账套',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
	{
		key: "investType",
		name: '主动/存量风险',
		width: '180px',
		tooltip: true,
		align: 'left'
	},
]
export let rule = {
    dataPacketType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
	queryDate: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	currencyUnit: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
    dataType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
}
