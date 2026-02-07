export let data = [
    // {
    //     key: "investManager",
    //     name: '投资经理',
    //     width: '150px',
    //     tooltip: true,
    //     align: 'left',
    //     fixed: 'left'
    // },
    {
        key: 'a1',
        name: '规模情况',
        align: 'center',
        child: [
            {
                key: "portfolioScale",
                name: '规模',
                width: '180px',
                align: 'right'
            },
            {
                key: "proportion",
                name: '占比',
                width: '180px',
                align: 'right'
            },
            {
                key: "liquidityPortfolioScale",
                name: '流动性资产规模',
                width: '150px',
                align: 'right'
            },
            {
                key: "liquidityProportion",
                name: '流动性资产占比',
                width: '180px',
                align: 'right'
            },
        ]
    },
    {
        key: 'a2',
        name: '收益情况',
        align: 'center',
        child: [
            {
                key: "interestIncome",
                name: '利息收入',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "dividendIncome",
                name: '红利收入',
                width: '150px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "spreadIncome",
                name: '价差收入',
                width: '150px',
                tooltip: true,
                align: 'right'
            },
			{
			    key: "fairValueChange",
			    name: '公允价值变动损益',
			    width: '180px',
			    tooltip: true,
			    align: 'right'
			},
            {
                key: "accountingIncome",
                name: '会计收益额',
                width: '150px',
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
                key: "capitalReserve",
                name: '资本公积',
                width: '180px',
                tooltip: true,
                align: 'right'
            },
            {
                key: "comprehensiveIncome",
                name: '综合收益额',
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
    },
	
	
	{
	    key: 'a3',
	    name: '组合情况',
	    align: 'center',
	    child: [
	        {
	            key: "costYtm",
	            name: '成本YTM',
	            width: '180px',
	            tooltip: true,
	            align: 'right'
	        },
	        {
	            key: "marketValueYtm",
	            name: '市值YTM',
	            width: '150px',
	            tooltip: true,
	            align: 'right'
	        },
	        {
	            key: "bondDuration",
	            name: '债券久期',
	            width: '150px',
	            tooltip: true,
	            align: 'right'
	        },
	        {
	            key: "portfolioDuration",
	            name: '组合久期',
	            width: '150px',
	            tooltip: true,
	            align: 'right'
	        },
	        {
	            key: "remainingTerm",
	            name: '剩余期限',
	            width: '180px',
	            tooltip: true,
	            align: 'right'
	        },
	        {
	            key: "floatingProfitAndLoss",
	            name: '浮盈亏',
	            width: '180px',
	            tooltip: true,
	            align: 'right'
	        },
	    ]
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
