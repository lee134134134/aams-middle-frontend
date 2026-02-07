import { exportFilePost } from "@/utils";
/**
 * 权益类组合一览表
 */

const API_URL = {
	getList: "/pawnedBond/getPageList", // 数据列表
	selectInsurance: '/finprd-hldbond/selectInsuranceFlat', //险种下拉框（树）
	selectStatistics: '/finprd-hldbond/selectStatistics', //统计账套下拉框
	listForExport: '/pawnedBond/export', //导出
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