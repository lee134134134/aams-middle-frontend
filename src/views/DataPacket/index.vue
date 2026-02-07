<template>
	<div class="temporary1" v-loading="DownloadLoading" element-loading-background="rgba(0,0,0,0.3)">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rule">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="数据包类型" prop="dataPacketType" class="margin-12">
								<el-select v-model="formInline.dataPacketType" popper-class="custom-select"
									placeholder="请选择数据包类型" style="width:100%;" @change="handleDatatype">
									<el-option label="周度" value="1" />
									<el-option label="月度" value="2" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="查询日期" prop="queryDate" style="width:100%;" class="margin-12">
								<el-date-picker popper-class="custom-datePicker" v-model="formInline.queryDate"
									type="date" placeholder="请选择查询日期" value-format="YYYY-MM-DD" :clearable="false"
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
						<el-col :span="6">
							<el-form-item label="数据类型" prop="dataType" class="margin-12">
								<el-select v-model="formInline.dataType" popper-class="custom-select"
									placeholder="请选择数据类型" style="width:100%;">
									<el-option label="原始数据" value="0" />
									<el-option label="新版数据" value="1" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button @click="detailData(ruleFormRef)" icon="Download" 
								class="button-custom" data-track-id="DataPacket-Download-btn"
								data-track-name="瑞众人寿报表数据包-生成" :disabled="downloadBool">生成</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<el-tabs v-model="tabsName" class="demo-tabs">
				<el-tab-pane label="9089" name="9089">
					<DataList ref="DateListref" :selectListCode="selectListCode">
					</DataList>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, watch } from "vue";
	import type { FormInstance } from "element-plus";
	import { handleExportFile } from "@/api/DataPacket.js";
	import { getUsersTree, selectDept, selectInsurance, getCaldDate, selectStatistics } from "@/api/common.js";
	import DataList from "./List/DataList.vue";
	import { rule } from "./List/common.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import type { CheckboxValueType } from "element-plus";
	import { getAllValues1, filterFormArr } from "@/utils/index.js";
	import _ from "lodash"

	// 初始化数据
	onMounted(async () => {
		await getCaldDateTime();
		await getSelectStatistics();
		init('1', true)
	});

	// 账套
	const selectListCode = ref([]);
	const getSelectStatistics = async () => {
		const res = await selectStatistics();
		if (res && res.code == '00000') {
			selectListCode.value = res.data || [];
		}
	}


	let tabsName = ref("9089");
	let selectListDataUnit = ref([
		{ value: '0', label: '亿元' },
		{ value: '1', label: '万元' },
		{ value: '2', label: '元' },
	])
	const DateListref = ref();
	// 查询form数据
	const ruleFormRef = ref<FormInstance>();
	const formInline = reactive({
		dataPacketType: '1',
		queryDate: '',
		currencyUnit: '0',
		dataType: '0',
		tjztDataPacketVo: {
			tableName: tabsName.value
		}
	});

	let searchObj = ref();
	// 交易日历
	const getCaldDateTime = async () => {
		let obj = {
			numsDay: '2'
		}
		const res = await getCaldDate({ ...obj });
		if (res && res.code == '00000') {
			formInline.queryDate = res.data;
		}
	};
	let downloadBool = ref(true);
	const init = (val, bool) => {
		downloadBool.value = false;
		DateListref.value.getContentList({ ...formInline }, val, bool)
	}
	// 查询
	const handleDatatype = (val) => {
		init(val, true)
	}
	// 导出
	const DownloadLoading = ref(false);
	const detailData = async (formEl : FormInstance | undefined) => {
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
					let queryCondition = {
						'1.数据包类型': formInline.dataPacketType === '1' ? '周度' : '月度',
						'2.查询日期': formInline.queryDate,
						'3.金额单位': selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label,
						'4.数据类型': formInline.dataType==='0'?'原始数据':'新版数据'
					}
					formInline.tjztDataPacketVo.dataPacketVoList = DateListref.value.tableData.filter(item=>[...DateListref.value.SelectList,...DateListref.value.tableSelectListL,...DateListref.value.tableSelectListR].includes(item.id));
					formInline.tjztDataPacketVo.dataPacketTypeNum = formInline.dataPacketType;
					formInline.tjztDataPacketVo.dataPacketTypeName = formInline.dataPacketType == '1' ? '周度' : '月度';
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