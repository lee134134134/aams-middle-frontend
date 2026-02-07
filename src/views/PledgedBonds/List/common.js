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
       key: 'a1',
       name: '银行间',
       align: 'center',
       child: [
           {
               key: "nationalBond",
               name: '国债',
               width: '180px',
               align: 'right'
           },
           {
               key: "policyBankBond",
               name: '政金债',
               width: '180px',
               align: 'right'
           },
           {
               key: "municipalBond",
               name: '地方债',
               width: '150px',
               align: 'right'
           },
           {
               key: "creditBond",
               name: '信用债及其他',
               width: '180px',
               align: 'right'
           },
       ]
   },
   {
       key: 'a2',
       name: '交易所',
       align: 'center',
       child: [
           {
               key: "standardBondConvertibleSh",
               name: '可转标准券（上交所）',
               width: '180px',
               align: 'right'
           },
           {
               key: "standardBondConvertedSh",
               name: '已转标准券（上交所）',
               width: '180px',
               align: 'right'
           },
           {
               key: "standardBondConvertibleSz",
               name: '可转标准券（深交所）',
               width: '180px',
               align: 'right'
           },
           {
               key: "standardBondConvertedSz",
               name: '已转标准券（深交所）',
               width: '180px',
               align: 'right'
           },
       ]
   },
   {
       key: "total",
       name: '合计',
       width: '180px',
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
