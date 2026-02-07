import { exportFilePost } from "@/utils"
/**
 * 权益类组合一览表
 */
const API_URL = {
  getList: "/equityAssetGroupOverview/getPageList", // 数据列表
  selectInsurance: "/finprd-hldbond/selectInsuranceFlat", //险种下拉框（树）
  selectStatistics: "/finprd-hldbond/selectStatistics", //统计账套下拉框
  getInvestmanagerList: "/equityAssetGroupOverview/getInvestmanagerList", //热力图投资经理查询接口
  getHeatMap: "/equityAssetGroupOverview/getHeatMap", //热力图查询接口
  listForExport: "/equityAssetGroupOverview/export", //导出
}
/**
 * 获取权益类组合一览表数据列表
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function getList(params) {
  return window.$http.post(API_URL.getList, params)
}
/**
 * 获取权益类组合一览表险种下拉框
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function selectInsurance(params) {
  return window.$http.post(API_URL.selectInsurance, params)
}
/**
 * 获取权益类组合一览表统计账套下拉框
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function selectStatistics(params) {
  return window.$http.post(API_URL.selectStatistics, params)
}
/**
 * 获取权益类组合一览表导出
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function handleExportFile(params) {
  return exportFilePost(API_URL.listForExport, params)
}
/**
 * 获取权益类组合一览表热力图投资经理查询
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function getInvestmanagerList(params) {
  return window.$http.post(API_URL.getInvestmanagerList, params)
}
/**
 * 获取权益类组合一览表热力图查询
 * @param {object} params 查询参数
 * @returns {Promise} 返回请求对象
 */
export function getHeatMap(params) {
  return window.$http.post(API_URL.getHeatMap, params)
}
