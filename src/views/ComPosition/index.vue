<template>
	<div class="temporary">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form v-if="tabsName == 'equity' || tabsName == 'stock'" ref="ruleFormRef" class="demo-form-inline"
					:inline="true" :model="formInline" label-position="left" label-width="80px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline.treeType" popper-class="custom-select" placeholder="请选择账户类型"
									style="width:100%;">
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
											@check-change="(data, node) => v2Click(data, node, formInline)"
											:highlight-current="true" />
									</template>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="selectTime" style="width:100%;" class="margin-12"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.selectTime" type="date"
									placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search" :loading="SearchLoading"
								class="button-custom color-button" data-track-id="ComPosition-submit-btn"
								data-track-name="权益类组合持仓表-基金股票-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="detailData(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="ComPosition-Download-btn"
								data-track-name="权益类组合持仓表-基金股票-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-form v-if="tabsName == 'asset'" ref="ruleFormRef2" class="demo-form-inline" :inline="true"
					:model="formInline2" label-position="left" label-width="80px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline2.treeType" popper-class="custom-select" placeholder="请选择账户类型"
									style="width:100%;">
									<el-option v-for="(item, i) in treeTypeListExpandData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-divider></el-divider> -->
						<el-col :span="formInline2.treeType == '4' ? 6 : 0">
							<el-form-item label="账户名称" prop="selfAcountTree" v-show="formInline2.treeType == '4'"
								:rules="{ required: formInline2.treeType == '4' ? true : false, message: '', trigger: ['blur', 'change'] }"
								class="margin-12">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择自定义账户"
									collapse-tags :max-collapse-tags="1" v-model="formInline2.selfAcountTree"
									:data="selectZdyzh2" multiple :render-after-expand="false" ref="slecetTree1"
									filterable />
							</el-form-item>
						</el-col>
						<el-col :span="formInline2.treeType == '2' ? 6 : 0">
							<el-form-item label="账户名称" prop="insuranceType" v-show="formInline2.treeType == '2'"
								:rules="{ required: formInline2.treeType == '2' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-tree-select ref="slecetTree" v-model="formInline2.insuranceType" style="width:100%;"
									class="custom-checkbox" clearable node-key="value" placeholder="请选择险种" collapse-tags
									multiple :max-collapse-tags="1" :data="selectInsuranceList" :render-after-expand="false"
									filterable show-checkbox />

							</el-form-item>
						</el-col>
						<el-col :span="formInline2.treeType == '1' ? 6 : 0">
							<el-form-item label="账户名称" prop="sobCodeList" v-show="formInline2.treeType == '1'"
								:rules="{ required: formInline2.treeType == '1' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline2.sobCodeListLabel" popper-class="custom-select-sob"
									:render-after-expand="false" :props="props" @clear="clearSob2" placeholder="请选择投资经理"
									style="width:100%;" collapse-tags :max-collapse-tags="1" filterable multiple clearable
									:filter-method="onQueryChanged2">
									<template #empty>
										<el-tree-v2 ref="treeRef2" :data="selectTzjlAll" :props="propsv2" show-checkbox
											:default-expanded-all="true" :filter-method="filterMethod"
											@check-change="(data, node) => v2Click(data, node, formInline2)"
											:highlight-current="true" />
									</template>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" style="width:100%;" class="margin-12"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline2.queryDate" type="date"
									placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="tabsName === 'asset' || tabsName === 'float'">
							<el-form-item label="金额单位" prop="currencyUnit"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline2.currencyUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;" filterable>
									<el-option v-for="(item, i) in AmountUnitList" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef2)" icon="Search"
								:loading="SearchLoading2" class="button-custom color-button"
								data-track-id="ComPosition-Asset-submit-btn"
								data-track-name="权益类组合持仓表-资产持仓-查询">查询</el-button>
							<el-button @click="resetForm2(ruleFormRef2)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="detailData(ruleFormRef2)" icon="Download" :loading="DownloadLoading2"
								class="button-custom" data-track-id="ComPosition-Asset-Download-btn"
								data-track-name="权益类组合持仓表-资产持仓-导出" :disabled="downloadBool2">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-form v-if="tabsName == 'float'" ref="ruleFormRef3" class="demo-form-inline" :inline="true"
					:model="formInline3" label-position="left" label-width="80px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline3.treeType" popper-class="custom-select" placeholder="请选择账户类型"
									style="width:100%;">
									<el-option v-for="(item, i) in treeTypeListExpandData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-divider></el-divider> -->
						<el-col :span="formInline3.treeType == '4' ? 6 : 0">
							<el-form-item label="账户名称" prop="selfAcountTree" v-show="formInline3.treeType == '4'"
								:rules="{ required: formInline3.treeType == '4' ? true : false, message: '', trigger: ['blur', 'change'] }"
								class="margin-12">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择自定义账户"
									collapse-tags :max-collapse-tags="1" v-model="formInline3.selfAcountTree"
									:data="selectZdyzh3" multiple :render-after-expand="false" ref="slecetTree1"
									filterable />
							</el-form-item>
						</el-col>
						<el-col :span="formInline3.treeType == '2' ? 6 : 0">
							<el-form-item label="账户名称" prop="insuranceType" v-show="formInline3.treeType == '2'"
								:rules="{ required: formInline3.treeType == '2' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-tree-select ref="slecetTree" v-model="formInline3.insuranceType" style="width:100%;"
									class="custom-checkbox" clearable node-key="value" placeholder="请选择险种" collapse-tags
									multiple :max-collapse-tags="1" :data="selectInsuranceList" :render-after-expand="false"
									filterable show-checkbox />

							</el-form-item>
						</el-col>
						<el-col :span="formInline3.treeType == '1' ? 6 : 0">
							<el-form-item label="账户名称" prop="sobCodeList" v-show="formInline3.treeType == '1'"
								:rules="{ required: formInline3.treeType == '1' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline3.sobCodeListLabel" popper-class="custom-select-sob"
									:render-after-expand="false" :props="props" @clear="clearSob3" placeholder="请选择投资经理"
									style="width:100%;" collapse-tags :max-collapse-tags="1" filterable multiple clearable
									:filter-method="onQueryChanged3">
									<template #empty>
										<el-tree-v2 ref="treeRef3" :data="selectTzjlAll" :props="propsv2" show-checkbox
											:default-expanded-all="true" :filter-method="filterMethod"
											@check-change="(data, node) => v2Click(data, node, formInline3)"
											:highlight-current="true" />
									</template>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" style="width:100%;" class="margin-12"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline3.queryDate" type="date"
									placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="金额单位" prop="currencyUnit"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline3.currencyUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;" filterable>
									<el-option v-for="(item, i) in AmountUnitList" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef3)" icon="Search"
								:loading="SearchLoading3" class="button-custom color-button"
								data-track-id="ComPosition-Float-submit-btn"
								data-track-name="权益类组合持仓表-浮盈分布-查询">查询</el-button>
							<el-button @click="resetForm3(ruleFormRef3)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="detailData(ruleFormRef3)" icon="Download" :loading="DownloadLoading3"
								class="button-custom" data-track-id="ComPosition-Float-Download-btn"
								data-track-name="权益类组合持仓表-浮盈分布-导出" :disabled="downloadBool3">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-form v-if="tabsName == 'position'" ref="ruleFormRef4" class="demo-form-inline" :inline="true"
					:model="formInline4" label-position="left" label-width="80px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="账户类型" prop="treeType"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline4.treeType" popper-class="custom-select" placeholder="请选择账户类型"
									style="width:100%;">
									<el-option v-for="(item, i) in treeTypeListExpandData" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<!-- <el-divider></el-divider> -->
						<el-col :span="formInline4.treeType == '4' ? 6 : 0">
							<el-form-item label="账户名称" prop="selfAcountTree" v-show="formInline4.treeType == '4'"
								:rules="{ required: formInline4.treeType == '4' ? true : false, message: '', trigger: ['blur', 'change'] }"
								class="margin-12">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择自定义账户"
									collapse-tags :max-collapse-tags="1" v-model="formInline4.selfAcountTree"
									:data="selectZdyzh4" multiple :render-after-expand="false" ref="slecetTree1"
									filterable />
							</el-form-item>
						</el-col>
						<el-col :span="formInline4.treeType == '2' ? 6 : 0">
							<el-form-item label="账户名称" prop="insuranceType" v-show="formInline4.treeType == '2'"
								:rules="{ required: formInline4.treeType == '2' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-tree-select ref="slecetTree" v-model="formInline4.insuranceType" style="width:100%;"
									class="custom-checkbox" clearable node-key="value" placeholder="请选择险种" collapse-tags
									multiple :max-collapse-tags="1" :data="selectInsuranceList" :render-after-expand="false"
									filterable show-checkbox />

							</el-form-item>
						</el-col>
						<el-col :span="formInline4.treeType == '1' ? 6 : 0">
							<el-form-item label="账户名称" prop="sobCodeList" v-show="formInline4.treeType == '1'"
								:rules="{ required: formInline4.treeType == '1' ? true : false, message: '', trigger: ['blur', 'change'] }">
								<el-select v-model="formInline4.sobCodeListLabel" popper-class="custom-select-sob"
									:render-after-expand="false" :props="props" @clear="clearSob4" placeholder="请选择投资经理"
									style="width:100%;" collapse-tags :max-collapse-tags="1" filterable multiple clearable
									:filter-method="onQueryChanged4">
									<template #empty>
										<el-tree-v2 ref="treeRef4" :data="selectTzjlAll" :props="propsv2" show-checkbox
											:default-expanded-all="true" :filter-method="filterMethod"
											@check-change="(data, node) => v2Click(data, node, formInline4)"
											:highlight-current="true" />
									</template>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" style="width:100%;" class="margin-12"
								:rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline4.queryDate" type="date"
									placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>

					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button type="primary" @click="onSubmit(ruleFormRef4)" icon="Search"
								:loading="SearchLoading4" class="button-custom color-button"
								data-track-id="ComPosition-Position-submit-btn"
								data-track-name="权益类组合持仓表-持仓集中度-查询">查询</el-button>
							<el-button @click="resetForm4(ruleFormRef4)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="detailData(ruleFormRef4)" icon="Download" :loading="DownloadLoading4"
								class="button-custom" data-track-id="ComPosition-Position-Download-btn"
								data-track-name="权益类组合持仓表-持仓集中度-导出" :disabled="downloadBool4">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<div class="tableList">
				<el-tabs v-model="tabsName" class="demo-tabs" @tab-click="handleTabsClick">
					<el-tab-pane label="权益类基金" name="equity">
						<DateList ref="childRef" :downloadBool="downloadBool"> </DateList>
					</el-tab-pane>
					<el-tab-pane label="股票" name="stock">
						<DateList1 ref="childRef1" :downloadBool="downloadBool"> </DateList1>
					</el-tab-pane>
					<el-tab-pane label="资产持仓" name="asset">
						<DateList2 ref="childRef2" :downloadBool="downloadBool2" @changeLoading="changeLoading2">
						</DateList2>
					</el-tab-pane>
					<el-tab-pane label="浮盈分布" name="float">
						<DateList3 ref="childRef3" :downloadBool="downloadBool3" @changeLoading="changeLoading3">
						</DateList3>
					</el-tab-pane>
					<el-tab-pane label="持仓集中度" name="position">
						<DateList4 ref="childRef4" :formInline="formInline4" :downloadBool="downloadBool4"
							@changeLoading="changeLoading4">
						</DateList4>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import type { FormInstance, TabsPaneContext } from "element-plus";
