<template>
	<div class="container">
		<el-table class="left-module" v-loading="isLoading" ref="tableRef" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
			:max-height="tableHeight" :data="tableData" :header-cell-style="{
				background: '#E4EFFF',
				color: '#333333',
				height: '38px',
			}" border stripe>
			<el-table-column v-for="(item, i) in tabcolums3" :key="item.key" :prop="item.key" :label="item.name"
				:sortable="item.sortable" :fixed="item.fixed" :min-width="item.width" show-overflow-tooltip
				:align="item.align" :resizable="false">
				<template v-if="item.child">
					<el-table-column v-for="(items, index) in item.child" :key="items.key" :prop="items.key"
						:label="items.name" :min-width="items.width" show-overflow-tooltip :align="items.align"
						:resizable="false"></el-table-column>
				</template>
			</el-table-column>
			<template #empty>
				<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
					<img src="../../../assets/images/empty.png" style="height:200px;" />
					<div v-if="downloadBool">请输入查询条件并点击查询</div>
					<div v-else>暂无数据</div>
				</div>
			</template>
		</el-table>
		<el-table class="right-module" v-loading="isLoading" ref="tableRef1" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
			:max-height="tableHeight" :data="tableData1" :header-cell-style="{
				background: '#E4EFFF',
				color: '#333333',
				height: '38px',
			}" border stripe>
			<el-table-column v-for="(item, i) in tabcolums4" :key="item.key" :prop="item.key" :label="item.name"
				:sortable="item.sortable" :fixed="item.fixed" :min-width="item.width" show-overflow-tooltip
				:align="item.align" :resizable="false">
			</el-table-column>
			<template #empty>
				<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
					<img src="../../../assets/images/empty.png" style="height:200px;" />
					<div v-if="downloadBool">请输入查询条件并点击查询</div>
					<div v-else>暂无数据</div>
				</div>
			</template>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getfloatingProfitsDistribtion } from "@/api/ComPosition.js";
import { tabcolums3, tabcolums4 } from "./common.js";
import VChart from 'vue-echarts';
const emit = defineEmits(['changeLoading'])
import _ from "lodash"
const isLoading = ref(false)
const tableData = ref([])
const tableData1 = ref([])
const tableRef = ref<TableInstance>();
const tableRef1 = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 280);
// 表格数据
const props = defineProps({
	downloadBool: {
		type: Boolean,
		default: true,
	}
});
let getContentList = async (obj: any) => {
	isLoading.value = true;
	emit('changeLoading', true)
	let res = await getfloatingProfitsDistribtion(obj).catch(() => {
		isLoading.value = false;
	    emit('changeLoading', false)
	});
	isLoading.value = false;
	emit('changeLoading', false)
	if (res && res.code === '00000') {
		tableData.value = res.data.floatingProfitVoList
		tableData1.value = res.data.fundTypeVoList
	}
}

defineExpose({
	tableRef,
	tableRef1,
	getContentList
});
</script>

<style scoped lang="scss">
.btnArr {
	margin-bottom: 10px;
}

.upload-demo {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

:deep(.el-switch--small .el-switch__core) {
	width: 45px !important;
}

:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
	border-right: 1px solid #ddd !important;
}

:deep(.el-table__header-wrapper .el-table__header .is-center) {
	border-bottom: 1px solid #ddd !important;
}

:deep(.customColor) {
	.cell {
		color: #2173F7 !important;
		font-weight: 600;
	}
}

:deep(.customBold) {
	font-weight: 600;
}

.container {
	display: flex;
	// align-items: center;
}

.left-module {
	width: 60%;
}

.right-module {
	width: 40%;
	margin-left: 20px;
}
</style>