/**
 * 通用
 */

const API_URL = {
	getUsersTree: "/finprd-hldbond/selectDept1", // 账户树
	getTime: "/finprd-hldbond/getDateInfo", //默认回显时间
	getTransactionTime: "/dws-fix-astrd-trd/getMaxDateForDetailBySkZBPT", //交易流水默认回显时间
	roadShowCompany: "/road-company/getList", //四级联动
	roadCompanyList: "/road-manager/getList", //投资经理姓名列表
	userByCompanyName: "/road-company/getListByCompanyName", //公司列表
	userByCompanyType: "/dict/data/list", //公司类型列表
	userAllList: "/common/userAllList",//用户账户列表
	getScoreStatus: '/dict/data/list',//打分状态
	getDataInfo: "/positionAnalysis/getDataInfo1",//主页卡片
	getCaldDate: "/tradingdata/getCaldDateBySkZBPT", //获取交易日历日期
	selectDept: '/account/sob/code/selectDept',//自定义账户树接口
	selectInsuranceFlat: '/finprd-hldbond/selectInsuranceFlat', //险种下拉框（树）
	selectInsurance: '/finprd-hldbond/selectInsurance', //险种下拉框（树）
	selectStatistics: '/finprd-hldbond/selectStatistics', //统计账套下拉框
	getDefaultDate: '/accountCashFlow/getDefaultDate', //今年的开始结束日
	getStartAndEndDate: '/common/getStartAndEndDate', //今年的开始和T-x日
};

export function getUsersTree(params) {
	return $http.post(API_URL.getUsersTree, { status: "0", ...params });
}
export function getTimeDate(params) {
	return $http.post(API_URL.getTime, params);
}
export function getTransactionTime(params) {
	return $http.post(API_URL.getTransactionTime, params);
}
export function roadShowCompany(params) {
	return $http.post(API_URL.roadShowCompany, params);
}
export function roadCompanyList(params) {
	return $http.post(API_URL.roadCompanyList, params);
}
export function userByCompanyName(params) {
	return $http.post(API_URL.userByCompanyName, params);
}
export function userByCompanyType(params) {
	return $http.post(API_URL.userByCompanyType, { ...params, "dictType": "company_type" });
}
export function userAllList(params) {
	return $http.get(API_URL.userAllList, params);
}
export function getScoreStatus(params) {
	return $http.post(API_URL.getScoreStatus, { ...params, "dictType": "scorle_type" });
}
export function getDataInfo(params) {
	return $http.post(API_URL.getDataInfo, params);
}
export function getCaldDate(params) {
	return $http.post(API_URL.getCaldDate, params);
}
export function defaultSelectAccount(params) {
	return $http.post(API_URL.userByCompanyType, { ...params, "dictType": "default_select_account" });
}
export function selectDept(params) {
	return $http.post(API_URL.selectDept, { ...params });
}
export function selectInsurance(params) {
	return $http.post(API_URL.selectInsurance, params);
}
export function selectInsuranceFlat(params) {
	return $http.post(API_URL.selectInsuranceFlat, params);
}
export function selectStatistics(params) {
	return $http.post(API_URL.selectStatistics, params);
}
export function getDefaultDate(params) {
	return $http.post(API_URL.getDefaultDate, params);
}
export function getStartAndEndDate(params) {
	return $http.post(API_URL.getStartAndEndDate, params);
}