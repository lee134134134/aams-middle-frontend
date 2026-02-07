const serviceRouterZ = [
  {
    path: `/aams/majorAssets`,
    name: "majorAssets",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "大类资产及收益",
    },
    component: () => import("@/views/MajorAssets/index.vue"),
  },
  {
    path: `/aams/EquityReport`,
    name: "EquityReport",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "权益组合一览表",
    },
    component: () => import("@/views/EquityReport/IndexPage.vue"),
  },
  {
    path: `/aams/ComPosition`,
    name: "ComPosition",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "权益类组合持仓表",
    },
    component: () => import("@/views/ComPosition/index.vue"),
  },
  {
    path: `/aams/ComMobility`,
    name: "ComMobility",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "公司流动性统计",
    },
    component: () => import("@/views/ComMobility/index.vue"),
  },
  {
    path: `/aams/AccountMaintenace`,
    name: "AccountMaintenace",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "上下帐维护",
    },
    component: () => import("@/views/AccountMaintenace/index.vue"),
  },

  {
    path: `/aams/FloatingPL`,
    name: "FloatingPL",
    meta: {
      token: false,
      showRouter: false,
      keepAlive: false,
      title: "浮盈亏情况跟踪表",
    },
    component: () => import("@/views/FloatingPL/index.vue"),
  },
]
export default serviceRouterZ
