# AAMS 中台前端项目文档

## 项目概述

AAMS (Asset Management System) 中台前端项目是一个基于 Vue 3 + TypeScript 的现代化企业级资产管理系统，提供投资组合管理、风险控制、数据分析等核心功能。

## 技术栈

### 核心框架

- **Vue 3.2.37** - 采用 Composition API
- **TypeScript 4.7.4** - 类型安全
- **Vite 4.3.0** - 现代化构建工具
- **Vue Router 4.1.2** - 路由管理

### 状态管理与数据

- **Pinia 2.0.16** - 状态管理
- **Axios 0.27.2** - HTTP 请求库
- **Lodash 4.17.21** - 工具函数库
- **Moment 2.29.4** - 时间处理

### UI 组件与样式

- **Element Plus 2.9.4** - UI 组件库
- **@element-plus/icons-vue 2.0.6** - Element Plus 图标
- **Sass 1.54.4** - CSS 预处理器

### 图表与可视化

- **ECharts 5.3.3** - 数据可视化
- **vue-echarts 7.0.3** - Vue 3 ECharts 封装

### 编辑器与交互

- **@wangeditor/editor 5.1.23** - 富文本编辑器
- **vue-draggable-plus 0.5.4** - 拖拽组件

### 开发工具

- **ESLint 8.57.0** - 代码检查
- **Prettier 3.8.0** - 代码格式化
- **Husky 9.1.7** - Git 钩子管理
- **lint-staged 16.2.7** - 提交前检查

## 项目结构

```
src/
├── assets/              # 静态资源
│   ├── images/         # 图片资源
│   ├── logo.svg        # 项目 Logo
│   └── weblogo.png     # 网站 Logo
├── router/             # 路由配置
│   ├── index.ts        # 路由主入口
│   └── modules/        # 路由模块
│       ├── serviceL.js
│       ├── serviceY.js
│       └── serviceZ.js
├── stores/             # 状态管理
│   └── modules/        # 模块化状态
│       ├── ComPosition.js
│       └── FutureCashFlowForecast.js
└── views/              # 页面组件
    ├── ComPosition/    # 组合头寸管理
    ├── EquityReport/   # 权益报告
    ├── TeamAssets/     # 团队资产管理
    ├── DetailAssets/   # 详细资产管理
    ├── FloatingPL/     # 浮动盈亏
    ├── ProfitAndLoss/  # 损益管理
    ├── ManagementCaliber/ # 管理口径
    ├── AccountCashFlow/  # 账户现金流
    ├── DataPacket/     # 数据包
    └── FixedPortList/  # 固定头寸列表
```

## 功能模块

### 1. 组合头寸管理 (ComPosition)

- 多维度头寸数据展示
- 支持多种数据视图切换
- 实时数据更新与监控

### 2. 权益报告 (EquityReport)

- 权益数据分析与可视化
- 热力图展示
- 数据导出功能

### 3. 资产管理

- **团队资产** (TeamAssets)：团队维度资产管理
- **详细资产** (DetailAssets)：资产明细管理
- **固定头寸** (FixedPortList)：固定头寸监控

### 4. 风险与收益分析

- **浮动盈亏** (FloatingPL)：实时浮动盈亏监控
- **损益管理** (ProfitAndLoss)：损益核算与分析
- **管理口径** (ManagementCaliber)：多维度管理统计

### 5. 现金流管理

- **账户现金流** (AccountCashFlow)：账户资金流向分析
- **现金流预测** (FutureCashFlowForecast)：未来现金流预测

## 开发规范

### 代码规范

- 使用 ESLint + Prettier 进行代码检查和格式化
- 提交前自动执行 lint-staged 检查
- 统一的代码风格和命名规范

### Git 工作流

- 使用 Husky 管理 Git 钩子
- 提交前自动代码检查和格式化
- 推荐使用 Conventional Commits 规范

### 组件开发规范

- 使用 Vue 3 Composition API
- TypeScript 类型安全
- 模块化组件设计
- 统一的样式规范

## 部署环境

### 开发环境

```bash
npm run dev
# 启动开发服务器，监听 0.0.0.0
```

### 构建环境

```bash
# 开发环境构建
npm run build:dev

# UAT 环境构建
npm run build:uat

# 测试环境构建
npm run build:staging

# 生产环境构建
npm run build:prod
```

### 其他命令

```bash
# 代码检查
npm run lint

# 类型检查
npm run type-check

# 预览构建结果
npm run preview

# 安装依赖
npm install
```

## 相关链接

- **Vue 3 官方文档**: https://vuejs.org/
- **Vite 官方文档**: https://cn.vitejs.dev/
- **Element Plus 文档**: https://element-plus.gitee.io/
- **ECharts 文档**: https://echarts.apache.org/handbook/zh/
- **wangEditor 文档**: https://www.wangeditor.com/v5/

## 注意事项

1. **环境变量配置**: 不同环境需要配置对应的环境变量文件
2. **API 接口**: 确保不同环境 API 地址正确配置
3. **权限管理**: 注意页面权限和路由权限的配置
4. **性能优化**: 大数据量页面需要考虑虚拟滚动等优化措施
5. **浏览器兼容**: 确保 IE 11+ 及现代浏览器兼容性

## 更新日志

- 2023年: 项目初始化，搭建基础架构
- 持续迭代: 功能模块开发与优化
- 当前版本: 基于最新技术栈的企业级资产管理平台