import { getList, handleExportFile, exportAssetPosition, floatingExport, exportPosition } from "@/api/ComPosition.js";
import ComPosition from "@/stores/modules/ComPosition.js";
import { getUsersTree, selectDept, selectInsurance, selectStatistics, getCaldDate, getDefaultDate } from "@/api/common.js";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
import { getChildrenCode, getValueArr1, filterTreeArr, getAllValues1, compareObject, filterFormArr, getTreeLabel } from "@/utils/index.js";
import DateList from "./List/DataList.vue";
import DateList1 from "./List/DataList1.vue";
import DateList2 from "./List/DataList2.vue";
import DateList3 from "./List/DataList3.vue";
import DateList4 from "./List/DataList4.vue";
import { rule } from "./List/common.js";
interface Tree {
	id: string
	label: string
	children?: Tree[]
}
interface MethodObject {
	initPage: () => void;
	getContentList: (arg: any) => void;
}
let _ComPosition = ComPosition();
let {
	list1,
	resetlist1,
	total1,
	list2,
	resetlist12,
	total2,
	isLoading,
	pageSize2,
	pageNo2,
	pageSize1,
	pageNo1,
} = storeToRefs(_ComPosition);
const ruleFormRef = ref(null);
const ruleFormRef2 = ref(null);
const ruleFormRef3 = ref(null);
const ruleFormRef4 = ref(null);
const slecetTree = ref(null as any);
const rules = reactive(rule);
const childRef = ref<MethodObject[]>([]);
const childRef1 = ref<MethodObject[]>([]);
const childRef2 = ref<MethodObject[]>([]);
const childRef3 = ref<MethodObject[]>([]);
const childRef4 = ref<MethodObject[]>([]);
let formInline = reactive({
	treeType: '3',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	accountSet: [],
	selfAcountTree: [],
	investType: '5',
	selectTime: '',
});
let formInline2 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
	currencyUnit: '0'
});
let formInline3 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
	currencyUnit: '0'
});
let formInline4 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
});

