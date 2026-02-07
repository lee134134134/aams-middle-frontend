<template>
	<div class="temporary1">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" style="width:100%;" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.queryDate" type="date"
									placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false" style="width:100%;"
									:editable="false"></el-date-picker>
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
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search" :loading="SearchLoading"
								class="button-custom color-button" data-track-id="FinancingPro-submit-btn"
								data-track-name="融资组合杠杆分布统计表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="detailData(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="FinancingPro-Download-btn" data-track-name="融资组合杠杆分布统计表-导出"
								:disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<TitleMargin title="融资组合杠杆分布统计表">
				<div class="dw">单位：{{ unitVal }}</div>
			</TitleMargin>
			<DataList ref="DateListref" :isLoading="SearchLoading"></DataList>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import type { FormInstance } from "element-plus";
import { handleExportFile } from "@/api/FinancingPro.js";
import { getUsersTree, selectDept, selectInsurance, getCaldDate } from "@/api/common.js";
import DataList from "./List/DataList.vue";
import TitleMargin from "@/components/TitleMargin.vue";
import { rule } from "./List/common.js";
import { ElMessage, ElMessageBox } from "element-plus";
import type { CheckboxValueType } from "element-plus";
import { getAllValues1,filterFormArr } from "@/utils/index.js";
import _ from "lodash"

// 初始化数据
onMounted(async () => {
	await getCaldDateTime();
	// await init()
});

let selectListDataUnit = ref([
	{ value: '0', label: '亿元' },
	{ value: '1', label: '万元' },
	{ value: '2', label: '元' },
])
const DateListref = ref();
const ids = ref([]);
const slecetTree = ref(null as any);
const SearchLoading = ref(false);
// 查询form数据
const ruleFormRef = ref<FormInstance>();
const formInline = reactive({
	queryDate: '',
	currencyUnit: '1',
});
let resetList = reactive({
	queryDate: '',
	currencyUnit: '1',
});
let searchObj = ref();
let unitVal = ref('万元')
watch(() => formInline.currencyUnit, (newval, oldval) => {
	if (newval === '0') {
		unitVal.value = "亿元";
	} else if (newval === '1') {
		unitVal.value = "万元";
	} else if (newval === '2') {
		unitVal.value = "元";
	}
})

// 交易日历
const getCaldDateTime = async () => {
	let obj = {
		numsDay: '1'
	}
	const res = await getCaldDate({ ...obj });
	if (res && res.code == '00000') {
		formInline.queryDate = res.data;
		resetList.queryDate = res.data;
	}
};




// 查询
let downloadBool = ref(true);
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid, fields) => {
		if (valid) {
			init()
		}
	});
};

const init = () => {
	SearchLoading.value = true;
	downloadBool.value = false;
	searchObj.value = JSON.parse(JSON.stringify({ ...formInline }));
	DateListref.value
		.getContentList({ ...formInline })
		.then(() => {
			SearchLoading.value = false;
		})
		.catch(() => {
			SearchLoading.value = false;
		});
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	formInline.queryDate = resetList.queryDate;
	formInline.currencyUnit = resetList.currencyUnit;
};


// 导出
const DownloadLoading = ref(false);
const detailData = async (formEl: FormInstance | undefined) => {
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
				let bool = _.isEqual({ ...formInline }, searchObj.value);
				let queryCondition = {
					'1.查询日期': formInline.queryDate,
					'2.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
				}
				if (bool) {
					DownloadLoading.value = true;
					handleExportFile({ ...formInline,queryCondition })
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
						handleExportFile({ ...formInline ,queryCondition})
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

.temporary {
	background-color: #f3f7fb;
}
</style>