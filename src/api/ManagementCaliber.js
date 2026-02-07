import { exportFilePost } from "@/utils";
/**
 * 管理口径
 */

const API_URL = {
	getList: "/assetCategoryAndYieldManage/getPageList", // 数据列表
	selectInsurance: '/finprd-hldbond/selectInsuranceFlat', //险种下拉框（树）
	selectStatistics: '/finprd-hldbond/selectStatistics', //统计账套下拉框
	listForExport: '/assetCategoryAndYieldManage/export', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function selectInsurance(params) {
	return $http.post(API_URL.selectInsurance, params);
}

export function selectStatistics(params) {
	return $http.post(API_URL.selectStatistics, params);
}

export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}