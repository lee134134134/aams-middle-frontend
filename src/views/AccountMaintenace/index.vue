<template>
	<div class="temporary">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline"
					label-position="left" label-width="120px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="是否计入上下账" prop="isCalculated">
								<el-select v-model="formInline.isCalculated" popper-class="custom-select"
									placeholder="请选择是或否" style="width:100%;" clearable
									@clear="formClear('isCalculated')">
									<el-option v-for="(item, i) in isCalculatedListData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="业务类型" prop="transferType">
								<el-select v-model="formInline.transferType" popper-class="custom-select"
									placeholder="请选择业务类型" style="width:100%;" clearable
									@clear="formClear('transferType')">
									<el-option v-for="(item, i) in transferTypeListData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="额度类型" prop="quotaType">
								<el-select v-model="formInline.quotaType" popper-class="custom-select"
									placeholder="请选择额度类型" style="width:100%;" clearable @clear="formClear('quotaType')">
									<el-option v-for="(item, i) in quotaTypeListData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="状态" prop="status">
								<el-select v-model="formInline.status" popper-class="custom-select" placeholder="请选择状态"
									style="width:100%;" clearable @clear="formClear('status')" :disabled="isBool">
									<el-option v-for="(item, i) in statusListData" :key="i" :label="item.label"
										:value="item.value"  />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调出基金" prop="fundCodeWithdrawn">
								<el-select-v2 v-model="formInline.fundCodeWithdrawn" popper-class="custom-select"
									placeholder="请选择基金编码 | 名称" style="width:100%;" clearable filterable
									:options="searchObjList.fundWithdrawn" :props="allValueProps1"
									@clear="formClear('fundCodeWithdrawn')">
									<template #default="{item}">
										<el-tooltip :content="item.other" placement="right" effect="dark">
											<span>{{item.other}}</span>
										</el-tooltip>
									</template>
								</el-select-v2>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调出资产单元" prop="assetCodeWithdrawn">
								<el-select-v2 v-model="formInline.assetCodeWithdrawn" popper-class="custom-select"
									placeholder="请选择资产单元编码 | 名称" style="width:100%;" clearable filterable
									:options="searchObjList.assetUnitWithdrawn" :props="allValueProps1"
									@clear="formClear('assetCodeWithdrawn')">
									<template #default="{item}">
										<el-tooltip :content="item.other" placement="right" effect="dark">
											<span>{{item.other}}</span>
										</el-tooltip>
									</template>
								</el-select-v2>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调入基金" prop="fundCodeDeposited">
								<el-select-v2 v-model="formInline.fundCodeDeposited" popper-class="custom-select"
									placeholder="请选择基金编码 | 名称" style="width:100%;" clearable filterable
									:options="searchObjList.fundDeposited" :props="allValueProps1"
									@clear="formClear('fundCodeDeposited')">
									<template #default="{item}">
										<el-tooltip :content="item.other" placement="right" effect="dark">
											<span>{{item.other}}</span>
										</el-tooltip>
									</template>
								</el-select-v2>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调入资产单元" prop="assetCodeDeposited">
								<el-select-v2 v-model="formInline.assetCodeDeposited" popper-class="custom-select"
									placeholder="请选择资产单元编码 | 名称" style="width:100%;" clearable filterable
									:options="searchObjList.assetUnitDeposited" :props="allValueProps1"
									@clear="formClear('assetCodeDeposited')">
									<template #default="{item}">
										<el-tooltip :content="item.other" placement="right" effect="dark">
											<span>{{item.other}}</span>
										</el-tooltip>
									</template>
								</el-select-v2>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="开始日期" prop="startDate" class="start_time">
								<el-date-picker v-model="formInline.startDate" type="date" placeholder="请选择开始日期"
									:disabled-date="disabledDateStart" value-format="YYYY-MM-DD" :clearable="true"
									:editable="false" style="width:100%;"
									@clear="formClear('startDate')"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期" prop="endDate" style="width:100%;">
								<el-date-picker v-model="formInline.endDate" type="date" placeholder="请选择结束日期"
									:disabled-date="disabledDateEnd" value-format="YYYY-MM-DD" :clearable="true"
									:editable="false" style="width:100%;"
									@clear="formClear('endDate')"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search"
								:loading="SearchLoading" class="button-custom color-button"
								data-track-id="AccountMaintenace-submit-btn" data-track-name="上下账维护-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="AccountMaintenace-Download-btn"
								data-track-name="上下账维护-导出" :disabled="DownloadLoading">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<DateList ref="childRef" :isCalculatedListData="isCalculatedListData"
				:transferTypeListData="transferTypeListData" :quotaTypeListData="quotaTypeListData"
				:statusListData="statusListData" :fundCodeWithdrawnListData="fundCodeWithdrawnListData" :init="init"
				:getContentList="getContentList" :getSearchList="getSearchList"
				:clearAllSelectedRows="clearAllSelectedRows"
				>
			</DateList>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch, nextTick } from "vue";
	import type { FormInstance, TabsPaneContext } from "element-plus";
	import { getDictData, getFundNameList, getInvestUnitList, getList, handleExportFile, geFundAndInvestUnitForSelectList } from "@/api/AccountMaintenace.js";
	import { getUsersTree, selectDept, selectInsurance, selectStatistics, getCaldDate, getDefaultDate } from "@/api/common.js";
	import { storeToRefs } from "pinia";
	import _ from "lodash"
	import { ElMessage, ElMessageBox } from "element-plus";
	import { getChildrenCode, getValueArr1, filterTreeArr, compareObject, areObjectsEqual } from "@/utils/index.js";
	import DateList from "./List/DateList.vue";
	import AccountMaintenaceStore from "@/stores/modules/AccountMaintenace.js";
	import { $thisYearFristDay, $today } from "@/utils/date.ts"
	interface MethodObject {
		initPage : () => void;
		getContentList : (arg : any) => void;
	}
	let _AccountMaintenaceStore = AccountMaintenaceStore();
	let {
		list1,
		total1,
		isLoading,
		pageSize1,
		pageNo1,
		getContentList1
	} = storeToRefs(_AccountMaintenaceStore);
	const ruleFormRef = ref(null);
	const childRef = ref<MethodObject[]>([]);
	let formInline = ref({
		startDate: $thisYearFristDay,
		endDate: $today,
		isCalculated: '',
		transferType: '',
		quotaType: '',
		status: '',
		fundCodeWithdrawn: '',
		assetCodeWithdrawn: '',
		fundCodeDeposited: '',
		assetCodeDeposited: '',
	});
	let searchObj = ref();
	let resetList = reactive({
		startDate: $thisYearFristDay,
		endDate: $today,
		isCalculated: '',
		transferType: '',
		quotaType: '',
		status: '',
		fundCodeWithdrawn: '',
		assetCodeWithdrawn: '',
		fundCodeDeposited: '',
		assetCodeDeposited: '',
	});
	// 将日期转换为时间戳
	const dateVal = (date : any) : number => {
		return Date.parse(new Date(date) as any);
	};

	// 结束时间不能小于开始时间（允许等于）
	const disabledDateEnd = (time : any) : boolean => {
		return time.getTime() < dateVal(formInline.value.startDate) - 86400000;;
	};

	// 开始时间不能大于结束时间（允许等于）
	const disabledDateStart = (time : any) : boolean => {
		if (formInline.value.endDate) {
			return time.getTime() > dateVal(formInline.value.endDate);
		}
		return false;
	};
	onMounted(async () => {
		await getSearchList();
		await getSearchList1();
		init();
	});
	let allValueProps1 = {
		value: 'value',
		label: 'other'
	};
	let isCalculatedListData = ref([]);
	let transferTypeListData = ref([]);
	let quotaTypeListData = ref([]);
	let statusListData = ref([]);
	let fundCodeWithdrawnListData = ref([]);
	let assetCodeWithdrawnListData = ref([]);
	let searchObjList = ref({
		fundWithdrawn: [],
		fundDeposited: [],
		assetUnitWithdrawn: [],
		assetUnitDeposited: [],
	})
	let PendingReviewFormInline = ref({
		startDate: $thisYearFristDay,
		endDate: $today,
		isCalculated: '',
		transferType: '',
		quotaType: '',
		status: '0',
		fundCodeWithdrawn: '',
		assetCodeWithdrawn: '',
		fundCodeDeposited: '',
		assetCodeDeposited: '',
	})
	let PendingReviewpageSize = ref(10)
	let PendingReviewpageNo = ref(1)
	let PendingReviewSelectedRows = ref([])


	let ReviewedFormInline = ref({
		startDate: $thisYearFristDay,
		endDate: $today,
		isCalculated: '',
		transferType: '',
		quotaType: '',
		status: '1',
		fundCodeWithdrawn: '',
		assetCodeWithdrawn: '',
		fundCodeDeposited: '',
		assetCodeDeposited: '',
	})
	let ReviewedpageSize = ref(10)
	let ReviewedpageNo = ref(1)
	let ReviewedSelectedRows = ref([])


	let AllFormInline = ref({
		startDate: $thisYearFristDay,
		endDate: $today,
		isCalculated: '',
		transferType: '',
		quotaType: '',
		status: '',
		fundCodeWithdrawn: '',
		assetCodeWithdrawn: '',
		fundCodeDeposited: '',
		assetCodeDeposited: '',
	})
	let AllpageSize = ref(10)
	let AllpageNo = ref(1)
	let AllSelectedRows = ref([])
	let isBool = ref(true);

	// 查询条件
	const getSearchList = async () => {
		const res7 = await geFundAndInvestUnitForSelectList();
		if (res7 && res7.code == '00000') {
			searchObjList.value = res7.data || [];
		}
	}
	const getSearchList1 = async () => {
		const res1 = await getDictData({ 'dictType': 'is_calculated' });
		if (res1 && res1.code == '00000') {
			isCalculatedListData.value = res1.data || [];
		}
		const res2 = await getDictData({ 'dictType': 'transfer_type' });
		if (res2 && res2.code == '00000') {
			transferTypeListData.value = res2.data || [];
		}
		const res3 = await getDictData({ 'dictType': 'quota_type' });
		if (res3 && res3.code == '00000') {
			quotaTypeListData.value = res3.data || [];
		}
		const res4 = await getDictData({ 'dictType': 'status' });
		if (res4 && res4.code == '00000') {
			statusListData.value = res4.data || [];
		}
		const res5 = await getFundNameList();
		if (res5 && res5.code == '00000') {
			fundCodeWithdrawnListData.value = res5.data || [];
		}
		const res6 = await getInvestUnitList();
		if (res6 && res6.code == '00000') {
			assetCodeWithdrawnListData.value = res6.data || [];
		}

		watch(() => childRef.value?.tabsName,  (newval, oldval) => {
			if (oldval == 'PendingReview') {
				PendingReviewFormInline.value = JSON.parse(JSON.stringify(searchObj.value));
				PendingReviewSelectedRows.value = childRef.value?.selectedRows;
				// PendingReviewpageSize.value = pageSize1.value;
				// PendingReviewpageNo.value = pageNo1.value;
			} else if (oldval == 'Reviewed') {
				ReviewedFormInline.value = JSON.parse(JSON.stringify(searchObj.value));
				ReviewedSelectedRows.value = childRef.value?.selectedRows;
				// ReviewedpageSize.value = pageSize1.value;
				// ReviewedpageNo.value = pageNo1.value;
			} else if (oldval == 'All') {
				AllFormInline.value = JSON.parse(JSON.stringify(searchObj.value));
				AllSelectedRows.value = childRef.value?.selectedRows;
				// AllpageSize.value = pageSize1.value;
				// AllpageNo.value = pageNo1.value
			}
			if (childRef.value?.tableRef) {
				childRef.value?.tableRef?.clearSelection();
			}
			if (newval == 'PendingReview') {
				isBool.value = true;
				formInline.value = { ...JSON.parse(JSON.stringify(formInline.value)), ...JSON.parse(JSON.stringify(PendingReviewFormInline.value)) };
				if(PendingReviewSelectedRows.value?.length){
					nextTick(()=>{
						PendingReviewSelectedRows.value.forEach(item=>{
							childRef.value?.tableRef?.toggleRowSelection(item, true);
						})
					})
				}
				resetList = { ...JSON.parse(JSON.stringify(resetList)), status: '0' };
			} else if (newval == 'Reviewed') {
				isBool.value = true;
				formInline.value = { ...JSON.parse(JSON.stringify(formInline.value)), ...JSON.parse(JSON.stringify(ReviewedFormInline.value)) };
				if(ReviewedSelectedRows.value.length){
					nextTick(()=>{
						ReviewedSelectedRows.value.forEach(item=>{
							childRef.value?.tableRef?.toggleRowSelection(item, true);
						})
					})
				}
				resetList = { ...JSON.parse(JSON.stringify(resetList)), status: '1' };
			} else if (newval == 'All') {
				isBool.value = false;
				formInline.value = { ...JSON.parse(JSON.stringify(formInline.value)), ...JSON.parse(JSON.stringify(AllFormInline.value)) };
				if(AllSelectedRows.value.length){
					nextTick(()=>{
						AllSelectedRows.value.forEach(item=>{
							childRef.value?.tableRef?.toggleRowSelection(item, true);
						})
					})
				}
				resetList = { ...JSON.parse(JSON.stringify(resetList)),status: '' };
			}
			getContentList();
		}, { immediate: true })
	}
	const clearAllSelectedRows = () => {
		PendingReviewSelectedRows.value = []
		ReviewedSelectedRows.value = []
		AllSelectedRows.value = []
		if (childRef.value?.tableRef) {
			childRef.value?.tableRef?.clearSelection();
		}
	}
	
	const formClear = (val) => {
		formInline.value[val] = '';
	}
	// 查询
	const SearchLoading = ref(false);
	const onSubmit = () => {
		SearchLoading.value = true;
		init();
	};
	const init = (bool = false) => {
		if (bool) {
			pageSize1.value = 10;
		}
		pageNo1.value = 1;
		childRef.value?.resetSelect()
		getContentList();
	};
	// 获取列表数据
	let downloadBool = ref(true);
	let getContentList = () => {
		if ((formInline.value.startDate && !formInline.value.endDate) || (!formInline.value.startDate && formInline.value.endDate)) {
			SearchLoading.value = false;
			ElMessage({
				type: "warning",
				message: `开始日期和结束日期必须同时有值或同时为空！`,
			});
			return;
		}
		isLoading.value = true;
		searchObj.value = JSON.parse(JSON.stringify({ ...formInline.value }));
		downloadBool.value = false;
		getList({ ...formInline.value })
			.then((res) => {
				isLoading.value = false;
				SearchLoading.value = false;
				if (res && res.code === '00000') {
					list1.value = res.data;
					total1.value = res.data.length;
				}
			})
			.catch(() => {
				isLoading.value = false;
				SearchLoading.value = false;
			});


	};



	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		resetData();
	};

	// 导出明细
	const DownloadLoading = ref(false);
	const handleDownload = () => {
		if ((formInline.value.startDate && !formInline.value.endDate) || (!formInline.value.startDate && formInline.value.endDate)) {
			ElMessage({
				type: "warning",
				message: `开始日期和结束日期必须同时有值或同时为空！`,
			});
			return;
		}
		let str = `数据使用提示：<br/>相关数据严格按照业务需求逻辑进行加工，请务必结合使用场景确认数据准确性后使用。`
		ElMessageBox.confirm(str, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
			confirmButtonClass: "confirm-btn",
			cancelButtonClass: "confirm-btn",
			dangerouslyUseHTMLString: true
		}).then(({ value }) => {
			let queryCondition = {
				'01.是否计入上下账': formInline.value.isCalculated ? isCalculatedListData.value.find(item => item.value == formInline.value.isCalculated)?.label : '',
				'02.业务类型': formInline.value.transferType ? transferTypeListData.value.find(item => item.value == formInline.value.transferType)?.label : '',
				'03.额度类型': formInline.value.quotaType ? quotaTypeListData.value.find(item => item.value == formInline.value.quotaType)?.label : '',
				'04.状态': formInline.value.status ? statusListData.value.find(item => item.value == formInline.value.status)?.label : '',
				'05.调出基金': formInline.value.fundCodeWithdrawn ? searchObjList.value.fundWithdrawn.find(item => item.value == formInline.value.fundCodeWithdrawn)?.other : '',
				'06.调出资产单元': formInline.value.assetCodeWithdrawn ? searchObjList.value.assetUnitWithdrawn.find(item => item.value == formInline.value.assetCodeWithdrawn)?.other : '',
				'07.调入基金': formInline.value.fundCodeDeposited ? searchObjList.value.fundDeposited.find(item => item.value == formInline.value.fundCodeDeposited)?.other : '',
				'08.调入资产单元': formInline.value.assetCodeDeposited ? searchObjList.value.assetUnitDeposited.find(item => item.value == formInline.value.assetCodeDeposited)?.other : '',
				'09.开始日期': formInline.value.startDate ? formInline.value.startDate : '',
				'10.结束日期': formInline.value.endDate ? formInline.value.endDate : '',
			}
			let bool = areObjectsEqual(searchObj.value, formInline.value);
			if (bool) {
				DownloadLoading.value = true;
				handleExportFile({ ...formInline.value, queryCondition })
					.then(() => {
						DownloadLoading.value = false;
					})
					.catch(() => {
						DownloadLoading.value = false;
					});
			} else {
				ElMessageBox.confirm('查询条件已变更，是否继续导出？', {
					confirmButtonText: "确认",
					cancelButtonText: "取消",
					type: "warning",
					confirmButtonClass: "confirm-btn",
					cancelButtonClass: "confirm-btn",
					dangerouslyUseHTMLString: true
				}).then(({ value }) => {

					DownloadLoading.value = true;
					handleExportFile({ ...formInline.value, queryCondition })
						.then(() => {
							DownloadLoading.value = false;
						})
						.catch(() => {
							DownloadLoading.value = false;
						});
				})
					.catch((error) => {
						ElMessage({
							type: "info",
							message: `取消导出`,
						});
					});
			}

		})
			.catch((error) => {
				ElMessage({
					type: "info",
					message: `取消导出`,
				});
			});

	};


	const resetData = () => {
		formInline.value.startDate = resetList.startDate;
		formInline.value.endDate = resetList.endDate;
		formInline.value.isCalculated = resetList.isCalculated;
		formInline.value.transferType = resetList.transferType;
		formInline.value.quotaType = resetList.quotaType;
		formInline.value.status = resetList.status;
		formInline.value.fundCodeWithdrawn = resetList.fundCodeWithdrawn;
		formInline.value.assetCodeWithdrawn = resetList.assetCodeWithdrawn;
		formInline.value.fundCodeDeposited = resetList.fundCodeDeposited;
		formInline.value.assetCodeDeposited = resetList.assetCodeDeposited;
	};