const props = {
	isLeaf: 'leaf',
	value: 'value',
	label: 'label',
}
let resetList = reactive({
	treeType: '3',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	accountSet: [],
	selfAcountTree: [],
	investType: '5',
	selectTime: '',
});
let resetList2 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
	currencyUnit: '0'
});
let resetList3 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
	currencyUnit: '0'
});
let resetList4 = reactive({
	treeType: '2',
	sobCodeList: [],
	sobCodeListLabel: [],
	insuranceType: [],
	selfAcountTree: [],
	investType: '5',
	queryDate: '',
});

onMounted(() => {
	getUsers();
	getCaldDateTime();
	getSelectInsurance();
	getSelectStatistics();
});
let treeTypeListData = ref([
	{ value: '3', label: '统计账套' },
	{ value: '1', label: '投资经理' },
	{ value: '2', label: '险种' },
	{ value: '4', label: '自定义账户' }
])
let treeTypeListExpandData = ref([
	{ value: '1', label: '投资经理' },
	{ value: '2', label: '险种' },
	{ value: '4', label: '自定义账户' }
])
const AmountUnitList = ref([
	{ label: '亿元', value: '0' },
	{ label: '万元', value: '1' },
	{ label: '元', value: '2' }
])
const amountOptionObj = ref({
	0: '亿元',
	1: '万元',
	2: '元',
})
let searchObj = ref();
let searchObj2 = ref();
let searchObj3 = ref();
let searchObj4 = ref();
// 交易日历
const getCaldDateTime = async () => {
	let obj = {
		numsDay: '2'
	}
	const res = await getCaldDate({ ...obj });
	if (res && res.code == '00000') {
		formInline.selectTime = res.data;
		resetList.selectTime = res.data;
		formInline2.queryDate = res.data;
		resetList2.queryDate = res.data;
		formInline3.queryDate = res.data;
		resetList3.queryDate = res.data;
		formInline4.queryDate = res.data;
		resetList4.queryDate = res.data;
	}
};

