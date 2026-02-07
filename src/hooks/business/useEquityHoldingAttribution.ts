import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import _ from 'lodash'
import { getVariableStartAndEndDate, handleExportFile, getList } from '@/api/EquityHoldingAttribution.js'
import { getUsersTree, selectDept, selectInsurance } from '@/api/common.js'
import { filterFormArr, getAllValues1, getTreeLabel, getValueArr1 } from '@/utils/index.js'
import { useTable } from '@/hooks/useTable'
import { useSearch } from '@/hooks/useSearch'

/**
 * 权益持仓归因业务逻辑 Hook
 * @description 组合了 useTable 和 useSearch 通用 Hook，并实现了特定业务逻辑
 * @returns {Object} 包含状态和方法的对象
 */
export function useEquityHoldingAttribution() {
  /** 导出加载状态 */
  const downloadLoading = ref(false)

  /** 账户类型选项数据 */
  const treeTypeListData = ref([
    { value: "1", label: "投资经理" },
    { value: "2", label: "险种" },
    { value: "4", label: "自定义账户" },
  ])
  const selectInsuranceList = ref([])
  const selectTzjlAll = ref([])
  const selectDataArr = ref([])
  const selectZdyzh = ref([])
  const selectStatisticsList = ref([]) 

  /** 查询条件快照（用于导出检查） */
  const searchObj = ref()

  /**
   * 搜索 Hook 实例
   */
  const { formModel: formInline, searchLoading, downLoading, setInitialSnapshot, handleSearch: triggerSearch, handleReset: triggerReset } = useSearch({
    treeType: "2",
    selfAcountTree: [],
    insuranceType: [],
    sobCodeList: [],
    sobCodeListLabel: [],
    startDate: "",
    endDate: "",
  }, async (model) => {
    // 搜索回调
    searchObj.value = JSON.parse(JSON.stringify({ ...model }))
    
    const payload = {
      treeType: model.treeType,
      startDate: model.startDate,
      endDate: model.endDate,
      ...(model.treeType === "1" && { sobCodeList: model.sobCodeList }),
      ...(model.treeType === "2" && { insuranceType: model.insuranceType }),
      ...(model.treeType === "4" && { selfAcountTree: getValueArr1(selectDataArr.value, model.selfAcountTree) }),
    }
    
    await getListApi(payload)
  }, () => {
    // 重置回调
    // 如果有额外需要重置的状态可以在这里处理
  })

  /**
   * 表格 Hook 实例
   */
  const { tableData, pageData, total, currentPage, pageSize, loading: tableLoading, getList: getListApi } = useTable({
    api: getList,
    isFrontendPagination: true
  })

  /**
   * 初始化数据
   */
  const initData = async () => {
    await Promise.all([getUsers(), getCaldDateTime(), getSelectInsurance()])
    setInitialSnapshot(formInline)
  }

  /**
   * 获取用户树和部门数据
   */
  const getUsers = async () => {
    try {
      let { data, code } = await getUsersTree()
      let res = await selectDept()
      if (code && code == "00000") {
        selectTzjlAll.value = JSON.parse(JSON.stringify(data))
      }
      if (res.code && res.code === "00000") {
        selectDataArr.value = JSON.parse(JSON.stringify(res.data))
        selectZdyzh.value = JSON.parse(JSON.stringify(res.data)).map((item: any) => ({
          value: item.value,
          label: item.label,
        }))
      }
    } catch (e) {
    }
  }

  interface DateResponse {
    code: string;
    data: {
      startDate: string;
      endDate: string;
    }
  }

  /**
   * 获取交易日历时间
   */
  const getCaldDateTime = async () => {
    try {
      const res = (await getVariableStartAndEndDate({ numsDay: "2" })) as DateResponse
      if (res && res.code == "00000") {
        formInline.startDate = res.data.startDate || ""
        formInline.endDate = res.data.endDate || ""
      }
    } finally {
      // 留白
    }
  }

  /**
   * 获取险种列表
   */
  const getSelectInsurance = async () => {
    try {
      const res = await selectInsurance()
      if (res && res.code == "00000") {
        selectInsuranceList.value = res.data || []
        formInline.insuranceType = getAllValues1(res.data) as any
      }
    } finally {
      // 留白
    }
  }

  /**
   * 处理导出操作
   */
  const handleExport = () => {
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
        executeExport()
      })
      .catch(() => {
        ElMessage({ type: "info", message: `取消导出` })
      })
  }

  /**
   * 执行导出逻辑
   */
  const executeExport = () => {
    let formArr = filterFormArr(formInline, selectStatisticsList.value, formInline.sobCodeList, selectZdyzh.value)
    let queryCondition = {
      ...formArr,
      "3.开始日期": `${formInline.startDate}`,
      "4.结束日期": `${formInline.endDate}`,
    }

    const exportLogic = () => {
      downloadLoading.value = true
      handleExportFile({
        ...formInline,
        selfAcountTree: getValueArr1(selectDataArr.value, formInline.selfAcountTree),
        queryCondition,
      })
        .then(() => {
          downloadLoading.value = false
        })
        .catch(() => {
          downloadLoading.value = false
        })
    }

    let bool = _.isEqual({ ...formInline }, searchObj.value)
    if (bool) {
      exportLogic()
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
          exportLogic()
        })
        .catch(() => {
          ElMessage({ type: "info", message: `取消导出` })
        })
    }
  }

  /**
   * 处理投资经理选择变化
   * @param {Object} params - 参数对象
   * @param {any} params.data - 节点数据
   * @param {boolean} params.checked - 是否选中
   */
  const handleSobChange = ({ data, checked }: { data: any; checked: boolean }) => {
    if (checked) {
      let arr = data.childrenPrdCodeList?.split(",") || []
      formInline.sobCodeList = [...formInline.sobCodeList, ...arr] as unknown
    } else {
      let arr = data.childrenPrdCodeList?.split(",") || []
      formInline.sobCodeList = formInline.sobCodeList.filter(item => !arr.includes(item as never))
    }
    formInline.sobCodeListLabel = getTreeLabel(
      selectTzjlAll.value,
      formInline.sobCodeList.map((item: string) => item.split("&").pop()),
    )
  }

  /**
   * 清空投资经理数据
   */
  const handleSobDataClear = () => {
    formInline.sobCodeList = [] // Hook 的 reset 会处理，但如果需要显式清空特定字段
    formInline.sobCodeListLabel = []
  }

  return {
    downLoading,
    searchLoading, // useSearch 提供的
    tableLoading, // useTable 提供的
    downloadLoading,
    treeTypeListData,
    selectInsuranceList,
    selectTzjlAll,
    selectZdyzh,
    formInline,
    tableData,
    pageData,
    tableTotal: total,
    currentPage,
    pageSize,
    initData,
    handleSearch: triggerSearch,
    handleReset: triggerReset,
    handleExport,
    handleSobChange,
    handleSobDataClear,
  }
}
