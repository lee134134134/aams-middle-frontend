import axios from "axios";
const DOMAIN =
	import.meta.env.VITE_APP_HTTP_DOMAIN;
const NODE_ENV =
	import.meta.env.VITE_APP_NODE_ENV;
import {
	ElMessage
} from "element-plus";
import VueCookies from "vue-cookies";
window.$cookies = VueCookies;
import {
	subStr
} from "@/utils"
export default function exportFilePost(url, options = {}, callback) {
	return new Promise((resolve, reject) => {
		// console.log(`${url} 请求数据，参数=>`, JSON.stringify(options));
		axios.defaults.headers["content-type"] = "application/json;charset=UTF-8";
		axios.defaults.headers["Content-disposition"] = "attachment";
		axios.defaults.headers["Access-Control-Expose-Headers"] = "Authorization";

		const userName = sessionStorage.getItem("userName");
		const userId = sessionStorage.getItem("userId");
		const token = $cookies.get("portal_token");
		axios.defaults.headers["token"] = token;
		axios.defaults.headers["Authorization"] = "Bearer " + token;
		axios.defaults.headers["userName"] = userName;
		axios.defaults.headers["userId"] = userId;

		const baseURL = NODE_ENV == "local" ? `/aams-business${url}` : `${DOMAIN}${url}`;

		// console.log("options", options);
		axios({
			method: "post",
			// url: `${DOMAIN}${url}`, // 请求地址
			url: baseURL, // 请求地址
			// url: url, // 本地请求地址
			data: options, // 参数
			responseType: "blob", // 表明返回服务器返回的数据类型
		}).then(
			(response) => {
				let blob = new Blob([response.data], {
					type: "application/vnd.ms-excel",
				});
				console.log(response);
				let fileName = decodeURIComponent(response?.headers?.filename);
				if (!fileName) {
					ElMessage({
						message: `未获取到文件`,
						type: "error",
					});
					return;
				}
				if (window.navigator.msSaveOrOpenBlob) {
					// console.log(2)
					navigator.msSaveBlob(blob, fileName);
				} else {
					// console.log(3)
					var link = document.createElement("a");
					link.href = window.URL.createObjectURL(blob);
					link.download = fileName;
					link.click();
					//释放内存
					window.URL.revokeObjectURL(link.href);
				}
				resolve(response.status);
				
				callback ? resolve(callback(response)) : resolve(response);
				ElMessage({
					message: `下载成功`,
					type: "success",
				});
			},
			(err) => {
				reject(err);
			}
		);
	}).then((res) => {
		// console.log(" new promise res", res);
	});
}
