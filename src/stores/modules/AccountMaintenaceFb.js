import { defineStore } from "pinia";
const TeamfbStore = defineStore({
	id: "TeamfbStore",
	state: () => ({
		fblist1: [],
		fbpageSize1: 10,
		fbpageNo1: 1,
		fbtotal1: 0,
		fbisLoading: false,
		fbpageSize:10
	}),
	getters: {
		fbgetContentList1: (state) => {
			if(state.fbpageSize!=state.fbpageSize1){
				state.fbpageNo1 = 1;
			}
			const start = (state.fbpageNo1 - 1) * state.fbpageSize1;
			const end = state.fbpageNo1 * state.fbpageSize1;
			state.fbpageSize = state.fbpageSize1;
			return state.fblist1?.slice(start, end)
		},
	},
	actions: {
	},
});
export default TeamfbStore;