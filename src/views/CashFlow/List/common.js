export let data = [
  //   {
  //       key: "accountName",
  //       name: '险种',
  //       width: '180px',
  //       align: 'right',
		// fixed: 'left'
  //   },
    {
        key: 'hxIn',
        name: '华夏转入',
        width: '180px',
        align: 'right',
    },
    {
        key: "hxOut",
        name: '华夏转出',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "hxTotal",
        name: '华夏合计',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "rzIn",
	    name: '瑞众转入',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "rzOut",
	    name: '瑞众转出',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "rzTotal",
	    name: '瑞众合计',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "totalIn",
	    name: '转入合计',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "totalOut",
	    name: '转出合计',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "grandTotal",
	    name: '总计',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
]
export let data1 = [
	{
		key: 'serialNumber',
		name: '序号',
		width: '60px',
		align: 'left',
	},
    {
        key: 'transactionDate',
        name: '发生日期',
        width: '180px',
        align: 'left',
    },
    {
        key: 'insuranceType',
        name: '子账户',
        width: '180px',
        align: 'left',
    },
    {
        key: "company",
        name: '公司',
        width: '180px',
        tooltip: true,
        align: 'left'
    },
    {
        key: "accountType",
        name: '新/老账户',
        width: '180px',
        tooltip: true,
        align: 'left'
    },
    {
        key: "transactionDirection",
        name: '方向',
        width: '180px',
        tooltip: true,
        align: 'left'
    },
	{
	    key: "transactionAmount",
	    name: '发生金额',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "netCashFlow",
	    name: '净现金流',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "category",
	    name: '分类',
	    width: '180px',
	    tooltip: true,
	    align: 'left'
	},
	{
	    key: "remark",
	    name: '备注',
	    width: '180px',
	    tooltip: true,
	    align: 'left'
	},
]
export let rule = {
    insuranceType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
    startDate: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
	endDate: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	company: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	accountType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
	businessType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
    currencyUnit: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
}
