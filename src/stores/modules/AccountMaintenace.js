import { defineStore } from "pinia";
const TeamStore = defineStore({
	id: "TeamStore",
	state: () => ({
		list1: [],
		pageSize1: 10,
		pageNo1: 1,
		total1: 0,
		isLoading: false,
		pageSize:10
	}),
	getters: {
		getContentList1: (state) => {
			if(state.pageSize!=state.pageSize1){
				state.pageNo1 = 1;
			}
			const start = (state.pageNo1 - 1) * state.pageSize1;
			const end = state.pageNo1 * state.pageSize1;
			state.pageSize = state.pageSize1;
			return state.list1?.slice(start, end)
		},
	},
	actions: {
	},
});
export default TeamStore;