import axios from "axios";
import {  errorHandle } from "./config";
import { ElMessage } from "element-plus";
import VueCookies from "vue-cookies";
window.$cookies = VueCookies;

const NODE_ENV = import.meta.env.VITE_APP_NODE_ENV;
const URL = import.meta.env.VITE_APP_HTTP_DOMAIN_SYSTEM;

// const baseURL = NODE_ENV == "local" ? "/operate" : URL;
const baseURL = NODE_ENV == "local" ? "/admin" : URL;

// 配置环境
const options = { baseURL: baseURL };
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.common["token"] = _token;
// axios.defaults.timeout = 6000;

const instance = axios.create(options);

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 断网提示
    // if (!navigator.onLine) {
    //   ElMessageBox.alert("您的网络故障，请检查!", "温馨提示", {
    //     confirmButtonText: "好的",
    //     type: "warning",
    //   });
    // }

    const userName = sessionStorage.getItem("userName");
	const userId = sessionStorage.getItem("userId");
    const token = $cookies.get("portal_token");

    Object.assign(config.headers, {
      Authorization: "Bearer " + token,
      userName,
	  userId
    });

    return config;
  },
  (error) => {
    // if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
    //   alert('请求超时，请稍后再试')
    //   return Promise.reject(error);          // reject这个错误信息
    // }

    console.log("请求拦截error", error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// http response 拦截器
instance.interceptors.response.use(
  (res) => {
    errorHandle(res?.data?.code);
    // console.log("axios res : ", res);
    if (res?.data?.code !== '00000' && res.data !== "" && res.data.code !== "0") {
      // ElMessage({
      //   message: res.data?.msg || `${res.data?.code} 失败`,
      //   type: "error",
      // });
    } else if (res.data == "") {
      // ElMessage({
      //   message: "error: data为空",
      //   type: "error",
      // });
      return;
    }

    return res.data;
    // return Promise.reject(res.data);
  },
  (error) => {
    // ElMessage({
    //   message: `${error} `,
    //   type: "error",
    // });
    return Promise.reject(error);
  }
);

export default instance;
