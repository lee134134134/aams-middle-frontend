<template>
	<div class="temporary" style="height: 100%">
		<!-- <el-card body-style="padding-bottom: 0px;" style="margin-bottom: 10px">
		</el-card> -->
		<el-row :gutter="10">
			<el-col :span="12">
				<el-card body-style="padding-bottom: 0px;" style="padding-bottom: 6px" body-class="search-card">
					<div class="left-header">
						<el-form :inline="true" ref="ruleFormRef" :model="formInline1" class="demo-form-inline">
							<el-form-item label="账户名称(父)" prop="priAccountName" class="margin-12">
								<el-input v-model="formInline1.priAccountName" placeholder="请输入账户名称(父)"
									clearable></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmitL" icon="Search" :loading="SearchLoadingL"
									class="button-custom color-button"
									data-track-id="AccountConfigurationaams-submitL-btn"
									data-track-name="自定义账户维护-查询">查询</el-button>
								<el-button @click="add" icon="Plus" class="button-custom "
									style="color:#2273f7">新增</el-button>
							</el-form-item>
						</el-form>
						<div class="upload-fu">
							<el-button @click="ExportgetTemplateAll" icon="Download" :loading="DocumentAllLoading"
								class="button-custom" data-track-id="AccountConfigurationaams-Download-btn"
								data-track-name="自定义账户维护-下载账户模板">下载账户模板</el-button>
							<el-upload class="upload-demo1" :before-upload="(file: any) => beforeUploadF(file)"
								:limit="1" accept=".xls, .xlsx" :show-file-list="false">
								<el-button icon="Upload" :loading="AddLoading" class="button-custom"
									data-track-id="AccountConfigurationaams-upload-btn"
									data-track-name="自定义账户维护-父级导入">导入</el-button>
							</el-upload>
						</div>
					</div>

					<el-table v-loading="isLoading" empty-text="暂无数据" :max-height="tableHeight" :data="tableDataL"
						style="width: 100%" ref="tableRef" :header-cell-style="{
							background: '#E4EFFF',
							color: '#333333',
							height: '38px',
						}" @row-click="rowClick" stripe :row-class-name="rowBoxClass">
						<el-table-column type="expand">
							<template #default="props">
								<div style="padding-left:48px;box-sizing: border-box;">
									<el-table :data="props.row.family" :header-cell-style="{
										background: '#f1f7ff',
										color: '#666',
										height: '34px',
									}" :cell-style="rowStyle" @row-click="handleRowClick">
										<el-table-column prop="secAccountName" label="账户名称(子)" show-overflow-tooltip />

										<el-table-column prop="startTime" label="开始日期">
											<template #default="scope">
												{{ scope.row.startTime || '-' }}
											</template>
										</el-table-column>
										<el-table-column prop="endTime" label="结束日期">
											<template #default="scope">
												{{ scope.row.endTime || '-' }}
											</template>
										</el-table-column>
										<el-table-column prop="secAccountType" label="备注">
											<template #default="scope">
												{{ scope.row.secAccountType || '-' }}
											</template>
										</el-table-column>
										<el-table-column prop="" label="操作" width="150">
											<template #default="scope">
												<el-button @click="ExportgetTemplate" link type="primary" size="small"
													data-track-id="AccountConfigurationaams-row-ExportgetTemplate-btn"
													data-track-name="自定义账户维护-下载模板">下载模板</el-button>
												<span style="font-size: 12px;margin: 0 5px;color: #DDDDDD;">/</span>
												<el-upload class="upload-demo"
													:before-upload="(file: any) => beforeUpload(file)" :limit="1"
													accept=".xls, .xlsx" :show-file-list="false">
													<el-button style="color:#2273f7" link size="small"
														@click="importFile(scope.row)"
														data-track-id="AccountConfigurationaams-row-beforeUpload-btn"
														data-track-name="自定义账户维护-导入">导入</el-button>
												</el-upload>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="priAccountName" label="账户名称(父)" show-overflow-tooltip />
						<el-table-column prop="priAccountType" label="备注">
							<template #default="scope">
								{{ scope.row.priAccountType || '-' }}
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="150">
							<template #default="scope">
								<el-button link type="primary" size="small" @click="edit(scope.row)">
									编辑
								</el-button>
								<span style="font-size: 12px;margin: 0 5px;color: #DDDDDD;">/</span>
								<el-button link type="danger" size="small" @click="delArr(scope.row)" style="color:#999"
									data-track-id="AccountConfigurationaams-row-remove-btn"
									data-track-name="自定义账户维护-删除">
									删除
								</el-button>
							</template>
						</el-table-column>
						<template #empty>
							<div
								style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
								<img src="../../assets/images/empty.png" style="height:200px;" />
								<div>暂无数据</div>
							</div>
						</template>
					</el-table>
					<el-pagination v-model:current-page="formInline1.pageNo1" v-model:page-size="formInline1.pageSize1"
						:page-sizes="[10, 20, 30, 50, 100]" layout="->, total,jumper,prev, pager, next, sizes"
						:total="total1" background popper-class="select_bottom"
						data-track-id="AccountConfigurationaamsL-pagination-btn" data-track-name="自定义账户维护-账户-分页"
						@size-change="handleSizeChange1" @current-change="handleCurrentChange1" size="small" />


				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card body-style="padding-bottom: 0px;" style="padding-bottom: 6px" body-class="search-card">
					<el-form :inline="true" ref="ruleFormRef" :model="formInline" class="demo-form-inline">
						<el-form-item label="代码" prop="sobCd">
							<el-input v-model="formInline.sobCd" placeholder="请输入资产单元代码" clearable
								style="width: 170px"></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="sobName" class="margin-12">
							<el-input v-model="formInline.sobName" placeholder="请输入资产单元名称" clearable
								style="width: 170px"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmitR" icon="Search" :loading="SearchLoadingR"
								class="button-custom color-button" data-track-id="AccountConfigurationaams-SubmitR-btn"
								data-track-name="自定义账户维护-资产单元-查询">查询</el-button>
							<el-button @click="save" icon="CircleCheck" class="button-custom " style="color:#2273f7"
								data-track-id="AccountConfigurationaams-save-btn"
								data-track-name="自定义账户维护-资产单元-保存">保存</el-button>
						</el-form-item>
					</el-form>
					<el-table v-loading="isLoading1" empty-text="暂无数据" :data="tableDataR" ref="tableRef1"
						:max-height="tableHeight" @selection-change="handleSelectionChange" :row-key="getRowKeys"
						@row-click="rowselectR" :header-cell-style="{
							background: '#E4EFFF',
							color: '#333333',
							height: '38px',
						}" stripe>
						<el-table-column type="selection" width="40" :reserve-selection="true" />
						<el-table-column prop="sobCd" label="资产单元代码" width="200px" />
						<el-table-column prop="sobName" label="资产单元名称" show-overflow-tooltip />
						<template #empty>
							<div
								style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
								<img src="../../assets/images/empty.png" style="height:200px;" />
								<div>暂无数据</div>
							</div>
						</template>
					</el-table>
					<el-pagination v-model:current-page="formInline.pageNo" v-model:page-size="formInline.pageSize"
						:page-sizes="[10, 20, 50, 100]" layout="->, total,jumper, prev, pager, next, sizes" background
						:total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						size="small" data-track-id="AccountConfigurationaams-pagination-btn"
						data-track-name="自定义账户维护-资产单元-分页" />
				</el-card>
			</el-col>
		</el-row>
	</div>
	<el-dialog v-model="dialogVisible" title="新增" width="1400" :destroy-on-close="true" align-center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<Add @changeBool="changeBool"></Add>
	</el-dialog>
	<el-dialog v-model="dialogVisible1" title="编辑" width="1400" :destroy-on-close="true" align-center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<Edit @changeBool1="changeBool1" :editDate="editDate"></Edit>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted, nextTick } from "vue";
	import { ElMessage, ElMessageBox } from "element-plus";
	import {
		getList,
		getPageList,
		deleteList,
		getSignupList,
		signup,
		getTemplate,
		getDadTemplate
	} from "@/api/AccountConfiguration.js";
	import Add from "./Add.vue";
	import Edit from "./Edit.vue";
	import { getTableList } from "./common.js";
	import { getContentList } from "@/utils/index.js";
	const ruleFormRef = ref(null as any);
	const dialogVisible = ref(false);
	const dialogVisible1 = ref(false);
	const tableHeight = window.innerHeight - 280;
	const tableRef = ref(null as any);
	const tableRef1 = ref(null as any);
	let formInline = ref({
		sobCd: "",
		sobName: "",
		pageSize: 10,
		pageNo: 1,
	});
	let formInline1 = ref({
		priAccountName: "",
		pageSize1: 10,
		pageNo1: 1,
	});
	let editDate = ref();
	let total = ref(0);
	let total1 = ref(0);
	const tableDataL = ref([]);
	const tableDataR = ref([]);
	const tableDataRAll = ref([]);
	const tableDataRAll1 = ref([]);
	let activeRowIndex = ref("");
	let isLoading = ref(false);
	let isLoading1 = ref(false);
	let currentExpandedRow = ref(null);
	let tableSelectList = ref([]);
	let sobArr = ref([]);
	const getRowKeys = row => {
		return row.sobCd;
	};
	let num = ref(1);
	onMounted(async () => {
		await getContentListL({ ...formInline1.value });
		await getContentListR({ ...formInline.value });
		num.value = 2;
	});
	const rowBoxClass = ({ row, rowIndex }) => {
		return 'rowBox'
	}
	const rowStyle = ({ row, rowIndex }) => {
		if (activeRowIndex.value === row.id) {
			return { backgroundColor: "#EDF7FE" }; // 返回被点击行的样式
		}
		return ""; // 返回其他行的默认样式
	};
	const handleRowClick = (row : any, column : any, event : any) => {
		if (column.label === "操作") {
			event.stopPropagation();
			return;
		}
		formInline.value.sobCd = "";
		formInline.value.sobName = "";
		formInline.value.pageNo = 1;
		formInline.value.pageSize = 10;
		tableRef1.value.clearSelection();
		activeRowIndex.value = row.id;
		getSignupContent({ id: row.id });
	};
	const handleSelectionChange = selection => {
		tableSelectList.value = selection.map(item => item.sobCd);
	};
	// 点击左侧行
	const rowClick = (row : any, column : any, event : any) => {
		if (column.label === "操作") {
			event.stopPropagation();
			return;
		}
		if (currentExpandedRow.value && currentExpandedRow.value !== row) {
			tableRef.value.toggleRowExpansion(currentExpandedRow.value, false);
		}
		currentExpandedRow.value = row;
		tableRef.value.toggleRowExpansion(row);
	};
	// 点击右侧行
	const rowselectR = (row : any) => {
		tableRef1.value.toggleRowSelection(row);
	};
	// 右侧表格数据
	const getContentListR = async (obj : any) => {
		isLoading1.value = true;
		let res = await getList(obj);
		isLoading1.value = false;
		if (res && res.code == '00000') {
			tableDataRAll.value = res.data;
			if (num.value === 1) {
				// 页面刷新赋值
				tableDataRAll1.value = JSON.parse(JSON.stringify(res.data));
			}
			tableDataRAll.value.sort((n, m) => {
				return sobArr.value.includes(m.sobCd) - sobArr.value.includes(n.sobCd)
			})
			tableDataR.value = getContentList(
				formInline.value.pageNo,
				formInline.value.pageSize,
				tableDataRAll.value,
			);
			total.value = res.data.length;
		}
	};
	// 左右联动数据
	const getSignupContent = async obj => {
		isLoading1.value = true;
		let res = await getSignupList(obj);
		isLoading1.value = false;
		if (res && res.code == '00000') {
			if (res.data.length > 0) {
				res.data = res.data.map(item => item.sobCd);
				sobArr.value = res.data;
				formInline.value.pageNo = 1;
				formInline.value.pageSize = 10;
				tableDataRAll.value = JSON.parse(JSON.stringify(tableDataRAll1.value));
				total.value = tableDataRAll1.value.length;
				tableDataRAll1.value.sort((n, m) => {
					return n.sobCd - m.sobCd;
				})
				tableDataRAll1.value.sort((n, m) => {
					return res.data.includes(m.sobCd) - res.data.includes(n.sobCd)
				})
				tableDataR.value = getContentList(
					formInline.value.pageNo,
					formInline.value.pageSize,
					tableDataRAll1.value,
				);
				tableRef1.value.clearSelection();
				tableDataRAll1.value.forEach(row => {
					nextTick(() => {
						if (res.data.includes(row.sobCd)) {
							tableRef1.value.toggleRowSelection(row, true);
						}
					});
				});
			} else {
				sobArr.value = [];
				total.value = tableDataRAll1.value.length;
				tableDataRAll1.value.sort((n, m) => {
					return n.sobCd - m.sobCd;
				})
				tableDataR.value = getContentList(
					formInline.value.pageNo,
					formInline.value.pageSize,
					tableDataRAll1.value,
				);
			}
		}
	};

	let tableDataLAll = ref([])
	// 左侧表格数据
	const getContentListL = async (obj : any) => {
		isLoading.value = true;
		let res = await getPageList(obj);
		isLoading.value = false;
		formInline1.value.pageNo1 = 1;
		formInline1.value.pageSize1 = 10;
		if (res && res.code == '00000') {
			tableDataLAll.value = res.data;
			tableDataL.value = getTableList(formInline1.value.pageNo1, formInline1.value.pageSize1, tableDataLAll.value)
			total1.value = res.data.length || 0;
		}
		formInline.value.pageNo = 1;
		formInline.value.pageSize = 10;
		tableRef1.value.clearSelection();
		tableDataR.value = getContentList(
			formInline.value.pageNo,
			formInline.value.pageSize,
			tableDataRAll.value,
		);
	};
	//左侧分页
	const handleSizeChange1 = (val : number) => {
		formInline1.value.pageNo1 = 1;
		tableDataL.value = getTableList(formInline1.value.pageNo1, formInline1.value.pageSize1, tableDataLAll.value)
	};
	const handleCurrentChange1 = (val : number) => {
		tableDataL.value = getTableList(formInline1.value.pageNo1, formInline1.value.pageSize1, tableDataLAll.value)
	};
	
	
	
	// 左侧查询
	const SearchLoadingL = ref(false);
	const onSubmitL = () => {
		SearchLoadingL.value = true;
		getContentListL({ ...formInline1.value })
			.then(() => {
				SearchLoadingL.value = false;
			})
			.catch(() => {
				SearchLoadingL.value = false;
			});
	};
	// 右侧查询
	const SearchLoadingR = ref(false);
	const onSubmitR = async () => {
		SearchLoadingR.value = true;
		formInline.value.pageNo = 1;
		formInline.value.pageSize = 10;
		getContentListR({ ...formInline.value })
			.then(() => {
				SearchLoadingR.value = false;
			})
			.catch(() => {
				SearchLoadingR.value = false;
			});
	};
	// 新增
	let add = () => {
		dialogVisible.value = true;
	};
	// 新增dialog消失
	let changeBool = (val : any, val1 : any) => {
		dialogVisible.value = val;
		if (val1 == "confirm") {
			getContentListL({ ...formInline1.value });
		}
	};
	// 编辑
	let edit = (row : any) => {
		dialogVisible1.value = true;
		editDate.value = JSON.parse(JSON.stringify(row))
	};
	// 编辑dialog消失
	let changeBool1 = (val : any, val1 : any) => {
		dialogVisible1.value = val;
		if (val1 == "confirm") {
			getContentListL({ ...formInline1.value });
		}
	};
	// 删除
	let delArr = (row : any) => {
		ElMessageBox.confirm(`确定删除此数据吗?`, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				let { code } = await deleteList({ priAccountCode: row.priAccountCode });
				if (code && code == '00000') {
					ElMessage({
						type: "success",
						message: "删除成功",
					});
					getContentListL({ ...formInline1.value });
				}
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消删除",
				});
			});
	};
	// 保存
	const save = async () => {
		if (!activeRowIndex.value) {
			ElMessage({
				type: "warning",
				message: "请选择账户",
			});
			return;
		}
		let obj = tableDataRAll1.value.filter(obj =>
			tableSelectList.value.includes(obj.sobCd)
		);
		let res = await signup({ accountId: activeRowIndex.value, sobCdList: obj });
		getSignupContent({ id: activeRowIndex.value });
		if (res && res.code == '00000') {
			ElMessage({
				type: "success",
				message: "保存成功",
			});
		}
	};
	//分页
	const handleSizeChange = (val : number) => {
		tableDataRAll.value.sort((n, m) => {
			return sobArr.value.includes(m.sobCd) - sobArr.value.includes(n.sobCd)
		})
		formInline.value.pageNo = 1;
		tableDataR.value = getContentList(
			formInline.value.pageNo,
			val,
			tableDataRAll.value,
		);
	};
	const handleCurrentChange = (val : number) => {
		tableDataRAll.value.sort((n, m) => {
			return sobArr.value.includes(m.sobCd) - sobArr.value.includes(n.sobCd)
		})
		tableDataR.value = getContentList(
			val,
			formInline.value.pageSize,
			tableDataRAll.value,
		);
	};


	// 下载父账户模板
	// ExportgetTemplateAll
	let DocumentAllLoading = ref(false);
	const ExportgetTemplateAll = async () => {
		DocumentAllLoading.value = true;
		let res = await getDadTemplate().then(() => {
			DocumentAllLoading.value = false;
		}).catch(() => {
			DocumentAllLoading.value = false;
		})
	};
	// 导入父账户模板
	let AddLoading = ref(false);
	const beforeUploadF = async (file : any) => {
		AddLoading.value = true;
		let fd = new FormData();
		fd.append("file", file);
		let { code, data } = await $http.post("/account/sob/code/checkDataAndUploadForDad", fd);
		AddLoading.value = false;
		if (code && code == '00000') {
			ElMessage({
				message: "上传成功",
				type: "success",
			});
			getContentListL({ ...formInline1.value });
		}
		// 阻止默认的上传操作, 就不会产生如下图action为空报404错误的情况
		return false;
	};

	// 下载子账户模板
	const ExportgetTemplate = async () => {
		let res = await getTemplate()
	};
	// 导入子账户模板
	const rowId = ref();
	const importFile = async (val) => {
		rowId.value = val.id
	};
	const beforeUpload = async (file : any) => {
		let fd = new FormData();
		fd.append("file", file);
		fd.append("id", rowId.value);
		let { code, data } = await $http.post("/account/sob/code/checkDataAndUpload", fd);
		if (code && code == '00000') {
			ElMessage({
				message: "上传成功",
				type: "success",
			});
			getSignupContent({ id: rowId.value });
		}
		// 阻止默认的上传操作, 就不会产生如下图action为空报404错误的情况
		return false;
	};
</script>

<style scoped lang="scss">
	.el-table {
		margin-top: 0px;

		:deep(.el-table__row) {
			cursor: pointer !important;
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

	.temporary {
		background-color: #f3f7fb;
	}

	:deep(.el-form--inline .el-form-item) {
		margin-right: 15px;
		margin-bottom: 8px !important;
	}

	.left-header {
		display: flex;
		justify-content: space-between;
	}

	:deep(.upload-demo) {
		display: inline-block;
	}

	.upload-fu {
		display: flex;
		align-items: top;
	}
</style>