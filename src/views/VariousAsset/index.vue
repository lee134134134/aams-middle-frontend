<template>
	<div class="temporary1">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule"
					label-position="left" label-width="90px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6" style="display:flex;">
							<div class="search-tab">
								<span :class="{'active-tab':activeBool}" @click="activeTab(0)">O3</span>
								<span :class="{'active-tab':!activeBool}" @click="activeTab(1)">险种</span>
							</div>
							<el-form-item label="" prop="insuranceType" v-if="!activeBool" :rules="{ required: true, message: '', trigger: ['blur', 'change'] }">
								<el-tree-select class="custom-checkbox" clearable node-key="value" placeholder="请选择险种"
									collapse-tags :max-collapse-tags="1" v-model="formInline.insuranceType"
									:data="selectInsuranceList" multiple :render-after-expand="false" show-checkbox
									style="width:100%;" ref="slecetTree" filterable />
							</el-form-item>
							<el-form-item label="" v-else>
								<el-input disabled value="全部资产单元"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="年度" prop="year" style="width:100%;" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.year"
									style="width:100%;" type="year" placeholder="请选择年度" :clearable="false" value-format="YYYY"
									:editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="季度" prop="quarter" class="margin-12">
								<el-select v-model="formInline.quarter" popper-class="custom-select"
									placeholder="请选择季度" style="width:100%;" multiple collapse-tags>
									<el-option v-for="(item, i) in quarterList" :key="i" :label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="金额单位" prop="currencyUnit" class="margin-12">
								<el-select v-model="formInline.currencyUnit" popper-class="custom-select"
									placeholder="请选择金额单位" style="width:100%;" >
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
								data-track-id="VariousAsset-submit-btn" data-track-name="各类资产配置额度监控表-查询">查询</el-button>
							<el-button @click="resetForm(ruleFormRef)" icon="RefreshLeft"
								class="button-custom">重置</el-button>
							<el-button @click="handleDownload(ruleFormRef)" icon="Download" :loading="DownloadLoading"
								class="button-custom" data-track-id="VariousAsset-Download-btn"
								data-track-name="各类资产配置额度监控表-导出" :disabled="downloadBool">导出</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<TitleMargin title="各类资产配置额度监控表"></TitleMargin>
			<div style="position: absolute;right:16px;top:8px;z-index: 999;display: flex;">
				<el-button @click="unloadFile" icon="Document" class="button-custom" :loading="DocumentAllLoading"
					data-track-id="VariousAsset-UnloadFile-btn" data-track-name="各类资产配置额度监控表-下载模板"
					style="margin-right: 10px;">下载模板</el-button>
				<el-upload class="upload-demo" :before-upload="(file: any) => beforeUpload(file)" :limit="1"
					:show-file-list="false">
					<el-button icon="Upload" class="button-custom" data-track-id="VariousAsset-handleUpload-btn"
						data-track-name="各类资产配置额度监控表-导入" :loading="UploadLoading">导入</el-button>
				</el-upload>
			</div>
			<DataList ref="DateListref"></DataList>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch, nextTick } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile, handleDownloadTemplate } from "@/api/VariousAsset.js";
	import { selectInsurance, selectStatistics, selectDept } from "@/api/common.js";
	import TitleMargin from "@/components/TitleMargin.vue";
	import DataList from "./List/DataList.vue";
	import { rule } from "./List/common.js";
	import { $quarter, $year } from "@/utils/date.ts"
	import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
	import { getAllValues1, getValueArr1, compareObject1, filterFormArr } from "@/utils/index.js";
	interface Tree {
		id : string
		label : string
		children ?: Tree[]
	}
	let searchObj = ref();
	// 初始化数据
	onMounted(async () => {
		await getSelectInsurance();
		searchObj.value = JSON.parse(JSON.stringify({ ...formInline}));
		downloadBool.value = false;
		DateListref.value
			.getContentList({ ...formInline })
			.then(() => {
				SearchLoading.value = false;
			})
			.catch(() => {
				SearchLoading.value = false;
			});
	});
	let activeBool = ref(false);
	const DateListref = ref();
	const slecetTree = ref(null as any);
	const SearchLoading = ref(false);
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		accountType: 'insuranceType',
		insuranceType: [],
		year: $year,
		quarter:[$quarter+''],
		currencyUnit: '2'

	});	

	let resetList = reactive({
		accountType: 'insuranceType',
		insuranceType: [],
		year: $year,
		quarter:[$quarter+''],
		currencyUnit: '2'
	});

	let quarterList = ref([
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
	])
	let selectListDataUnit = ref([
		{ value: '0', label: '亿元' },
		{ value: '1', label: '万元' },
		{ value: '2', label: '元' },
	])

	// tab切换
	const activeTab = (val) => {
		if (val === 0) {
			formInline.accountType = 'O3';
			activeBool.value = true;
		} else {
			formInline.accountType = 'insuranceType';
			activeBool.value = false;
		}
	}

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




	// 查询
	let downloadBool = ref(true);
	const onSubmit = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				SearchLoading.value = true;
				searchObj.value = JSON.parse(JSON.stringify({ ...formInline}));
				downloadBool.value = false;
				DateListref.value
					.getContentList({ ...formInline })
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
		activeBool.value = false;
		formInline.insuranceType = resetList.insuranceType;
		formInline.currencyUnit = resetList.currencyUnit;
		formInline.accountType = resetList.accountType;
		formInline.year = resetList.year;
		formInline.quarter = resetList.quarter;
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
					let queryCondition = formInline.accountType==='O3'?{
						'1.账户类型': 'O3',
						'2.年度': formInline.year,
						'3.季度':formInline.quarter,
						'4.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
					}:{
						'1.账户类型': '险种',
						'2.险种': formInline.insuranceType,
						'3.年度': formInline.year,
						'4.季度': formInline.quarter,
						'5.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label
					}
					
					let bool = compareObject1(searchObj.value, { ...formInline});
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
		fd.append("file", file);
		await $http.post_dangermsg("assetAllocationTrace/importExcel", fd)
			.then(res => {
				UploadLoading.value = false;
				if (res.code && res.code == '00000') {
					searchObj.value = JSON.parse(JSON.stringify({ ...formInline}));
					DateListref.value.getContentList({ ...formInline })
					ElMessage({
						message: "导入成功",
						type: "success",
					});
				}
			})
			.catch(err => {
				ElMessage({
					message: "导入失败",
					type: "error",
				});
			})
		// 阻止默认的上传操作, 就不会产生如下图action为空报404错误的情况
		return false;
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

	.temporary1 {
		background-color: #f3f7fb;
	}

	.search-tab {
		display: flex;
		align-items: center;
		width: 80px;
		height: 32px;
		margin-right: 10px;

		span {
			width: 40px;
			height: 32px;
			cursor: pointer;
			line-height: 32px;
			text-align: center;
			font-size: 12px;
			border: 1px solid #eee;
		}

		.active-tab {
			background-color: #2272f7;
			color: #fff;
		}
	}
	.search-tab:before{
		color: var(--el-color-danger);
		content: "*";
		margin-right: 4px;
	}
</style>