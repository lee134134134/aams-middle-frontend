import { ElMessageBox } from "element-plus";

const userName = sessionStorage.getItem("userName");
const token = $cookies.get("portal_token") ;

export const headerConfig = {
  Authorization: "Bearer " + token,
  userName,
};

export const errorHandle = (status) => {
  // console.log("status", status);
  switch (status) {
    case 401:
      ElMessageBox.confirm(`登录失效，请重新登录`, "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.top.location.href = import.meta.env.VITE_APP_SYSTEM;
        })
        .catch(() => {});

      break;
    case 403:
      setTimeout(() => {}, 1000);
      break;
    case 404:
      break;
  }
};
