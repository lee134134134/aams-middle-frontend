export let tabcolums1 = [{
		key: "adjustmentDate",
		name: '调整日期',
		width: '130px',
		sortable: false,
	},

	{
		key: "fundNameWithdrawn",
		name: '调出基金名称',
		width: '160px',
		sortable: false,
		align: 'left',
		tooltip: true
	},

	{
		key: "assetUnitWithdrawn",
		name: '调出资产单元名称',
		width: '180px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "transferDirection",
		name: '划拨方向',
		width: '100px',
		sortable: false,
		align: 'left',
	},

	{
		key: "fundNameDeposited",
		name: '调入基金名称',
		width: '160px',
		sortable: false,
		align: 'left',
		tooltip: true,
	},

	{
		key: "assetUnitDeposited",
		name: '调入资产单元名称',
		width: '180px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "amountTransferred",
		name: '划拨金额（元）',
		width: '150px',
		sortable: false,
		align: 'right'
	},
	{
		key: "quotaType",
		name: '额度类型',
		width: '130px',
		sortable: false,
		align: 'left',
		tooltip: true,
	},
	{
		key: "transferType",
		name: '业务类型',
		width: '150px',
		sortable: false,
		align: 'left'
	},
	{
		key: "isCalculated",
		name: '是否计入上下账',
		width: '150px',
		sortable: false,
		align: 'left'
	},
	{
		key: "remark",
		name: '备注',
		width: '100px',
		sortable: false,
		align: 'left',
		tooltip: true,
	},
	// {
	// 	key: "status",
	// 	name: '状态',
	// 	width: '100px',
	// 	sortable: false,
	// 	align: 'left'
	// },
	// {
	// 	key: "createBy",
	// 	name: '创建人',
	// 	width: '180px',
	// 	sortable: false,
	// 	align: 'right'
	// },

]
export let tabcolums2 = [{
		key: "number",
		name: '序号',
		width: '60px',
		sortable: false,
		align: 'left',
	},
	{
		key: "adjustmentDate",
		name: '调整日期',
		width: '130px',
		sortable: false,
	},
	{
		key: "fundCodeWithdrawn",
		name: '调出基金编码',
		width: '130px',
		sortable: false,
		align: 'left',
	},
	{
		key: "fundNameWithdrawn",
		name: '调出基金名称',
		width: '160px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "assetCodeWithdrawn",
		name: '调出资产单元编码',
		width: '150px',
		sortable: false,
		align: 'left',
	},
	{
		key: "assetUnitWithdrawn",
		name: '调出资产单元名称',
		width: '180px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "transferDirection",
		name: '划拨方向',
		width: '100px',
		sortable: false,
		align: 'left',
	},
	{
		key: "fundCodeDeposited",
		name: '调入基金编码',
		width: '130px',
		sortable: false,
		align: 'left'
	},
	{
		key: "fundNameDeposited",
		name: '调入基金名称',
		width: '160px',
		sortable: false,
		align: 'left',
		tooltip: true,
	},
	{
		key: "assetCodeDeposited",
		name: '调入资产单元编码',
		width: '150px',
		sortable: false,
		align: 'left',

	},
	{
		key: "assetUnitDeposited",
		name: '调入资产单元名称',
		width: '180px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "amountTransferred",
		name: '划拨金额（元）',
		width: '150px',
		sortable: false,
		align: 'right'
	},
	{
		key: "remark",
		name: '备注',
		width: '100px',
		sortable: false,
		align: 'left',
		tooltip: true,
	},

]


export let tabcolums3 = [{
		key: "id",
		name: '序号',
		width: '60px',
		sortable: false,
		align: 'left',
	},
	{
		key: "fundNameWithdrawn",
		name: '调出基金名称',
		width: '160px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	
	{
		key: "assetUnitWithdrawn",
		name: '调出资产单元名称',
		width: '180px',
		sortable: false,
		align: 'left',
		tooltip: true
	},
	{
		key: "availableAmountTransferred",
		name: '可划拨金额',
		width: '150px',
		sortable: false,
		align: 'right'
	},
	{
		key: "amountTransferred",
		name: '划拨金额',
		width: '150px',
		sortable: false,
		align: 'right'
	},

]
export const rule = {
	startTime: [{
		type: "date",
		required: true,
		message: "",
		trigger: "change",
	}, ],
	endTime: [{
		type: "date",
		required: true,
		message: "",
		trigger: "change",
	}, ],
	selectTime: [{
		type: "date",
		required: true,
		message: "",
		trigger: "change",
	}, ],
	timeUnit: [{
		required: true,
		message: "",
		trigger: "change",
	}, ],
	monetaryUnit: [{
		required: true,
		message: "",
		trigger: "change",
	}, ],
	investType: [{
		required: true,
		message: "",
		trigger: "change",
	}, ],
	treeType: [{
		required: true,
		message: '',
		trigger: ['blur', 'change']
	}, ],
}

export const rule1 = {
	isCalculated: [{
		required: true,
		message: '请选择是否计入上下账',
		trigger: 'change'
	}],
	transferType: [{
		required: true,
		message: '请选择业务类型',
		trigger: 'change'
	}],

	adjustmentDate: [{
		required: true,
		message: '请选择调整日期',
		trigger: 'change'
	}],
	fundCodeWithdrawn: [{
		required: true,
		message: '请选择调出基金编码',
		trigger: 'change'
	}],
	fundNameWithdrawn: [{
		required: true,
		message: '请选择调出基金名称',
		trigger: 'change'
	}],
	assetCodeWithdrawn: [{
		required: true,
		message: '请选择调出资产单元编码',
		trigger: 'change'
	}],
	assetUnitWithdrawn: [{
		required: true,
		message: '请选择调出资产单元名称',
		trigger: 'change'
	}],
	fundCodeDeposited: [{
		required: true,
		message: '请选择调入基金编码',
		trigger: 'change'
	}],
	fundNameDeposited: [{
		required: true,
		message: '请选择调入基金名称',
		trigger: 'change'
	}],
	assetCodeDeposited: [{
		required: true,
		message: '请选择调入资产单元编码',
		trigger: 'change'
	}],
	assetUnitDeposited: [{
		required: true,
		message: '请选择调入资产单元名称',
		trigger: 'change'
	}],
	amountTransferred: [{
		required: true,
		message: '请输入划拨金额',
		trigger: 'blur'
	}],
}

export const rule2 = {
	addresser: [{
		required: true,
		message: '请输入发件人',
		trigger: 'change'
	}],
	recipients: [{
		required: true,
		message: '',
		trigger: 'change'
	}],
	theme: [{
		required: true,
		message: '请输入主题',
		trigger: 'change'
	}],
}