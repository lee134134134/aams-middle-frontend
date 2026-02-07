<template>
	<div class="temporary">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule"
					label-position="left" label-width="120px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType">
								<el-select v-model="formInline.treeType" popper-class="custom-select" placeholder="请选择账户类型"
									style="width:100%;">
									<el-option v-for="(item, i) in treeTypeListData" :key="i" :label="item.label"
										:value="item.value" :disabled="item.disabled" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-divider></el-divider> -->
						<el-col :span="formInline.treeType == '4' ? 6 : 0">
							<el-form-item label="账户名称" prop="selfAcountTree" v-show="formInline.treeType == '4'"
								:rules="{ required: formInline.treeType == '4' ? true : false, message: '', trigger: ['blur', 'change'] }"
								class="margin-12">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择自定义账户"
									collapse-tags :max-collapse-tags="1" v-model="formInline.selfAcountTree"
									:data="selectZdyzh" multiple :render-after-expand="false" ref="slecetTree1"
									filterable />
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
									multiple :max-collapse-tags="1" :data="selectInsuranceList" :render-after-expand="false"
									filterable show-checkbox />

							</el-form-item>
						</el-col>
						<el-col :span="formInline.treeType == '1' ? 6 : 0">
							<el-form-item label="账户名称" prop="sobCodeList" v-show="formInline.treeType == '1'"
								:rules="{ required: formInline.treeType == '1' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline.sobCodeListLabel" popper-class="custom-select-sob"
									:render-after-expand="false" :props="props" @clear="clearSob" placeholder="请选择投资经理"
									style="width:100%;" collapse-tags :max-collapse-tags="1" filterable multiple clearable
									:filter-method="onQueryChanged">
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
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期" prop="endDate" style="width:100%;">
								<el-date-picker v-model="formInline.endDate" type="date" placeholder="请选择结束日期"
									:disabled-date="disabledDateEnd" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="主动/存量风险" prop="investType" class="margin-12" style="width:100%;">
								<el-select v-model="formInline.investType" popper-class="custom-select"
									placeholder="请选择交易类型" style="width:100%;" :disabled="investTypeBool">
									<el-option v-for="(item, i) in investTypeData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="资产类型" prop="assetsType" class="margin-12" style="width:100%;">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择资产类型"
									collapse-tags :max-collapse-tags="1" v-model="formInline.assetsType"
									:data="selectListData" multiple :render-after-expand="false" show-checkbox
									style="width:100%;" ref="assetsTypeTree" :props="assetsTypeProps" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="金额单位" prop="currencyUnit" class="margin-12" style="width:100%;">
								<el-select v-model="formInline.currencyUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;">
									<el-option v-for="(item, i) in selectListDataUnit" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="数据类型" prop="dataType" class="margin-12">
								<el-select v-model="formInline.dataType" popper-class="custom-select" placeholder="请选择数据类型"
									style="width:100%;" @change="handleDatatype">
									<el-option label="原始数据" value="0" />
									<el-option label="新版数据" value="1" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search" :loading="SearchLoading"
								class="button-custom color-button" data-track-id="DetailAssets-submit-btn"
								data-track-name="明细资产时序查询-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="DetailAssets-Download-btn"
								data-track-name="明细资产时序查询-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<TitleMargin title="明细资产时序查询">
				<div class="dw">单位：{{ unitVal }}</div>
			</TitleMargin>
			<DateList ref="childRef" :formInline="formInline" :selfAcountArr="selfAcountArr">
			</DateList>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import type { FormInstance } from "element-plus";
import { handleExportFile } from "@/api/DetailAssets.js";
import { getAssetType } from "@/api/DetailAssets.js";
import { getAllValues } from "@/utils/index.js";
import TitleMargin from "@/components/TitleMargin.vue";
import { getUsersTree, selectDept, selectInsurance, selectStatistics, getStartAndEndDate } from "@/api/common.js";
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
import { getChildrenCode, getValueArr1, filterTreeArr, compareObject, filterFormArr, getTreeLabel } from "@/utils/index.js";
import DateList from "./List/DateList.vue";
import { rule } from "./List/common.js";

interface Tree {
	id: string
	label: string
	children?: Tree[]
}

