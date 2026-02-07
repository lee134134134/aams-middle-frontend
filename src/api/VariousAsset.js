import { exportFilePost,exportFilePost1 } from "@/utils";
/**
 * 权益类组合一览表
 */

const API_URL = {
	getList: "/assetAllocationTrace/getPageList", // 数据列表
	listForExport: '/assetAllocationTrace/export', //导出
	getdownloadTemplate: '/assetAllocationTrace/getTemplate', //下载模板
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function handleDownloadTemplate(params) {
	return exportFilePost1(API_URL.getdownloadTemplate, params);
}