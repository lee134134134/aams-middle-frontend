export let data = [
  {
    key: "combinationCumulativeNetValueTimeWeighted",
    name: "组合累计净值<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "benchmarkCumulativeNetValue",
    name: "基准累计净值",
    width: "160px",
    align: "right",
  },
  {
    key: "dailyTotalReturnTimeWeighted",
    name: "每日综合收益率<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "dailyTotalReturnSizeWeighted",
    name: "每日综合收益率<br/>（规模加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "benchmarkDailyReturn",
    name: "基准每日收益率",
    width: "160px",
    align: "right",
  },
  {
    key: "combinationCumulativeReturnTimeWeighted",
    name: "组合累计收益率<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "combinationCumulativeReturnSizeWeighted",
    name: "组合累计收益率<br/>（规模加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "benchmarkCumulativeReturn",
    name: "基准累计收益率",
    width: "160px",
    align: "right",
  },
  {
    key: "dailyExcessReturnTimeWeighted",
    name: "每日超额收益率<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "dailyExcessReturnSizeWeighted",
    name: "每日超额收益率<br/>（规模加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "cumulativeExcessReturnTimeWeighted",
    name: "累计超额收益率<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "cumulativeExcessReturnSizeWeighted",
    name: "累计超额收益率<br/>（规模加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "cumulativeDrawDownSequenceTimeWeighted",
    name: "累计回撤序列<br/>（时间加权）",
    width: "160px",
    align: "right",
  },
  {
    key: "cumulativeDrawDownSequenceSizeWeighted",
    name: "累计回撤序列<br/>（规模加权）",
    width: "160px",
    align: "right",
  },
]

export const TABLE_CONFIG = [
  { label: "利息收入", prop: "interestIncome" },
  { label: "红利收入", prop: "dividendIncome" },
  { label: "价差收入", prop: "priceDifferenceIncome" },
  { label: "会计收益", prop: "accountingProfit" },
  { label: "资本公积", prop: "capitalReserve" },
  { label: "综合收益", prop: "comprehensiveIncome" },
  { label: "会计收益率", prop: "accountingReturnRate" },
  { label: "综合收益率（规模加权）", prop: "comprehensiveReturnRateScaleWeighted" },
  { label: "综合收益率（时间加权）", prop: "comprehensiveReturnRateTimeWeighted" },
  { label: "波动率", prop: "volatility" },
  { label: "最大回撤（规模加权）", prop: "maxDrawDownScaleWeighted" },
  { label: "最大回撤（时间加权）", prop: "maxDrawDownTimeWeighted" },
  { label: "累计超额收益率（规模加权）", prop: "cumExcessReturnScaleWeighted" },
  { label: "累计超额收益率（时间加权）", prop: "cumExcessReturnTimeWeighted" },
  { label: "单边换手率", prop: "singleSidedTurnoverRate" },
  { label: "贝塔系数", prop: "betaCoefficient" },
  { label: "平均资金占用", prop: "averageCapitalOccupancy" },
  { label: "年化跟踪误差", prop: "annualizedTrackingError" },
]

export let tabsList = [
  { label: "股票", name: "stockTextualVo" },
  { label: "高股息", name: "highDividendTextualVo" },
  { label: "基金", name: "fundTextualVo" },
  { label: "合计", name: "totalTextualVo" },
]

/**
 * 处理排序字段的转换函数
 * @param {string} n 排序字段名
 * @param {string} m 排序方向
 * @returns {string} 返回识别的排序字段
 */
export function sort(n, m) {
  if (n === "roadshowDate") {
    if (m === "descending") {
      return "ROADSHOW_DATE desc"
    } else if (m === "ascending") {
      return "ROADSHOW_DATE asc"
    } else {
      return ""
    }
  } else {
    return ""
  }
}

export let rule = {
  treeType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  insuranceType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  startDate: [{ type: "date", required: true, message: "", trigger: "change" }],
  endDate: [{ type: "date", required: true, message: "", trigger: "change" }],
  currencyUnit: [{ required: true, message: "", trigger: ["blur", "change"] }],
}