const ruleFormRef = ref(null);
const slecetTree = ref(null as any);
let unitVal = ref('元')
const childRef = ref<MethodObject[]>([]);
let formInline = reactive({
	treeType: '3',
	sobCodeList: [],
	sobCodeListLabel: [],
	startDate: '',
	assetsType: [],
	endDate: '',
	insuranceType: [],
	accountSet: [],
	selfAcountTree: [],
	investType: '5',
	currencyUnit: '2',
	dataType: '0'
});
let investTypeData = ref([
	{ value: '3', label: '主动资产' },
	{ value: '1', label: '存量风险' },
	{ value: '2', label: '专项信托资产' },
	{ value: '4', label: '主动加存量风险资产' },
	{ value: '5', label: '全口径' },
])
let searchObj = ref();
const props = {
	isLeaf: 'leaf',
	value: 'value',
	label: 'label',
}
const assetsTypeProps = {
	label: 'value',

}

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
	if (newval == '3') {
		investTypeBool.value = false;
	} else {
		investTypeBool.value = true;
		formInline.investType = '5';
	}
})
let selfAcountArr = ref([]);
watch(() => formInline.selfAcountTree, (newval, oldval) => {
	selfAcountArr.value = getValueArr1(selectDataArr.value, formInline.selfAcountTree);
})
let resetList = reactive({
	treeType: '3',
	sobCodeList: [],
	sobCodeListLabel: [],
	startDate: '',
	endDate: '',
	assetsType: [],
	insuranceType: [],
	accountSet: [],
	selfAcountTree: [],
	currencyUnit: '2',
	investType: '5',
	dataType: '0'
});
let treeTypeListData = ref([
	{ value: '3', label: '统计账套', disabled: false },
	{ value: '1', label: '投资经理', disabled: false },
	{ value: '2', label: '险种', disabled: false },
	{ value: '4', label: '自定义账户', disabled: false }
])
let selectListDataUnit = ref([
	{ value: '0', label: '亿元' },
	{ value: '1', label: '万元' },
	{ value: '2', label: '元' },
])
// 开始结束时间限制
const dateVal = (date: any) => {
	return Date.parse(new Date(date) as any);
};
const disabledDateEnd = (time: any) => {
	if (formInline.startDate) {
		return time.getTime() < dateVal(formInline.startDate);
	}
};

// 开始结束时间限制
const minDate = new Date(2025, 6, 16);
const maxDate = new Date(2025, 6, 17);
const disabledDateStart = (time: any) => {
	if (formInline.dataType === '1') {
		return (time.getTime() < minDate.getTime() || time.getTime() > dateVal(formInline.endDate) - 86400000)
	}
	//注意这要加一个判断不然没选结束时间的时候开始时间也全部不能选择
	if (formInline.endDate) {
		return time.getTime() > dateVal(formInline.endDate) - 86400000;
	}

};

// let formList = ref({});
onMounted(() => {
	getUsers();
	getAssetTypeList();
	getDefaultsDate();
	getSelectInsurance();
	getSelectStatistics();
});
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

let selectListData = ref([]);
// 资产类型
const getAssetTypeList = async () => {
	const res = await getAssetType();
	if (res && res.code == '00000') {
		selectListData.value = res.data || [];
		formInline.assetsType = getAllValues(res.data) as any;
		resetList.assetsType = JSON.parse(JSON.stringify(getAllValues(res.data)));
	}
}

// 投资经理、自定义账户树
let propsv2 = ref({
	value: 'value',
	label: 'label',
	children: 'children'
})
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const onQueryChanged = (query: string) => {
	treeRef.value!.filter(query)
	if (!query) {
		treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
	}
}
const filterMethod = (query: string, node: TreeNodeData) => node.label!.includes(query)
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
const SearchLoading = ref(false);
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			SearchLoading.value = true;
			searchObj.value = JSON.parse(JSON.stringify({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
			downloadBool.value = false;
			let res = await childRef.value.getContentList({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }, true)
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
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	resetData();
};
// 导出明细
const DownloadLoading = ref(false);
const handleDownload = (formEl: FormInstance | undefined) => {
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
				let str = formInline.sobCodeList.length ? formInline.sobCodeList.map(item => item.slice(0, -10)).join(',').split(',') : [];
				let formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value);
				let queryCondition = {
					...formArr,
					'3.开始日期': formInline.startDate,
					'4.结束日期': formInline.endDate,
					'5.主动/存量风险': investTypeData.value.find(item => item.value == formInline.investType)?.label,
					'6.资产类型': formInline.assetsType,
					'7.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label,
					'8.数据类型': formInline.dataType == '0' ? '原始数据' : '新版数据'
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


const handleDatatype = (val) => {
	if (val === '1') {
		const currentDate = new Date(formInline.startDate)
		if (currentDate < minDate) {
			formInline.startDate = '2025-07-16';
		}
		const currentEndDate = new Date(formInline.endDate);
		if (currentEndDate < maxDate) {
			formInline.endDate = resetList.endDate;
		}
		// // 类型逻辑
		// if (formInline.treeType == '3') {
		// 	formInline.treeType = '1';
		// }
		// treeTypeListData.value.forEach(el => {
		// 	if (el.value == '3') {
		// 		el.disabled = true
		// 	}
		// })
	} else {
		formInline.startDate = formInline.startDate;
		treeTypeListData.value.forEach(el => el.disabled = false)
	}
}


const resetData = () => {
	formInline.startDate = resetList.startDate;
	formInline.endDate = resetList.endDate;
	formInline.treeType = resetList.treeType;
	formInline.dataType = resetList.dataType;
	formInline.assetsType = resetList.assetsType;
	formInline.sobCodeList = resetList.sobCodeList;
	formInline.insuranceType = resetList.insuranceType;
	formInline.accountSet = resetList.accountSet;
	formInline.selfAcountTree = resetList.selfAcountTree;
	formInline.currencyUnit = resetList.currencyUnit;
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
		font-size: 12px;
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