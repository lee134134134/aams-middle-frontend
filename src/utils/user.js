import userStore from "@/stores/modules/user.js";

// 获取用户信息入口
export default async function userInfor() {
  // const _userStore = userStore();
  // const isUserInfo = ["local", "dev"].includes(
  //   import.meta.env.VITE_APP_NODE_ENV
  // );

  const _token = $cookies.get("portal_token");
  userStore().token = _token;
  sessionStorage.setItem("portal_token", _token);

  // if (isUserInfo) {
  //   userStore().permissions = ["*:*:*"];
  //   userStore().deptNames = [];
  //   localStorage.setItem("relationId", $cookies.get("userName"));
  //   return;
  // }

  userStore().getUserInfo(); //获取用户信息
}
