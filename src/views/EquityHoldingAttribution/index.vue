<template>
  <div class="temporary-fix">
    <el-card body-class="search-card1 search-cardFix" body-style="padding-bottom: 0px;" style="margin-bottom: 8px">
      <div ref="slecetTreeTzjl" class="header">
        <el-form ref="ruleFormRef" :inline="true" :model="formInline" :rules="rule" class="demo-form-inline" label-position="left" label-width="80px">
          <el-row class="flex-box" :gutter="48">
            <el-col :span="6">
              <el-form-item label="账户类型" prop="treeType">
                <el-select v-model="formInline.treeType" placeholder="请选择账户类型" popper-class="custom-select" style="width: 100%">
                  <el-option v-for="(item, i) in treeTypeListData" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="formInline.treeType == '4' ? 6 : 0">
              <el-form-item
                v-show="formInline.treeType == '4'"
                :rules="{
                  required: formInline.treeType == '4' ? true : false,
                  message: '',
                  trigger: ['blur', 'change'],
                }"
                class="margin-12"
                label="账户名称"
                prop="selfAcountTree">
                <el-tree-select ref="slecetTree1" v-model="formInline.selfAcountTree" :data="selectZdyzh" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择自定义账户" />
              </el-form-item>
            </el-col>
            <el-col :span="formInline.treeType == '2' ? 6 : 0">
              <el-form-item
                v-show="formInline.treeType == '2'"
                :rules="{
                  required: formInline.treeType == '2' ? true : false,
                  message: '',
                  trigger: ['blur', 'change'],
                }"
                label="账户名称"
                prop="insuranceType">
                <el-tree-select ref="slecetTree" v-model="formInline.insuranceType" :data="selectInsuranceList" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择险种" show-checkbox style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="formInline.treeType == '1' ? 6 : 0">
              <el-form-item
                v-show="formInline.treeType == '1'"
                :rules="{
                  required: formInline.treeType == '1' ? true : false,
                  message: '',
                  trigger: ['blur', 'change'],
                }"
                label="账户名称"
                prop="sobCodeList">
                <el-select class="col-width-type" v-model="formInline.sobCodeListLabel" :filter-method="onQueryChanged" :max-collapse-tags="1" :props="props" :render-after-expand="false" clearable collapse-tags filterable multiple placeholder="请选择投资经理" popper-class="custom-select-sob" style="width: 100%" @clear="clearSob">
                  <template #empty>
                    <el-tree-v2 ref="treeRef" :data="selectTzjlAll" :default-expanded-all="true" :filter-method="filterMethod" :highlight-current="true" :props="propsv2" show-checkbox @check-change="v2Click" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="start_time" label="开始日期" prop="startDate" style="width: 100%">
                <el-date-picker class="col-width-type" v-model="formInline.startDate" :clearable="false" :disabled-date="disabledDateStart" :editable="false" placeholder="请选择开始日期" style="width: 100%" type="date" value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束日期" prop="endDate" style="width: 100%">
                <el-date-picker class="col-width-type" v-model="formInline.endDate" :clearable="false" :disabled-date="disabledDateEnd" :editable="false" placeholder="请选择结束日期" style="width: 100%" type="date" value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="subBtn">
            <el-form-item class="margin-12">
              <el-button :loading="SearchLoading" class="button-custom color-button" data-track-id="EquityHoldingAttribution-submit-btn" data-track-name="权益类组合持仓归因分析表-查询" icon="Search" type="primary" @click="onSubmit(ruleFormRef)">查询</el-button>
              <el-button class="button-custom" icon="RefreshLeft" @click="resetForm(ruleFormRef)">重置</el-button>
              <el-button :disabled="downloadBool" :loading="DownloadLoading" class="button-custom" data-track-id="EquityHoldingAttribution-Download-btn" data-track-name="权益类组合持仓归因分析表-导出" icon="Download" @click="handleDownload(ruleFormRef)">导出</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <TitleMargin title="权益类组合持仓归因分析表"></TitleMargin>
      <DataList ref="DateListref" :isLoading="SearchLoading" :downloadBool="downloadBool"></DataList>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import type { FormInstance } from "element-plus"
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus"
import { getVariableStartAndEndDate, handleExportFile } from "@/api/EquityHoldingAttribution.js"
import TitleMargin from "@/components/TitleMargin.vue"
import { getUsersTree, selectDept, selectInsurance } from "@/api/common.js"
import DataList from "./List/DataList.vue"
import { rule } from "./List/common.js"
import { compareObject, filterFormArr, getAllValues1, getTreeLabel, getValueArr1 } from "@/utils/index.js"
import _ from "lodash"

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

