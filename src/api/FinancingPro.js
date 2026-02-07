import { exportFilePost } from "@/utils";

const API_URL = {
	getList: "/financingLeverDistribute/getPageList", // 数据列表
	listForExport: '/financingLeverDistribute/export', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}


export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}