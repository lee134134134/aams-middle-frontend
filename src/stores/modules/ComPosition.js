import {
	defineStore
} from "pinia";
const ComPosition = defineStore({
	id: "ComPosition",
	state: () => ({
		list1: [],
		resetlist1: [],
		pageSize1: 10,
		pageNo1: 1,
		resetpageSize1: 10,
		total1: 0,
		list2: [],
		resetlist12: [],
		pageSize2: 10,
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
		sortList(obj) {
			let list = JSON.parse(JSON.stringify(this.list1));
			if (obj.order == 'ascending' && this.list1.length > 0) {
				list.sort((n, m) => {
					const numA = parseFloat(n[obj.prop].replace(/,/g, ''));
					const numB = parseFloat(m[obj.prop].replace(/,/g, ''));
					if(Object.is(numA,-0)&&Object.is(numB,0)) return -1;
					if(Object.is(numA,0)&&Object.is(numB,-0)) return 1;
					return numA - numB;
				})
			} else if (obj.order == 'descending' && this.list1.length > 0) {
				list.sort((n, m) => {
					const numA = parseFloat(n[obj.prop].replace(/,/g, ''));
					const numB = parseFloat(m[obj.prop].replace(/,/g, ''));
					if(Object.is(numA,-0)&&Object.is(numB,0)) return 1;
					if(Object.is(numA,0)&&Object.is(numB,-0)) return -1;
					return numB- numA;
					// return parseFloat(m[obj.prop].replace(/,/g, '')) - parseFloat(n[obj.prop].replace(/,/g, ''))
				})
			} else {
				list = JSON.parse(JSON.stringify(this.resetlist1));
			}
			this.list1 = JSON.parse(JSON.stringify(list));
		},
		sortList1(obj) {
			let list = JSON.parse(JSON.stringify(this.list2));
			if (obj.order == 'ascending' && this.list2.length > 0) {
				list.sort((n, m) => {
					const numA = parseFloat(n[obj.prop].replace(/,/g, ''));
					const numB = parseFloat(m[obj.prop].replace(/,/g, ''));
					if(Object.is(numA,-0)&&Object.is(numB,0)) return -1;
					if(Object.is(numA,0)&&Object.is(numB,-0)) return 1;
					return numA - numB;
				})
			} else if (obj.order == 'descending' && this.list2.length > 0) {
				list.sort((n, m) => {
					const numA = parseFloat(n[obj.prop].replace(/,/g, ''));
					const numB = parseFloat(m[obj.prop].replace(/,/g, ''));
					if(Object.is(numA,-0)&&Object.is(numB,0)) return 1;
					if(Object.is(numA,0)&&Object.is(numB,-0)) return -1;
					return numB- numA;
				})
			} else {
				list = JSON.parse(JSON.stringify(this.resetlist12));
			}
			this.list2 = JSON.parse(JSON.stringify(list));
		}
		
	},
});
export default ComPosition;