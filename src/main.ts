import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

// import "./assets/main.scss";
// import "./assets/element.scss";

import "./style/temporary.scss"
// // 引入重置样式
import "./style/reset.scss"
// // 导入公共样式
import "./style/index.scss"
// // 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
// console.log("ElementPlus:", ElementPlus);
import $http from "@/utils/http.ts"
import VueCookies from "vue-cookies"

import Directives from "@/directive/directives"
import integer from "@/directive/integerBetween"
import hasPermi from "@/directive/hasPermi.ts"
import { isPermi, isRole } from "@/utils/hasPermi.ts"
import "echarts"
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Directives)
app.use(integer)
app.use(hasPermi)

app.config.globalProperties.$http = $http
app.config.globalProperties.$router = router
app.config.globalProperties.hasPermi = isPermi
app.config.globalProperties.hasRole = isRole

window.$http = $http
window.$router = router
window.hasPermi = isPermi
window.hasRole = isRole
app.config.globalProperties.$cookies = VueCookies
window.$cookies = VueCookies

// element icons
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount("#app")
