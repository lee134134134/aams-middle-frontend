import { exportFilePost } from "@/utils";
/**
 * 权益类组合一览表
 */

const API_URL = {
	getList: "/assetCategoryAndYieldActual/getPageList", // 数据列表
	listForExport: '/assetCategoryAndYieldActual/export', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}