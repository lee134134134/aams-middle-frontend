<template>
	<div class="temporary">
		<el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px" body-class="search-card1">
			<div class="header" ref="slecetTreeTzjl">
				<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" label-position="left"
					label-width="120px">
					<el-row class="flex-box" :gutter="20">
						<el-col :span="6">
							<el-form-item label="生成日期" prop="reportDate" class="start_time" style="width:100%;">
								<el-date-picker v-model="formInline.reportDate" type="date" placeholder="请选择生成日期"
									value-format="YYYY-MM-DD" clearable :editable="false"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-button type="primary" @click="onSubmit(ruleFormRef)" icon="Search" :loading="SearchLoading"
							class="button-custom color-button" data-track-id="WeeklyReport-submit-btn"
							data-track-name="资产配置部周报-查询">查询</el-button>
					</el-row>
					<div class="subBtn">
						<el-form-item class=" margin-12">
							<el-button @click="weekday" class="button-custom" type="primary">周报日期</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<DateList ref="childRef" :formInline="formInline" :selfAcountArr="selfAcountArr">
			</DateList>
		</el-card>
		<el-dialog v-model="dialogVisible" width="1400" :destroy-on-close="true" align-center :close-on-click-modal="false"
			:close-on-press-escape="false" class="weekDialog">
			<template #header>
				<div class="dialog-header" style="display: flex;  align-items: center;">
					<div style="width: 4px; height: 18px; background-color: #2173F7; border-radius: 2px;margin-right: 8px;">
					</div>
					周报日期
				</div>
			</template>
			<Add @changeBool="changeBool"></Add>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
import DateList from "./List/DateList.vue";
import Add from "./List/Add.vue";
let dialogVisible = ref(false);
const ruleFormRef = ref(null);
let formInline = reactive({
	reportDate: '',
});

onMounted(() => {
	childRef.value.getContentList({ ...formInline, }, true)
});
const weekday = () => {
	dialogVisible.value = true;
}
// 新增dialog消失
let changeBool = (val: any, val1: any) => {
	dialogVisible.value = val;
	if (val1 == "confirm") {
		childRef.value.getContentList({ ...formInline, }, true)
	}
};
// 查询
const childRef = ref()
const SearchLoading = ref(false);
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			SearchLoading.value = true;
			let res = await childRef.value.getContentList({ ...formInline, }, true)
				.then(() => {
					SearchLoading.value = false;
				})
				.catch(() => {
					SearchLoading.value = false;
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

:deep(.weekDialog .el-dialog__title) {
	transform: translateX(10px) !important;
}
</style>