</script>

<style scoped lang="scss">
	.header {
		.dw {
			color: #666;
			font-size: 12px;
			min-width: 80px;
			margin-bottom: 12px;
			text-align: right;
		}
	}

	.flex-box {
		width: calc(100% - 260px)
	}

	:deep(.el-form--inline.el-form--label-top) {
		justify-content: space-between;
	}

	.subBtn {
		position: absolute;
		right: 16px;
		bottom: 0px;
		display: flex;
		align-items: end;

		:deep(.el-form-item) {
			margin-right: 0px !important;
		}
	}

	:deep(.el-input__wrapper) {
		position: relative;

		.el-input__suffix {
			position: absolute;
			right: 8px;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.btnArr {
		margin: 10px 0;
	}

	:deep(.demo-form-inline .el-form-item) {
		width: 100%;
		margin-bottom: 8px !important;
	}

	.el-table {
		margin-bottom: 10px;
	}

	:deep(.el-card__body) {
		padding-bottom: 0;
	}

	:deep(.el-tabs--card) {
		.el-tabs__header {
			margin: 0;

			.el-tabs__item.is-active {
				background-color: #3071c3;
				color: #fff;
				border-radius: 4px;
				font-size: 14px !important;
			}
		}
	}

	:deep(.el-card__body) {
		position: relative;
	}

	:deep(.el-tabs__content) {
		margin-top: 12px;
	}

	.form-item-btn {
		position: absolute;
		right: 0px;
		bottom: 8px;
	}

	.temporary {
		background-color: #f3f7fb;
	}

	:deep(.el-form-item) {
		margin-bottom: 10px;
	}

	:deep(.el-input__wrapper) {
		position: relative;

		.el-input__suffix {
			position: absolute;
			right: 8px;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.btnArr {
		margin: 10px 0;
	}

	// :deep(.demo-form-inline > .el-form-item) {
	//   margin-bottom: 0px !important;
	// }
	.el-table {
		margin-bottom: 10px;
	}

	:deep(.el-tabs--card) {
		.el-tabs__header {
			margin: 0;

			.el-tabs__item.is-active {
				background-color: #3071c3;
				color: #fff;
				border-radius: 4px;
			}
		}
	}

	.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
		background-color: #3071c3 !important;
	}

	:deep(.el-card__body) {
		padding-bottom: 0;
	}

	:deep(.el-tabs__content) {
		margin-top: 12px;
	}

	:deep(.card-padding) {
		padding: 16px 16px 0px 16px !important;
	}

	.card-header {
		display: flex;
		align-items: center;
		line-height: 20px;
		font-family: '微软雅黑';
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		font-style: normal;

		img {
			margin-right: 10px;
		}
	}

	.tableList {
		position: relative;

		&>span {
			position: absolute;
			top: 8px;
			right: 0px;
			font-size: 14px;
			color: #666;
		}
	}

	:deep(.new_warp .el-form-item__content) {
		display: flex;
		justify-content: space-between;
	}

	:deep(.el-card__footer) {
		border-top: none;
		padding: 0px 16px 0px 16px;
		display: flex;
		justify-content: end;
	}

	:deep(.el-card__header) {
		padding: 16px 16px 0px 16px;
		border-bottom: none;
	}

	:deep(.el-date-editor) {
		width: 100%;
	}

	.temporary {
		background-color: #f3f7fb;

		.left {
			position: relative;

			.arrow {
				cursor: pointer;
				z-index: 2000;
				color: #999;
				position: absolute;
				top: 36px;
				width: 20px;
				height: 20px;
				text-align: center;
				line-height: 18px;
				background: #fff;
			}

			.open {
				border-radius: 50%;
				left: 0;
			}

			.close {
				border-radius: 50%;
				right: -10px
			}
		}

		.content {
			position: relative;

			.arrow {
				cursor: pointer;
				z-index: 2000;
				color: #999;
				position: absolute;
				top: 36px;
				width: 20px;
				height: 20px;
				text-align: center;
				line-height: 18px;
				background: #fff;
			}

			.open {
				border-radius: 50%;
				left: -4px;
			}
		}
	}

	:deep(.el-card__body) {
		padding-bottom: 0;
		position: relative;

		&>.el-button {
			position: absolute;
			right: 16px;
			top: 10px;
			z-index: 999 !important;
		}
	}
</style>