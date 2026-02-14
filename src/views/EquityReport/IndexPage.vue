<template>
  <div class="temporary1">
    <el-card body-class="search-card1" body-style="padding-bottom: 0px;" class="temporary1-card">
      <div class="header">
        <el-form ref="ruleFormRef" :inline="true" :model="formInline" :rules="rule" class="demo-form-inline" label-width="80px">
          <el-row :gutter="48" class="flex-box">
            <el-col :span="6">
              <el-form-item label="险种" prop="insuranceType">
                <el-tree-select ref="slecetTree" v-model="formInline.insuranceType" :data="selectInsuranceList" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择险种" show-checkbox style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="margin-12" label="查询日期" prop="queryDate" style="width: 100%">
                <el-date-picker v-model="formInline.queryDate" :clearable="false" :disabled-date="disabledDateEnd" :editable="false" class="custom-checkDate" placeholder="请选择查询日期" popper-class="custom-datePicker" type="date" value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="margin-12" label="金额单位" prop="currencyUnit">
                <el-select v-model="formInline.currencyUnit" class="custom-select-sob" placeholder="请选择金额单位" popper-class="custom-select">
                  <el-option v-for="(item, i) in selectListDataUnit" :key="i" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="subBtn">
            <el-form-item class="margin-12">
              <el-button :loading="SearchLoading" class="button-custom color-button" data-track-id="EquityReport-submit-btn" data-track-name="权益组合一览表-查询" icon="Search" type="primary" @click="onSubmit(ruleFormRef)">查询</el-button>
              <el-button class="button-custom" icon="RefreshLeft" @click="resetForm(ruleFormRef)">重置</el-button>
              <el-button :disabled="downloadBool" :loading="DownloadLoading" class="button-custom" data-track-id="EquityReport-Download-btn" data-track-name="权益组合一览表-导出" icon="Download" @click="detailData(ruleFormRef)">导出</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <TitleMargin title="权益类组合一览表">
        <div class="dw">单位：{{ unitVal }}</div>
      </TitleMargin>
      <DataList ref="DateListref" :is-loading="SearchLoading"></DataList>
      <HeatmapList ref="HeatmapListRef" @update-list="handleUpdate" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, ref, watch } from "vue"
import type { FormInstance } from "element-plus"
import { ElMessage, ElMessageBox } from "element-plus"
import { getHeatMap, getInvestmanagerList, handleExportFile } from "@/api/EquityReport.js"
import { getCaldDate, selectInsurance } from "@/api/common.js"
import DataList from "./List/DataList.vue"
import TitleMargin from "@/components/TitleMargin.vue"
import HeatmapList from "./List/HeatmapList.vue"
import { rule } from "./List/common.js"
import { getAllValues1 } from "@/utils/index.js"
import _ from "lodash"

// 初始化数据
onMounted(async () => {
  await getCaldDateTime()
  await getSelectInsurance()
})

let selectListDataUnit = ref([
  { value: "0", label: "亿元" },
  { value: "1", label: "万元" },
  { value: "2", label: "元" },
])
const DateListref = ref()
const HeatmapListRef = ref()
const headData = reactive({
  list: [],
  tableList: [],
})
const slecetTree = ref(null as unknown)
const SearchLoading = ref(false)
const tableLoading = ref(false)
// 查询form数据
const ruleFormRef = ref<FormInstance>()
const formInline = reactive({
  insuranceType: [],
  investManagerList: [],
  queryDate: "",
  endTempDate: "",
  currencyUnit: "1",
})
let resetList = reactive({
  insuranceType: [],
  queryDate: "",
  currencyUnit: "1",
})
let searchObj = ref()
let unitVal = ref("万元")
let downloadBool = ref(true)
provide("pageLoading", SearchLoading)
provide("headData", headData)
provide("tableLoading", tableLoading)
provide("downloadBool", downloadBool)
watch(
  () => formInline.currencyUnit,
  newval => {
    if (newval === "0") {
      unitVal.value = "亿元"
    } else if (newval === "1") {
      unitVal.value = "万元"
    } else if (newval === "2") {
      unitVal.value = "元"
    }
  },
)

// 交易日历
const getCaldDateTime = async (): Promise<void> => {
  let obj = {
    numsDay: "2",
  }
  const res = await getCaldDate({ ...obj })
  if (res && res.code == "00000") {
    formInline.queryDate = res.data
    formInline.endTempDate = formInline.queryDate
    resetList.queryDate = res.data
  }
}

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

// 查询
const onSubmit = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      init()
    }
  })
}

const init = async (): Promise<void> => {
  SearchLoading.value = true
  tableLoading.value = true
  downloadBool.value = false
  formInline.investManagerList = []
  searchObj.value = JSON.parse(JSON.stringify({ ...formInline }))
  DateListref.value
    .getContentList({ ...formInline })
    .then(async (): Promise<void> => {
      SearchLoading.value = false
      try {
        const res = await getInvestmanagerList({ ...formInline })
        if (res.code === "00000") {
          headData.list = res.data
        }
        await fetchHeatMapData()
      } finally {
        tableLoading.value = false
      }
    })
    .catch(() => {
      SearchLoading.value = false
    })
}

const handleUpdate = async (investManagerList: string[]): Promise<void> => {
  formInline.investManagerList = investManagerList
  searchObj.value = JSON.parse(JSON.stringify({ ...formInline }))
  await fetchHeatMapData()
}

const fetchHeatMapData = async (): Promise<void> => {
  tableLoading.value = true
  try {
    const result = await getHeatMap({
      insuranceType: formInline.insuranceType,
      queryDate: formInline.queryDate,
      currencyUnit: formInline.currencyUnit,
      investManagerList: formInline.investManagerList,
    })
    if (result.code === "00000") {
      headData.tableList = result.data
    }
  } finally {
    tableLoading.value = false
  }
}

// 重置
const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.resetFields()
  formInline.queryDate = resetList.queryDate
  formInline.insuranceType = resetList.insuranceType
  formInline.currencyUnit = resetList.currencyUnit
  HeatmapListRef.value.resetSelect()
}

// 导出
const DownloadLoading = ref(false)
const detailData = async (formEl: FormInstance | undefined): void => {
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
          let bool = _.isEqual({ ...formInline }, searchObj.value)
          let queryCondition = {
            "1.险种": formInline.insuranceType,
            "2.查询日期": formInline.queryDate,
            "3.金额单位": selectListDataUnit.value.find(item => item.value == formInline.currencyUnit)?.label,
          }
          if (bool) {
            DownloadLoading.value = true
            handleExportFile({ ...formInline, queryCondition })
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
                handleExportFile({ ...formInline, queryCondition })
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
// 开始结束时间限制
const dateVal = (date: any) => {
  return Date.parse(new Date(date) as any)
}
const disabledDateEnd = (time: any) => {
  const targetTime = time.getTime()
  const endLimitTime = formInline.endTempDate ? dateVal(formInline.endTempDate) : null
  if (endLimitTime && targetTime > endLimitTime) {
    return true
  }
  return false
}
</script>

<style lang="scss" scoped>
.temporary1 {
  :deep(.search-card1) {
    padding: 14px 12px 2px 15px !important;
  }

  .temporary1-card {
    margin-bottom: 8px;
  }
}

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
  bottom: 0px;
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

.temporary {
  background-color: #f3f7fb;
}
</style>
