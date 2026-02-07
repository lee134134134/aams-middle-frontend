import axios from "axios";
import {
	ElMessage,
	ElLoading
} from "element-plus";
import VueCookies from "vue-cookies";
import userStore from "@/stores/modules/user.js";

window.$cookies = VueCookies;
import {
	errorHandle
} from "./config";
let loadingInstance;
const NODE_ENV =
	import.meta.env.VITE_APP_NODE_ENV;
const URL =
	import.meta.env.VITE_APP_HTTP_DOMAIN_SCORE;

const baseURL = NODE_ENV == "local" ? "/institute-rating-backend-biz" : URL;
// const baseURL = NODE_ENV == "local" ? "/" : URL;
// 配置环境
const options = {
	baseURL: baseURL
};

// axios.defaults.timeout = 6000;

const instance = axios.create(options);

// 添加请求拦截器
instance.interceptors.request.use(
	async (config) => {
			let userName = userStore().userName;
			let userId = sessionStorage.getItem("userId");
			const token = $cookies.get("portal_token");
			if (!userName) {
				await userStore().getUserInfo(); //获取用户信息
				userName = sessionStorage.getItem("userName");
				userId = sessionStorage.getItem("userId");
			}
			Object.assign(config.headers, {
				Authorization: "Bearer " + token,
				userName,
				userId
			});

			return config;
		},
		(error) => {
			// ElLoading.service().close(); // 关闭loading
			console.log("请求拦截error", error);
			return Promise.reject(error);
		}
);

// http response 拦截器
instance.interceptors.response.use(
	(res) => {
		// ElLoading.service().close();
		errorHandle(res?.data?.code);
		if (res?.data?.code !== '00000' && res.data !== "" && res.data.code !== "0") {
			// 错误提示-114,机构人员设置专用提示
			if(res?.data?.code !== -114) {
				ElMessage({
					message: res.data?.msg || `${res.data?.code} 失败`,
					type: "error",
				});
			}
		} else if (res.data == "") {
			ElMessage({
				message: "error: data为空",
				type: "error",
			});
			return;
		}

		return res.data;
	},
	(error) => {
		// ElLoading.service().close();
		ElMessage({
			message: `${error} `,
			type: "error",
		});
		return Promise.reject(error);
	}
);

export default instance;