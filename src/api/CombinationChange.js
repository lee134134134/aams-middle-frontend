import { exportFilePost } from "@/utils";
/**
 * 权益类组合一览表
 */

const API_URL = {
	getList: "/compositeStructureChanges/querylist", // 数据列表
	listForExport: '/compositeStructureChanges/export', //导出
	getVariableStartAndEndDate:"/common/getDate"
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function getVariableStartAndEndDate(params) {
	return $http.post(API_URL.getVariableStartAndEndDate, params);
}