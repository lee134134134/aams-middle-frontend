import { exportFilePost } from "@/utils";
/**
 * 公司流动性统计
 */

const API_URL = {
	getList: "/companyLiquidityRatio/getPageList", // 数据列表
	listForExport: '/companyLiquidityRatio/export', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}