import { exportFilePost } from "@/utils";
/**
 * 权益类组合持仓表
 */

const API_URL = {
	getList: "/dataPacket/select", // 数据列表
	listForExport: '/dataPacket/download-zip', //导出
	update: '/dataPacket/update', //导出
};

export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function update(params) {
	return $http.post(API_URL.update, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}