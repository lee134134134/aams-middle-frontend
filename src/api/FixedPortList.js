import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/fixedIncomeAssetGroupTrade/getPageList", // 数据列表
	listForExport: '/fixedIncomeAssetGroupTrade/export', //导出
	getAssetClassificationChart:"/fixedIncomeAssetGroupTrade/getSequenceChart",//图表
	getSequenceChartQueryCondition:"/fixedIncomeAssetGroupTrade/getSequenceChartQueryCondition"
	
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function getAssetClassificationChart(params) {
	return $http.post(API_URL.getAssetClassificationChart, params);
}

export function getSequenceChartQueryCondition(params) {
	return $http.post(API_URL.getSequenceChartQueryCondition, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}