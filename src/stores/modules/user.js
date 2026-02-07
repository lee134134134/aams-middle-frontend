import { defineStore } from "pinia";
import { getInfo } from "@/api/system.js";
const userStore = defineStore({
  id: "userStore",
  state: () => ({
    relationId: "",
    userName: null,
	name:'',
    userId: "",
    createBy: '',
    token: "",
    permissions: [], // 用户所有权限
    userInfo: {}, //用户信息
    roleTags: [],
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      const params = {};
      await getInfo(params)
        .then((res) => {
          this.permissions = res?.data?.permissions || [];
          this.userName = res?.data?.sysUser?.username;
		  this.name = res?.data?.sysUser?.name;
          this.relationId = res?.data?.sysUser?.username;
          this.userId = res?.user?.data?.sysUser?.userId;
          this.userInfo = res?.data?.sysUser;
          this.roleTags = res?.data?.roleTags;
          this.createBy = res?.data?.sysUser?.createBy;
          sessionStorage.setItem("userName", res?.data?.sysUser?.username);
          sessionStorage.setItem("userId", res?.data?.sysUser?.userId);
		  sessionStorage.setItem("name", res?.data?.sysUser?.name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
export default userStore;
