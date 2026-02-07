export let data = [
	// {
	//     key: "accountName;",
	//     name: '受托子账户',
	//     width: '180px',
	//     tooltip: true,
	//     align: 'left',
	//     fixed: 'left'
	// },
	{
		key: "cash",
		name: '现金',
		width: '180px',
		align: 'right'
	},
	{
		key: 'repoBankCurrent',
		name: '银行间正回购（当月）',
		width: '180px',
		align: 'right',
	},
	{
		key: 'repoBankCross',
		name: '银行间正回购（跨月）',
		width: '180px',
		align: 'right',
	},
	{
		key: "repoExchangeCurrent",
		name: '交易所正回购（当月）',
		width: '180px',
		tooltip: true,
		align: 'right'
	},
	{
		key: "repoExchangeCross",
		name: '交易所正回购（跨月）',
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
export function sort(n, m) {
    if (n === "roadshowDate") {
        if (m === 'descending') {
            return 'ROADSHOW_DATE desc'
        } else if (m === "ascending") {
            return "ROADSHOW_DATE asc"
        } else {
            return ''
        }
    } else {
        return ''
    }
}

export let rule = {
    queryDate: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
    currencyUnit: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
}
