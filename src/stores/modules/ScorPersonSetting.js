import { defineStore } from "pinia";
const ScorPersonSetting = defineStore({
	id: "ScorPersonSetting",
	state: () => ({
		tableList: [],
		status:'',
		flag:''
	}),
	actions: {
		getUserAllList(tableList) {
			this.tableList = tableList;
		},
		getUserAllstatus(status) {
			this.status = status;
		},
		getUserAllflag(flag) {
			this.flag = flag;
		},
	},
});
export default ScorPersonSetting;