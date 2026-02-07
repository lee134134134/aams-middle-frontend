export let tabcolums1 = [{
	key: "date",
	name: '日期',
	width: '280px',
	sortable: false,
	fixed: 'left'
},
{
	key: "bondBalance",
	name: '配置类债券到期',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "bondInterest",
	name: '配置类债券利息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "depositBalance",
	name: '存款到期',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "depositInterest",
	name: '存款付息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "creditorIsRightsPrincipal",
	name: '债权计划本金',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "creditorIsRightsInterest",
	name: '债权计划付息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "trustPrincipal",
	name: '信托计划本金',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "trustInterest",
	name: '信托计划付息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "assetBackingExpire",
	name: '资产支持计划到期',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "assetBackingInterest",
	name: '资产支持计划付息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "totalInterest",
	name: '到期付息合计',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "marketValueBondBalance",
	name: '市值类债券到期',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "marketValueBondInterest",
	name: '市值类债券付息',
	width: '180px',
	sortable: false,
	align: 'right'
},
{
	key: "marketCapitalizationAssetCashFlow",
	name: '市值类资产现金流',
	width: '160px',
	sortable: false,
	align: 'right'
},
]
export let tabcolums2 = [{
	key: "date",
	name: '日期',
	width: '280px',
	sortable: false
},
{
	key: "account",
	name: '账户',
	width: '200px',
	sortable: false,
},
{
	key: "type",
	name: '类型',
	width: '120px',
	sortable: false
},
{
	key: "code",
	name: '代码',
	width: '150px',
	sortable: false
},
{
	key: "name",
	name: '名称',
	width: '220px',
	tooltip: true,
	sortable: false
},
{
	key: "amountDue",
	name: '到期金额',
	width: '140px',
	sortable: false,
	align: 'right'
},
{
	key: "shareOutBonusInterest",
	name: '分红派息',
	width: '140px',
	sortable: false,
	align: 'right'
},
]

export const rule = {
	startTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	endTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	selectTime: [
		{
			type: "date",
			required: true,
			message: "",
			trigger: "change",
		},
	],
	timeUnit: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	monetaryUnit: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	investType: [
		{
			required: true,
			message: "",
			trigger: "change",
		},
	],
	treeType: [
	    { required: true, message: '', trigger: ['blur', 'change'] },
	],
}


