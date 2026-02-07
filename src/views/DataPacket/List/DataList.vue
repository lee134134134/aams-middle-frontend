<template>
	<el-row :gutter="20" v-loading="isLoading">
		<el-col :span="12">
			<el-table ref="tableRef1" :max-height="tableHeight" style="width: 100%" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
				:data="tableDataLeft" :header-cell-style="{
			        background: '#E4EFFF',
			        color: '#333333',
			        height: '38px',
			    }" border :row-key="getRowKeys" @selection-change="handleSelectionChangeL">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column v-for="(item, i) in tabcolums" :key="item.key" :prop="item.key" :label="item.name"
					:fixed="item.fixed" :min-width="item.width" show-overflow-tooltip :align="item.align">
					<template #default="scope" v-if="item.key == 'code'">
						<el-select v-model="scope.row.code" popper-class="custom-select" placeholder="请选择账户名称"
							style="width:100%;" filterable clearable @change="handelClick">
							<el-option v-for="(item, i) in selectListCode" :key="i" :label="item.value"
								:value="item.value" />
						</el-select>
					</template>
					<template #default="scope" v-if="item.key == 'investType'">
						<el-select v-model="scope.row.investType" popper-class="custom-select" placeholder="请选择统计口径"
							style="width:100%;" clearable node-key="value" collapse-tags multiple
							:max-collapse-tags="1" @blur="handelClick">
							<el-option v-for="(item, i) in selectListData" :key="i" :label="item.label"
								:value="item.value" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="210" align="center">
					<template #default="scope">
						<el-button icon="Plus" class="button-custom1" type="primary" plain size="small"
							@click="handelClick('add',scope.row)" :disabled="tableData.length>=40" data-track-id="DataPacket-add-btn"
								data-track-name="瑞众人寿报表数据包-添加"></el-button>
						<el-button icon="Top" class="button-custom2" type="primary" plain size="small"
							@click="handelClick('top',scope.row)" :disabled="scope.row.top==true" data-track-id="DataPacket-up-btn"
								data-track-name="瑞众人寿报表数据包-上移"></el-button>
						<el-button icon="Bottom" class="button-custom3" type="primary" plain size="small"
							@click="handelClick('bottom',scope.row)"
							:disabled="tableDataLeft.length===1 || scope.row.bottom==true" data-track-id="DataPacket-bottom-btn"
								data-track-name="瑞众人寿报表数据包-下移"></el-button>
						<el-button icon="Delete" class="button-custom4" type="danger" plain size="small"
							@click="handelClick('delete',scope.row)" :disabled="tableDataLeft.length===1" data-track-id="DataPacket-delete-btn"
								data-track-name="瑞众人寿报表数据包-删除"></el-button>
					</template>
				</el-table-column>
				<template #empty>
					<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
						<img src="../../../assets/images/empty.png" style="height:200px;" />
						<div>请输入查询条件并点击查询</div>
					</div>
				</template>
			</el-table>
		</el-col>
		<el-col :span="12">
			<el-table ref="tableRef2" style="width: 100%" show-overflow-tooltip :data="tableDataRight" :max-height="tableHeight"
				:header-cell-style="{
			        background: '#E4EFFF',
			        color: '#333333',
			        height: '38px',
			    }" border :row-key="getRowKeys" v-if="tableDataRight.length" @selection-change="handleSelectionChangeR">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column v-for="(item, i) in tabcolums" :key="item.key" :prop="item.key" :label="item.name"
					:fixed="item.fixed" :min-width="item.width" show-overflow-tooltip :align="item.align">
					<template #default="scope" v-if="item.key == 'code'">
						<el-select v-model="scope.row.code" popper-class="custom-select" placeholder="请选择账户名称"
							style="width:100%;" filterable clearable @change="handelClick">
							<el-option v-for="(item, i) in selectListCode" :key="i" :label="item.value"
								:value="item.value" />
						</el-select>
					</template>
					<template #default="scope" v-if="item.key == 'investType'">
						<el-select v-model="scope.row.investType" popper-class="custom-select" placeholder="请选择统计口径"
							style="width:100%;" clearable node-key="value" collapse-tags multiple
							:max-collapse-tags="1" @blur="handelClick">
							<el-option v-for="(item, i) in selectListData" :key="i" :label="item.label"
								:value="item.value" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="210" align="center">
					<template #default="scope">
						<el-button icon="Plus" class="button-custom1" type="primary" plain size="small"
							@click="handelClick('add',scope.row)" :disabled="tableData.length>=40" data-track-id="DataPacket-add-btn"
								data-track-name="瑞众人寿报表数据包-添加"></el-button>
						<el-button icon="Top" class="button-custom2" type="primary" plain size="small"
							@click="handelClick('top',scope.row)" data-track-id="DataPacket-up-btn"
								data-track-name="瑞众人寿报表数据包-上移"></el-button>
						<el-button icon="Bottom" class="button-custom3" type="primary" plain size="small"
							@click="handelClick('bottom',scope.row)" :disabled="scope.row.bottom==true" data-track-id="DataPacket-bottom-btn"
								data-track-name="瑞众人寿报表数据包-下移"></el-button>
						<el-button icon="Delete" class="button-custom4" type="danger" plain size="small"
							@click="handelClick('delete',scope.row)" data-track-id="DataPacket-delete-btn"
								data-track-name="瑞众人寿报表数据包-删除"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
	import { ref, computed, nextTick, watchEffect } from "vue";
	import { ElMessage, ElMessageBox } from "element-plus";
	import { getList, update } from "@/api/DataPacket.js";
	import { data, sort } from "./common.js";
	import _ from "lodash"

	// 表格数据
	const props = defineProps({
		selectListCode: {
			type: Object,
			default: [],
		},
	});
	let tableDataLeft = ref([]);
	let tableDataRight = ref([]);
	

	// 口径
	let selectListData = ref([
		{ value: '3', label: '主动资产' },
		{ value: '1', label: '存量风险' },
		{ value: '2', label: '专项信托资产' },
		{ value: '4', label: '主动加存量风险资产' },
		{ value: '5', label: '全口径' },
	])
	const tableData = ref([]);
	watchEffect(() => {
		if (tableData.value.length <= 20) {
			tableDataLeft.value = [...tableData.value]
			tableDataRight.value = []
		} else {
			tableDataLeft.value = tableData.value.slice(0, 20);
			tableDataRight.value = tableData.value.slice(20);
		}

	})
	let tableSelectListL = ref([]);
	let tableSelectListR = ref([]);
	let SelectList = ref([]);
	const tableRef1 = ref<TableInstance>();
	const tableRef2 = ref<TableInstance>();
	const tableHeight = ref(window.innerHeight - 250);
	const tabcolums = ref(data);
	let isLoading = ref(false);
	let formData = ref({});
	const emit = defineEmits(["DateListEvent", "upDataList"]);
	// 获取列表数据
	let getContentList = async (obj : any, val, bool = false) => {
		formData.value = obj;
		isLoading.value = true;
		let res = await getList(obj);
		isLoading.value = false;
		if (res && res.code === '00000') {
			if (val === '1' && res.data[0].dataPacketVoList.length > 0) {
				SelectList.value = bool?[]:res.data[0].selectedIdList;
				tableData.value = res.data[0].dataPacketVoList.map((item, index, arr) => {
					if (index == 0) {
						return {
							...item,
							index,
							top: true,
							bottom: false
						}
					} else if (index == 39 || index == arr.length - 1) {
						return {
							...item,
							index,
							top: false,
							bottom: true
						}
					} else {
						return {
							...item,
							index,
							top: false,
							bottom: false
						}
					}

				})

			} else if (val === '2' && res.data[1].dataPacketVoList.length > 0) {
				SelectList.value = bool?[]:res.data[1].selectedIdList;
				tableData.value = res.data[1].dataPacketVoList.map((item, index,arr) => {
					if (index == 0) {
						return {
							...item,
							index,
							top: true,
							bottom: false
						}
					} else if (index == 39 || index == arr.length - 1) {
						return {
							...item,
							index,
							top: false,
							bottom: true
						}
					} else {
						return {
							...item,
							index,
							top: false,
							bottom: false
						}
					}
				})
			} else {
				tableData.value = [];
			}
			// 回显需要选中的行
			tableRef1.value.clearSelection();
			tableRef2.value?.clearSelection();
			if (!bool) {
				await nextTick();
				tableData.value.forEach(row => {
					if (SelectList.value.includes(row.id) && tableRef1.value) {
						tableRef1.value.toggleRowSelection(row, true);
					}
					if (SelectList.value.includes(row.id) && tableRef2.value) {
						tableRef2.value.toggleRowSelection(row, true);
					}
				});
			}

		}
	};
	const getRowKeys = row => {
		return row.id;
	};
	const handleSelectionChangeL = selection => {
		tableSelectListL.value = selection.map(item => item.id);
	};
	const handleSelectionChangeR = selection => {
		tableSelectListR.value = selection.map(item => item.id);
	};
	const handelClick = async (str='', row={}) => {
		let obj = {
			code: "",
			investType: []
		}
		let Data = _.cloneDeep(tableData.value);
		if (str == 'add') {
			isLoading.value = true;
			Data.splice(row.index + 1, 0, obj);
			initTableData(Data)
		} else if (str == 'top') {
			isLoading.value = true;
			[Data[row.index], Data[row.index - 1]] = [Data[row.index - 1], Data[row.index]];
			initTableData(Data)
		} else if (str == 'bottom') {
			isLoading.value = true;
			[Data[row.index], Data[row.index + 1]] = [Data[row.index + 1], Data[row.index]];
			initTableData(Data)
		} else if (str == 'delete') {
			await ElMessageBox.confirm(`确定删除此数据吗?`, {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					isLoading.value = true;
					Data.splice(row.index, 1);
					initTableData(Data)
				})
				.catch(() => {

				});
		}else{
			initTableData(Data)
		}

	}
	const initTableData = async (data) => {
		formData.value.tjztDataPacketVo.dataPacketVoList = data;
		formData.value.tjztDataPacketVo.dataPacketTypeNum = formData.value.dataPacketType;
		formData.value.tjztDataPacketVo.dataPacketTypeName = formData.value.dataPacketType == '1' ? '周度' : '月度';
		formData.value.tjztDataPacketVo.selectedIdList = [...tableSelectListL.value, ...tableSelectListR.value];
		let res = await update({
			...formData.value,

		});
		if (res && res.code === '00000') {
			getContentList(formData.value, formData.value.dataPacketType);
		} else {
			isLoading.value = false;
		}
	}
	defineExpose({
		tableRef1,
		tableRef2,
		tableData,
		SelectList,
		tableSelectListL,
		tableSelectListR,
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

	:deep(.el-table__placeholder) {
		width: auto !important;
	}

	:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
		border-right: 1px solid #ddd !important;
	}

	:deep(.el-table .cell.el-tooltip) {
		width: auto !important;
	}

	:deep(.el-table__header-wrapper .el-table__header .is-center) {
		border-bottom: 1px solid #ddd !important;
	}
</style>