<template>
	<el-form label-position="left" label-width="auto" :model="formInline" ref="ruleFormRef"
		style="padding:20px 20px 0px 20px;" :validate-on-rule-change="false">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="上上周开始日期" prop="prevPrevWeekStartDate"
					:rules="{ required: true, message: '', trigger: 'blur' }">
					<el-date-picker popper-class="custom-datePicker" v-model="formInline.prevPrevWeekStartDate" type="date"
						placeholder="请选择上上周开始日期" value-format="YYYY-MM-DD" :clearable="false"
						:editable="false"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="上上周结束日期" prop="prevPrevWeekEndDate"
					:rules="{ required: true, message: '', trigger: 'blur' }">
					<el-date-picker popper-class="custom-datePicker" v-model="formInline.prevPrevWeekEndDate" type="date"
						placeholder="请选择上上周结束日期" value-format="YYYY-MM-DD" :clearable="false"
						:editable="false"></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="上周开始日期" prop="prevWeekStartDate"
					:rules="{ required: true, message: '', trigger: 'blur' }">
					<el-date-picker popper-class="custom-datePicker" v-model="formInline.prevWeekStartDate" type="date"
						placeholder="请选择上周开始日期" value-format="YYYY-MM-DD" :clearable="false"
						:editable="false"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="上周结束日期" prop="prevWeekEndDate"
					:rules="{ required: true, message: '', trigger: 'blur' }">
					<el-date-picker popper-class="custom-datePicker" v-model="formInline.prevWeekEndDate" type="date"
						placeholder="请选择上周结束日期" value-format="YYYY-MM-DD" :clearable="false"
						:editable="false"></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<div style="font-size:12px;color:#999;">{{ mesageData }}</div>
		<div class="btn">
			<el-button type="primary" @click="submitForm(ruleFormRef)" data-track-id="WeeklyReport-save-btn"
				data-track-name="资产配置部周报-周报日期-确定" :loading="saveLoading">
				确定
			</el-button>
			<el-button @click="resetForm">取消</el-button>
		</div>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { getWeeklyTiem, weeklyTiemSave } from "@/api/WeeklyReport.js";
import { ElMessage } from "element-plus";
const formInline = reactive({
	prevPrevWeekStartDate: '',
	prevPrevWeekEndDate: '',
	prevWeekStartDate: '',
	prevWeekEndDate: '',
})
onMounted(() => {
	getWeeklyTiemData()
})

const mesageData = ref('注：上上周开始日期 ≤ 上上周结束日期 < 上周开始日期 ≤ 上周结束日期 < 系统日期')
const ruleFormRef = ref<FormInstance>();
const emit = defineEmits(["changeBool"]);
// 时间限制 持有到期合计
const disabledStartDateOne = (index) => (time) => {
	const endDate = formInline.otherAccountType[index]?.endTime;
	if (endDate) {
		return time.getTime() > new Date(endDate).getTime();
	}
};
const disabledEndDateOne = (index) => (time) => {
	const startDate = formInline.otherAccountType[index]?.startTime;
	if (startDate) {
		return time.getTime() < new Date(startDate).getTime();
	}
};
// 確定
const saveLoading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		saveLoading.value = true
		if (valid) {
			console.log(formInline)
			let { code, data, msg } = await weeklyTiemSave({ ...formInline });
			if (code && code == '00000') {
				saveLoading.value = false
				if (msg == "资产配置部周报数据正在生成中,请稍后再试......") {
					ElMessage({
						message: msg,
						type: "warning",
					});
				} else {
					ElMessage({
						message: msg,
						type: "success",
					});
				}

				emit("changeBool", false, "confirm");
			} else {
				saveLoading.value = false
			}
		}
	});
};
// 取消
const resetForm = () => {
	emit("changeBool", false, "cancel");
};


const getWeeklyTiemData = () => {
	getWeeklyTiem().then(res => {
		if (res.code === '00000') {
			formInline.prevPrevWeekStartDate = res.data.prevPrevWeekStartDate
			formInline.prevPrevWeekEndDate = res.data.prevPrevWeekEndDate
			formInline.prevWeekStartDate = res.data.prevWeekStartDate
			formInline.prevWeekEndDate = res.data.prevWeekEndDate
		} else {
			formInline.prevPrevWeekStartDate = ''
			formInline.prevPrevWeekEndDate = ''
			formInline.prevWeekStartDate = ''
			formInline.prevWeekEndDate = ''
		}
	}).catch(e => {
		console.log(e)
	})
}
</script>
<style lang='scss' scoped>
.btn {
	display: flex;
	justify-content: center;
	padding: 20px;
	box-sizing: border-box;
}

.addChild {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
}

.delChild {
	padding-top: 4px;
	box-sizing: border-box;
}

::v-deep .childContent .el-form-item__label-wrap {
	margin-left: 0px !important;
}

.box-title {
	padding: 0 10px 10px;
	font-weight: bold;
}
</style>