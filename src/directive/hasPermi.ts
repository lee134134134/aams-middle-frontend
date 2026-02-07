import userStore from "@/stores/modules/user.js";
import permissions from "@/utils/permissions.js";
/**
 * eg: v-hasPermi="['operate:businessMonthly:matters']"
 */
const hasPermiDirective = {
  mounted(el, binding, vnode, prevVnode) {
    const { value } = binding;
    if (value) {
      const Permi = permissions[value];
      const all_permission = "*:*:*";
      const system_permissions = userStore().permissions;
      const hasPermissions = system_permissions.some((val) => {
        return all_permission === val || Permi.includes(val);
      });

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  },
  unmounted(el: any) {},
};
const hasPermi = {
  install: function (app: any) {
    app.directive("hasPermi", hasPermiDirective);
  },
};
export default hasPermi;
