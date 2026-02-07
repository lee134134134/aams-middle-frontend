<template>
	<el-form label-position="right" label-width="auto" :model="formInline" ref="ruleFormRef"
		style="padding:20px 20px 0px 20px;" :validate-on-rule-change="false">
		<el-row :gutter="20">
			<el-col :span="6">
				<el-form-item label="父账户名称" prop="priAccountName"
					:rules="{ required: true, message: '请输入父账户名称', trigger: 'blur' }">
					<el-input placeholder="请输入父账户名称" v-model="formInline.priAccountName" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="备注(父)" prop="priAccountType" label-width="68px">
					<el-input placeholder="请输入备注信息(20个汉字以内)" v-model="formInline.priAccountType" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="childContent" v-for="(domain, index) in formInline.otherAccountType" :key="domain">
			<el-col :span="6">
				<el-form-item label="子账户名称" :prop="'otherAccountType.' + index + '.secAccountName'"
					:rules="{ required: true, message: '请输入子账户名称', trigger: 'blur' }">
					<el-input placeholder="请输入子账户名称" v-model="domain.secAccountName" clearable></el-input>
				</el-form-item>
			</el-col>
			
			<el-col :span="6">
				<el-form-item label="备注(子)" prop="domain.secAccountType" label-width="68px">
					<el-input placeholder="请输入备注信息(20个汉字以内)" v-model="domain.secAccountType" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="开始日期" prop="domain.startTime">
					<el-date-picker popper-class="custom-datePicker" v-model="domain.startTime" type="date"
						placeholder="请选择开始日期" format="YYYY-MM-DD" :disabled-date="disabledStartDateOne(index)"
						value-format="YYYY-MM-DD" clearable style="width:100%" placement="bottom-start"
						:teleported="false" />
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="结束日期" prop="domain.endTime">
					<el-date-picker popper-class="custom-datePicker" v-model="domain.endTime" type="date"
						placeholder="请选择结束日期" format="YYYY-MM-DD" :disabled-date="disabledEndDateOne(index)"
						value-format="YYYY-MM-DD" clearable style="width:100%" placement="bottom-start"
						:teleported="false" />
				</el-form-item>
			</el-col>
			<el-col :span="2">
				<div class="delChild">
					<el-button @click="addDomain(index)" type="primary" icon="Plus" size="small"></el-button>
					<el-button @click="removeDomain(domain)" type="danger" icon="Delete" size="small"
						:disabled="formInline.otherAccountType.length<2"></el-button>
				</div>
			</el-col>
		</el-row>
		<div class="btn">
			<el-button type="primary" @click="submitForm(ruleFormRef)" data-track-id="AccountConfigurationaams-row-edit-btn" data-track-name="自定义账户维护-编辑">
				确定
			</el-button>
			<el-button @click="resetForm">取消</el-button>
		</div>

	</el-form>
</template>
<script lang="ts" setup>
	import { ref, onMounted } from 'vue'
	import { updateList } from "@/api/AccountConfiguration.js";
	import { ElMessage } from "element-plus";
	import { rule1, rule2 } from "./common.js";
	const props = defineProps({
		editDate: {
			type: Object,
			default: {},
		},
	});
	const formInline = ref({
		priAccountCode: '',
		priAccountName: '',
		priAccountType: '',
		otherAccountType: [
			{
				startTime: '',
				endTime: '',
				secAccountName: '',
				secAccountType: ''
			},
		],
	})

	// 生命周期钩子
	onMounted(() => {
		formInline.value = {
			...formInline.value,
			priAccountType: props.editDate.priAccountType,
			priAccountName: props.editDate.priAccountName,
			otherAccountType: props.editDate.family,
			priAccountCode: props.editDate.priAccountCode,
		}
	});
	const ruleFormRef = ref<FormInstance>();
	const emit = defineEmits(["changeBool1"]);
	// 时间限制 持有到期合计
	const disabledStartDateOne = (index) => (time) => {
		const endDate = formInline.value.otherAccountType[index]?.endTime;
		if (endDate) {
			return time.getTime() > new Date(endDate).getTime();
		}
	};
	const disabledEndDateOne = (index) => (time) => {
		const startDate = formInline.value.otherAccountType[index]?.startTime;
		if (startDate) {
			return time.getTime() < new Date(startDate).getTime();
		}
	};
	// 確定
	const submitForm = async (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				let { code } = await updateList({ ...formInline.value});
				if (code && code == '00000') {
					ElMessage({
						message: "修改成功",
						type: "success",
					});
					emit("changeBool1", false, "confirm");
				}
			}
		});
	};
	// 取消
	const resetForm = () => {
		emit("changeBool1", false, "cancel");
	};

	// 添加账户
	const addDomain = (index) => {
		formInline.value.otherAccountType.splice(index+1,0,{
			startTime: '',
			endTime: '',
			secAccountName: '',
			secAccountType: ''
		})
	}
	// 删除子账户
	const removeDomain = (item : any) => {
		const index = formInline.value.otherAccountType.indexOf(item)
		if (index !== -1) {
			formInline.value.otherAccountType.splice(index, 1)
		}
	}
</script>
<style lang='scss' scoped>
	.btn {
		display: flex;
		justify-content: center;
		padding: 10px;
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