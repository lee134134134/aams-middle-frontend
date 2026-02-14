<template>
  <div class="temporary-fix">
    <el-card body-class="search-card1 search-cardFix" body-style="padding-bottom: 0px;" style="margin-bottom: 8px">
      <div ref="slecetTreeTzjl" class="header">
        <el-form ref="ruleFormRef" :inline="true" :model="formInline" :rules="rule" class="demo-form-inline" label-position="left" label-width="80px">
          <el-row :gutter="48" class="flex-box">
            <el-col :span="6">
              <el-form-item label="账户类型" prop="treeType">
                <el-select v-model="formInline.treeType" class="col-width-type" placeholder="请选择账户类型" popper-class="custom-select" style="width: 100%">
                  <el-option v-for="(item, i) in treeTypeListData" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="formInline.treeType == '4' ? 6 : 0">
              <el-form-item v-show="formInline.treeType == '4'" :rules="{ required: formInline.treeType == '4', message: '', trigger: ['blur', 'change'] }" class="margin-12" label="账户名称" prop="selfAcountTree">
                <el-tree-select ref="slecetTree1" v-model="formInline.selfAcountTree" :data="selectZdyzh" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择自定义账户" />
              </el-form-item>
            </el-col>
            <el-col :span="formInline.treeType == '2' ? 6 : 0">
              <el-form-item v-show="formInline.treeType == '2'" :rules="{ required: formInline.treeType == '2', message: '', trigger: ['blur', 'change'] }" label="账户名称" prop="insuranceType">
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
                <el-select v-model="formInline.sobCodeListLabel" class="col-width-type" :filter-method="onQueryChanged" :max-collapse-tags="1" :props="props" :render-after-expand="false" clearable collapse-tags filterable multiple placeholder="请选择投资经理" popper-class="custom-select-sob" style="width: 100%" @clear="clearSob">
                  <template #empty>
                    <el-tree-v2 ref="treeRef" :data="selectTzjlAll" :default-expanded-all="true" :filter-method="filterMethod" :highlight-current="true" :props="propsv2" show-checkbox @check-change="v2Click" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="start_time" label="开始日期" prop="startDate" style="width: 100%">
                <el-date-picker v-model="formInline.startDate" :clearable="false" :disabled-date="disabledDateStart" :editable="false" class="col-width-type" placeholder="请选择开始日期" style="width: 100%" type="date" value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束日期" prop="endDate" style="width: 100%">
                <el-date-picker v-model="formInline.endDate" :clearable="false" :disabled-date="disabledDateEnd" :editable="false" class="col-width-type" placeholder="请选择结束日期" style="width: 100%" type="date" value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="margin-12" label="金额单位" prop="currencyUnit">
                <el-select v-model="formInline.currencyUnit" class="col-width-type" placeholder="请选择金额单位" popper-class="custom-select" style="width: 100%">
                  <el-option v-for="(item, i) in selectListDataUnit" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="subBtn">
            <el-form-item class="margin-12">
              <el-button :loading="SearchLoading" class="button-custom color-button" data-track-id="EquityPortfolioNetValue-submit-btn" data-track-name="权益类组合持仓净值表-查询" icon="Search" type="primary" @click="onSubmit(ruleFormRef)">查询 </el-button>
              <el-button class="button-custom" icon="RefreshLeft" @click="resetForm(ruleFormRef)">重置</el-button>
              <el-button :disabled="downloadBool" :loading="DownloadLoading" class="button-custom" data-track-id="EquityPortfolioNetValue-Download-btn" data-track-name="权益类组合持仓净值表-导出" icon="Download" @click="handleDownload(ruleFormRef)">导出 </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <TitleMargin title="">
        <div class="dw">单位：{{ unitVal }}</div>
      </TitleMargin>
      <section>
        <div v-show="!isShowPage" class="main-no-result">
          <img alt="" src="../../assets/images/empty.png" style="height: 200px" />
          <div>请输入查询条件并点击查询</div>
        </div>
        <el-tabs v-show="isShowPage" v-model="tabsName" class="temporary-tabs" @tab-click="handleTabsClick">
          <el-tab-pane v-for="(item, index) in tabsDataList" :key="index" :label="item.label" :name="item.name">
            <div class="page">
              <div class="container">
                <div class="left-panel">
                  <LeftTable />
                </div>
                <div class="right-panel">
                  <ChartLayout v-if="tabsName === item.name" />
                </div>
              </div>
            </div>
            <div class="table-content">
              <DataList />
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, ref, watch } from "vue"
import type { FormInstance, TabsPaneContext, TreeNodeData } from "element-plus"
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus"
import { getList, getVariableStartAndEndDate, handleExportFile } from "@/api/EquityPortfolioNet.js"
import TitleMargin from "@/components/TitleMargin.vue"
import { getUsersTree, selectDept, selectInsurance } from "@/api/common.js"
import { rule, tabsList } from "./List/common.js"
import { filterFormArr, getAllValues1, getTreeLabel, getValueArr1 } from "@/utils/index.js"
import _ from "lodash"
import ChartLayout from "./List/ChartLayout.vue"
import DataList from "./List/DataList.vue"
import LeftTable from "./List/LeftTable.vue"

const slecetTree = ref(null as unknown)
const slecetTreeTzjl = ref(null as unknown)
let searchObj = ref()
const SearchLoading = ref(false)
const isShowPage = ref(false)
// 查询form数据
const ruleFormRef = ref<FormInstance>()
const formInline = reactive({
  treeType: "2",
  selfAcountTree: [],
  insuranceType: [],
  sobCodeList: [],
  sobCodeListLabel: [],
  startDate: "",
  endDate: "",
  endTempDate: "",
  currencyUnit: "0",
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
  currencyUnit: "0",
})
let treeTypeListData = ref([
  { value: "1", label: "投资经理" },
  { value: "2", label: "险种" },
  { value: "4", label: "自定义账户" },
])

