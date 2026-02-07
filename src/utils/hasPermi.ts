import userStore from "@/stores/modules/user.js";
import permissions from "@/utils/permissions.js";
import roles from "@/utils/roles.js";
/**
 * 按钮 或 标签权限
 * @returns true 显示 false 不渲染
 */
export const isPermi = (permiKey) => {
  const Permi = permissions[permiKey];
  const system_permissions = userStore().permissions;
  const all_permission = "*:*:*";
  const hasPermissions = system_permissions.some((val) => {
    return all_permission === val || Permi.includes(val);
  });

  return hasPermissions;
};

/**
 * 角色
 * @returns true 显示 false 不渲染
 */
export const isRole = (roleKey) => {
  const Role = roles[roleKey];
  const system_roles = userStore().roles;
  const all_role = "admin";
  const hasRole = system_roles.some((val) => {
    return all_role === val || Role.includes(val);
  });

  return hasRole;
};
