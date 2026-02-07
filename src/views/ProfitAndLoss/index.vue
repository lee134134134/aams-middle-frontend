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
									<el-select v-model="formInline.sobCodeListLabel" popper-class="custom-select-sob"  :render-after-expand="false"  :props="props"  @clear="clearSob"
									placeholder="请选择投资经理" style="width:100%;"  collapse-tags :max-collapse-tags="1" filterable  multiple clearable :filter-method="onQueryChanged">
										<template #empty> 
											  <el-tree-v2
											    ref="treeRef"
											    :data="selectTzjlAll"
											    :props="propsv2"
											    show-checkbox
												:default-expanded-all="true"
											    :filter-method="filterMethod"
												@check-change="v2Click"
												:highlight-current="true"
											  />
										</template>
									</el-select>
							</el-form-item>
						</el-col>


						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" class="margin-12" required>
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.queryDate"
									type="date" style="width:100%;" placeholder="请选择查询日期" value-format="YYYY-MM-DD"
									:clearable="false" :editable="false"></el-date-picker>
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
								data-track-id="ProfitAndLoss-submit-btn" data-track-name="损益情况报表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="ProfitAndLoss-Download-btn"
								data-track-name="损益情况报表-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>

		</el-card>
		<el-card>
			<TitleMargin title="损益情况报表">
				<div class="dw">单位：{{ unitVal }}</div>
			</TitleMargin>
			<DataList ref="DateListref" :downloadBool="downloadBool"></DataList>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch, nextTick } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile } from "@/api/ProfitAndLoss.js";
	import TitleMargin from "@/components/TitleMargin.vue";
	import { getUsersTree, selectDept, selectInsurance, selectStatistics, getCaldDate } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import { rule } from "./List/common.js";
	import { getAllValues,getTreeLabel } from "@/utils/index.js";
	import { ElMessage, ElMessageBox ,ElTreeV2} from "element-plus";
	import { getValueArr1,compareObject, filterFormArr } from "@/utils/index.js";
	import type { TreeNodeData } from 'element-plus'
	import _ from "lodash"
	interface Tree {
	  id: string
	  label: string
	  children?: Tree[]
	}
	// 初始化数据
	onMounted(() => {
		getUsers();
		getCaldDateTime();
		getSelectInsurance();
		getSelectStatistics();

	});

	const DateListref = ref();
	const slecetTree = ref(null as any);
	const slecetTreeTzjl = ref(null as any);
	let searchObj = ref();
	const SearchLoading = ref(false);
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		treeType: '3',
		sobCodeList: [],
		sobCodeListLabel:[],
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		queryDate: '',
		investType: '5',
		currencyUnit: '1'
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
	let investTypeBool = ref(false);
	watch(() => formInline.treeType, (newval, oldval) => {
		if(newval=='3'){
			investTypeBool.value = false;
		}else{
			investTypeBool.value = true;
			formInline.investType = '5';
		}
	})
	const props = {
		value:'value',
		label:'label',
	}
	let resetList = reactive({
		treeType: '3',
		sobCodeList: [],
		sobCodeListLabel:[],
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		investType: '5',
		currencyUnit: '1',
		queryDate: '',
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
	let unitVal = ref('万元')
	// 交易日历
	const getCaldDateTime = async () => {
		let obj = {
			numsDay: '2'
		}
		const res = await getCaldDate({ ...obj });
		if (res && res.code == '00000') {
			formInline.queryDate = res.data;
			resetList.queryDate = res.data;
		}
	};
	// 险种
	const selectInsuranceList = ref([]);
	const getSelectInsurance = async () => {
		const res = await selectInsurance();
		if (res && res.code == '00000') {
			selectInsuranceList.value = res.data || [];
			// formInline.insuranceType = getAllValues(res.data) as any;
			// resetList.insuranceType = JSON.parse(JSON.stringify(getAllValues(res.data)));
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
		value:'value',
		label:'label',
		children:'children'
	})
	const treeRef = ref<InstanceType<typeof ElTreeV2>>()
	const onQueryChanged = (query: string) => {
		treeRef.value!.filter(query)
		if(!query){
			treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
		}
	}
	const filterMethod = (query: string, node: TreeNodeData) =>  node.label!.includes(query)
	const v2Click = (data,node) => {
		if(node){
			let arr = data.childrenPrdCodeList.split(',') || [];
			formInline.sobCodeList = [...formInline.sobCodeList,...arr]
		}else{
			let arr = data.childrenPrdCodeList.split(',') || [];
			formInline.sobCodeList = formInline.sobCodeList.filter(item=>!arr.includes(item))
		}
		formInline.sobCodeListLabel = getTreeLabel(selectTzjlAll.value,formInline.sobCodeList.map(item=>item.split('&').pop()))
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
	const onSubmit = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				SearchLoading.value = true;
				searchObj.value = JSON.parse(JSON.stringify({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
				downloadBool.value = false;
				DateListref.value
					.getContentList({ ...formInline, sobCodeList:formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) })
					.then(() => {
						SearchLoading.value = false;
					})
					.catch(() => {
						SearchLoading.value = false;
					});
			}
		});

	};
	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline.sobCodeList = resetList.sobCodeList;
		formInline.sobCodeListLabel = resetList.sobCodeListLabel;
		formInline.insuranceType = [];
		formInline.accountSet = [];
		formInline.treeType = resetList.treeType;
		formInline.selfAcountTree = resetList.selfAcountTree;
		formInline.queryDate = resetList.queryDate;
		formInline.investType = resetList.investType;
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
						'3.查询日期': formInline.queryDate,
						'4.主动/存量风险': selectListData.value.find(item => item.value == formInline.investType)?.label,
						'5.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
					}
					let bool = compareObject(searchObj.value, { ...formInline,  selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) });
					if (bool) {
						DownloadLoading.value = true;
						handleExportFile({ ...formInline,  selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree), queryCondition })
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
	
	.temporary {
		background-color: #f3f7fb;
	}
</style>
