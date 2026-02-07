import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/assetDetail/getPageList", // 数据列表
	listForExport: '/assetDetail/export', //导出
	getAssetType:'/common/getAssetType'//资产类型
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