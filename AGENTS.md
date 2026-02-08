# AGENTS.md - AAMS 前端开发指南

本文档为在 AAMS（资产管理系统）前端代码库中工作的 AI 代理提供全面的开发指南。

## 项目概览

**类型**：企业级 Vue 3 + TypeScript 资产管理系统
**框架**：Vue 3.2.37 搭配 Composition API
**语言**：TypeScript 4.7.4（严格模式）
**构建工具**：Vite 4.3.0
**UI 库**：Element Plus 2.9.4

## 开发命令

```bash
# 开发环境
npm run dev                    # 在 0.0.0.0 上启动开发服务器

# 构建（多环境）
npm run build:dev             # 开发环境构建
npm run build:uat             # UAT 环境构建
npm run build:staging         # 预发布环境构建
npm run build:prod            # 生产环境构建
npm run build                 # 默认构建（运行类型检查 + 仅构建）

# 代码质量
npm run lint                  # ESLint 检查并修复
npm run type-check            # 仅 TypeScript 类型检查

# 预览
npm run preview               # 在 4173 端口预览构建结果

# Git
npm run prepare               # 安装 Husky Git 钩子
```

**注意**：当前项目未配置测试框架。

## 代码风格指南

### 格式化（Prettier）

- **分号**：禁用 (`semi: false`)
- **引号**：双引号 (`singleQuote: false`)
- **打印宽度**：2000 个字符（非常宽）
- **尾随逗号**：全部 (`trailingComma: "all"`)
- **箭头函数括号**：尽可能避免 (`arrowParens: "avoid"`)
- **缩进**：2 个空格，不使用制表符
- **行尾符**：LF

### TypeScript 规则（严格模式）

```javascript
// 禁止 - 这些会导致 ESLint 错误
anyType                          // 不允许使用 any 类型
console.log()                    // 不允许使用 console 语句
debugger                         // 不允许使用 debugger
unusedVars                       // 不允许存在未使用的变量
unusedComponents                 // 不允许存在未使用的组件

// 必须遵循 - 这些模式必须遵循
explicitReturnTypes              // 业务逻辑函数需要明确的返回类型
jsdocComments                    // 所有函数都需要 JSDoc 文档
```

### JSDoc 要求

```typescript
/**
 * 描述函数功能的说明文字
 * @param paramName - 参数用途的描述
 * @returns 返回值的描述
 */
function exampleFunction(paramName: string): string {
  return paramName
}
```

### 导入模式

```typescript
// 1. 第三方导入在前
import { ref, reactive, onMounted } from "vue"
import { ElMessage } from "element-plus"
import axios from "axios"

// 2. 使用 @ 别名的本地导入
import { useSearch } from "@/hooks/useSearch"
import { getUserList } from "@/api/user"
import BaseCard from "@/components/base/BaseCard.vue"

// 3. 类型导入（仅 TypeScript 时使用）
import type { User, ApiResponse } from "@/types"
```

## 文件组织

### 目录结构

```
src/
├── api/                  # API 服务模块
├── assets/               # 静态资源（图片、徽标）
├── components/           # 可复用的 Vue 组件
│   ├── base/            # 基础 UI 组件
│   └── business/        # 业务特定组件
├── directive/           # 自定义 Vue 指令
├── composables/         # Vue Composables
├── constants/           # 常量定义
├── hooks/               # Composition API 钩子
├── router/              # Vue Router 配置
├── stores/              # Pinia 状态管理
├── style/               # 全局样式和主题
├── types/              # TypeScript 类型定义
├── utils/               # 工具函数
└── views/               # 按功能组织的页面组件
    ├── ComPosition/     # 投资组合管理
    ├── EquityReport/    # 权益报告
    ├── TeamAssets/      # 团队资产管理
    └── [其他模块]/
```

### 组件结构

```vue
<template>
  <!-- Element Plus 组件和自定义标记 -->
</template>

<script lang="ts" setup>
  // 1. 导入
  // 2. 使用 TypeScript 接口定义 props
  // 3. 响应式状态（ref、reactive）
  // 4. 计算属性
  // 5. 方法
  // 6. 生命周期钩子（onMounted 等）
  // 7. 事件定义
</script>

<style scoped lang="scss">
  /* 组件特定样式，包含 Element Plus 自定义 */
</style>
```

## TypeScript 模式

### 状态管理

