export let data = [
    // {
    //     key: "investManager",
    //     name: '投资经理',
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
        key: 'reserveRepo',
        name: '逆回购',
        width: '180px',
        align: 'right',
    },
    {
        key: 'moneyFund',
        name: '货币基金',
        width: '180px',
        align: 'right',
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
    {
        key: "ncd",
        name: '同业存单',
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
