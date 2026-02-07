<template>
	<div class="temporary1">
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
							<el-form-item label="开始日期" prop="startDate" class="start_time" style="width:100%;">
								<el-date-picker v-model="formInline.startDate" type="date" placeholder="请选择开始日期"
									:disabled-date="disabledDateStart" value-format="YYYY-MM-DD" :clearable="false"
									style="width:100%;" :editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期" prop="endDate" style="width:100%;">
								<el-date-picker v-model="formInline.endDate" type="date" placeholder="请选择结束日期"
									:disabled-date="disabledDateEnd" value-format="YYYY-MM-DD" :clearable="false"
									style="width:100%;" :editable="false"></el-date-picker>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="金额单位" prop="currencyUnit" class="margin-12">
								<el-select v-model="formInline.currencyUnit" popper-class="custom-select"
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
								data-track-id="FixedPortList-submit-btn" data-track-name="固定类组合交易分析表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="FixedPortList-Download-btn"
								data-track-name="固定类组合交易分析表-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>

		</el-card>
		<el-card>
			<TitleMargin title="固定类组合交易分析表">
				<div class="dw">单位：{{ unitVal }}</div>
			</TitleMargin>
			<DataList ref="DateListref" :downloadBool="downloadBool"></DataList>
		</el-card>
		<div class="holdEcharts1">
			<el-card>
				<Title class="top-10" title="交易时序"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select v-model="timeUnit" placeholder="请选择时间窗口" :disabled="isLoading"
							style="width: 200px; margin-left: 10px" @change="handelChange('1')">
							<el-option v-for="(item, i) in selectTimeUnitData" :key="i" :label="item.label"
								:value="item.value" />
						</el-select>
						<el-select v-model="direction" popper-class="custom-select" placeholder="请选择委托方向"
							style="width: 200px; margin-left: 10px" @blur="handelChange('2')" :disabled="isLoading"
							collapse-tags multiple :max-collapse-tags="1">
							<el-option v-for="item in directionArr" :key="item" :label="item" :value="item" />
						</el-select>
						<el-select v-model="selectValue" popper-class="custom-select" placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('3')" :disabled="isLoading"
							collapse-tags multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
						<el-select v-model="chinaBond" popper-class="custom-select" placeholder="请选择"
							style="width: 200px; margin-left: 10px" @blur="handelChange('4')" :disabled="isLoading"
							collapse-tags multiple :max-collapse-tags="1">
							<el-option v-for="item in chinaBondArr" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef1" style="width: 100%; height: 462px" v-loading="isLoading"
						:option="option1" autoresize></v-chart>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch, nextTick } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile, getAssetClassificationChart, getSequenceChartQueryCondition } from "@/api/FixedPortList.js";
	import { getDefaultAccountType } from "@/api/FixedRevenList.js";
	import TitleMargin from "@/components/TitleMargin.vue";
	import Title from "@/components/Title.vue";
	import { getUsersTree, selectDept, selectInsurance, selectStatistics, getStartAndEndDate } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import { rule, ecahrtsData } from "./List/common.js";
	import { getAllValues1, getTreeLabel } from "@/utils/index.js";
	import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
	import { getValueArr1, compareObject, filterFormArr } from "@/utils/index.js";
	import type { TreeNodeData } from 'element-plus'
	import VChart from 'vue-echarts';
	import * as echarts from "echarts"
	import _ from "lodash"
	interface Tree {
		id : string
		label : string
		children ?: Tree[]
	}
	// 初始化数据
	onMounted(async () => {
		await getUsers();
		await getDefaultsDate();
		await getSelectInsurance();
		await getSelectStatistics();
		await getDefaultAccountList();
		await getSequenceChartQueryConditionList();
		searchForm.value = JSON.parse(JSON.stringify({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
		// init();
		// chartInit({ ...searchForm.value, accountType: selectValue.value, timeUnit: timeUnit.value });
	});

	const DateListref = ref();
	const slecetTree = ref(null as any);
	const slecetTreeTzjl = ref(null as any);
	let searchObj = ref();
	const SearchLoading = ref(false);
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		treeType: '2',
		sobCodeList: [],
		sobCodeListLabel: [],
		insuranceType: [],
		startDate: '',
		endDate: '',
		accountSet: [],
		selfAcountTree: [],

		currencyUnit: '0'
	});

	watch(() => formInline.currencyUnit, (newval, oldval) => {
		if (newval === '0') {
			unitVal.value = "亿元";
		} else if (newval === '1') {
			unitVal.value = "万元";
		} else if (newval === '2') {
			unitVal.value = "元";
		}
	})
	let selectTimeUnitData = ref([
		{ value: '0', label: '年' },
		{ value: '2', label: '季' },
		{ value: '3', label: '月' },
		{ value: '4', label: '周' },
		{ value: '5', label: '日' },
	])
	const props = {
		value: 'value',
		label: 'label',
	}
	let resetList = reactive({
		treeType: '2',
		sobCodeList: [],
		sobCodeListLabel: [],
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		currencyUnit: '0',
		startDate: '',
		endDate: '',
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
	let unitVal = ref('亿元')

	// 开始结束时间限制
	const dateVal = (date : any) => {
		return Date.parse(new Date(date) as any);
	};
	const disabledDateEnd = (time : any) => {
		if (formInline.startDate) {
			return time.getTime() < dateVal(formInline.startDate);
		}
	};
	const disabledDateStart = (time : any) => {
		//注意这要加一个判断不然没选结束时间的时候开始时间也全部不能选择
		if (formInline.endDate) {
			return time.getTime() > dateVal(formInline.endDate) - 86400000;
		}
	};

	// 开始结束日期
	const getDefaultsDate = async () => {
		const res = await getStartAndEndDate({ numsDay: '2' });
		if (res && res.code == '00000') {
			formInline.startDate = res.data.startDate;
			formInline.endDate = res.data.endDate;
			resetList.startDate = res.data.startDate;
			resetList.endDate = res.data.endDate;
		}
	};
	// 险种
	const selectInsuranceList = ref([]);
	const getSelectInsurance = async () => {
		const res = await selectInsurance();
		if (res && res.code == '00000') {
			selectInsuranceList.value = res.data || [];
			formInline.insuranceType = getAllValues1(res.data) as any;
			resetList.insuranceType = JSON.parse(JSON.stringify(getAllValues1(res.data)));
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
	let downloadBool = ref(true);
	let searchForm = ref({});
	const onSubmit = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				searchForm.value = JSON.parse(JSON.stringify({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
				selectValue.value = ['所有账户类型'];
				timeUnit.value = '4';
				direction.value = ['所有委托方向'];
				chinaBond.value = ['中债国债到期收益率'];
				init();
				chartInit({ ...searchForm.value, accountType: selectValue.value, timeUnit: timeUnit.value });
			}
		});
	};

	const init = () => {
		SearchLoading.value = true;
		searchObj.value = JSON.parse(JSON.stringify({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
		downloadBool.value = false;
		DateListref.value
			.getContentList({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) })
			.then(() => {
				SearchLoading.value = false;
			})
			.catch(() => {
				SearchLoading.value = false;
			});
	}
	let options = ref([]);
	const getDefaultAccountList = async () => {
		let res = await getDefaultAccountType();
		if (res && res.code == '00000') {
			options.value = res.data;
			selectValue.value = ['所有账户类型'];
		}
	}
	let directionArr = ref([])
	let direction = ref(['所有委托方向'])
	let chinaBondArr = ref([])
	let chinaBond = ref(['中债国债到期收益率'])
	const getSequenceChartQueryConditionList = async () => {
		let res = await getSequenceChartQueryCondition();
		if (res && res.code == '00000') {
			directionArr.value = res.data.direction || [];
			chinaBondArr.value = res.data.criterion || [];
		}
	}
	let selectValue = ref();
	let timeUnit = ref('4');
	let option1 = ref({})
	let isLoading = ref(false);
	let echartsRef1 = ref(null);
	let seriesArr = ref([]);
	let ecahrtsDataX = ref([])
	const chartInit = async (obj) => {
		let arr = [...direction.value, ...chinaBond.value];
		if (direction.value.includes('所有委托方向')) {
			arr = ['买入', '卖出', '净买入', ...chinaBond.value];
		}
		let serisesArr = JSON.parse(JSON.stringify(ecahrtsData.series))
		let seriesNew = serisesArr.filter(item => arr.includes(item.name));
		isLoading.value = true;
		let res = await getAssetClassificationChart({ ...obj })
		isLoading.value = false;
		if (res && res.code == '00000') {
			option1.value = _.cloneDeep(ecahrtsData);
			option1.value.series = seriesNew;
			if (res.data.xaxis && res.data.xaxis.length > 0) {
				option1.value.xAxis.data = res.data.xaxis;
				ecahrtsDataX.value = res.data.xaxis;
			}
			if (res.data.series && res.data.series.length > 0) {
				if(option1.value.title?.text){
					option1.value.title.text = '';
				}
				seriesArr.value = res.data.series;
				option1.value.series.forEach((item1, index) => {
					const item2 = res.data.series.find(item => item.name == item1.name);
					item1.data = item2.data;
				})
			} else {
				option1.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				seriesArr.value = [];
				option1.value.series.forEach(item1 => {
					item1.data = [];
				})
			}
			// console.log(option1.value)
		}
	}
	const chartInitQd = async () => {
		if(!seriesArr.value.length){
			option1.value.title = {
				text: '暂无数据',
				x: 'center',
				y: 'center',
			};
			option1.value.series.forEach(item1 => {
				item1.data = [];
			})
		}else{
			let arr = [...direction.value, ...chinaBond.value];
			if (direction.value.includes('所有委托方向')) {
				arr = ['买入', '卖出', '净买入', ...chinaBond.value];
			}
			let serisesArr = JSON.parse(JSON.stringify(ecahrtsData.series))
			let seriesNew = serisesArr.filter(item => arr.includes(item.name));
			option1.value = _.cloneDeep(ecahrtsData);
			option1.value.series = seriesNew;
			option1.value.xAxis.data = ecahrtsDataX.value;
			option1.value.series.forEach((item1, index) => {
				const item2 = seriesArr.value.find(item => item.name == item1.name);
				item1.data = item2.data;
			})
		}
	}
	const handelChange = (val) => {
		if (val == '1' || val == '3') {
			chartInit({ ...searchForm.value, accountType: selectValue.value, timeUnit: timeUnit.value });
		} else {
			chartInitQd();
		}
	}
	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline.sobCodeList = resetList.sobCodeList;
		formInline.sobCodeListLabel = resetList.sobCodeListLabel;
		formInline.insuranceType = resetList.insuranceType;
		formInline.accountSet = formInline.accountSet;
		formInline.treeType = resetList.treeType;
		formInline.selfAcountTree = resetList.selfAcountTree;
		formInline.startDate = resetList.startDate;
		formInline.endDate = resetList.endDate;
		formInline.currencyUnit = resetList.currencyUnit;
		treeRef.value!.setCheckedKeys([])
		treeRef.value!.setExpandedKeys([])
	};


	// 导出
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
						'3.开始日期': formInline.startDate,
						'4.结束日期': formInline.endDate,
						'5.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
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

	:deep(.el-select__tags-text) {
		display: inline-block;
		max-width: 100px !important;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.holdEcharts {
		display: flex;
		margin-top: 10px;

		.el-card {
			padding-top: 10px;
		}

		&>div:nth-child(1) {
			margin-right: 10px;
		}

		&>div {
			flex: 1;
		}
	}

	.holdEcharts1 {
		display: flex;
		margin-top: 10px;

		.el-card {
			padding-top: 10px;
		}

		&>div {
			flex: 1;
		}
	}

	.el-card {
		overflow: visible !important;
		/* 让el-card容器的内容不被溢出隐藏 */
	}

	:deep(.el-select) {
		.el-input--small .el-input__wrapper {
			padding: 2.2px 7px !important;
		}
	}

	.temporary {
		background-color: #f3f7fb;
	}

	.echartsBox {
		box-sizing: border-box;
		position: relative;
	}

	.el-button-group .el-button {
		width: 60px;
		// height: 26px;
	}

	:deep(.el-select) {
		.el-input--small .el-input__wrapper {
			padding: 2.2px 7px !important;
		}
	}

	.echartsBox_search {
		position: absolute;
		right: 0px;
		top: -38px
	}

	.el-button--primary {
		--el-button-bg-color: #2272f7 !important
	}
</style>