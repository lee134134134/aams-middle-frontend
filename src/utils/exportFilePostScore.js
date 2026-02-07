import axios from "axios";
const DOMAIN =
	import.meta.env.VITE_APP_HTTP_DOMAIN_SCORE;
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
		const token = $cookies.get("portal_token");
		const userId = sessionStorage.getItem("userId");
		axios.defaults.headers["token"] = token;
		axios.defaults.headers["Authorization"] = "Bearer " + token;
		axios.defaults.headers["userName"] = userName;
		axios.defaults.headers["userId"] = userId;
		const baseURL = NODE_ENV == "local" ? `/institute-rating-backend-biz${url}` : `${DOMAIN}${url}`;
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
				console.log("response", response);

				let blob = new Blob([response.data], {
					type: "application/vnd.ms-excel",
				});
				// console.log(blob);
				let fileName = decodeURIComponent(response?.headers?.filename);
				// console.log(fileName,fileName == 'undefined',!fileName);
				/**	fileName不存在是undefined  !fileName会导致下载文件是错误undefined文件
				 * * 	解决办法：
				 * 	1. fileName == 'undefined' 等后续再完善这个逻辑判断
				 */
				// if (!fileName) {
				// 	ElMessage({
				// 		message: `未获取到文件`,
				// 		type: "error",
				// 	});
				// 	return;
				// }
				if (fileName == 'undefined') {
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
					message: `导出成功`,
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
