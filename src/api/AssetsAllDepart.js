import { exportFilePost } from "@/utils";
/**
 * 公司流动性统计
 */

const API_URL = {
	getList: "/assetAllocationLiquid/getPageList", // 数据列表
	getInsuranceTree:"/assetAllocationLiquid/getInsuranceTree",//险种
	listForExport: '/assetAllocationLiquid/export', //导出
	querylist:"/liquidAssetContrastImage/querylist",//图表接口
	echartsExport:"/liquidAssetContrastImage/export"//图表导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function querylist(params) {
	return $http.post(API_URL.querylist, params);
}
export function getInsuranceTree(params) {
	return $http.post(API_URL.getInsuranceTree, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function echartsExport(params) {
	return exportFilePost(API_URL.echartsExport, params);
}