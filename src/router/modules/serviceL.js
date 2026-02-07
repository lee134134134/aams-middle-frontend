const serviceRouterL = [
  {
    path: `/aams/EquityHoldingAttribution`,
    name: "EquityHoldingAttribution",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "权益类组合持仓归因分析表",
    },
    component: () => import("@/views/EquityHoldingAttribution3/IndexPage.vue"),
  },
  {
    path: `/aams/EquityPortfolioNet`,
    name: "EquityPortfolioNet",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "权益类组合持仓净值表",
    },
    component: () => import("@/views/EquityPortfolioNet/IndexPage.vue"),
  },
]
export default serviceRouterL
