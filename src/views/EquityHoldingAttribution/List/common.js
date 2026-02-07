export let data = [
  {
    key: "incomeYield",
    name: "当日收益率",
    width: "180px",
    align: "right",
  },
  {
    key: "timingContribution",
    name: "择时贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "industryContributionA",
    name: "A股行业贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "stockSelectionContributionA",
    name: "A股选股贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "contributionH",
    name: "H股贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "residualContribution",
    name: "残差贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "position",
    name: "仓位",
    width: "180px",
    align: "right",
  },
];
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
  treeType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  insuranceType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  startDate: [{ type: "date", required: true, message: "", trigger: "change" }],
  endDate: [{ type: "date", required: true, message: "", trigger: "change" }],
}
