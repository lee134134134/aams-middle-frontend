/**
 * 请求组合系统接口
 */


const API_URL = {
  getInfo: "/admin/user/info", // getInfo
  getTree: "system/dept/treeselect",
  getName: '/system/user/list'
};

export function getInfo(params) {
  return $http.get_sys(API_URL.getInfo, params);
}
export function getTree(params) {
  return $http.get_sys(API_URL.getTree, params);
}

export function getName(params) {
  return $http.get_sys(API_URL.getName, params);
}