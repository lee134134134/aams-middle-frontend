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
							<el-form-item label="查询日期" prop="queryDate" class="margin-12" required>
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.queryDate"
									type="date" style="width:100%;" placeholder="请选择查询日期" value-format="YYYY-MM-DD"
									:clearable="false" :editable="false"></el-date-picker>
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
								data-track-id="FixedRevenList-submit-btn"
								data-track-name="固定类组合持仓收益分析表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="FixedRevenList-Download-btn"
								data-track-name="固定类组合持仓收益分析表-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>

		</el-card>
		<el-card>
			<TitleMargin title="固定类组合持仓收益分析表">
				<div class="dw">单位：{{ unitVal }}</div>
			</TitleMargin>
			<DataList ref="DateListref" :downloadBool="downloadBool"></DataList>
		</el-card>
		<div class="holdEcharts">
			<el-card>
				<Title class="top-10" title="资产分类占比"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select v-model="selectValue" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('1')" :disabled="isLoading" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef1" style="width: 100%; height: 300px" v-loading="isLoading"
						 :option="option1" autoresize></v-chart>
				</div>
			</el-card>
			<el-card>
				<Title class="top-10" title="债券一级分类占比"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select v-model="selectValue1" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('2')" :disabled="isLoading1" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef2" style="width: 100%; height: 300px" v-loading="isLoading1" :option="option2"
						autoresize></v-chart>
				</div>
				
			</el-card>
		</div>
		<div class="holdEcharts1">
			<el-card>
				<Title class="top-10" title="债券二级分类占比"></Title>
				
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select v-model="selectValue2" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('3')" :disabled="isLoading2" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef3" style="width: 100%; height: 462px" v-loading="isLoading2" :option="option3"
						autoresize></v-chart>
				</div>
			</el-card>
		</div>
		<div class="holdEcharts">
			<el-card>
				<Title class="top-10" title="久期历史波动"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">	
						<el-select v-model="selectValue3" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('4')" :disabled="isLoading3" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
						<el-select v-model="chinaBond1" popper-class="custom-select" placeholder="请选择"
							style="width: 200px; margin-left: 10px" @blur="handelChange('4')" :disabled="isLoading3"
							collapse-tags multiple :max-collapse-tags="1">
							<el-option v-for="item in chinaBondArr" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef4" style="width: 100%; height: 462px" v-loading="isLoading3" :option="option4"
						autoresize></v-chart>
				</div>
			</el-card>
			<el-card>
				<Title class="top-10" title="时间加权收益率"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select v-model="selectValue4" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('5')" :disabled="isLoading4" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
						<el-select v-model="chinaBond2" popper-class="custom-select" placeholder="请选择"
							style="width: 200px; margin-left: 10px" @blur="handelChange('5')" :disabled="isLoading4"
							collapse-tags multiple :max-collapse-tags="1">
							<el-option v-for="item in chinaBondArr" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef5" style="width: 100%; height: 462px" v-loading="isLoading4" :option="option5"
						autoresize></v-chart>
				</div>
			</el-card>
		</div>
		<div class="holdEcharts1">
			<el-card>
				<Title class="top-10" title="久期分布"></Title>
				<div class="echartsBox">
					<div class="echartsBox_search">
						<el-select
						elect v-model="selectValue5" popper-class="custom-select"  placeholder="请选择账户类型"
							style="width: 200px; margin-left: 10px" @blur="handelChange('6')" :disabled="isLoading5" collapse-tags
									multiple :max-collapse-tags="1">
							<el-option v-for="item in options" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
					<v-chart ref="echartsRef6" style="width: 100%; height: 462px" v-loading="isLoading5" :option="option6"
						autoresize></v-chart>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch, nextTick } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile,getAssetTypeClassificationChart,getDefaultAccountType,getBondPrimaryCategory,getBondSecondaryCategory,getDurationHistoricalVolatility,getTimeWeightedReturn,getDurationDistribution} from "@/api/FixedRevenList.js";
	import TitleMargin from "@/components/TitleMargin.vue";
	import Title from "@/components/Title.vue";
	import { getUsersTree, selectDept, selectInsurance, selectStatistics, getCaldDate } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import { rule, ecahrtsArr } from "./List/common.js";
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
		await getCaldDateTime();
		await getSelectInsurance();
		await getSelectStatistics();
		await getDefaultAccountList();
		searchForm.value = JSON.parse(JSON.stringify({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
		// init();
		// chartInit({...searchForm.value,accountType:selectValue.value});
		// chartInit1({...searchForm.value,accountType:selectValue1.value});
		// chartInit2({...searchForm.value,accountType:selectValue2.value});
		// chartInit3({...searchForm.value,accountType:selectValue3.value});
		// chartInit4({...searchForm.value,accountType:selectValue4.value});
		// chartInit5({...searchForm.value,accountType:selectValue5.value});
	});

	const DateListref = ref();
	const slecetTree = ref(null as any);
	const slecetTreeTzjl = ref(null as any);
	let searchObj = ref();
	const SearchLoading = ref(false);
	let chinaBondArr = ref(['中债国债到期收益率','中长期纯债基金收益率'])
	let chinaBond1 = ref(['中债国债到期收益率']);
	let chinaBond2 = ref(['中债国债到期收益率']);
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		treeType: '2',
		sobCodeList: [],
		sobCodeListLabel: [],
		insuranceType: [],
		accountSet: [],
		selfAcountTree: [],
		queryDate: '',
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
		queryDate: '',
	});
	let treeTypeListData = ref([
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
				selectValue.value = ['所有账户类型'];
				selectValue1.value = ['所有账户类型'];
				selectValue2.value = ['所有账户类型'];
				selectValue3.value = ['所有账户类型'];
				selectValue4.value = ['所有账户类型'];
				selectValue5.value = ['所有账户类型'];
				chinaBond1.value = ['中债国债到期收益率']
				chinaBond2.value = ['中债国债到期收益率']
				searchForm.value = JSON.parse(JSON.stringify({ ...formInline, sobCodeList: formInline.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
				init();
				chartInit({...searchForm.value,accountType:selectValue.value});
				chartInit1({...searchForm.value,accountType:selectValue.value});
				chartInit2({...searchForm.value,accountType:selectValue.value});
				chartInit3({...searchForm.value,accountType:selectValue.value});
				chartInit4({...searchForm.value,accountType:selectValue.value});
				chartInit5({...searchForm.value,accountType:selectValue.value});
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
	let selectValue = ref([]);
	let selectValue1 = ref([]);
	let selectValue2 = ref([]);
	let selectValue3 = ref([]);
	let selectValue4 = ref([]);
	let selectValue5 = ref([]);
	const getDefaultAccountList = async () => {
		let res = await getDefaultAccountType();
		if(res&&res.code=='00000'){
			options.value = res.data;
			selectValue.value = ['所有账户类型'];
			selectValue1.value = ['所有账户类型'];
			selectValue2.value = ['所有账户类型'];
			selectValue3.value = ['所有账户类型'];
			selectValue4.value = ['所有账户类型'];
			selectValue5.value = ['所有账户类型'];
		}
	}
	
	
	let option1 = ref()
	let option2 = ref()
	let option3 = ref()
	let option4 = ref()
	let option5 = ref()
	let option6 = ref()
	let isLoading = ref(false);
	let isLoading1 = ref(false);
	let isLoading2 = ref(false);
	let isLoading3 = ref(false);
	let isLoading4 = ref(false);
	let isLoading5 = ref(false);
	let echartsRef1 = ref(null);
	let echartsRef2 = ref();
	let echartsRef3 = ref();
	const chartInit = async (obj) => {
		isLoading.value = true;
		let res = await getAssetTypeClassificationChart({ ...obj })
		isLoading.value = false;
		if (res && res.code == '00000') {
			// 第一张图相关
			option1.value = ecahrtsArr.data1;
			if (res.data&&res.data.length>0) {
				option1.value.series[0].data = res.data;
				option1.value.title.text = '';
			} else {
				option1.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option1.value.series[0].data = [];
			}
		}
	}
	const chartInit1 = async (obj) => {
		isLoading1.value = true;
		let res = await getBondPrimaryCategory({ ...obj })
		isLoading1.value = false;
		if (res && res.code == '00000') {
			// 第二张图相关
			option2.value = ecahrtsArr.data2;
			if (res.data&&res.data.length>0) {
				option2.value.title.text = '';
				option2.value.series[0].data = res.data;
			} else {
				option2.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option2.value.series[0].data = [];
			}
		}
	}
	const chartInit2 = async (obj) => {
		isLoading2.value = true;
		let res = await getBondSecondaryCategory({ ...obj })
		isLoading2.value = false;
		if (res && res.code == '00000') {
			// 第三张图相关
			option3.value = ecahrtsArr.data3;
			if (res.data&&res.data.length>0) {
				let X = res.data.map(item => item.name)
				let Y = res.data.map(item => item.value)
				option3.value.title.text = '';
				option3.value.series[0].data = Y;
				option3.value.xAxis.data = X;
			} else {
				option3.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option3.value.series[0].data = [];
				option3.value.xAxis.data = [];
			}
		}
	}
	// getDurationHistoricalVolatility,getTimeWeightedReturn,getDurationDistribution
	const chartInit3 = async (obj) => {
		isLoading3.value = true;
		let res = await getDurationHistoricalVolatility({ ...obj })
		isLoading3.value = false;
		if (res && res.code == '00000') {
			// 第四张图相关
			option4.value = ecahrtsArr.data4;
			if (res.data.series&&res.data.series.length>0) {
				if(option4.value.title?.text){
					option4.value.title.text = '';
				}
				if(chinaBond1.value.includes('中债国债到期收益率')){
					option4.value.series[1].data = res.data.series[1].data;
				}else{
					option4.value.series[1].data = [];
				}
				if(chinaBond1.value.includes('中长期纯债基金收益率')){
					option4.value.series[2].data = res.data.series[2].data;
				}else{
					option4.value.series[2].data = [];
				}
				option4.value.series[0].data = res.data.series[0]?res.data.series[0].data:[];
				option4.value.xAxis.data = res.data.xaxis;
			} else {
				option4.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option4.value.series[0].data = [];
				option4.value.series[1].data = [];
				option4.value.series[2].data = [];
				option4.value.xAxis.data = [];
			}
		}
	}
	const chartInit4 = async (obj) => {
		isLoading4.value = true;
		let res = await getTimeWeightedReturn({ ...obj })
		isLoading4.value = false;
		if (res && res.code == '00000') {
			// 第四张图相关
			option5.value = ecahrtsArr.data5;
			if (res.data.series&&res.data.series.length>0) {
				if(option5.value.title?.text){
					option5.value.title.text = '';
				}
				if(chinaBond2.value.includes('中债国债到期收益率')){
					option5.value.series[1].data = res.data.series[1].data;
				}else{
					option5.value.series[1].data = [];
				}
				if(chinaBond2.value.includes('中长期纯债基金收益率')){
					option5.value.series[2].data = res.data.series[2].data;
				}else{
					option5.value.series[2].data = [];
				}
				option5.value.series[0].data = res.data.series[0]?res.data.series[0].data:[];
				option5.value.xAxis.data = res.data.xaxis;
			} else {
				option5.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option5.value.series[0].data = [];
				option5.value.series[1].data = [];
				option5.value.series[2].data = [];
				option5.value.xAxis.data = [];
			}
		}
	}
	const chartInit5 = async (obj) => {
		isLoading5.value = true;
		let res = await getDurationDistribution({ ...obj })
		isLoading5.value = false;
		if (res && res.code == '00000') {
			// 第四张图相关
			option6.value = ecahrtsArr.data6;
			if (res.data.series&&res.data.series.length>0) {
				if(option6.value.title?.text){
					option6.value.title.text = '';
				}
				option6.value.series[0].data = res.data.series[0].data;
				option6.value.xAxis.data = res.data.xaxis;
			} else {
				option6.value.title = {
					text: '暂无数据',
					x: 'center',
					y: 'center',
				};
				option6.value.series[0].data = [];
				option6.value.xAxis.data = [];
			}
		}
	}
	const handelChange = (val) => {
		if(val=='1'){
			chartInit({...searchForm.value,accountType:selectValue.value});
		}else if(val=='2'){
			chartInit1({...searchForm.value,accountType:selectValue1.value});
		}else if(val=='3'){
			chartInit2({...searchForm.value,accountType:selectValue2.value});
		}else if(val=='4'){
			chartInit3({...searchForm.value,accountType:selectValue3.value});
		}else if(val=='5'){
			chartInit4({...searchForm.value,accountType:selectValue4.value});
		}else if(val=='6'){
			chartInit5({...searchForm.value,accountType:selectValue5.value});
		}
	}
	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline.sobCodeList = resetList.sobCodeList;
		formInline.sobCodeListLabel = resetList.sobCodeListLabel;
		formInline.insuranceType = resetList.insuranceType;
		formInline.accountSet = [];
		formInline.treeType = resetList.treeType;
		formInline.selfAcountTree = resetList.selfAcountTree;
		formInline.queryDate = resetList.queryDate;
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
						'4.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
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