module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended", // 启用 JSDoc 推荐规则
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "@typescript-eslint", "jsdoc"], // 添加 jsdoc 插件
  rules: {
    /* ===== 核心铁律（新代码必须守） ===== */
    "@typescript-eslint/no-explicit-any": "error", // 强制避免使用 `any`
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // 忽略未使用的参数（以 `_` 开头）
    "vue/no-unused-components": "error", // 强制不允许有未使用的组件
    "no-console": "error", // 禁止使用 `console`
    "no-debugger": "error", // 禁止使用 `debugger`

    /* ===== JSDoc 相关规则调整 ===== */
    "jsdoc/require-param": "error", // 强制要求参数的 JSDoc 注释
    "jsdoc/require-returns": "error", // 强制要求返回值的 JSDoc 注释
    "jsdoc/require-description": "error", // 强制要求描述文字
    "jsdoc/check-tag-names": ["error", { definedTags: ["emits"] }], // 确保标签名正确
    "jsdoc/no-undefined-types": "off", // 禁止 undefined 类型（用 void）

    /* ===== 强制要求描述 ===== */
    "jsdoc/require-param-description": "error", // 强制每个参数必须有描述
    "jsdoc/require-returns-description": "error", // 强制返回值必须有描述
  },
  overrides: [
    {
      // 业务逻辑文件：严格要求完整 TSDoc
      files: ["src/services/**/*.ts", "src/utils/**/*.ts", "src/stores/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error", // 强制明确返回类型
        "jsdoc/require-jsdoc": "error", // 强制必须有 JSDoc 注释块
        "jsdoc/require-param-description": "error", // 强制每个参数必须有描述
        "jsdoc/require-returns-description": "warn", // 返回值有描述，但不强制
      },
    },
    {
      // views 和 components：温和要求（必须有描述，但参数/返回可依赖 TS）
      files: ["src/views/**/*.{ts,vue}", "src/components/**/*.{ts,vue}"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true, // 允许函数表达式
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        "jsdoc/require-jsdoc": "error", // 强制必须有 /** */ 注释块
        "jsdoc/require-description": "error", // 至少要有描述文字
      },
    },
  ],
}
