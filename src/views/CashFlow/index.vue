<template>
	<div class="temporary1">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule"
					label-width="100px" label-position="left">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="险种" prop="insuranceType">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择险种"
									collapse-tags :max-collapse-tags="1" v-model="formInline.insuranceType"
									:data="selectInsuranceList" multiple :render-after-expand="false" show-checkbox
									style="width:100%;" ref="slecetTree" filterable />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="开始日期" prop="startDate" class="start_time">
								<el-date-picker v-model="formInline.startDate" type="date" placeholder="请选择开始日期"
									:disabled-date="disabledDateStart" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false" style="width:100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期" prop="endDate" style="width:100%;">
								<el-date-picker v-model="formInline.endDate" type="date" placeholder="请选择结束日期"
									:disabled-date="disabledDateEnd" value-format="YYYY-MM-DD" :clearable="false"
									:editable="false" style="width:100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="公司" prop="company" class="margin-12">
								<el-select v-model="formInline.company" popper-class="custom-select" collapse-tags
									:max-collapse-tags="1" clearable node-key="value" multiple placeholder="请选择公司"
									style="width:100%;">
									<el-option v-for="(item, i) in companyList" :key="i" :label="item.label"
										:value="item.value" />

								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="新/老账户" prop="accountType" class="margin-12">
								<el-select v-model="formInline.accountType" popper-class="custom-select" collapse-tags
									:max-collapse-tags="1" clearable node-key="value" multiple placeholder="请选择新/老账户"
									style="width:100%;">
									<el-option v-for="(item, i) in accountTypeList" :key="i" :label="item.label"
										:value="item.value" />

								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="业务类型" prop="businessType">
								<el-select v-model="formInline.businessType" popper-class="custom-select" collapse-tags
									:max-collapse-tags="1" clearable node-key="value" multiple placeholder="请选择业务类型"
									style="width:100%;">
									<el-option v-for="(item, i) in businessTypeList" :key="i" :label="item.label"
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
						<el-form-item>
							<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search"
								:loading="SearchLoading" class="button-custom color-button"
								data-track-id="CashFlow-submit-btn" data-track-name="有效现金流表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="CashFlow-Download-btn" data-track-name="有效现金流表-导出"
								:disabled="Download1Bool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<div class="tableList">
				<span v-show="!tabBool">单位：{{ unitVal }}</span>
				<div style="position: absolute;right:0;top:3px;z-index: 999;display: flex;" v-show="tabBool">
					<el-button @click="unloadFile" icon="Document" class="button-custom" :loading="DocumentAllLoading"
						data-track-id="CashFlow-UnloadFile-btn" data-track-name="有效现金流表-下载模板"
						style="margin-right: 10px;">下载模板</el-button>
					<el-upload class="upload-demo" :before-upload="(file: any) => beforeUpload(file)" :limit="1"
						:show-file-list="false">
						<el-button icon="Upload" class="button-custom" data-track-id="CashFlow-handleUpload-btn"
							data-track-name="有效现金流表-导入" :loading="UploadLoading">导入</el-button>
					</el-upload>
					<el-button icon="delete" class="button-custom" data-track-id="CashFlow-handledelete-btn"
						data-track-name="有效现金流表-批量删除" :loading="deleteLoading" :disabled="selectedBool"
						style="margin-left: 10px;" @click="deleteFile">批量删除</el-button>
				</div>
				<el-tabs v-model="tabsName" class="demo-tabs" @tab-click="handleTabsClick">
					<el-tab-pane label="现金流时序" name="XJLSX">
						<el-table v-loading="SearchLoading1" :max-height="tableHeight" empty-text="暂无数据"
							:data="tableData" border style="width: 100%" ref="tableRef" :header-cell-style="{
								background: '#E4EFFF',
								color: '#333333',
								height: '38px',
							}" stripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" :reserve-selection="true"
								align="center"></el-table-column>
							<el-table-column v-for="(item, i) in data1" :key="i" :prop="item.key" :label="item.name"
								:align="item.align" :fixed="item.fixed" show-overflow-tooltip :min-width="item.width">
							</el-table-column>
							<template #empty>
								<div
									style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
									<img src="../../assets/images/empty.png" style="height:200px;" />
									<div>暂无数据</div>
								</div>
							</template>
						</el-table>
						<el-pagination v-model:current-page="formInline.pageNo" v-model:page-size="formInline.pageSize"
							:page-sizes="[10, 20, 30, 50, 100]" layout="->, total,jumper,prev, pager, next, sizes"
							:total="total" background popper-class="select_bottom"
							data-track-id="CashFlow-pagination-btn" data-track-name="有效现金流表-分页"
							@size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</el-tab-pane>
					<el-tab-pane label="汇总数据" name="PZMX">
						<DataList ref="DateListref" :SearchLoading1="SearchLoading1"> </DataList>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch } from "vue";
	import type { FormInstance } from "element-plus";
	import { getSachList, handleDownloadTemplate, getList, handleExportFile, deleteData } from "@/api/CashFlow.js";
	import { selectInsurance, getDefaultDate } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import { rule, data1 } from "./List/common.js";
	import { getAllValues1, filterFormArr, getAllValues, isEqualIgnoreArrayOrder } from "@/utils/index.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import _ from "lodash"
	// 初始化数据
	onMounted(async () => {
		await getSelectInsurance();
		await getDefaultsDate();
		await getSachListData();
		init()
	});

	let selectListDataUnit = ref([
		{ value: '0', label: '亿元' },
		{ value: '1', label: '万元' },
		{ value: '2', label: '元' },
	])
	let tableRef = ref(null);
	const tableHeight = ref(window.innerHeight - 280);
	const DateListref = ref();
	const slecetTree = ref(null as any);
	const Download1Bool = ref(true)
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		insuranceType: [],
		startDate: '',
		endDate: '',
		company: ['0', '1'],
		accountType: ['0', '1'],
		businessType: [],
		currencyUnit: '0',
		pageNo: 1,
		pageSize: 10

	});
	let resetList = reactive({
		insuranceType: [],
		startDate: '',
		endDate: '',
		company: ['0', '1'],
		accountType: ['0', '1'],
		businessType: [],
		currencyUnit: '0'

	});

	let tabsName = ref("XJLSX");
	let unitVal = ref('亿元');
	let searchObj = ref();
	watch(() => formInline.currencyUnit, (newval, oldval) => {
		if (newval === '0') {
			unitVal.value = "亿元";
		} else if (newval === '1') {
			unitVal.value = "万元";
		} else if (newval === '2') {
			unitVal.value = "元";
		}
	})
	// 切换tab
	let tabBool = ref(true);
	const handleTabsClick = (tab : TabsPaneContext, event : Event) => {
		tabsName.value = tab.paneName;
		if (tabsName.value === 'XJLSX') {
			tabBool.value = true;
		} else {
			tabBool.value = false;
		}
	};
	// 序号
	const getRowKeys = row => {
		return row.id;
	};
	let selectedRows = ref([]);
	let selectedBool = ref(true)
	const handleSelectionChange = (val : any[]) => {
		selectedRows.value = val.map(item => item.id);
		if (selectedRows.value.length > 0) {
			selectedBool.value = false;
		} else {
			selectedBool.value = true;
		}
	};
	let deleteLoading = ref(false);
	const deleteFile = async () => {
		ElMessageBox.confirm(`确定删除此数据吗?`, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				deleteLoading.value = true;
				await deleteData({ ids: selectedRows.value })
					.then((res) => {
						deleteLoading.value = false;
						if (res && res.code === '00000') {
							init();
							selectedRows.value = [];
							tableRef?.value.clearSelection();
							selectedBool.value = true;
							ElMessage({
								type: "success",
								message: "删除成功",
							});
						}
					})
					.catch(() => {
						deleteLoading.value = false;
					});
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消删除",
				});
			});




	}
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
	let companyList = ref([])
	let accountTypeList = ref([])
	let businessTypeList = ref([])
	// 公司、业务类型、新老账户
	const getSachListData = async () => {
		const res1 = await getSachList({ dictType: 'valid_cash_company_type' });
		if (res1 && res1.code == '00000') {
			companyList.value = res1.data;
		}
		const res2 = await getSachList({ dictType: 'valid_cash_account_type' });
		if (res2 && res2.code == '00000') {
			accountTypeList.value = res2.data;
		}
		const res3 = await getSachList({ dictType: 'valid_cash_business_type' });
		if (res3 && res3.code == '00000') {
			businessTypeList.value = res3.data;
			formInline.businessType = getAllValues(res3.data) as any;
			resetList.businessType = JSON.parse(JSON.stringify(getAllValues(res3.data)));
		}
	}
	// 开始结束日期
	const getDefaultsDate = async () => {
		const res = await getDefaultDate();
		if (res && res.code == '00000') {
			formInline.startDate = res.data.START;
			formInline.endDate = res.data.END;
			resetList.startDate = res.data.START;
			resetList.endDate = res.data.END;
		}
	};



	// 险种
	const selectInsuranceList = ref([]);
	const getSelectInsurance = async () => {
		const res = await selectInsurance();
		if (res && res.code == '00000') {
			selectInsuranceList.value = res.data.filter(item => item.value != '资本金' && item.value != '其他') || [];
			formInline.insuranceType = getAllValues1(selectInsuranceList.value) as any;
			resetList.insuranceType = JSON.parse(JSON.stringify(getAllValues1(selectInsuranceList.value)));
		}
	}


	// 查询
	const onSubmit = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				selectedRows.value = [];
				tableRef?.value.clearSelection();
				formInline.pageNo = 1;
				init()
			}
		});
	};
	let SearchLoading = ref(false);
	let SearchLoading1 = ref(false);
	let total = ref();
	let tableData = ref();
	const init = async () => {
		SearchLoading.value = true;
		SearchLoading1.value = true;
		searchObj.value = JSON.parse(JSON.stringify({ ...formInline }));
		Download1Bool.value = false;
		await getList({ ...formInline })
			.then((res) => {
				SearchLoading.value = false;
				SearchLoading1.value = false;
				if (res && res.code === '00000') {
					tableData.value = res.data.infoList.list || [];
					total.value = res.data.infoList.total;
					DateListref.value.getContentList(res.data.totalList);
				}
			})
			.catch(() => {
				SearchLoading.value = false;
				SearchLoading1.value = false;
			});
	}
	//分页
	const handleSizeChange = (val : number) => {
		formInline.pageSize = val;
		formInline.pageNo = 1;
		init();
	};
	const handleCurrentChange = (val : number) => {
		formInline.pageNo = val;
		init();

	};
	// 重置
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		formInline.insuranceType = resetList.insuranceType;
		formInline.startDate = resetList.startDate;
		formInline.endDate = resetList.endDate;
		formInline.company = resetList.company;
		formInline.accountType = resetList.accountType;
		formInline.businessType = resetList.businessType;
		formInline.currencyUnit = resetList.currencyUnit;
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
					let bool = isEqualIgnoreArrayOrder(_.omit(formInline, ['pageNo', 'pageSize']), _.omit(searchObj.value, ['pageNo', 'pageSize']));
					console.log(bool)
					let queryCondition = {
						'1.险种': formInline.insuranceType,
						'2.开始日期': formInline.startDate,
						'3.结束日期': formInline.endDate,
						'4.公司': companyList.value.filter(item => formInline.company.includes(item.value)).map(item => item.label),
						'5.新/老账户': accountTypeList.value.filter(item => formInline.accountType.includes(item.value)).map(item => item.label),
						'6.业务类型': businessTypeList.value.filter(item => formInline.businessType.includes(item.value)).map(item => item.label),
						'7.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
					}

					if (bool) {
						DownloadLoading.value = true;
						handleExportFile({ ...formInline, queryCondition })
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
							handleExportFile({ ...formInline, queryCondition })
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

	// 下载模板
	let DocumentAllLoading = ref(false);
	const unloadFile = async () => {
		DocumentAllLoading.value = true;
		let res = await handleDownloadTemplate().then(() => {
			DocumentAllLoading.value = false;
		}).catch(() => {
			DocumentAllLoading.value = false;
		})
	};
	// 导入
	let UploadLoading = ref(false);
	const beforeUpload = async (file : any) => {
		UploadLoading.value = true;
		let fd = new FormData();
		fd.append("mFile", file);
		let { code, data } = await $http.post_dangermsg("/valid/cashFlow/importExcel", fd);
		UploadLoading.value = false;
		if (code && code == '00000') {
			selectedRows.value = [];
			tableRef?.value.clearSelection();
			ElMessage({
				message: "导入成功",
				type: "success",
			});
			SearchLoading1.value = true;
			searchObj.value = JSON.parse(JSON.stringify({ ...formInline }));
			Download1Bool.value = false;
			formInline.pageNo = 1;
			await getList({ ...formInline })
				.then((res) => {
					SearchLoading1.value = false;
					if (res && res.code === '00000') {
						tableData.value = res.data.infoList.list || [];
						total.value = res.data.infoList.total;
						DateListref.value.getContentList(res.data.totalList);
					}
				})
				.catch(() => {
					SearchLoading1.value = false;
				});
		}
		// 阻止默认的上传操作, 就不会产生如下图action为空报404错误的情况
		return false;
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

	:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
		border-right: 1px solid #ddd !important;
	}

	:deep(.el-table__header-wrapper .el-table__header .is-center) {
		border-bottom: 1px solid #ddd !important;
	}
</style>