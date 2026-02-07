import { defineStore } from "pinia";
const companyStore = defineStore({
	id: "bondDealStore",
	state: () => ({
		options: [],
	}),
	actions: {
		getCompanyType(options) {
			this.options = options;
		},
	},
});
export default companyStore;