import { exportFilePost } from "@/utils";
/**
 * 权益类组合持仓表
 */

const API_URL = {
	getList: "/equityPortfolioPosition/getEquityPortfolioPositionList", // 数据列表
	listForExport: '/equityPortfolioPosition/getEquityPortfolioPositionReport', //导出
	getPageList: '/assetPosition/getPageList', // 资产持仓查询
	exportAssetPosition: '/assetPosition/export', // 资产持仓导出
	floatingExport: '/equityPortfolioPosition/floatingExport', // 浮盈分布导出
	getfloatingProfitsDistribtion: '/equityPortfolioPosition/getfloatingProfitsDistribtion', // 浮盈分布查询
	getPositionPageList: '/assetPositionConcentration/getPageList', // 持仓集中度查询
	exportPosition: '/assetPositionConcentration/export', // 持仓集中度导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function getPageList(params) {
	return $http.post(API_URL.getPageList, params);
}
export function exportAssetPosition(params) {
	return exportFilePost(API_URL.exportAssetPosition, params);
}
export function floatingExport(params) {
	return exportFilePost(API_URL.floatingExport, params);
}
export function getfloatingProfitsDistribtion(params) {
	return $http.post(API_URL.getfloatingProfitsDistribtion, params);
}
export function exportPosition(params) {
	return exportFilePost(API_URL.exportPosition, params);
}
export function getPositionPageList(params) {
	return $http.post(API_URL.getPositionPageList, params);
}