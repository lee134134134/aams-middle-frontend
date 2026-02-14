<template>

	<el-tabs v-model="tabsName" class="demo-tabs" @tab-click="handleTabsClick">
		<el-tab-pane label="待复核" name="PendingReview">
		</el-tab-pane>
		<el-tab-pane label="已复核" name="Reviewed">
		</el-tab-pane>
		<el-tab-pane label="全部" name="All">
		</el-tab-pane>
	</el-tabs>
	<div style="display:flex;position:absolute;right: 16px;top: 10px;">
		<el-button @click="handleAdd" icon="Plus" data-track-id="AccountMaintenace-Add-btn"
			data-track-name="上下账维护-新增">新增</el-button>
		<el-button @click="unloadFile" icon="Document" class="button-custom" :loading="DocumentAllLoading"
			data-track-id="AccountMaintenace-UnloadFile-btn" data-track-name="上下账维护-下载模板"
			style="margin-right: 10px;">下载模板</el-button>
		<el-upload class="upload-demo" :before-upload="(file: any) => beforeUpload(file)" :limit="1"
			:show-file-list="false">
			<el-button icon="Upload" class="button-custom" data-track-id="AccountMaintenace-handleUpload-btn"
				data-track-name="上下账维护-导入" :loading="UploadLoading">导入</el-button>
		</el-upload>
		<el-button @click="handleFb" icon="MessageBox" data-track-id="AccountMaintenace-Fbgj-btn"
			data-track-name="上下账维护-非标归集" style="margin-left:10px;">非标归集</el-button>
		<el-button @click="handleTickets" icon="Tickets" data-track-id="AccountMaintenace-Review-btn"
			data-track-name="上下账维护-复核" :disabled="ReviewBool" style="margin-left:10px;"
			v-if="isAddressName">复核</el-button>
		<el-button @click="handleReset" icon="DocumentDelete" data-track-id="AccountMaintenace-Reset-btn"
			data-track-name="上下账维护-驳回" :disabled="ReviewBool2" style="margin-left:10px;"
			v-if="isAddressName">驳回</el-button>
		<el-button @click="handleMessage" icon="Message" data-track-id="AccountMaintenace-Look-btn"
			data-track-name="上下账维护-预览邮件" :disabled="ReviewBool1" v-if="isAddressName">预览邮件</el-button>
	</div>
	<el-table v-loading="isLoading" :max-height="tableHeight" empty-text="暂无数据" :data="getContentList1" stripe border
		:key="KEY" style="width: 100%" ref="tableRef" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }" @selection-change="handleSelectionChange" :row-key="getRowKeys">
		<el-table-column type="selection" width="55" :reserve-selection="true" align="center" fixed="left"
			v-if="isAddressName"></el-table-column>
		<el-table-column prop="statusNum" align="center" min-width="100px" fixed="left">
			<template #header>
				<div style="display: flex;align-items:center;">
					<el-tooltip :content="tooltipContent" raw-content
						popper-style="background:rgba(0,0,0,0.6);border:none" popper-class="tooltip-box" teleported
						:append-to="tooltip-box">
						<div style="display:flex;cursor: pointer;align-items: center;">
							<span>状态</span>
							<QuestionFilled style="width:18px;height:18px;color:#aaa;margin-left:3px;" />
						</div>
					</el-tooltip>
				</div>
			</template>
			<template #default="scope">
				<div style="display:flex;align-items:center">
					<span style="width: 5px;height:5px;background:#ff7d00;border-radius: 100%;margin-right:5px;"
						v-if="scope.row.statusNum==='0'"></span>
					<span style="width: 5px;height:5px;background:#2173f7;border-radius: 100%;margin-right:5px;"
						v-if="scope.row.statusNum==='1'"></span>
					<span style="width: 5px;height:5px;background:#09dc50;border-radius: 100%;margin-right:5px;"
						v-if="scope.row.statusNum==='2'"></span>
					<span style="width: 5px;height:5px;background:#b7001f;border-radius: 100%;margin-right:5px;"
						v-if="scope.row.statusNum==='3'"></span>
					<span v-if="scope.row.statusNum==='0'">待复核</span>
					<span v-if="scope.row.statusNum==='1'">已复核</span>
					<span v-if="scope.row.statusNum==='2'">已发送</span>
					<span v-if="scope.row.statusNum==='3'">作废</span>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="操作" width="100" align="center" fixed="left">
			<template #default="scope">
				<el-button link type="primary" size="small" @click="edit(scope.row)"
					data-track-id="AccountConfigurationaams-Edit-btn" data-track-name="上下账维护-编辑"
					v-if="scope.row.statusNum==='0'&& isUserName===scope.row.createBy">
					编辑
				</el-button>
				<span style="font-size: 12px;margin: 0 5px;color: #DDDDDD;"
					v-if="scope.row.statusNum==='0' && isUserName===scope.row.createBy">|</span>
				<el-button link type="danger" size="small" @click="delArr(scope.row,'1')"
					data-track-id="AccountConfigurationaams-row-remove-btn" data-track-name="上下账维护-删除"
					v-if="scope.row.statusNum==='0' && isUserName===scope.row.createBy">
					删除
				</el-button>
				<el-button link type="danger" size="small" @click="delArr(scope.row,'2')"
					data-track-id="AccountConfigurationaams-row-remove-btn" data-track-name="上下账维护-作废"
					v-if="scope.row.statusNum==='2' && isUserName===scope.row.createBy">
					作废
				</el-button>
				<span
					v-if="!(scope.row.statusNum==='2' && isUserName===scope.row.createBy)&&!(scope.row.statusNum==='0'&& isUserName===scope.row.createBy)">-</span>
			</template>
		</el-table-column>
		<el-table-column v-for="(item, i) in tabcolums1" :key="i" :prop="item.key" :label="item.name"
			:min-width="item.width" :sortable="item.sortable" :align="item.align" :fixed="item.fixed"
			:show-overflow-tooltip="item.tooltip">
			<template #default="scope">
				{{
          (scope.row[item.key] === null || scope.row[item.key] === '')
          ? "-"
          : typeof scope.row[item.key] === "number" &&
            scope.row[item.key] !== 0
            ? formattedNumber(scope.row[item.key])
            : scope.row[item.key]
        }}
			</template>

		</el-table-column>

		<el-table-column prop="createName" label="创建人" align="left" min-width="100px">
			<template #default="scope">
				{{ scope.row.createName || '-' }}
			</template>
		</el-table-column>
		<template #empty>
			<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
				<img src="../../../assets/images/empty.png" style="height:200px;" />
				<div>暂无数据</div>
			</div>
		</template>
	</el-table>
	<el-pagination v-model:current-page="pageNo1" v-model:page-size="pageSize1" :page-sizes="[10, 20, 30, 50, 100]"
		layout="->, total,jumper,prev, pager, next, sizes" :total="total1" background popper-class="select_bottom"
		data-track-id="AccountCashFlow-pagination-btn" data-track-name="上下账维护-分页" />

	<!-- 新增 -->
	<el-dialog v-model="AddEdit" append-to-body custom-class="custom-newsContent" header-class="cuntom-header"
		width="1150" style="border-radius: 12px;padding:32px;" center destroy-on-close
		:close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
		<template #header>
			<div style="display: flex; align-items: center;justify-content: space-between;">
				<div style="display: flex; align-items: center;">
					<div style="width: 4px;height: 20px;background-color: #2173F7;border-radius: 3px;"></div>
					<span style="font-weight: 500;font-size: 20px; margin-left: 9px;">{{ title }}</span>
				</div>
				<div style="cursor: pointer;" @click="AddEdit=false">
					<Close style="width:18px;height:18px;" />
				</div>
			</div>
		</template>
		<div class="dialogContent" style="padding:20px 40px 20px 40px;">
			<el-form ref="ruleFormRef" class="demo-form-inline" :inline="true" :model="formInline" :rules="rules"
				label-position="right" label-width="150px">
				<el-row class="flex-box" :gutter="20">
					<el-col :span="12">
						<el-form-item label="是否计入上下账" prop="isCalculated" style="width:100%;">
							<el-select v-model="formInline.isCalculated" popper-class="custom-select"
								placeholder="请选择是或否" style="width:100%;" clearable @change="isCalculatedChange">
								<el-option v-for="(item, i) in isCalculatedListData" :key="i" :label="item.label"
									:value="item.label" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="业务类型" prop="transferType" style="width:100%;">
							<el-select v-model="formInline.transferType" popper-class="custom-select"
								placeholder="请选择业务类型" style="width:100%;" clearable>
								<el-option v-for="(item, i) in transferTypeListData" :key="i" :label="item.label"
									:value="item.label" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="额度类型" prop="quotaType" style="width:100%;" :rules="isQuoRules">
							<el-select v-model="formInline.quotaType" popper-class="custom-select" placeholder="请选择额度类型"
								style="width:100%;" clearable :disabled="isCalculatedBool">
								<el-option v-for="(item, i) in quotaTypeListData" :key="i" :label="item.label"
									:value="item.label" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调整日期" prop="adjustmentDate" class="start_time" style="width:100%;">
							<el-date-picker v-model="formInline.adjustmentDate" type="date" placeholder="请选择调整日期"
								value-format="YYYY-MM-DD" :editable="false" style="width:100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调出基金编码" prop="fundCodeWithdrawn" style="width:100%;">
							<el-select-v2 v-model="formInline.fundCodeWithdrawn" popper-class="custom-select"
								placeholder="请选择调出基金编码" style="width:100%;" clearable filterable
								:options="fundCodeWithdrawnListData" :props="allValueProps1"
								@change="syncFundWithdrawn1">

							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调出基金名称" prop="fundNameWithdrawn" style="width:100%;">
							<el-select-v2 v-model="formInline.fundNameWithdrawn" popper-class="custom-select"
								placeholder="请选择调出基金名称" style="width:100%;" clearable filterable
								:options="fundCodeWithdrawnListData" @change="syncFundWithdrawn2"
								:props="allValueProps2">
							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调出资产单元编码" prop="assetCodeWithdrawn" style="width:100%;">
							<el-select-v2 v-model="formInline.assetCodeWithdrawn" popper-class="custom-select"
								placeholder="请选择调出资产单元编码" style="width:100%;" clearable filterable
								:options="assetCodeWithdrawnListDataOut" :props="allValueProps1"
								@change="syncFundWithdrawnCode1">

							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调出资产单元名称" prop="assetUnitWithdrawn" style="width:100%;">
							<el-select-v2 v-model="formInline.assetUnitWithdrawn" popper-class="custom-select"
								placeholder="请选择调出资产单元名称" style="width:100%;" clearable filterable
								:options="assetCodeWithdrawnListDataOut" :props="allValueProps3"
								@change="syncFundWithdrawnCode2">

							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调入基金编码" prop="fundCodeDeposited" style="width:100%;">
							<el-select-v2 v-model="formInline.fundCodeDeposited" popper-class="custom-select"
								placeholder="请选择调入基金编码" style="width:100%;" clearable filterable
								:options="fundCodeWithdrawnListData" :props="allValueProps1"
								@change="syncFundDeposited1">

							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调入基金名称" prop="fundNameDeposited" style="width:100%;">
							<el-select-v2 v-model="formInline.fundNameDeposited" popper-class="custom-select"
								placeholder="请选择调入基金名称" style="width:100%;" clearable filterable
								:options="fundCodeWithdrawnListData" @change="syncFundDeposited2"
								:props="allValueProps2">
							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调入资产单元编码" prop="assetCodeDeposited" style="width:100%;">
							<el-select-v2 v-model="formInline.assetCodeDeposited" popper-class="custom-select"
								placeholder="请选择调入资产单元编码" style="width:100%;" clearable filterable
								:options="assetCodeWithdrawnListDataIn" :props="allValueProps1"
								@change="syncFundDepositedCode1">
							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="调入资产单元名称" prop="assetUnitDeposited" style="width:100%;">
							<el-select-v2 v-model="formInline.assetUnitDeposited" popper-class="custom-select"
								placeholder="请选择调入资产单元名称" style="width:100%;" clearable filterable
								:options="assetCodeWithdrawnListDataIn" :props="allValueProps3"
								@change="syncFundDepositedCode2">
							</el-select-v2>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="划拨金额（元）" prop="amountTransferred" style="width:100%;">
							<el-input v-model="formInline.amountTransferred" placeholder="请输入划拨金额" :clearable="true"
								style="width:100%;" @input="handleInput" @blur="handleBlur"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="备注" prop="remark" style="width:100%;">
							<el-input v-model="formInline.remark" placeholder="请输入备注" :clearable="true"
								style="width:100%;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="add(ruleFormRef)" type="primary" class="button-custom color-button"
					data-track-id="Admission-add-edit-btn" data-track-name="上下账维护-保存"
					:loading="addLoading">保存</el-button>
				<el-button @click="cancel" class="button-custom">取消</el-button>
			</div>
		</template>
	</el-dialog>
	<el-dialog v-model="MessageDialog" append-to-body custom-class="custom-newsContent" header-class="cuntom-header"
		width="1150" style="border-radius: 12px;padding:32px;" center destroy-on-close :close-on-click-modal="false"
		:close-on-press-escape="false" :show-close="false">
		<template #header>
			<div style="display: flex; align-items: center;justify-content: space-between;">
				<div style="display: flex; align-items: center;">
					<div style="width: 4px;height: 20px;background-color: #2173F7;border-radius: 3px;"></div>
					<span style="font-weight: 500;font-size: 20px; margin-left: 9px;">{{ title }}</span>
				</div>
				<div style="cursor: pointer;" @click="MessageDialog=false">
					<Close style="width:18px;height:18px;" />
				</div>
			</div>
		</template>
		<div class="dialogContent" style="padding:20px 40px 0px 40px;">
			<el-form ref="ruleFormRef1" class="demo-form-inline" :inline="true" :model="messageAll" :rules="Emailrules"
				label-position="right" label-width="80px">
				<el-row class="flex-box" :gutter="20">
					<el-col :span="24">
						<el-form-item label="发件人" prop="addresser" style="width:100%;" placeholder="请输入发件人">
							<el-input v-model="messageAll.addresser" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="通讯录" prop="addressBook" style="width:100%;">
							<el-select v-model="messageAll.addressBook" popper-class="custom-select"
								placeholder="请选择通讯录" style="width:100%;" @change="ChangeAddressBookData">
								<el-option v-for="(item, i) in AddressBookData" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="收件人" prop="recipients" style="width:100%;">
							<!-- <el-select v-model="messageAll.recipients" popper-class="custom-select" placeholder="请输入收件人"
								style="width:100%;" disabled multiple>
								<el-option v-for="(item, i) in recipientLsit" :key="item.id" :label="item.recipientName"
									:value="item.recipientEmail" />
							</el-select> -->
							<div
								style="background:#f5f7fa;width:100%;height:100%;display: flex;flex-wrap: wrap;align-itemscenter;padding-left:10px;border:1px solid #e2e4e8;border-radius: 3px;color:#a8abb2;">
								<div v-for="(item,index) in recipientLsit">
									<span v-if="index!=0">、</span><span>{{item.recipientName}}</span>
								</div>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="抄送人" prop="carbonCopyRecipients" style="width:100%;">
							<!-- <el-select v-model="messageAll.carbonCopyRecipients" popper-class="custom-select"
								placeholder="请输入抄送人" style="width:100%;" disabled multiple>
								<el-option v-for="(item, i) in CctoLsit" :key="item.id"
									:label="item.carbonCopyRecipientName" :value="item.carbonCopyRecipientEmail" />
							</el-select> -->
							<div
								style="background:#f5f7fa;width:100%;height:100%;display: flex;flex-wrap: wrap;align-itemscenter;padding-left:10px;border:1px solid #e2e4e8;border-radius: 3px;color:#a8abb2;">
								<div v-for="(item,index) in CctoLsit" v-if="CctoLsit.length>0">
									<span v-if="index!=0">、</span><span>{{item.carbonCopyRecipientName}}</span>
								</div>
								<div v-else style="color:#666;">请输入抄送人</div>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="主题" prop="theme" style="width:100%;" placeholder="请输入主题">
							<el-input v-model="messageAll.theme"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="正文" prop="text" style="width:100%;" placeholder="请输入正文">
							<el-input v-model="messageAll.text" type="textarea" :rows="4" resize: none></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<el-table empty-text="暂无数据" :data="selectedRows" stripe border style="width: 100%;overflow:visible"
			ref="tableRef1" :header-cell-style="{
				  background: '#E4EFFF',
				  color: '#333333',
				  height: '38px',
				}">
			<el-table-column v-for="(item, i) in tabcolums2" :key="i" :prop="item.key" :label="item.name"
				:min-width="item.width" :sortable="item.sortable" :align="item.align" :fixed="item.fixed"
				:show-overflow-tooltip="item.tooltip">
				<template #default="scope">
					{{
				      (scope.row[item.key] === null || scope.row[item.key] === '')
				      ? "-"
				      : typeof scope.row[item.key] === "number" &&
				        scope.row[item.key] !== 0
				        ? formattedNumber(scope.row[item.key])
				        : scope.row[item.key]
				    }}
				</template>

			</el-table-column>
			<template #empty>
				<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
					<img src="../../../assets/images/empty.png" style="height:200px;" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="sendEmail(ruleFormRef1)" type="primary" class="button-custom color-button"
					data-track-id="AccountMaintenace-message-btn" data-track-name="上下账维护-发送"
					:loading="SearchLoading">发送</el-button>
				<el-button @click="MessageDialog = false" class="button-custom">取消</el-button>
			</div>
		</template>
	</el-dialog>
	<!-- 非标 -->
	<el-dialog v-model="FbMessageDialog" append-to-body custom-class="custom-newsContent" header-class="cuntom-header"
		width="1150" style="border-radius: 12px;padding:32px;" center destroy-on-close :close-on-click-modal="false"
		:close-on-press-escape="false" :show-close="false">
		<template #header>
			<div style="display: flex; align-items: center;justify-content: space-between;">
				<div style="display: flex; align-items: center;">
					<div style="width: 4px;height: 20px;background-color: #2173F7;border-radius: 3px;"></div>
					<span style="font-weight: 500;font-size: 20px; margin-left: 9px;">{{ title }}</span>
				</div>
				<div style="cursor: pointer;" @click="FbMessageDialog=false">
					<Close style="width:18px;height:18px;" />
				</div>
			</div>
		</template>
		<el-table empty-text="暂无数据" v-loading="isFBLoading" :data="fbgetContentList1" stripe border
			style="width: 100%;overflow:visible;margin:10px 0px;" ref="tableRefFb" :header-cell-style="{
		  background: '#E4EFFF',
		  color: '#333333',
		  height: '38px',
		}" @selection-change="handleSelectionChangeFB" row-key="id">
			<el-table-column type="selection" width="55" :reserve-selection="true" align="center"></el-table-column>
			<el-table-column v-for="(item, i) in tabcolums3" :key="i" :prop="item.key" :label="item.name"
				:min-width="item.width" :sortable="item.sortable" :align="item.align" :fixed="item.fixed"
				:show-overflow-tooltip="item.tooltip">
				<template #default="scope" v-if="item.key !== 'amountTransferred'">
					{{
		      (scope.row[item.key] === null || scope.row[item.key] === '')
		      ? "-"
		      : typeof scope.row[item.key] === "number" &&
		        scope.row[item.key] !== 0
		        ? formattedNumber(scope.row[item.key])
		        : scope.row[item.key]
		    }}
				</template>
				<template #default="scope" v-if="item.key == 'amountTransferred'">
					<!-- 	<div @click="amountBoolChange(scope.row)" style="display:flex;">
						<div v-if="!scope.row.isEditing">{{scope.row.amountTransferred}}</div>
						
					</div> -->
					<div style="text-align: center;" class="fb-box">
						<el-input v-model="scope.row.amountTransferred" placeholder="划拨金额≤可划拨金额" :clearable="true"
							style="width:100%;" v-focus @input="handleAmountInput(scope.row)"
							@blur="handleAmountBlur(scope.row)"></el-input>
					</div>

				</template>
			</el-table-column>
			<template #empty>
				<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
					<img src="../../../assets/images/empty.png" style="height:200px;" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<el-pagination v-model:current-page="fbpageNo1" v-model:page-size="fbpageSize1"
			:page-sizes="[10, 20, 30, 50, 100]" layout="->, total,jumper,prev, pager, next, sizes" :total="fbtotal1"
			background popper-class="select_bottom" data-track-id="AccountCashFlow-paginationFb-btn"
			data-track-name="上下账维护-非标分页" />
		<template #footer>
			<div class="dialog-footer" style="margin:20px 0 0px 0;">
				<el-button @click="addFb" type="primary" class="button-custom color-button"
					data-track-id="AccountMaintenace-addFb-btn" data-track-name="上下账维护-非标保存"
					:loading="SearchLoadingFb">保存</el-button>
				<el-button @click="FbMessageDialog = false" class="button-custom">取消</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref, watch, nextTick, computed, onMounted, reactive, watchEffect } from "vue";
	import TitleMargin from "@/components/TitleMargin.vue";
	import { storeToRefs } from "pinia";
	import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
	import { tabcolums1, tabcolums2, rule1, rule2, ruleChange, tabcolums3 } from "./common.js";
	import {

		getAddressBook, getAddressBookById, handleDownloadTemplate, getreview, turnDown, deleteDate,
		cancellation, getAddresserName, getInvestUnitListByFundCode, InsertList, updateList, sendMail, getDefaultNonStandardData, saveNonStandardCollect

	} from "@/api/AccountMaintenace.js";
	import AccountMaintenaceStore from "@/stores/modules/AccountMaintenace.js";
	import AccountMaintenaceFbStore from "@/stores/modules/AccountMaintenaceFb.js";
	import { $thisYearFristDay, $today } from "@/utils/date.ts"
	import userStore from "@/stores/modules/user.js";
	const _userStore = userStore();
	const { userName, name } = storeToRefs(_userStore)
	// 审核人
	const isUserName = ref(false)
	const createName = ref('')
	watchEffect(() => {
		isUserName.value = userName.value;
		createName.value = name.value
	})

	let _AccountMaintenaceStore = AccountMaintenaceStore();
	let _AccountMaintenaceFbStore = AccountMaintenaceFbStore();
	let { pageSize1, pageNo1, total1, isLoading, getContentList1 } =
		storeToRefs(_AccountMaintenaceStore);
	let { fbpageSize1, fbpageNo1, fbtotal1, fbisLoading, fbgetContentList1, fblist1 } =
		storeToRefs(_AccountMaintenaceFbStore);
	const rules = ref(rule1);
	const Emailrules = reactive(rule2);

	const formattedNumber = (num : any) => {
		if (!num) return "";
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const tableHeight = ref(window.innerHeight - 230);

	const tableRef = ref<TableInstance>();
	// 获取列表数据
	let tooltipContent = '<span>1.待复核</span></br><span>（1）点击"导入"或"保存"按钮后初始赋值</span></br><span>（2）数据可以复核、编辑、删除</span></br><span>2.已复核</span></br> <span>（1）点击"复核"按钮后更新赋值</span></br><span>（2）数据可以预览/发送邮件</span></br><span>3.已发送</span></br><span>（1）点击"发送邮件"按钮后更新赋值</span></br><span>（2）数据可以作废</span></br><span>4.作废</span></br><span>（1）点击"作废"文字后更新赋值</span></br><span>（2）数据不可以操作</span></br>'
	// //分页
	// const handleSizeChange = (val : number) => {
	// 	formInline.value.pageNo = 1;
	// 	pageNo1.value = 1;
	// 	_futureStore.handleSizeChange(1, val);
	// };
	// const handleCurrentChange = (val : number) => {
	// 	_futureStore.handleCurrentChange(1, val);
	// };
	let ruleFormRef = ref(null)
	let ruleFormRef1 = ref(null)
	let allValueProps1 = {
		value: 'value',
		label: 'value'
	};
	let allValueProps2 = {
		value: 'value',
		label: 'label'
	};
	let allValueProps3 = {
		value: 'label',
		label: 'label'
	};
	const props = defineProps({
		isCalculatedListData: {
			type: Object,
			default: [],
		},

		transferTypeListData: {
			type: Object,
			default: [],
		},
		quotaTypeListData: {
			type: Object,
			default: [],
		},
		statusListData: {
			type: Object,
			default: [],
		},
		fundCodeWithdrawnListData: {
			type: Object,
			default: [],
		},
		init: {
			type: Function,
		},
		getContentList: {
			type: Function,
		},
		getSearchList: {
			type: Function,
		},
		clearAllSelectedRows: {
			type: Function,
		}
	});
	let formInline = ref({
		isCalculated: '是', // 是否计入上下账
		transferType: '上账', // 业务类型
		quotaType: '', // 额度类型
		adjustmentDate: $today, // 调整日期
		fundCodeWithdrawn: '', // 调出基金编码
		fundNameWithdrawn: '', // 调出基金名称
		assetCodeWithdrawn: '', // 调出资产单元编码
		assetUnitWithdrawn: '', // 调出资产单元名称
		fundCodeDeposited: '', // 调入基金编码
		fundNameDeposited: '', // 调入基金名称
		assetCodeDeposited: '', // 调入资产单元编码
		assetUnitDeposited: '', // 调入资产单元名称
		amountTransferred: '', // 划拨金额(元)
		remark: '' // 备注
	});
	let foresetFrmInline = ref({
		isCalculated: '是', // 是否计入上下账
		transferType: '上账', // 业务类型
		quotaType: '', // 额度类型
		adjustmentDate: $today, // 调整日期
		fundCodeWithdrawn: '', // 调出基金编码
		fundNameWithdrawn: '', // 调出基金名称
		assetCodeWithdrawn: '', // 调出资产单元编码
		assetUnitWithdrawn: '', // 调出资产单元名称
		fundCodeDeposited: '', // 调入基金编码
		fundNameDeposited: '', // 调入基金名称
		assetCodeDeposited: '', // 调入资产单元编码
		assetUnitDeposited: '', // 调入资产单元名称
		amountTransferred: '', // 划拨金额(元)
		remark: '' // 备注
	});
	let isQuoRules = reactive({
		required: true,
		message: '请选择额度类型',
		trigger: 'change'
	})

	// tabs切换
	let tabsName = ref('PendingReview');
	const handleTabsClick = (tab : TabsPaneContext, event : Event) => {
		tabsName.value = tab.paneName;
	};

	let AddEdit = ref(false);
	watch(AddEdit, (newvalue, oldvalue) => {
		if (newvalue === false) {
			formInline.value = JSON.parse(JSON.stringify(foresetFrmInline.value))
			assetCodeWithdrawnListDataIn.value = [];
			assetCodeWithdrawnListDataOut.value = [];
		}
	})

	// 选框相关
	const selectedRows = ref<any[]>([]);
	const selectedIds = computed(() => selectedRows.value.map(item => item.id));
	// 处理多选框变化
	let ReviewBool = ref(true)
	let ReviewBool1 = ref(true)
	let ReviewBool2 = ref(true)
	const handleSelectionChange = (val : any[]) => {
		selectedRows.value = val.sort((n, m) => n.sort - m.sort);
		selectedRows.value.forEach((item, index) => {
			item.number = index + 1;
		});
		if (selectedRows.value.length > 0) {
			ReviewBool.value = selectedRows.value.some(item => item.statusNum !== '0');
			ReviewBool1.value = selectedRows.value.some(item => item.statusNum !== '1');
			ReviewBool2.value = false;
		} else {
			ReviewBool.value = true;
			ReviewBool1.value = true;
			ReviewBool2.value = true;
		}
	};
	const getRowKeys = row => {
		return row.id;
	};
	// 非标
	// 选框相关
	let amountBoolChange = (val) => {
		fblist1.value.forEach(item => item.isEditing = false);
		val.isEditing = true;
	}
	const handleAmountBlur = (val) => {
		val.isEditing = false;
		let value = val.amountTransferred;
		if (value === '') {
			return;
		}
		const num = parseFloat(value.replace(/,/g, ''));
		if (isNaN(num)) {
			val.amountTransferred = '';
			return;
		}
		const rounded = Math.round(num * 100) / 100;
		val.amountTransferred = rounded.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

	}
	const handleAmountInput = (val) => {
		val.amountTransferred = val.amountTransferred.replace(/[^0-9.]/g, '');
		const parts = val.amountTransferred.split('.');
		if (parts.length > 2) {
			val.amountTransferred = parts[0] + '.' + parts.slice(1).join('');
		}
	}
	const selectedRowsFb = ref<any[]>([]);
	const handleSelectionChangeFB = (val : any[]) => {
		selectedRowsFb.value = val;
	};
	const cancel = () => {
		AddEdit.value = false;
	}
	// 保留两位小数
	const handleInput = (value) => {
		value = value.replace(/[^0-9.]/g, '');
		const parts = value.split('.');
		if (parts.length > 2) {
			value = parts[0] + '.' + parts.slice(1).join('');
		}
		formInline.value.amountTransferred = value;
	}
	const handleBlur = () => {
		let value = formInline.value.amountTransferred;
		if (value === '') {
			return;
		}
		const num = parseFloat(value.replace(/,/g, ''));
		if (isNaN(num)) {
			formInline.value.amountTransferred = '';
			return;
		}
		const rounded = Math.round(num * 100) / 100;
		formInline.value.amountTransferred = rounded.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
		// formInline.value.amountTransferred = rounded.toFixed(2);
	}
	// 是否计入上下账逻辑
	let isCalculatedBool = ref(false);
	const isCalculatedChange = (val) => {
		if (val === '否') {
			isCalculatedBool.value = true;
			formInline.value.quotaType = '';
			isQuoRules.required = false;
			ruleFormRef.value.clearValidate(['quotaType']);
		} else {
			isCalculatedBool.value = false;
			isQuoRules.required = true;
		}
	}
	let title = ref('')  // 弹窗title
	// 非标
	// 表格数据
	const getNonStandard = () => {
		getDefaultNonStandardData().then(res => {
			isFBLoading.value = false;
			if (res && res.code === '00000') {
				fblist1.value = res.data;
				fbtotal1.value = res.data.length;
			}
		}).catch(() => {
			isFBLoading.value = false;
		})
	}

	const FbMessageDialog = ref(false);
	watch(FbMessageDialog, (newvalue, oldvalue) => {
		if (newvalue === false) {
			fbpageSize1.value = 10;
			fbpageNo1.value = 1;
			selectedRowsFb.value = [];
		}
	})
	const tableRefFb = ref<TableInstance>();
	let isFBLoading = ref(false);
	// 非标归集
	const handleFb = () => {
		title.value = '非标归集';
		FbMessageDialog.value = true;
		isFBLoading.value = true;
		getNonStandard()
	}
	// 新增
	const handleAdd = () => {
		title.value = '新增';
		AddEdit.value = true;
		isCalculatedBool.value = false;
		isQuoRules.required = true;
		// formInline.value.fundNameWithdrawn = '华夏人寿-新万能-工行港股通1';
	};
	// 编辑
	const edit = (row) => {
		formInline.value = JSON.parse(JSON.stringify(row));
		formInline.value.fundNameWithdrawn = props.fundCodeWithdrawnListData.find(item => item.label === formInline.value.fundNameWithdrawn).value;
		formInline.value.fundNameDeposited = props.fundCodeWithdrawnListData.find(item => item.label === formInline.value.fundNameDeposited).value;
		title.value = '编辑';
		AddEdit.value = true;
		syncFundWithdrawnCode2(formInline.value.assetUnitWithdrawn);
		syncFundDepositedCode2(formInline.value.assetUnitDeposited);
		if (formInline.value.isCalculated === '否') {
			isCalculatedBool.value = true;
			formInline.value.quotaType = '';
			isQuoRules.required = false;
			ruleFormRef.value.clearValidate(['quotaType']);

		} else {
			isCalculatedBool.value = false;
			isQuoRules.required = true;
		}
	};
	// 新增编辑基金上资产单元联动
	let assetCodeWithdrawnListDataIn = ref([])
	let assetCodeWithdrawnListDataOut = ref([])

	// 同步调出基金字段
	const syncFundWithdrawn1 = () => {
		if (formInline.value.fundCodeWithdrawn) {
			const selected = props.fundCodeWithdrawnListData.find(
				item => item.value === formInline.value.fundCodeWithdrawn
			);
			if (selected) {
				formInline.value.fundNameWithdrawn = selected.value;
			}
			getAssetUnitsOut(formInline.value.fundCodeWithdrawn);
			formInline.value.assetCodeWithdrawn = '';
			formInline.value.assetUnitWithdrawn = '';
		}
	};
	const syncFundWithdrawn2 = () => {
		if (formInline.value.fundNameWithdrawn) {
			const selected = props.fundCodeWithdrawnListData.find(
				item => item.value === formInline.value.fundNameWithdrawn
			);
			if (selected) {
				formInline.value.fundCodeWithdrawn = selected.value;
			}
			getAssetUnitsOut(formInline.value.fundNameWithdrawn);
			formInline.value.assetCodeWithdrawn = '';
			formInline.value.assetUnitWithdrawn = '';
		}
	};
	// 同步调出资产单元字段
	const syncFundWithdrawnCode1 = async () => {
		await getAssetUnitsOut(formInline.value.fundCodeWithdrawn);
		if (formInline.value.assetCodeWithdrawn) {
			const selected = assetCodeWithdrawnListDataOut.value.find(
				item => item.value === formInline.value.assetCodeWithdrawn
			);
			if (selected) {
				formInline.value.assetUnitWithdrawn = selected.other;
			}
		}
	};
	const syncFundWithdrawnCode2 = async (val) => {
		await getAssetUnitsOut(formInline.value.fundCodeWithdrawn);
		if (val) {
			const selected = assetCodeWithdrawnListDataOut.value.find(
				item => item.label === val
			);
			if (selected) {
				formInline.value.assetCodeWithdrawn = selected.value;
				formInline.value.assetUnitWithdrawn = assetCodeWithdrawnListDataOut.value.find(item => item.label === val).other
			}
		}
	};


	// 同步调入基金字段
	const syncFundDeposited1 = () => {
		if (formInline.value.fundCodeDeposited) {
			const selected = props.fundCodeWithdrawnListData.find(
				item => item.value === formInline.value.fundCodeDeposited
			);
			if (selected) {
				formInline.value.fundNameDeposited = selected.value;
			}
			getAssetUnitsIn(formInline.value.fundCodeDeposited);
			formInline.value.assetCodeDeposited = '';
			formInline.value.assetUnitDeposited = '';
		}
	};
	const syncFundDeposited2 = () => {
		if (formInline.value.fundNameDeposited) {
			const selected = props.fundCodeWithdrawnListData.find(
				item => item.value === formInline.value.fundNameDeposited
			);
			if (selected) {
				formInline.value.fundCodeDeposited = selected.value;
			}
			getAssetUnitsIn(formInline.value.fundNameDeposited);
			formInline.value.assetCodeDeposited = '';
			formInline.value.assetUnitDeposited = '';
		}
	};
	// 调入资产单元联动
	const syncFundDepositedCode1 = async () => {
		await getAssetUnitsIn(formInline.value.fundCodeDeposited);
		if (formInline.value.assetCodeDeposited) {
			const selected = assetCodeWithdrawnListDataIn.value.find(
				item => item.value === formInline.value.assetCodeDeposited
			);
			if (selected) {
				formInline.value.assetUnitDeposited = selected.other;
			}
		}
	};
	const syncFundDepositedCode2 = async (val) => {
		await getAssetUnitsIn(formInline.value.fundCodeDeposited);
		if (val) {
			const selected = assetCodeWithdrawnListDataIn.value.find(
				item => item.label === val
			);
			if (selected) {
				formInline.value.assetCodeDeposited = selected.value;
				formInline.value.assetUnitDeposited = assetCodeWithdrawnListDataIn.value.find(item => item.label === val).other
			}
		}
	};

	// 获取调出资产单元数据
	const getAssetUnitsOut = async (fundCode) => {
		try {
			// 示例：调用后端接口 getInvestUnitListByFundCode
			const res = await getInvestUnitListByFundCode({ prodCode: fundCode });
			if (res && res.code === '00000') {
				assetCodeWithdrawnListDataOut.value = res.data;
			}

		} catch (error) {
			console.error('获取调出资产单元数据失败', error);
		}
	};

	// 获取调入资产单元数据
	const getAssetUnitsIn = async (fundCode) => {
		try {
			const res = await getInvestUnitListByFundCode({ prodCode: fundCode });
			if (res && res.code === '00000') {
				assetCodeWithdrawnListDataIn.value = res.data;
			}
		} catch (error) {
			console.error('获取调入资产单元数据失败', error);
		}
	};
	let KEY = ref(0)
	// 选中框重置
	const resetSelect = () => {
		selectedRows.value = [];
		KEY.value++;
		if (tableRef.value) {
			tableRef.value.clearSelection();
		}
	}

	// 复核
	const handleTickets = () => {
		ElMessageBox.confirm(`确定通过复核?`, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				getreview({ ids: selectedIds.value })
					.then(async (res) => {
						if (res && res.code === '00000') {
							if (res.data && res.data.length > 0) {
								let arr = selectedRows.value.filter(item => !res.data.includes(item.id));
								resetSelect()
								await props.getContentList();
								if (arr.length) {
									selectedRows.value = JSON.parse(JSON.stringify(arr));
									nextTick(() => {
										selectedRows.value.forEach(item => {
											tableRef.value.toggleRowSelection(item, true);
										})
									})
								} else {
									ReviewBool.value = true;
								}
								ElMessage({
									type: "warning",
									message: res.msg,
								})
							} else {
								props.clearAllSelectedRows()
								selectedRows.value = [];
								tabsName.value = 'PendingReview';
								props.init();
								ReviewBool.value = true;
								ElMessage({
									type: "success",
									message: res.msg,
								})
							}

						}
					})
					.catch(err => {
						ElMessage({
							message: err.msg,
							type: "error",
						});
					})
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消复核",
				});
			});
	};
	// 驳回
	const handleReset = () => {
		ElMessageBox.confirm(`确定驳回选中数据吗?`, {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				turnDown({ ids: selectedIds.value })
					.then(async (res) => {
						if (res && res.code === '00000') {
							if (res.data && res.data.length > 0) {
								let arr = selectedRows.value.filter(item => !res.data.includes(item.id));
								resetSelect()
								await props.getContentList();
								if (arr.length) {
									selectedRows.value = JSON.parse(JSON.stringify(arr));
									nextTick(() => {
										selectedRows.value.forEach(item => {
											tableRef.value.toggleRowSelection(item, true);
										})
									})
								} else {
									ReviewBool2.value = true;
								}
								ElMessage({
									type: "warning",
									message: res.msg,
								})
							} else {
								props.clearAllSelectedRows()
								selectedRows.value = [];
								tabsName.value = 'PendingReview';
								props.init();
								ReviewBool2.value = true;
								ElMessage({
									type: "success",
									message: res.msg,
								})
							}
						}
					})
					.catch(err => {
						ElMessage({
							message: err.msg,
							type: "error",
						});
					})
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消驳回",
				});
			});
	};

	// 新增、编辑
	let addLoading = ref(false);
	const add = async (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				addLoading.value = true;
				let assetUnitWithdrawn = assetCodeWithdrawnListDataOut.value.find(item => item.other === formInline.value.assetUnitWithdrawn).label;
				let assetUnitDeposited = assetCodeWithdrawnListDataIn.value.find(item => item.other === formInline.value.assetUnitDeposited).label;
				let fundNameWithdrawn = props.fundCodeWithdrawnListData.find(item => item.value === formInline.value.fundCodeWithdrawn).label;
				let fundNameDeposited = props.fundCodeWithdrawnListData.find(item => item.value === formInline.value.fundCodeDeposited).label;
				if (title.value === '新增') {
					let { code } = await InsertList({ ...formInline.value, assetUnitWithdrawn, assetUnitDeposited, userChineseName: createName.value, fundNameWithdrawn, fundNameDeposited });
					addLoading.value = false;
					AddEdit.value = false;
					if (code && code == '00000') {
						ElMessage({
							message: "新增成功",
							type: "success",
						});
						props.clearAllSelectedRows()
						selectedRows.value = [];
						props.init();
						tabsName.value = 'PendingReview';
						// props.getContentList()
						props.getSearchList();
					}
				} else {
					let { code } = await updateList({ ...formInline.value, assetUnitWithdrawn, assetUnitDeposited, fundNameWithdrawn, fundNameDeposited });
					addLoading.value = false;
					AddEdit.value = false;
					if (code && code == '00000') {
						ElMessage({
							message: "编辑成功",
							type: "success",
						});
						props.clearAllSelectedRows()
						selectedRows.value = [];

						// props.init();
						props.getContentList();
						props.getSearchList();
					}
				}


			}
		});
	}
	// 非标
	let SearchLoadingFb = ref(false);
	const addFb = async () => {
		if(!selectedRowsFb.value.length){
			ElMessage({
				message: '请选择非标数据',
				type: "warning",
			});
			return;
		}
		SearchLoadingFb.value = true;
		let { code, msg } = await saveNonStandardCollect({ accountEntryRecordDataList: selectedRowsFb.value });
		SearchLoadingFb.value = false;
		if (code && code == '00000') {
			ElMessage({
				message: msg,
				type: "success",
			});
			props.clearAllSelectedRows()
			selectedRows.value = [];
			props.init();
			tabsName.value = 'PendingReview';
			// props.getContentList()
			props.getSearchList();
			FbMessageDialog.value = false;
		}
		if(code==='A0424'){
			ElMessage({
				dangerouslyUseHTMLString: true,
				plain: true,
				duration: 0,
				showClose: true,
				message: msg,
				type: "error",
				icon: "WarningFilled",
				customClass: 'danger-msg-error'
			});
		}
	}
	// 预览邮件
	const MessageDialog = ref(false);

	const handleMessage = () => {
		title.value = '预览邮件';
		MessageDialog.value = true;
	};
	let messageAll = ref({
		addresser: sessionStorage.getItem("name"), // 发件人
		addressBook: '',  // 通讯录
		recipients: [],  // 收件人
		carbonCopyRecipients: [],  // 抄送人
		theme: '', // 主题
		text: '',  // 正文
		transferRecordEmailVoList: []
	})
	let resetMessageAll = ref({
		addresser: sessionStorage.getItem("name"), // 发件人
		addressBook: '',  // 通讯录
		recipients: [],  // 收件人
		carbonCopyRecipients: [],  // 抄送人
		theme: '', // 主题
		text: '',  // 正文
		transferRecordEmailVoList: []
	})
	watch(MessageDialog, (newvalue, oldvalue) => {
		if (newvalue === false) {
			messageAll.value = JSON.parse(JSON.stringify(resetMessageAll.value))
		}
		getAddressBookList();
	})


	// 通讯录
	const AddressBookData = ref([]);
	const getAddressBookList = async () => {
		await getAddressBook().then((res) => {
			if (res && res.code === '00000') {
				AddressBookData.value = res.data
				messageAll.value.addressBook = AddressBookData.value[0].value
				ChangeAddressBookData(messageAll.value.addressBook)
			}
		})
	}


	const recipientLsit = ref([])
	const CctoLsit = ref([])
	const ChangeAddressBookData = async (data) => {
		let obj = {
			id: data ? data : messageAll.value.id
		}
		await getAddressBookById({ ...obj }).then((res) => {
			if (res && res.code === '00000') {
				messageAll.value.theme = res.data.subject;
				messageAll.value.text = res.data.content;
				recipientLsit.value = res.data.recipientVos
				CctoLsit.value = res.data.carbonCopyRecipientVos
				messageAll.value.recipients = res.data.recipientVos.map(item => {
					return item.recipientEmail
				})
				messageAll.value.carbonCopyRecipients = res.data.carbonCopyRecipientVos.map(item => {
					return item.carbonCopyRecipientEmail
				})
			}
		})
	}
	let isAddressName = ref(false);
	let AddressList = ref([]);
	const getName = () => {
		getAddresserName().then(res => {
			if (res && res.code === '00000') {
				AddressList.value = res.data;
				isAddressName.value = res.data.some(item => item.name == isUserName.value)
			}
		})
	}
	onMounted(() => {
		getAddressBookList();
		getName();
	})


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
		fd.append("userChineseName", createName.value);
		await $http.post_dangermsg("/accountEntryRecord/importTemplate", fd)
			.then(res => {
				UploadLoading.value = false;
				if (res.code && res.code == '00000') {
					ElMessage({
						message: "导入成功",
						type: "success",
					});
					props.clearAllSelectedRows()
					selectedRows.value = [];
					props.init();
					tabsName.value = 'PendingReview';
					// props.getContentList()
					props.getSearchList();
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
	const delArr = (row, num) => {
		let id = row.id;
		if (num === '1') {
			ElMessageBox.confirm(`确定删除此数据吗?`, {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					let { code } = await deleteDate({ id });
					if (code && code == '00000') {
						ElMessage({
							type: "success",
							message: "删除成功",
						});
						props.clearAllSelectedRows()
						selectedRows.value = [];
						props.getSearchList();
						props.getContentList();
					}
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "取消删除",
					});
				});
		} else if (num === '2') {

			ElMessageBox.confirm(`确定作废此数据吗?`, {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					let { code } = await cancellation({ id });
					if (code && code == '00000') {
						ElMessage({
							type: "success",
							message: "作废成功",
						});
						props.clearAllSelectedRows()
						selectedRows.value = [];
						props.getContentList()
					}
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "取消作废",
					});
				});
		}
	}
	let SearchLoading = ref(false);
	const sendEmail = (formEl : FormInstance | undefined) => {
		if (!formEl) return;
		formEl.validate((valid, fields) => {
			if (valid) {
				SearchLoading.value = true;
				let addresserEmail = AddressList.value.filter(item => item.name == isUserName.value)[0].email || '';
				sendMail({ ...messageAll.value, transferRecordEmailVoList: selectedRows.value, addresser: addresserEmail })
					.then(async res => {
						SearchLoading.value = false;
						MessageDialog.value = false;
						if (res && res.code == '00000') {
							if (res.data && res.data.length > 0) {
								let arr = selectedRows.value.filter(item => !res.data.includes(item.id));
								resetSelect()
								await props.getContentList();
								if (arr.length) {
									selectedRows.value = JSON.parse(JSON.stringify(arr));
									nextTick(() => {
										selectedRows.value.forEach(item => {
											tableRef.value.toggleRowSelection(item, true);
										})
									})
								} else {
									ReviewBool1.value = true;
								}
								ElMessage({
									type: "warning",
									message: res.msg,
								})
							} else {
								props.clearAllSelectedRows()
								selectedRows.value = [];
								tabsName.value = 'PendingReview';
								props.init();
								ReviewBool1.value = true;
								ElMessage({
									type: "success",
									message: res.msg,
								})
							}
						}
					})
					.catch(() => {
						MessageDialog.value = false
						SearchLoading.value = false;
						ElMessage({
							message: "发送失败",
							type: "info",
						});
					});
			}
		});

	};
	defineExpose({
		tableRef,
		resetSelect,
		tabsName,
		selectedRows
	});
</script>

<style scoped lang="scss">
	.btnArr {
		margin: 10px 0;
	}

	.el-table {
		margin-bottom: 10px;

		:deep(.cell) {

			// text-align: left;
			// white-space: pre-wrap;

		}
	}

	.upload-demo {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	:deep(.custom-newsContent > el-dialog__footer) {
		text-align: center !important;
	}

	:deep(.el-input-number .el-input__inner) {
		text-align: left;
	}

	:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
		border-right: 1px solid #ddd !important;
	}

	:deep(.fb-box .el-input__inner) {
		text-align: end !important;
	}
</style>
<style>
	.tooltip-box .el-popper__arrow {
		width: 0;
		height: 0;
		border-left: 6px solid transparent !important;
		border-right: 6px solid transparent !important;
		border-bottom: 9px solid rgba(0, 0, 0, 0.6) !important;
		/* transform: translateY(10px) !important; */
		top: -8px !important;
	}

	.tooltip-box .el-popper__arrow:before {
		width: 0px;
		height: 0px;
		border: none !important;
	}
</style>