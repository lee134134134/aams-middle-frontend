import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/dashboard/querylist", // 数据列表
	querylist:"/assetCategoriesForFinance/querylist",//统计账套数据列表
	selectInsurance: '/finprd-hldbond/selectInsuranceFlat', //险种下拉框（树）
	selectStatistics: '/finprd-hldbond/selectStatistics', //统计账套下拉框
	listForExport: '/asset/classes/getListForExport', //导出
	export: '/assetCategoriesForFinance/export', //统计账套导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function querylist(params) {
	return $http.post(API_URL.querylist, params);
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
export function handleExportFileNew(params) {
	return exportFilePost(API_URL.export, params);
}