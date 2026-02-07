import { defineStore } from "pinia";
const InvestmentManagerStore = defineStore({
	id: "InvestmentManagerStore",
	state: () => ({
		options: [],
	}),
	actions: {
		getUserAllList(options) {
			this.options = options;
		},
	},
});
export default InvestmentManagerStore;