// 初始化数据
onMounted(async () => {
  await getUsers()
  await getCaldDateTime()
  await getSelectInsurance()
})

const DateListref = ref()
const slecetTree = ref(null as any)
const slecetTreeTzjl = ref(null as any)
let searchObj = ref()
const SearchLoading = ref(false)

// 查询form数据
const ruleFormRef = ref<FormInstance>()
const formInline = reactive({
  treeType: "2",
  selfAcountTree: [],
  insuranceType: [],
  sobCodeList: [],
  sobCodeListLabel: [],
  startDate: "",
  endTempDate: "",
  endDate: "",
})
const props = {
  isLeaf: "leaf",
  value: "value",
  label: "label",
}
let resetList = reactive({
  treeType: "2",
  selfAcountTree: [],
  insuranceType: [],
  sobCodeList: [],
  sobCodeListLabel: [],
  startDate: "",
  endDate: "",
})
let treeTypeListData = ref([
  { value: "1", label: "投资经理" },
  { value: "2", label: "险种" },
  { value: "4", label: "自定义账户" },
])

// 交易日历
const getCaldDateTime = async () => {
  const res = await getVariableStartAndEndDate({ numsDay: "2" })
  if (res && res.code == "00000") {
    formInline.startDate = res.data.startDate || ""
    formInline.endDate = res.data.endDate || ""
    formInline.endTempDate = formInline.endDate
    resetList.startDate = formInline.startDate
    resetList.endDate = formInline.endDate
  }
}
// 开始结束时间限制
const dateVal = (date: any) => {
  return Date.parse(new Date(date) as any)
}
const disabledDateEnd = (time: any) => {
  const targetTime = time.getTime()
  const startTime = formInline.startDate ? dateVal(formInline.startDate) : null
  const endLimitTime = formInline.endTempDate ? dateVal(formInline.endTempDate) : null
  if (startTime && targetTime < startTime) {
    return true
  }
  if(endLimitTime && targetTime > endLimitTime) {
    return true
  }
  return false
}
const disabledDateStart = (time: any) => {
  //注意这要加一个判断不然没选结束时间的时候开始时间也全部不能选择
  if (formInline.endDate) {
    return time.getTime() > dateVal(formInline.endDate) - 86400000
  }
}

// 账套
const selectStatisticsList = ref([])

