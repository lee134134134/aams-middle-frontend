import { exportFilePost } from "@/utils";
/**
 * 权益类组合一览表
 */

const API_URL = {
  getList: '/attributionAnalysis/getPageList', // 数据列表
  listForExport: '/attributionAnalysis/export', //导出
  getVariableStartAndEndDate: '/common/getStartAndEndDate'
}

export function getList(params) {
	return $http.post(API_URL.getList, params);
}

export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function getVariableStartAndEndDate(params) {
	return $http.post(API_URL.getVariableStartAndEndDate, params);
}