// 险种
const selectInsuranceList = ref([]);
const getSelectInsurance = async () => {
	const res = await selectInsurance();
	if (res && res.code == '00000') {
		selectInsuranceList.value = res.data || [];
		formInline2.insuranceType = getAllValues1(res.data) as any;
		resetList2.insuranceType = JSON.parse(JSON.stringify(getAllValues1(res.data)));
		formInline3.insuranceType = getAllValues1(res.data) as any;
		resetList3.insuranceType = JSON.parse(JSON.stringify(getAllValues1(res.data)));
		formInline4.insuranceType = getAllValues1(res.data) as any;
		resetList4.insuranceType = JSON.parse(JSON.stringify(getAllValues1(res.data)));
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
const treeRef2 = ref<InstanceType<typeof ElTreeV2>>()
const treeRef3 = ref<InstanceType<typeof ElTreeV2>>()
const treeRef4 = ref<InstanceType<typeof ElTreeV2>>()
const onQueryChanged = (query: string) => {
	treeRef.value!.filter(query)
	if (!query) {
		treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
	}
}
const onQueryChanged2 = (query: string) => {
	treeRef2.value!.filter(query)
	if (!query) {
		treeRef2.value!.setExpandedKeys(treeRef2.value?.getCheckedKeys())
	}
}
const onQueryChanged3 = (query: string) => {
	treeRef3.value!.filter(query)
	if (!query) {
		treeRef3.value!.setExpandedKeys(treeRef3.value?.getCheckedKeys())
	}
}
const onQueryChanged4 = (query: string) => {
	treeRef4.value!.filter(query)
	if (!query) {
		treeRef4.value!.setExpandedKeys(treeRef4.value?.getCheckedKeys())
	}
}

const filterMethod = (query: string, node: TreeNodeData) => node.label!.includes(query)
const v2Click = (data, node, form) => {
	console.log(data, node, form, '---')
	if (node) {
		let arr = data.childrenPrdCodeList.split(',') || [];
		form.sobCodeList = [...form.sobCodeList, ...arr]
	} else {
		let arr = data.childrenPrdCodeList.split(',') || [];
		form.sobCodeList = form.sobCodeList.filter(item => !arr.includes(item))
	}
	form.sobCodeListLabel = getTreeLabel(selectTzjlAll.value, form.sobCodeList.map(item => item.split('&').pop()))
}
const clearSob = () => {
	formInline.sobCodeList = resetList.sobCodeList;
	formInline.sobCodeListLabel = resetList.sobCodeListLabel;
	treeRef.value!.setCheckedKeys([])
	treeRef.value!.setExpandedKeys([])
}
const clearSob2 = () => {
	formInline2.sobCodeList = resetList2.sobCodeList;
	formInline2.sobCodeListLabel = resetList2.sobCodeListLabel;
	treeRef2.value!.setCheckedKeys([])
	treeRef2.value!.setExpandedKeys([])
}
const clearSob3 = () => {
	formInline3.sobCodeList = resetList3.sobCodeList;
	formInline3.sobCodeListLabel = resetList3.sobCodeListLabel;
	treeRef3.value!.setCheckedKeys([])
	treeRef3.value!.setExpandedKeys([])
}
const clearSob4 = () => {
	formInline4.sobCodeList = resetList4.sobCodeList;
	formInline4.sobCodeListLabel = resetList4.sobCodeListLabel;
	treeRef4.value!.setCheckedKeys([])
	treeRef4.value!.setExpandedKeys([])
}
const slecetTree1 = ref(null as any);
const selectTzjlAll = ref([]);
const selectDataArr = ref([]);
const selectZdyzh = ref([]);
const selectZdyzh2 = ref([]);
const selectZdyzh3 = ref([]);
const selectZdyzh4 = ref([]);
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
		selectZdyzh2.value = JSON.parse(JSON.stringify(res.data)).map(item => {
			return {
				value: item.value,
				label: item.label
			}
		});

		selectZdyzh3.value = JSON.parse(JSON.stringify(res.data)).map(item => {
			return {
				value: item.value,
				label: item.label
			}
		});
		selectZdyzh4.value = JSON.parse(JSON.stringify(res.data)).map(item => {
			return {
				value: item.value,
				label: item.label
			}
		});
	}
};