// 险种
const selectInsuranceList = ref([])
const getSelectInsurance = async () => {
  const res = await selectInsurance()
  if (res && res.code == "00000") {
    selectInsuranceList.value = res.data || []
    formInline.insuranceType = getAllValues1(res.data) as any
    resetList.insuranceType = JSON.parse(JSON.stringify(getAllValues1(res.data)))
  }
}
// 投资经理、自定义账户树
let propsv2 = ref({
  value: "value",
  label: "label",
  children: "children",
})
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query)
  if (!query) {
    treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
  }
}
const filterMethod = (query: string, node: TreeNodeData) => node.label!.includes(query)
const v2Click = (data, node) => {
  if (node) {
    let arr = data.childrenPrdCodeList.split(",") || []
    formInline.sobCodeList = [...formInline.sobCodeList, ...arr]
  } else {
    let arr = data.childrenPrdCodeList.split(",") || []
    formInline.sobCodeList = formInline.sobCodeList.filter(item => !arr.includes(item))
  }
  formInline.sobCodeListLabel = getTreeLabel(
    selectTzjlAll.value,
    formInline.sobCodeList.map(item => item.split("&").pop()),
  )
}
const clearSob = () => {
  formInline.sobCodeList = resetList.sobCodeList
  formInline.sobCodeListLabel = resetList.sobCodeListLabel
  treeRef.value!.setCheckedKeys([])
  treeRef.value!.setExpandedKeys([])
}
const slecetTree1 = ref(null as any)
const selectTzjlAll = ref([])
const selectDataArr = ref([])
const selectZdyzh = ref([])
let getUsers = async () => {
  let { data, code } = await getUsersTree()
  let res = await selectDept()
  if (code && code == "00000") {
    selectTzjlAll.value = JSON.parse(JSON.stringify(data))
  }
  if (res.code && res.code === "00000") {
    selectDataArr.value = JSON.parse(JSON.stringify(res.data))
    selectZdyzh.value = JSON.parse(JSON.stringify(res.data)).map(item => {
      return {
        value: item.value,
        label: item.label,
      }
    })
  }
}
// 查询
let downloadBool = ref(true)
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      init()
    }
  })
}
const init = () => {
  SearchLoading.value = true
  downloadBool.value = false
  searchObj.value = JSON.parse(JSON.stringify({ ...formInline }))
  DateListref.value
    .getContentList({
      treeType: formInline.treeType,
      startDate: formInline.startDate,
      endDate: formInline.endDate,
      ...(formInline.treeType === "1" && { sobCodeList: formInline.sobCodeList }),
      ...(formInline.treeType === "2" && { insuranceType: formInline.insuranceType }),
      ...(formInline.treeType === "4" && { selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }),
    })
    .then(() => {
      SearchLoading.value = false
    })
    .catch(() => {
      SearchLoading.value = false
    })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  formInline.sobCodeList = resetList.sobCodeList
  formInline.sobCodeListLabel = resetList.sobCodeListLabel
  formInline.insuranceType = resetList.insuranceType
  formInline.treeType = resetList.treeType
  formInline.selfAcountTree = resetList.selfAcountTree
  formInline.startDate = resetList.startDate
  formInline.endDate = resetList.endDate
  treeRef.value!.setCheckedKeys([])
  treeRef.value!.setExpandedKeys([])
}

// 导出
const DownloadLoading = ref(false)
const handleDownload = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      let str = `数据使用提示：<br/>相关数据严格按照业务需求逻辑进行加工，请务必结合使用场景确认数据准确性后使用。`
      ElMessageBox.confirm(str, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        confirmButtonClass: "confirm-btn",
        cancelButtonClass: "confirm-btn",
        dangerouslyUseHTMLString: true,
      })
        .then(({ value }) => {
          let formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value)
          let queryCondition = {
            ...formArr,
            "3.开始日期": `${formInline.startDate}`,
            "4.结束日期": `${formInline.endDate}`,
          }

          let bool = _.isEqual({ ...formInline }, searchObj.value)
          if (bool) {
            DownloadLoading.value = true
            handleExportFile({
              ...formInline,
              selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree),
              queryCondition,
            })
              .then(() => {
                DownloadLoading.value = false
              })
              .catch(() => {
                DownloadLoading.value = false
              })
          } else {
            ElMessageBox.confirm("查询条件已变更，是否继续导出？", {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning",
              confirmButtonClass: "confirm-btn",
              cancelButtonClass: "confirm-btn",
              dangerouslyUseHTMLString: true,
            })
              .then(({ value }) => {
                DownloadLoading.value = true
                handleExportFile({
                  ...formInline,
                  selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree),
                  queryCondition,
                })
                  .then(() => {
                    DownloadLoading.value = false
                  })
                  .catch(() => {
                    DownloadLoading.value = false
                  })
              })
              .catch(error => {
                ElMessage({
                  type: "info",
                  message: `取消导出`,
                })
              })
          }
        })
        .catch(error => {
          ElMessage({
            type: "info",
            message: `取消导出`,
          })
        })
    }
  })
}
</script>

<style lang="scss" scoped>
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
  width: calc(100% - 260px);

  :deep(.el-form-item__label){
    margin-right: 35px;
  }
}

:deep(.el-form--inline.el-form--label-top) {
  justify-content: space-between;
}

.subBtn {
  position: absolute;
  right: 16px;
  bottom: 2px;
  display: flex;
  align-items: end;

  :deep(.el-form-item) {
    margin-right: 0px !important;
  }

  .button-custom {
    width: 76px;
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

.temporary-fix {
  :deep(.search-cardFix) {
    padding: 14px 15px 2px !important;
  }

  :deep(.el-table td.el-table__cell div){
    color: #666;
  }
}
</style>
