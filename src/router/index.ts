import { createRouter, createWebHistory } from "vue-router";
import userStore from "@/stores/modules/user.js";
import { ElMessage, ElMessageBox } from "element-plus";
import serviceRouterY from "./modules/serviceY";
import serviceRouterZ from "./modules/serviceZ";
import serviceRouterL from "./modules/serviceL";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...serviceRouterY,...serviceRouterZ,...serviceRouterL],
});

router.beforeResolve((to, from, next) => {
  // console.log("page:", to.fullPath);
  const token = $cookies.get("portal_token"); //是否登录
  const _href = window.location?.ancestorOrigins?.item(0) || "";
  // console.log("_href", _href);
  const isSysterm = _href == import.meta.env.VITE_APP_SYSTEM ? true : false; //是否在组合系统中
  const isLocal = ["local", "dev"].includes(import.meta.env.VITE_APP_NODE_ENV);
  let _istoken = true;
  if (!isLocal) {
    _istoken = token;
  }
  // console.log("!_istoken：", !_istoken);
  // console.log("!isSysterm", !isSysterm);

  // if (!_istoken) {
  //   ElMessageBox.confirm(`请在系统中登录`, "系统提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning",
  //   })
  //     .then(() => {
	// 	window?.$wujie.bus.$emit('loginTimeout');
  //       window.top.location.href = import.meta.env.VITE_APP_SYSTEM;
  //     })
  //     .catch(() => {});
  // } else {
  // }
   next();

});

router.afterEach((to, from) => {
	window.dispatchEvent(new Event('resize'))
});

export default router;