// 查询
const SearchLoading = ref(false);
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid, fields) => {
		if (valid) {
			if (tabsName.value == 'equity' || tabsName.value == 'stock') {
				childRef.value.tableRef.clearSort();
				childRef1.value.tableRef1.clearSort();
			}
			init();
		}
	});
};
const SearchLoading2 = ref(false);
const changeLoading2 = (value) => {
	SearchLoading2.value = value
}
const SearchLoading3 = ref(false);
const changeLoading3 = (value) => {
	SearchLoading3.value = value
}
const SearchLoading4 = ref(false);
const changeLoading4 = (value) => {
	SearchLoading4.value = value
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	resetData();
};
const resetForm2 = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	resetData2();
};
const resetForm3 = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	resetData3();
};
const resetForm4 = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	resetData4();
};
let tabsName = ref("equity");
const handleTabsClick = (tab: TabsPaneContext, event: Event) => {
	tabsName.value = tab.paneName;
};


// 导出明细
const DownloadLoading = ref(false);
const DownloadLoading2 = ref(false);
const DownloadLoading3 = ref(false);
const DownloadLoading4 = ref(false);
const detailData = (formEl: FormInstance | undefined) => {
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
				let formArr = {}
				let bool = false
				if (tabsName.value == 'asset') {
					formArr = filterFormArr(formInline2, selectStatisticsList.value, formInline2.sobCodeList, selectZdyzh2.value);
					bool = compareObject(searchObj2.value, { ...formInline2, selfAcountTree: getValueArr1(selectDataArr.value, formInline2.selfAcountTree) });
				} else if (tabsName.value == 'float') {
					formArr = filterFormArr(formInline3, selectStatisticsList.value, formInline3.sobCodeList, selectZdyzh3.value);
					bool = compareObject(searchObj3.value, { ...formInline3, selfAcountTree: getValueArr1(selectDataArr.value, formInline3.selfAcountTree) });
				} else if (tabsName.value == 'position') {
					formArr = filterFormArr(formInline4, selectStatisticsList.value, formInline4.sobCodeList, selectZdyzh4.value);
					bool = compareObject(searchObj4.value, { ...formInline4, selfAcountTree: getValueArr1(selectDataArr.value, formInline4.selfAcountTree) });
				}
				else {
					formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value);
					bool = compareObject(searchObj.value, { ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) });
				}
				// let queryCondition = {
				// 	...formArr
				// }
				if (bool) {
					if (tabsName.value == 'asset') {
						DownloadLoading2.value = true;
						exportAssetPosition({ ...formInline2, selfAcountTree: getValueArr1(selectDataArr.value, formInline2.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline2.queryDate, '4.金额单位': amountOptionObj.value[formInline2.currencyUnit] } })
							.then(() => {
								DownloadLoading2.value = false;
							})
							.catch(() => {
								DownloadLoading2.value = false;
							});
					} else if (tabsName.value == 'float') {
						DownloadLoading3.value = true;
						floatingExport({ ...formInline3, selfAcountTree: getValueArr1(selectDataArr.value, formInline3.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline3.queryDate, '4.金额单位': amountOptionObj.value[formInline3.currencyUnit] } })
							.then(() => {
								DownloadLoading3.value = false;
							})
							.catch(() => {
								DownloadLoading3.value = false;
							});
						// 
					} else if (tabsName.value == 'position') {
						DownloadLoading4.value = true;
						exportPosition({ ...formInline4, selfAcountTree: getValueArr1(selectDataArr.value, formInline4.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline4.queryDate, '4.金额单位': amountOptionObj.value[formInline4.currencyUnit] } })
							.then(() => {
								DownloadLoading4.value = false;
							})
							.catch(() => {
								DownloadLoading4.value = false;
							});
					} else {
						DownloadLoading.value = true;
						handleExportFile({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline.selectTime } })
							.then(() => {
								DownloadLoading.value = false;
							})
							.catch(() => {
								DownloadLoading.value = false;
							});
					}
				} else {
					ElMessageBox.confirm('查询条件已变更，是否继续导出？', {
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						type: "warning",
						confirmButtonClass: "confirm-btn",
						cancelButtonClass: "confirm-btn",
						dangerouslyUseHTMLString: true
					}).then(({ value }) => {
						if (tabsName.value == 'asset') {
							DownloadLoading2.value = true;
							exportAssetPosition({ ...formInline2, selfAcountTree: getValueArr1(selectDataArr.value, formInline2.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline2.queryDate, '4.金额单位': amountOptionObj.value[formInline2.currencyUnit] } })
								.then(() => {
									DownloadLoading2.value = false;
								})
								.catch(() => {
									DownloadLoading2.value = false;
								});
						} else if (tabsName.value == 'float') {
							DownloadLoading3.value = true;
							floatingExport({ ...formInline3, selfAcountTree: getValueArr1(selectDataArr.value, formInline3.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline3.queryDate, '4.金额单位': amountOptionObj.value[formInline3.currencyUnit] } })
								.then(() => {
									DownloadLoading3.value = false;
								})
								.catch(() => {
									DownloadLoading3.value = false;
								});
						} else if (tabsName.value == 'position') {
							DownloadLoading4.value = true;
							exportPosition({ ...formInline4, selfAcountTree: getValueArr1(selectDataArr.value, formInline4.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline4.queryDate, '4.金额单位': amountOptionObj.value[formInline4.currencyUnit] } })
								.then(() => {
									DownloadLoading4.value = false;
								})
								.catch(() => {
									DownloadLoading4.value = false;
								});
						} else {
							DownloadLoading.value = true;
							handleExportFile({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree), queryCondition: { ...formArr, '3.查询日期': formInline.selectTime } })
								.then(() => {
									DownloadLoading.value = false;
								})
								.catch(() => {
									DownloadLoading.value = false;
								});
						}
					})
						.catch((error) => {
							console.log(error, 'error1')
							ElMessage({
								type: "info",
								message: `取消导出`,
							});
						});
				}

			})
				.catch((error) => {
					console.log(error, 'error2')
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
let getContentList = async (obj: any) => {
	isLoading.value = true;
	SearchLoading.value = true;
	list1.value = [];
	list2.value = [];
	searchObj.value = JSON.parse(JSON.stringify({ ...formInline, selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }));
	downloadBool.value = false;
	await getList({ ...obj, sobCodeList: obj.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, obj.selfAcountTree) }).then((res) => {
		isLoading.value = false;
		SearchLoading.value = false;
		if (res && res.code === '00000') {
			if (res.data.equity && res.data.stock) {
				list1.value = res.data.equity;
				resetlist1.value = JSON.parse(JSON.stringify(res.data.equity));
				list2.value = res.data.stock;
				resetlist12.value = JSON.parse(JSON.stringify(res.data.stock));
				total1.value = res.data.equity.length;
				total2.value = res.data.stock.length;
			}
		}
	}).catch(() => {
		isLoading.value = false;
		SearchLoading.value = false;
	});


};
const downloadBool2 = ref(true)
const downloadBool3 = ref(true)
const downloadBool4 = ref(true)
const init = () => {
	if (tabsName.value == 'asset') {
		searchObj2.value = JSON.parse(JSON.stringify({ ...formInline2, selfAcountTree: getValueArr1(selectDataArr.value, formInline2.selfAcountTree) }));
		downloadBool2.value = false;
		childRef2.value.getContentList({ ...formInline2, sobCodeList: formInline2.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline2.selfAcountTree) })
	} else if (tabsName.value == 'float') {
		searchObj3.value = JSON.parse(JSON.stringify({ ...formInline3, selfAcountTree: getValueArr1(selectDataArr.value, formInline3.selfAcountTree) }));
		downloadBool3.value = false;
		childRef3.value.getContentList({ ...formInline3, sobCodeList: formInline3.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline3.selfAcountTree) })
	} else if (tabsName.value == 'position') {
		searchObj4.value = JSON.parse(JSON.stringify({ ...formInline4, selfAcountTree: getValueArr1(selectDataArr.value, formInline4.selfAcountTree) }));
		downloadBool4.value = false;
		childRef4.value.getContentList({ ...formInline4, sobCodeList: formInline4.sobCodeList.sort(), selfAcountTree: getValueArr1(selectDataArr.value, formInline4.selfAcountTree) })
	} else {
		// 基金、股票
		pageSize2.value = 10;
		pageNo2.value = 1;
		pageSize1.value = 10;
		pageNo1.value = 1;
		getContentList({ ...formInline })
	}
};

