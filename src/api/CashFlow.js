import { exportFilePost,exportFilePost1 } from "@/utils";

const API_URL = {
	getList: '/valid/cashFlow/getList', // 列表
	getdownloadTemplate: '/valid/cashFlow/downloadTemplate', //下载模板
	getExport: '/valid/cashFlow/export', //导出
	getSachList:"/dict/data/list",//字典
	deleteData:"/valid/cashFlow/delete"//批量删除
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function handleDownloadTemplate(params) {
	return exportFilePost1(API_URL.getdownloadTemplate, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.getExport, params);
}
export function getSachList(params) {
	return $http.post(API_URL.getSachList, params);
}
export function deleteData(params) {
	return $http.post(API_URL.deleteData, params);
}