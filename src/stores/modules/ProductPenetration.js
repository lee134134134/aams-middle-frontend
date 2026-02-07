import { defineStore } from "pinia";
const ProductPenetrationStore = defineStore({
	id: "ProductPenetrationStore",
	state: () => ({
		status:false
	}),
	actions: {
		getProductPenetrationStorestatus(status) {
			this.status = status;
		},
	},
});
export default ProductPenetrationStore;