<template>
	<div class="temporary1">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header">
				<el-form ref="ruleFormRef1" class="demo-form-inline" :inline="true" :model="formInline1" :rules="rule1"
					label-width="80px" label-position="left" v-show="unitBool">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="险种" prop="insuranceType">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择险种"
									collapse-tags :max-collapse-tags="1" v-model="formInline1.insuranceType"
									:data="selectInsuranceList" multiple :render-after-expand="false" show-checkbox
									style="width:100%;" ref="slecetTree" filterable />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline1.queryDate"
									type="date" placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									style="width:100%;" :editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="金额单位" prop="currencyUnit" class="margin-12">
								<el-select v-model="formInline1.currencyUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;">
									<el-option v-for="(item, i) in selectListDataUnit" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item>
							<el-button type="primary" @click="onSubmit1(ruleFormRef1)" icon="Search"
								:loading="SearchLoading1" class="button-custom color-button"
								data-track-id="AssetsAllDepart-submit1-btn"
								data-track-name="资产配置部管理流动性资产统计表-统计表-查询">查询</el-button>
							<el-button @click="resetForm1(ruleFormRef1)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload1(ruleFormRef1)" icon="Download"
								:loading="DownloadLoading1" class="button-custom"
								data-track-id="AssetsAllDepart-Download1-btn" data-track-name="资产配置部管理流动性资产统计表-统计表-导出"
								:disabled="Download1Bool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-form ref="ruleFormRef2" class="demo-form-inline" :inline="true" :model="formInline2" :rules="rule2"
					label-width="80px" label-position="left" v-show="!unitBool">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="险种" prop="insuranceType">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择险种"
									collapse-tags :max-collapse-tags="1" v-model="formInline2.insuranceType"
									:data="selectInsuranceList" multiple :render-after-expand="false" show-checkbox
									style="width:100%;" ref="slecetTree" filterable />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="selectDate" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline2.selectDate"
									type="date" placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
									style="width:100%;" :editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item>
							<el-button type="primary" @click="onSubmit2(ruleFormRef2)" icon="Search"
								:loading="SearchLoading2" class="button-custom color-button"
								data-track-id="AssetsAllDepart-submit2-btn"
								data-track-name="资产配置部管理流动性资产统计表-对比图-查询">查询</el-button>
							<el-button @click="resetForm2(ruleFormRef2)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload2(ruleFormRef2)" icon="Download"
								:loading="DownloadLoading2" class="button-custom"
								data-track-id="AssetsAllDepart-Download2-btn" data-track-name="资产配置部管理流动性资产统计表-对比图-导出"
								:disabled="Download2Bool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<div class="tableList">
				<span v-show="unitBool">单位：{{ unitVal }}</span>
				<el-tabs v-model="tabsName" class="demo-tabs" @tab-click="handleTabsClick">
					<el-tab-pane label="统计表" name="XJLSX">
						<DataList ref="DateListref"> </DataList>
					</el-tab-pane>
					<el-tab-pane label="对比图" name="PZMX" :disabled="false">
						<DataList1 ref="childRef1"> </DataList1>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile, getInsuranceTree, echartsExport } from "@/api/AssetsAllDepart.js";
	import { getCaldDate } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import DataList1 from "./List/DataList1.vue";
	import { rule1, rule2 } from "./List/common.js";
	import { getAllValues, filterFormArr } from "@/utils/index.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import _ from "lodash"
	// 初始化数据
	onMounted(async () => {
		await getCaldDateTime();
		await getSelectInsurance();
		// await init1()
	});

	let selectListDataUnit = ref([
		{ value: '0', label: '亿元' },
		{ value: '1', label: '万元' },
		{ value: '2', label: '元' },
	])
	let unitBool = ref(true);
	const DateListref = ref();
	const childRef1 = ref();
	const slecetTree = ref(null as any);
	const SearchLoading1 = ref(false);
	const SearchLoading2 = ref(false);
	const Download1Bool = ref(true)
	const Download2Bool = ref(true)
	// 查询form数据
	const ruleFormRef1 = ref<FormInstance>();
	const ruleFormRef2 = ref<FormInstance>();
	const formInline1 = reactive({
		insuranceType: [],
		queryDate: '',
		currencyUnit: '1',
	});
	const formInline2 = reactive({
		insuranceType: [],
		selectDate: ''
	});
	let resetList1 = reactive({
		insuranceType: [],
		queryDate: '',
		currencyUnit: '1',
	});
	let resetList2 = reactive({
		insuranceType: [],
		selectDate: ''
	});
	let tabsName = ref("XJLSX");
	const handleTabsClick = async (tab : TabsPaneContext, event : Event) => {
		tabsName.value = tab.paneName;
		if (tabsName.value == 'PZMX') {
			unitBool.value = false;
			if (formInline2.insuranceType.length === 0) {
				await getCaldDateTime();
			}
			if (formInline2.selectDate === '') {
				await getSelectInsurance();
			}
			searchObj2.value = JSON.parse(JSON.stringify({ ...formInline2 }));
			// Download2Bool.value = false;
			// childRef1.value.getEchartsList({ ...formInline2 })
		} else if (tabsName.value == 'XJLSX') {
			unitBool.value = true;
			searchObj1.value = JSON.parse(JSON.stringify({ ...formInline1 }));
			// DateListref.value.getContentList({ ...formInline1 })
		}
	};
	let unitVal = ref('万元');
	let searchObj1 = ref();
	let searchObj2 = ref();
	watch(() => formInline1.currencyUnit, (newval, oldval) => {
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
		const res1 = await getCaldDate({ numsDay: '1' });
		if (res1 && res1.code == '00000') {
			formInline1.queryDate = res1.data;
			resetList1.queryDate = res1.data;
		}
		const res2 = await getCaldDate({ numsDay: '2' });
		if (res2 && res2.code == '00000') {
			formInline2.selectDate = res2.data;
			resetList2.selectDate = res2.data;
		}
	};


	// 险种
	const selectInsuranceList = ref([]);
	const getSelectInsurance = async () => {
		const res = await getInsuranceTree();
		if (res && res.code == '00000') {
			selectInsuranceList.value = res.data || [];
			formInline1.insuranceType = getAllValues(res.data) as any;
			formInline2.insuranceType = getAllValues(res.data) as any;
			resetList1.insuranceType = JSON.parse(JSON.stringify(getAllValues(res.data)));
			resetList2.insuranceType = JSON.parse(JSON.stringify(getAllValues(res.data)));
		}
	}

	// 查询
	const onSubmit1 = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				init1()
			}
		});
	};
	// 查询
	const onSubmit2 = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				init2()
			}
		});
	};
	const init1 = () => {
		SearchLoading1.value = true;
		searchObj1.value = JSON.parse(JSON.stringify({ ...formInline1 }));
		Download1Bool.value = false;
		DateListref.value.getContentList({ ...formInline1 })
			.then(() => {
				SearchLoading1.value = false;
			})
			.catch(() => {
				SearchLoading1.value = false;
			});
	}
	const init2 = () => {
		SearchLoading2.value = true;
		searchObj2.value = JSON.parse(JSON.stringify({ ...formInline2 }));
		Download2Bool.value = false;
		childRef1.value.getEchartsList({ ...formInline2 })
			.then(() => {
				SearchLoading2.value = false;
			})
			.catch(() => {
				SearchLoading2.value = false;
			});

	}
	// 重置
	const resetForm1 = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline1.queryDate = resetList1.queryDate;
		formInline1.insuranceType = resetList1.insuranceType;
		formInline1.currencyUnit = resetList1.currencyUnit;
	};
	const resetForm2 = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline2.selectDate = resetList2.selectDate;
		formInline2.insuranceType = resetList2.insuranceType;
	};

	// 导出
	const DownloadLoading1 = ref(false);
	const handleDownload1 = (formEl : FormInstance | undefined) => {
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
					let bool = _.isEqual({ ...formInline1 }, searchObj1.value);
					let queryCondition = {
						'1.险种': formInline1.insuranceType,
						'2.查询日期': formInline1.queryDate,
						'3.金额单位': selectListDataUnit.value.find(item => item.value == formInline1.currencyUnit)?.label
					}

					if (bool) {
						DownloadLoading1.value = true;
						handleExportFile({ ...formInline1,queryCondition })
							.then(() => {
								DownloadLoading1.value = false;
							})
							.catch(() => {
								DownloadLoading1.value = false;
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
							DownloadLoading1.value = true;
							handleExportFile({ ...formInline1,queryCondition })
								.then(() => {
									DownloadLoading1.value = false;
								})
								.catch(() => {
									DownloadLoading1.value = false;
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
	const DownloadLoading2 = ref(false);
	const handleDownload2 = (formEl : FormInstance | undefined) => {
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
					let bool = _.isEqual({ ...formInline2 }, searchObj2.value);
					let queryCondition = {
						'1.险种': formInline2.insuranceType,
						'2.查询日期': formInline2.selectDate,
					}
					if (bool) {
						DownloadLoading2.value = true;
						echartsExport({ ...formInline2,queryCondition })
							.then(() => {
								DownloadLoading2.value = false;
							})
							.catch(() => {
								DownloadLoading2.value = false;
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
							DownloadLoading2.value = true;
							echartsExport({ ...formInline2,queryCondition})
								.then(() => {
									DownloadLoading2.value = false;
								})
								.catch(() => {
									DownloadLoading2.value = false;
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
			font-size: 14px;
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

	:deep(.el-card__body) {
		position: relative;
	}

	:deep(.el-tabs__content) {
		margin-top: 12px;
	}

	.temporary1 {
		background-color: #f3f7fb;
	}
</style>