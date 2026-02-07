import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/asset/alloc/weekly/getPageList", // 数据列表
	listForExport: '/assetDetail/export', //导出
	getAssetType: '/common/getAssetType',//资产类型

	weeklyTiem: '/asset/alloc/weekly/paramQuery',  //获取周报日期
	weeklyTiemSave: '/asset/alloc/weekly/paramSave', //保存周报日期
	fillAndDownload: '/asset/alloc/weekly/fillAndDownload',//行数据下载

};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function getAssetType(params) {
	return $http.post(API_URL.getAssetType, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}

export function getWeeklyTiem(params) {
	return $http.get(API_URL.weeklyTiem, params);
}

export function weeklyTiemSave(params) {
	return $http.post(API_URL.weeklyTiemSave, params);
}

export function handleFillAndDownload(params) {
	return exportFilePost(API_URL.fillAndDownload, params);
}