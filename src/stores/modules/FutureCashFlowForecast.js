import { defineStore } from "pinia";
const futureStore = defineStore({
	id: "futureStore",
	state: () => ({
		list1: [],
		pageSize1: 10,
		resetpageSize1: 10,
		pageNo1: 1,
		total1: 0,
		list2: [],
		pageSize2: 10,
		resetpageSize2: 10,
		pageNo2: 1,
		total2: 0,
		isLoading: false
	}),
	getters: {
		getContentList1: (state) => {
			if (state.resetpageSize1 != state.pageSize1) {
				state.pageNo1 = 1;
			}
			const start = (state.pageNo1 - 1) * state.pageSize1;
			const end = state.pageNo1 * state.pageSize1;
			state.resetpageSize1 = state.pageSize1;
			return state.list1?.slice(start, end)
		},
		getContentList2: (state) => {
			if (state.resetpageSize2 != state.pageSize2) {
				state.pageNo2 = 1;
			}
			const start = (state.pageNo2 - 1) * state.pageSize2;
			const end = state.pageNo2 * state.pageSize2;
			state.resetpageSize2 = state.pageSize2;
			return state.list2?.slice(start, end)
		},
	},
	actions: {
		// handleSizeChange(num, size) {
		// 	if (num == '1') {
		// 		this.pageSize1 = size;
		// 	} else {
		// 		this.pageSize2 = size;
		// 	}
		// },
		// handleCurrentChange(num, cur) {
		// 	if (num == '1') {
		// 		this.pageNo1 = cur;
		// 	} else {
		// 		this.pageNo2 = cur;
		// 	}
		// }
	},
});
export default futureStore;