```typescript
// 原始值
const count = ref<number>(0)
const loading = ref<boolean>(false)

// 对象
const user = reactive<User>({
  id: "",
  name: "",
  email: "",
})

// 计算属性
const fullName = computed(() => `${user.firstName} ${user.lastName}`)
```

### API 集成

```typescript
// 使用配置好的 axios 实例发送 HTTP 请求
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>("/api/users")
    return response.data
  } catch (error) {
    ElMessage.error("获取用户列表失败")
    throw error
  }
}
```

### 自定义钩子

```typescript
export function useSearch<T extends Record<string, unknown>>(initialModel: T, onSearch?: (model: T) => void, onReset?: () => void) {
  const searchModel = reactive<T>({ ...initialModel })
  const loading = ref<boolean>(false)

  const handleSearch = async () => {
    loading.value = true
    try {
      await onSearch?.(searchModel)
    } finally {
      loading.value = false
    }
  }

  const handleReset = () => {
    Object.assign(searchModel, initialModel)
    onReset?.()
  }

  return {
    searchModel,
    loading,
    handleSearch,
    handleReset,
  }
}
```

## 状态管理（Pinia）

```typescript
// Store 定义
const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null as User | null,
    permissions: [] as string[],
  }),

  actions: {
    async login(credentials: LoginCredentials): Promise<void> {
      // 实现
    },

    logout(): void {
      this.currentUser = null
      this.permissions = []
    },
  },
})

// 在组件中使用 store
const userStore = useUserStore()
const { currentUser, permissions } = storeToRefs(userStore)
```

## 错误处理模式

### HTTP 错误

```typescript
// Axios 拦截器处理全局错误显示
// 组件级错误处理
const submitForm = async () => {
  try {
    loading.value = true
    await submitData(formData)
    ElMessage.success("表单提交成功")
  } catch (error) {
    // 错误已由拦截器显示
    console.error("提交失败：", error)
  } finally {
    loading.value = false
  }
}
```

### 表单验证

```typescript
const validateForm = (): boolean => {
  if (!formData.name) {
    ElMessage.error("名称为必填项")
    return false
  }
  return true
}
```

## 样式指南

### SCSS 与 Element Plus

```scss
<style scoped lang="scss">
  // 使用 Element Plus 变量
  .custom-button {
    background-color: var(--el-color-primary);

    // 深度选择器用于组件自定义
    :deep(.el-input__inner) {
      border-radius: 4px;
    }
  }

  // CSS 自定义属性用于主题
  .custom-component {
    --primary-color: #2272f7;
    --success-color: #67c23a;
  }
</style>
```

### 全局样式（位于 src/style/）

- **reset.scss** - 浏览器重置样式
- **index.scss** - 主入口，包含 CSS 变量
- **element-plus.scss** - Element Plus 自定义
- **transition.scss** - 动画过渡效果

## 重要配置文件

### ESLint（.eslintrc.cjs）

- 严格的 TypeScript 规则
- 所有函数必须包含 JSDoc 文档
- 不允许使用 console/debugger 语句
- 不允许使用 any 类型

### TypeScript（tsconfig.json）

- 启用严格模式
- 路径别名：`@/*` → `./src/*`
- ESNext 目标，支持现代浏览器

### Vite（vite.config.ts）

- 多个 API 端点的代理配置
- Vue 3、Element Plus 和 Pinia 自动导入
- 多环境构建优化

## 在此代码库中工作

### 应该做

- 使用 TypeScript 并明确类型
- 添加全面的 JSDoc 注释
- 遵循 Vue 3 Composition API 模式
- 一致地使用 Element Plus 组件
- 使用 ElMessage 实现适当的错误处理
- 使用 SCSS 配合 scoped 样式
- 遵循既定的文件结构
- 使用 `@/` 路径别名进行导入

### 不应该做

- 使用 `any` 类型
- 保留 console.log 或 debugger 语句
- 跳过 JSDoc 文档
- 混合使用 Options API 和 Composition API
- 使用无作用域的全局 CSS
- 忽略 ESLint 警告
- 修改 node_modules 中的文件

### 在进行修改之前

1. 运行 `npm run lint` 检查代码质量
2. 运行 `npm run type-check` 检查 TypeScript 错误
3. 使用 `npm run dev` 在开发环境中测试
4. 遵循相似组件的现有模式

### Git 工作流

- Husky 预提交钩子自动运行 linting 和格式化
- 使用约定式提交消息（由 commitlint 强制执行）
- 所有更改必须通过 ESLint 检查且无警告

此代码库遵循企业级模式，强调类型安全、代码质量和可维护性。