const resetData = () => {
	formInline.treeType = resetList.treeType;
	formInline.sobCodeList = resetList.sobCodeList;
	formInline.insuranceType = resetList.insuranceType;
	formInline.accountSet = resetList.accountSet;
	formInline.selfAcountTree = resetList.selfAcountTree;
	formInline.investType = resetList.investType;
	formInline.selectTime = resetList.selectTime;
	formInline.sobCodeListLabel = resetList.sobCodeListLabel;
	treeRef.value!.setCheckedKeys([])
	treeRef.value!.setExpandedKeys([])
};
const resetData2 = () => {
	formInline2.treeType = resetList2.treeType;
	formInline2.sobCodeList = resetList2.sobCodeList;
	formInline2.insuranceType = resetList2.insuranceType;
	formInline2.selfAcountTree = resetList2.selfAcountTree;
	formInline2.investType = resetList2.investType;
	formInline2.queryDate = resetList2.queryDate;
	formInline2.sobCodeListLabel = resetList2.sobCodeListLabel;
	formInline2.currencyUnit = resetList2.currencyUnit;
	treeRef2.value!.setCheckedKeys([])
	treeRef2.value!.setExpandedKeys([])
};
const resetData3 = () => {
	formInline3.treeType = resetList3.treeType;
	formInline3.sobCodeList = resetList3.sobCodeList;
	formInline3.insuranceType = resetList3.insuranceType;
	formInline3.selfAcountTree = resetList3.selfAcountTree;
	formInline3.investType = resetList3.investType;
	formInline3.queryDate = resetList3.queryDate;
	formInline3.sobCodeListLabel = resetList3.sobCodeListLabel;
	formInline3.currencyUnit = resetList3.currencyUnit;
	treeRef3.value!.setCheckedKeys([])
	treeRef3.value!.setExpandedKeys([])
};
const resetData4 = () => {
	formInline4.treeType = resetList4.treeType;
	formInline4.sobCodeList = resetList4.sobCodeList;
	formInline4.insuranceType = resetList4.insuranceType;
	formInline4.selfAcountTree = resetList4.selfAcountTree;
	formInline4.investType = resetList4.investType;
	formInline4.queryDate = resetList4.queryDate;
	formInline4.sobCodeListLabel = resetList4.sobCodeListLabel;
	treeRef4.value!.setCheckedKeys([])
	treeRef4.value!.setExpandedKeys([])
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