import { exportFilePost , exportFilePost1} from "@/utils";

const API_URL = {
	
	getAddressBook: '/addressBook/getAddressBook', // 通讯录
	getAddressBookById: '/addressBook/getById', // 通讯录详情
	
	
	
	getList: "/accountEntryRecord/select", // 数据列表
	getDictData:'/accountEntryRecord/getDictData',//查询条件
	getFundNameList:'/prodAndInvestUnit/getFundNameList',//查询条件
	getInvestUnitList:'/prodAndInvestUnit/getInvestUnitList',//查询条件
	getdownloadTemplate: '/accountEntryRecord/downloadTemplate', //下载模板
	getreview:"/accountEntryRecord/review",//复核
	turnDown:"/accountEntryRecord/turnDown",//驳回
	deleteDate:"/accountEntryRecord/delete",
	cancellation:"/accountEntryRecord/cancellation",
	getAddresserName:"/accountEntryRecord/getAddresserName",//获取发件人
	listForExport: '/accountEntryRecord/export', //导出
	getInvestUnitListByFundCode:"/prodAndInvestUnit/getInvestUnitListByFundCode",//调入调出传基金
	InsertList:"/accountEntryRecord/insert",// 新增
	updateList:"/accountEntryRecord/update",// 编辑
	geFundAndInvestUnitForSelectList:"/accountEntryRecord/geFundAndInvestUnitForSelectList",//新查询下拉
	sendMail:"/accountEntryRecord/sendMail",//发送邮件
	getDefaultNonStandardData:"/accountEntryRecord/getDefaultNonStandardData",//非标表格"
	saveNonStandardCollect:"/accountEntryRecord/saveNonStandardCollect"//非标保存
};


export function getAddressBook(params) {
	return $http.get(API_URL.getAddressBook, params);
}
export function getAddressBookById(params) {
	return $http.get(API_URL.getAddressBookById, params);
}



// 非标
export function getDefaultNonStandardData(params) {
	return $http.post(API_URL.getDefaultNonStandardData, params);
}
export function saveNonStandardCollect(params) {
	return $http.post(API_URL.saveNonStandardCollect, params);
}


export function getList(params) {
	return $http.post(API_URL.getList, params);
}
export function getDictData(params) {
	return $http.post(API_URL.getDictData, params);
}
export function getFundNameList(params) {
	return $http.post(API_URL.getFundNameList, params);
}
export function getInvestUnitList(params) {
	return $http.post(API_URL.getInvestUnitList, params);
}
export function handleDownloadTemplate(params) {
	return exportFilePost1(API_URL.getdownloadTemplate, params);
}
export function getreview(params) {
	return $http.post(API_URL.getreview, params);
}
export function turnDown(params) {
	return $http.post(API_URL.turnDown, params);
}
export function deleteDate(params) {
	return $http.post(API_URL.deleteDate, params);
}
export function cancellation(params) {
	return $http.post(API_URL.cancellation, params);
}
export function getAddresserName(params) {
	return $http.post(API_URL.getAddresserName, params);
}
export function handleExportFile(params) {
	return exportFilePost(API_URL.listForExport, params);
}
export function getInvestUnitListByFundCode(params) {
	return $http.post(API_URL.getInvestUnitListByFundCode, params);
}
export function InsertList(params) {
	return $http.post(API_URL.InsertList, params);
}
export function updateList(params) {
	return $http.post(API_URL.updateList, params);
}
export function geFundAndInvestUnitForSelectList(params) {
	return $http.post(API_URL.geFundAndInvestUnitForSelectList, params);
}
export function sendMail(params) {
	return $http.post(API_URL.sendMail, params);
}