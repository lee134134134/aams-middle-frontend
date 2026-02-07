import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/fixedIncomeAssetGroupOverview/getPageList", // 数据列表
	listForExport: '/fixedIncomeAssetGroupOverview/export', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}


export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}