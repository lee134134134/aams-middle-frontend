<template>
	<div class="temporary">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule"
					label-position="left" label-width="120px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType">
								<el-select v-model="formInline.treeType" popper-class="custom-select"
									placeholder="请选择账户类型" style="width:100%;">
									<el-option v-for="(item, i) in treeTypeListData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-divider></el-divider> -->
						<el-col :span="formInline.treeType == '4' ? 6 : 0">
							<el-form-item label="账户名称" prop="selfAcountTree" v-show="formInline.treeType == '4'"
								:rules="{ required: formInline.treeType == '4' ? true : false, message: '', trigger: ['blur', 'change'] }"
								class="margin-12">
								<el-tree-select class="custom-checkbox" clearable node-key="value"
									placeholder="请选择自定义账户" collapse-tags :max-collapse-tags="1"
									v-model="formInline.selfAcountTree" :data="selectZdyzh" multiple
									:render-after-expand="false" ref="slecetTree1" filterable />
							</el-form-item>
						</el-col>
						<el-col :span="formInline.treeType == '3' ? 6 : 0">
							<el-form-item label="账户名称" prop="accountSet" v-show="formInline.treeType == '3'"
								:rules="{ required: formInline.treeType == '3' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline.accountSet" popper-class="custom-select" multiple
									collapse-tags placeholder="请选择统计账套" clearable filterable style="width:100%;">
									<el-option v-for="(item, i) in selectStatisticsList" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="formInline.treeType == '2' ? 6 : 0">
							<el-form-item label="账户名称" prop="insuranceType" v-show="formInline.treeType == '2'"
								:rules="{ required: formInline.treeType == '2' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-tree-select ref="slecetTree" v-model="formInline.insuranceType" style="width:100%;"
									class="custom-checkbox" clearable node-key="value" placeholder="请选择险种" collapse-tags
									multiple :max-collapse-tags="1" :data="selectInsuranceList"
									:render-after-expand="false" filterable show-checkbox />

							</el-form-item>
						</el-col>
						<el-col :span="formInline.treeType == '1' ? 6 : 0">
							<el-form-item label="账户名称" prop="sobCodeList" v-show="formInline.treeType == '1'"
								:rules="{ required: formInline.treeType == '1' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline.sobCodeListLabel" popper-class="custom-select-sob"
									:render-after-expand="false" :props="props" @clear="clearSob" placeholder="请选择投资经理"
									style="width:100%;" collapse-tags :max-collapse-tags="1" filterable multiple
									clearable :filter-method="onQueryChanged">
									<template #empty>
										<el-tree-v2 ref="treeRef" :data="selectTzjlAll" :props="propsv2" show-checkbox
											:default-expanded-all="true" :filter-method="filterMethod"
											@check-change="v2Click" :highlight-current="true" />
									</template>
								</el-select>
							</el-form-item>

						</el-col>
						
						<el-col :span="6">
							<el-form-item label="开始日期" prop="startTime" class="start_time" style="width:100%;">
								<el-date-picker v-model="formInline.startTime" type="date" placeholder="请选择开始日期"
									:disabled-date="disabledDateStart" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期" prop="endTime" style="width:100%;">
								<el-date-picker v-model="formInline.endTime" type="date" placeholder="请选择结束日期"
									:disabled-date="disabledDateEnd" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="selectTime" style="width:100%;" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.selectTime"
									type="date" placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>	
						<el-col :span="6">
							<el-form-item label="时间窗口" prop="timeUnit" style="width:100%;">
								<el-select v-model="formInline.timeUnit" placeholder="请选择时间窗口" :disabled="timeUnitBool">

									<el-option v-for="(item, i) in selectTimeUnitData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="主动/存量风险" prop="investType" class="margin-12">
								<el-select v-model="formInline.investType" popper-class="custom-select"
									placeholder="请选择主动/存量风险" style="width:100%;" :disabled="investTypeBool">
									<el-option v-for="(item, i) in selectListData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="金额单位" prop="monetaryUnit" class="margin-12">
								<el-select v-model="formInline.monetaryUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;">
									<el-option v-for="(item, i) in selectListDataUnit" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search"
								:loading="SearchLoading" class="button-custom color-button"
								data-track-id="AccountCashFlow-submit-btn" data-track-name="账户现金流预测-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="AccountCashFlow-Download-btn"
								data-track-name="账户现金流预测-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<div class="tableList">
				<span>单位：{{ unitVal }}</span>
				<el-tabs v-model="tabsName" class="demo-tabs" @tab-click="handleTabsClick">
					<el-tab-pane label="现金流时序" name="XJLSX">
						<DateList ref="childRef"> </DateList>
					</el-tab-pane>
					<el-tab-pane label="品种明细" name="PZMX">
						<DateList1 ref="childRef1"> </DateList1>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch } from "vue";
	import type { FormInstance, TabsPaneContext } from "element-plus";
	import { handleExportFile } from "@/api/AccountCashFlow.js";
	import { getList } from "@/api/AccountCashFlow.js";
	import futureStore from "@/stores/modules/FutureCashFlowForecast.js";
	import { getUsersTree, selectDept, selectInsurance, selectStatistics, getCaldDate, getDefaultDate } from "@/api/common.js";
	import { storeToRefs } from "pinia";
	import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
	import { getChildrenCode, getValueArr1, filterTreeArr, compareObject, filterFormArr, getTreeLabel } from "@/utils/index.js";
	import DateList from "./List/DateList.vue";
	import DateList1 from "./List/DateList1.vue";
	import { rule } from "./List/common.js";
	interface MethodObject {
		initPage : () => void;
		getContentList : (arg : any) => void;
	}
	interface Tree {
		id : string
		label : string
		children ?: Tree[]
	}
	let _futureStore = futureStore();
	let {
		list1,
		total1,
		list2,
		total2,
		isLoading,
		pageSize2,
		pageNo2,
		pageSize1,
		pageNo1,
	} = storeToRefs(_futureStore);
	const ruleFormRef = ref(null);
	const slecetTree = ref(null as any);
	const rules = reactive(rule);
	let unitVal = ref('亿元')
	const childRef = ref<MethodObject[]>([]);
	const childRef1 = ref<MethodObject[]>([]);
	let formInline = reactive({
		treeType: '3',
		sobCodeList: [],
		sobCodeListLabel: [],
		startTime: '',
		endTime: '',
		timeUnit: '5',
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		investType: '5',
		monetaryUnit: '0',
		selectTime: '',
	});
	let timeUnitChange = ref('5');
	const props = {
		isLeaf: 'leaf',
		value: 'value',
		label: 'label',
	}
	let searchObj = ref();
	watch(() => formInline.monetaryUnit, (newval, oldval) => {
		if (newval === '0') {
			unitVal.value = "亿元";
		} else if (newval === '1') {
			unitVal.value = "万元";
		} else if (newval === '2') {
			unitVal.value = "元";
		}
	})
	let investTypeBool = ref(false);
	watch(() => formInline.treeType, (newval, oldval) => {
		if(newval=='3'){
			investTypeBool.value = false;
		}else{
			investTypeBool.value = true;
			formInline.investType = '5';
		}
	})
	let resetList = reactive({
		treeType: '3',
		sobCodeList: [],
		sobCodeListLabel: [],
		startTime: '',
		endTime: '',
		timeUnit: '5',
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		investType: '5',
		monetaryUnit: '0',
		selectTime: '',
	});
	let treeTypeListData = ref([
		{ value: '3', label: '统计账套' },
		{ value: '1', label: '投资经理' },
		{ value: '2', label: '险种' },
		{ value: '4', label: '自定义账户' }
	])
	let selectListData = ref([
		{ value: '3', label: '主动资产' },
		{ value: '1', label: '存量风险' },
		{ value: '2', label: '专项信托资产' },
		{ value: '4', label: '主动加存量风险资产' },
		{ value: '5', label: '全口径' },
	])
	let selectListDataUnit = ref([
		{ value: '0', label: '亿元' },
		{ value: '1', label: '万元' },
		{ value: '2', label: '元' },
	])

	let selectTimeUnitData = ref([
		{ value: '0', label: '年' },
		{ value: '1', label: '半年' },
		{ value: '2', label: '季' },
		{ value: '3', label: '月' },
		{ value: '4', label: '周' },
		{ value: '5', label: '日' },
	])
	// 开始结束时间限制
	const dateVal = (date : any) => {
		return Date.parse(new Date(date) as any);
	};
	const disabledDateEnd = (time : any) => {
		if (formInline.startTime) {
			return time.getTime() < dateVal(formInline.startTime);
		}
	};
	const disabledDateStart = (time : any) => {
		//注意这要加一个判断不然没选结束时间的时候开始时间也全部不能选择
		if (formInline.endTime) {
			return time.getTime() > dateVal(formInline.endTime) - 86400000;
		}
	};
	// let formList = ref({});
	onMounted(() => {
		getUsers();
		getCaldDateTime();
		getDefaultsDate();
		getSelectInsurance();
		getSelectStatistics();
	});
	// 开始结束日期
	const getDefaultsDate = async () => {
		const res = await getDefaultDate();
		if (res && res.code == '00000') {
			formInline.startTime = res.data.START;
			formInline.endTime = res.data.END;
			resetList.startTime = res.data.START;
			resetList.endTime = res.data.END;
		}
	};
	// 交易日历
	const getCaldDateTime = async () => {
		let obj = {
			numsDay: '2'
		}
		const res = await getCaldDate({ ...obj });
		if (res && res.code == '00000') {
			formInline.selectTime = res.data;
			resetList.selectTime = res.data;
		}
	};

	// 险种
	const selectInsuranceList = ref([]);
	const getSelectInsurance = async () => {
		const res = await selectInsurance();
		if (res && res.code == '00000') {
			selectInsuranceList.value = res.data || [];
		}
	}

	// 账套
	const selectStatisticsList = ref([]);
	const getSelectStatistics = async () => {
		const res = await selectStatistics();
		if (res && res.code == '00000') {
			selectStatisticsList.value = res.data || [];
		}
	}



	// 投资经理、自定义账户树
	let propsv2 = ref({
		value: 'value',
		label: 'label',
		children: 'children'
	})
	const treeRef = ref<InstanceType<typeof ElTreeV2>>()
	const onQueryChanged = (query : string) => {
		treeRef.value!.filter(query)
		if (!query) {
			treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
		}
	}
	const filterMethod = (query : string, node : TreeNodeData) => node.label!.includes(query)
	const v2Click = (data, node) => {
		if (node) {
			let arr = data.childrenPrdCodeList.split(',') || [];
			formInline.sobCodeList = [...formInline.sobCodeList, ...arr]
		} else {
			let arr = data.childrenPrdCodeList.split(',') || [];
			formInline.sobCodeList = formInline.sobCodeList.filter(item => !arr.includes(item))
		}
		formInline.sobCodeListLabel = getTreeLabel(selectTzjlAll.value, formInline.sobCodeList.map(item => item.split('&').pop()))
	}
	const clearSob = () => {
		formInline.sobCodeList = resetList.sobCodeList;
		formInline.sobCodeListLabel = resetList.sobCodeListLabel;
		treeRef.value!.setCheckedKeys([])
		treeRef.value!.setExpandedKeys([])
	}
	const slecetTree1 = ref(null as any);
	const selectTzjlAll = ref([]);
	const selectDataArr = ref([]);
	const selectZdyzh = ref([]);
	let getUsers = async () => {
		let { data, code } = await getUsersTree();
		let res = await selectDept();
		if (code && code == '00000') {
			selectTzjlAll.value = JSON.parse(JSON.stringify(data));
		}
		if (res.code && res.code === '00000') {
			selectDataArr.value = JSON.parse(JSON.stringify(res.data));
			selectZdyzh.value = JSON.parse(JSON.stringify(res.data)).map(item => {
				return {
					value: item.value,
					label: item.label
				}
			});
		}
	};



	// 查询
	const SearchLoading = ref(false);
	const onSubmit = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				SearchLoading.value = true;
				init();
			}
		});
	};

	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		resetData();
	};
	let tabsName = ref("XJLSX");
	let timeUnitBool = ref(false);
	const handleTabsClick = (tab : TabsPaneContext, event : Event) => {
		tabsName.value = tab.paneName;
		console.log(tabsName.value)
		if(tabsName.value=='PZMX'){
			timeUnitBool.value = true;
			formInline.timeUnit = '5';
		}else{
			timeUnitBool.value = false;
			formInline.timeUnit = timeUnitChange.value;
		}
	};
	// 导出明细
	const DownloadLoading = ref(false);
	const handleDownload = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				let str = `数据使用提示：<br/>相关数据严格按照业务需求逻辑进行加工，请务必结合使用场景确认数据准确性后使用。`
				ElMessageBox.confirm(str, {
					confirmButtonText: "确认",
					cancelButtonText: "取消",
					type: "warning",
					confirmButtonClass: "confirm-btn",
					cancelButtonClass: "confirm-btn",
					dangerouslyUseHTMLString: true
				}).then(({ value }) => {
					let formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value);
					let queryCondition = {
						...formArr,
						'3.开始日期': formInline.startTime,
						'4.结束日期': formInline.endTime,
						'5.查询日期': formInline.selectTime,
						'6.时间窗口': selectTimeUnitData.value.find(item => item.value == formInline.timeUnit)?.label,
						'7.主动/存量风险': selectListData.value.find(item => item.value == formInline.investType)?.label,
						'8.金额单位': selectListDataUnit.value.find(item => item.value == formInline.monetaryUnit)?.label
					}
					let bool = compareObject(searchObj.value, { ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) });
					if (bool) {
						DownloadLoading.value = true;
						handleExportFile({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree), queryCondition })
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
							handleExportFile({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree), queryCondition })
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
			}
		});
	};
	// 获取列表数据
	let downloadBool = ref(true);
	let getContentList = async (obj : any) => {
		isLoading.value = true;
		searchObj.value = JSON.parse(JSON.stringify({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
		downloadBool.value = false;
		getList({ ...obj, sobCodeList: obj.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, obj.selfAcountTree) })
		.then((res) => {
			timeUnitChange.value = formInline.timeUnit;
			isLoading.value = false;
			SearchLoading.value = false;
			if (res && res.code === '00000') {
				if (res.data.cashFlowTimingDTOList && res.data.varietyDetailsDTOList) {
					list1.value = res.data.cashFlowTimingDTOList;
					list2.value = res.data.varietyDetailsDTOList;
					total1.value = res.data.cashFlowTimingDTOList.length;
					total2.value = res.data.varietyDetailsDTOList.length;
				}
				// formList.value.cashFlowTimingDTOList = res.data.cashFlowTimingDTOList;
				// formList.value.varietyDetailsDTOList = res.data.varietyDetailsDTOList;
			}
		})
		.catch(() => {
			SearchLoading.value = false;
			isLoading.value = false;
		});
		

	};

	const init = () => {
		pageSize2.value = 10;
		pageNo2.value = 1;
		pageSize1.value = 10;
		pageNo1.value = 1;
		getContentList({ ...formInline });
	};

	const resetData = () => {
		formInline.startTime = resetList.startTime;
		formInline.endTime = resetList.endTime;
		formInline.treeType = resetList.treeType;
		formInline.sobCodeList = resetList.sobCodeList;
		formInline.timeUnit = resetList.timeUnit;
		formInline.insuranceType = resetList.insuranceType;
		formInline.accountSet = resetList.accountSet;
		formInline.selfAcountTree = resetList.selfAcountTree;
		formInline.investType = resetList.investType;
		formInline.monetaryUnit = resetList.monetaryUnit;
		formInline.selectTime = resetList.selectTime;
		formInline.sobCodeListLabel = resetList.sobCodeListLabel;
		treeRef.value!.setCheckedKeys([])
		treeRef.value!.setExpandedKeys([])
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