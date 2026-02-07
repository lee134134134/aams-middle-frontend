import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/fixedIncomeAssetGroupPosition/getPageList", // 数据列表
	listForExport: '/fixedIncomeAssetGroupPosition/export', //导出
	// getAssetClassificationChart:"/fixedIncomeAssetGroupPosition/getAssetClassificationChart",//图表
	getAssetTypeClassificationChart:"/fixedIncomeAssetGroupPosition/getAssetTypeClassificationChart",//资产图表
	getDefaultAccountType:"/fixedIncomeAssetGroupPosition/getDefaultAccountType",//下拉option
	getBondPrimaryCategory:"/fixedIncomeAssetGroupPosition/getBondPrimaryCategory",//债券一级
	getBondSecondaryCategory:"/fixedIncomeAssetGroupPosition/getBondSecondaryCategory",//债券二级
	getDurationHistoricalVolatility:"/fixedIncomeAssetGroupPosition/getDurationHistoricalVolatility",//久期历史波动
	getTimeWeightedReturn:"/fixedIncomeAssetGroupPosition/getTimeWeightedReturn",//时间加权收益率
	getDurationDistribution:"/fixedIncomeAssetGroupPosition/getDurationDistribution"//久期分布
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function getAssetTypeClassificationChart(params) {
	return $http.post(API_URL.getAssetTypeClassificationChart, params);
}
export function getDefaultAccountType(params) {
	return $http.post(API_URL.getDefaultAccountType, params);
}
export function getBondPrimaryCategory(params) {
	return $http.post(API_URL.getBondPrimaryCategory, params);
}
export function getBondSecondaryCategory(params) {
	return $http.post(API_URL.getBondSecondaryCategory, params);
}
export function getDurationHistoricalVolatility(params) {
	return $http.post(API_URL.getDurationHistoricalVolatility, params);
}
export function getTimeWeightedReturn(params) {
	return $http.post(API_URL.getTimeWeightedReturn, params);
}
export function getDurationDistribution(params) {
	return $http.post(API_URL.getDurationDistribution, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}