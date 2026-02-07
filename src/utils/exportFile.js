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
export default function exportFile(url, options = {}, callback) {
	return new Promise((resolve, reject) => {
		// console.log(`${url} 请求数据，参数=>`, JSON.stringify(options));
		axios.defaults.headers["content-type"] = "application/json;charset=UTF-8";
		axios.defaults.headers["Content-disposition"] = "attachment";
		axios.defaults.headers["Access-Control-Expose-Headers"] = "Authorization";

		const userName = sessionStorage.getItem("userName");
		const token = $cookies.get("portal_token");
		axios.defaults.headers["token"] = token;
		axios.defaults.headers["Authorization"] = "Bearer " + token;
		axios.defaults.headers["userName"] = userName;

		const baseURL = NODE_ENV == "local" ? `/aams-business${url}` : `${DOMAIN}${url}`;

		axios({
			method: "get",
			// url: `${DOMAIN}${url}`, // 请求地址
			url: baseURL, // 请求地址
			params: options, // 参数
			responseType: "blob", // 表明返回服务器返回的数据类型
		}).then(
			(response) => {

				let blob = new Blob([response.data], {
					type: "application/octet-stream",
				});
				let fileName = decodeURIComponent(subStr(response?.config?.params?.url));
				if (!fileName) {
					ElMessage({
						message: `未获取到文件`,
						type: "error",
					});
					return;
				}
				if (window.navigator.msSaveOrOpenBlob) {
					navigator.msSaveBlob(blob, fileName);
				} else {
					var link = document.createElement("a");
					link.href = window.URL.createObjectURL(blob);
					link.download = fileName;
					link.click();
					//释放内存
					window.URL.revokeObjectURL(link.href);
				}
				resolve(response.status);

				callback ? resolve(callback(response)) : resolve(response);
			},
			(err) => {
				reject(err);
			}
		);
	}).then((res) => {
		// console.log(" new promise res", res);
	});
}
