import { exportFilePost1 } from "@/utils";
/**
 * 自由账户配置
 */

const API_URL = {
  getScbCodeList: "/account/config/getScbCodeList", // 数据列表
  getPageList: "/account/config/getPageList", // 数据列表
  insertOne: "/account/config/insertOne", // 新增
  deleteList: "/account/config/delete", // 数据列表
  updateList: "/account/config/update", // 编辑数据
  getSignupList: "/account/sob/code/getById", // 数据列表
  signup: "/account/sob/code/insertOne",
  getTemplate: "/account/sob/code/getTemplate", // 下载模板
  getDadTemplate: "/account/sob/code/getDadTemplate", // 下载父级模板
};

export function getList(params) {
  return $http.post(API_URL.getScbCodeList, params);
}
export function getPageList(params) {
  return $http.post(API_URL.getPageList, params);
}
export function insertOne(params) {
  return $http.post(API_URL.insertOne, params);
}
export function deleteList(params) {
  return $http.post(API_URL.deleteList, params);
}
export function updateList(params) {
  return $http.post(API_URL.updateList, params);
}
export function getSignupList(params) {
  return $http.post(API_URL.getSignupList, params);
}
export function signup(params) {
  return $http.post(API_URL.signup, params);
}
export function getTemplate(params) {
  return exportFilePost1(API_URL.getTemplate, params);
}
export function getDadTemplate(params) {
  return exportFilePost1(API_URL.getDadTemplate, params);
}