let unitVal = ref("亿元")
let selectListDataUnit = ref([
  { value: "0", label: "亿元" },
  { value: "1", label: "万元" },
  { value: "2", label: "元" },
])

let tabsName = ref("stockTextualVo")
let tabsDataList = ref(tabsList)
let tableData = ref([])

provide("pageLoading", SearchLoading)
provide("pageData", tableData)
provide("tabsName", tabsName)

// 初始化数据
onMounted(async () => {
  await getUsers()
  await getCaldDateTime()
  await getSelectInsurance()
})

watch(
  () => formInline.currencyUnit,
  newVal => {
    if (newVal === "0") {
      unitVal.value = "亿元"
    } else if (newVal === "1") {
      unitVal.value = "万元"
    } else if (newVal === "2") {
      unitVal.value = "元"
    }
  },
)

// tabs切换
const handleTabsClick = (tab: TabsPaneContext): void => {
  tabsName.value = tab.paneName
}
// 交易日历
const getCaldDateTime = async (): Promise<void> => {
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
const dateVal = (date: Date | string | number): number => {
  return Date.parse(new Date(date).toString())
}
const disabledDateEnd = (time: Date): boolean => {
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
const disabledDateStart = (time: Date): boolean => {
  //注意这要加一个判断不然没选结束时间的时候开始时间也全部不能选择
  if (formInline.endDate) {
    return time.getTime() > dateVal(formInline.endDate) - 86400000
  }
}

// 账套
const selectStatisticsList = ref([])

// 险种
const selectInsuranceList = ref([])
const getSelectInsurance = async (): Promise<void> => {
  const res = await selectInsurance()
  if (res && res.code == "00000") {
    selectInsuranceList.value = res.data || []
    formInline.insuranceType = getAllValues1(res.data) as unknown
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
const onQueryChanged = (query: string): void => {
  if (treeRef.value) {
    treeRef.value.filter(query)
    if (!query) {
      treeRef.value.setExpandedKeys(treeRef.value?.getCheckedKeys())
    }
  }
}
const filterMethod = (query: string, node: TreeNodeData): boolean => (node.label ?? "").includes(query)
const v2Click = (data, node): void => {
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
const clearSob = (): void => {
  formInline.sobCodeList = resetList.sobCodeList
  formInline.sobCodeListLabel = resetList.sobCodeListLabel
  if (treeRef.value) {
    treeRef.value.setCheckedKeys([])
    treeRef.value.setExpandedKeys([])
  }
}
const slecetTree1 = ref(null as unknown)
const selectTzjlAll = ref([])
const selectDataArr = ref([])
const selectZdyzh = ref([])
let getUsers = async (): Promise<void> => {
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
const onSubmit = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      init()
    }
  })
}
const init = async (): Promise<void> => {
  isShowPage.value = true
  SearchLoading.value = true
  downloadBool.value = false
  searchObj.value = JSON.parse(JSON.stringify({ ...formInline }))
  try {
    let res = await getList({
      treeType: formInline.treeType,
      startDate: formInline.startDate,
      endDate: formInline.endDate,
      currencyUnit: formInline.currencyUnit,
      ...(formInline.treeType === "1" && { sobCodeList: formInline.sobCodeList }),
      ...(formInline.treeType === "2" && { insuranceType: formInline.insuranceType }),
      ...(formInline.treeType === "4" && { selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree) }),
    })
    if (res && res.code === "00000") {
      tableData.value = res.data || []
    }
  } finally {
    SearchLoading.value = false
  }
}

// 重置
const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.resetFields()
  formInline.sobCodeList = resetList.sobCodeList
  formInline.sobCodeListLabel = resetList.sobCodeListLabel
  formInline.insuranceType = resetList.insuranceType
  formInline.treeType = resetList.treeType
  formInline.selfAcountTree = resetList.selfAcountTree
  formInline.startDate = resetList.startDate
  formInline.endDate = resetList.endDate
  if (treeRef.value) {
    treeRef.value.setCheckedKeys([])
    treeRef.value.setExpandedKeys([])
  }
}

// 导出
const DownloadLoading = ref(false)
const handleDownload = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.validate(valid => {
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
        .then(() => {
          let formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value)
          let queryCondition = {
            ...formArr,
            "3.开始日期": `${formInline.startDate}`,
            "4.结束日期": `${formInline.endDate}`,
            "5.金额单位": selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label,
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
              .then(() => {
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
              .catch(() => {
                ElMessage({
                  type: "info",
                  message: `取消导出`,
                })
              })
          }
        })
        .catch(() => {
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

  :deep(.el-form-item__label) {
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

  :deep(.el-table td.el-table__cell div) {
    color: #666;
  }
}

.temporary-tabs {
  margin-top: -40px;

  :deep(.el-tabs__content) {
    margin-top: 14px;
  }

  :deep(.el-tabs__item) {
    font-size: 14px;
  }

  :deep(.el-tabs__item.is-active) {
    color: #2173f7;
  }

  :deep(.el-tabs__active-bar) {
    background: #2173f7;
  }
}

.main-no-result {
  text-align: center;

  & > div {
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
}

.container {
  display: flex;

  .left-panel {
    width: 488px;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .right-panel {
    flex: 1;
    min-width: 0;
  }
}
</style>
