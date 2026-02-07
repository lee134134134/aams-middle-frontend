export let data = [
  {
    key: "portfolioScale",
    name: "组合规模",
    width: "180px",
    align: "right",
  },
  {
    key: "liquidityPortfolioScale",
    name: "其中：流动性资产规模",
    width: "180px",
    align: "right",
  },
  {
    key: "equityPortfolioScale",
    name: "其中：权益类资产规模",
    width: "180px",
    align: "right",
  },
  {
    key: "stockPortfolioScale",
    name: "股票",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "fundPortfolioScale",
    name: "基金",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "equityPosition",
    name: "权益仓位",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "interestIncome",
    name: "利息收入",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "dividendIncome",
    name: "红利收入",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "spreadIncome",
    name: "价差收入",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "fairValueChange",
    name: "公允价值变动损益",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "accountingIncome",
    name: "会计收益",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "capitalReserve",
    name: "资本公积",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "comprehensiveIncome",
    name: "综合收益",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "accountingIncomeYield",
    name: "会计收益率",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "comprehensiveIncomeYield",
    name: "综合收益率",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "timeWeightedReturn",
    name: "综合收益率（时间加权）",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "volatility",
    name: "波动率",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "maximumDrawdown",
    name: "最大回撤",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "oneSidedTurnoverRatio",
    name: "单边换手率",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "betaCoefficient",
    name: "贝塔系数",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "riskContribution",
    name: "风险贡献率",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "averageCapitalOccupied",
    name: "平均资金占用",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "floatingProfitAndLoss",
    name: "浮动盈亏",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "spreadIncomeAdjustment",
    name: "价差收入（调整）",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "accountingIncomeAdjustment",
    name: "会计收益（调整）",
    width: "180px",
    tooltip: true,
    align: "right",
  },
  {
    key: "accountingIncomeYieldAdjustment",
    name: "会计收益率（调整）",
    width: "180px",
    tooltip: true,
    align: "right",
  },
]
export function sort(n, m) {
  if (n === "roadshowDate") {
    if (m === "descending") {
      return "ROADSHOW_DATE desc";
    } else if (m === "ascending") {
      return "ROADSHOW_DATE asc";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export let rule = {
  insuranceType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  queryDate: [{ required: true, message: "", trigger: ["blur", "change"] }],
  currencyUnit: [{ required: true, message: "", trigger: ["blur", "change"] }],
};
