export let data = [
  //   {
  //       key: "accountName",
  //       name: '受托子账户',
  //       width: '180px',
  //       align: 'right',
		// fixed: 'left'
  //   },
    {
        key: 'cash',
        name: '现金',
        width: '180px',
        align: 'right',
    },
    {
        key: 'reserveRepoCurrent',
        name: '逆回购（当月）',
        width: '180px',
        align: 'right',
    },
    {
        key: "reserveRepoCross",
        name: '逆回购（跨月）',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "moneyFund",
        name: '货币基金',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "ncd",
        name: '同业存单',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "shortTermFund",
	    name: '短债基金',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "assetManagement",
	    name: '保险资管产品',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "internalLending",
	    name: '内部拆借',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "total",
	    name: '合计',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
]
export let rule1 = {
    insuranceType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
    queryDate: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
    currencyUnit: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
}
export let rule2 = {
    insuranceType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
	selectDate: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
  
}