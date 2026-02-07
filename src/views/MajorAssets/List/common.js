export let data = [
    // {
    //     key: "assetClass",
    //     name: '资产大类',
    //     width: '150px',
    //     tooltip: true,
    //     align: 'left',
    //     fixed: 'left'
    // },
    {
        key: "assetSub",
        name: '资产细类',
        width: '300px',
        tooltip: true,
        align: 'left',
        fixed: 'left'
    },
    {
        key: 'a1',
        name: '资产规模',
        align: 'center',
        child: [
            {
                key: "endBalance",
                name: '期末余额（全价）',
                width: '180px',
                align: 'right'
            },
            {
                key: "endBalanceNet",
                name: '期末余额（净价）',
                width: '180px',
                align: 'right'
            },
            {
                key: "endBalanceRatio",
                name: '期末余额占比',
                width: '150px',
                align: 'right'
            },
            {
                key: "beginBalance",
                name: '年初余额',
                width: '180px',
                align: 'right'
            },
            {
                key: "beginBalanceRatio",
                name: '年初余额占比',
                width: '120px',
                align: 'right'
            },
            {
                key: "balanceRatioChange",
                name: '占比变动',
                width: '100px',
                tooltip: true,
                align: 'right'
            },
        ]
    },
    {
        key: 'a2',
        name: '投资收益',
        align: 'center',
        child: [
            {
                key: "accountingInvestmentIncome",
                name: '会计投资收益额',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "accountingInvestmentIncomeYeild",
                name: '会计投资收益率',
                width: '150px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "comprehensiveInvestmentIncome",
                name: '综合投资收益额',
                width: '150px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "comprehensiveInvestmentIncomeYield",
                name: '综合投资收益率',
                width: '150px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "priceDifferenceIncome",
                name: '价差收入',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "dividendIncome",
                name: '红利收入',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "fairValueChangeGainLoss",
                name: '公允价值变动损益',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "capitalReserveChange",
                name: '资本公积当年变动',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
        ]
    },
    {
        key: "averageFundOccupation",
        name: '平均资金占用',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "accruedInterestDividendRentalIncome",
        name: `               应收/应计利息红利/租金`,
        width: '180px',
        tooltip: true,
        align: 'right'
    },
    {
        key: "monthAverageFundOccupation",
        name: '月均资金占用',
        width: '180px',
        tooltip: true,
        align: 'right'
    },
	{
	    key: "accountingInvestmentIncomeYeildForMonth",
	    name: '             会计投资收益率（月均资金占用）',
	    width: '180px',
	    tooltip: true,
	    align: 'right'
	},
	{
	    key: "comprehensiveInvestmentIncomeYieldForMonth",
	    name: '             综合投资收益率（月均资金占用）',
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
    dataType: [
        { required: true, message: '', trigger: ['blur', 'change'] },
    ],
}