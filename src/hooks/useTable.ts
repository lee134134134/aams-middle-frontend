import { ref, computed } from "vue"

/**
 * 通用表格逻辑 Hook
 * @template T 表格数据类型
 * @param {Object} options 配置项
 * @param {Function} [options.api] 获取数据的 API 函数
 * @param {Object} [options.initParams] 初始查询参数
 * @param {boolean} [options.isFrontendPagination] 是否前端分页，默认为 true (根据原有逻辑)
 * @param {Function} [options.dataCallback] 数据处理回调
 * @returns {Object} 返回表格的相关状态和方法
 */
export function useTable<T = unknown>(
  options: {
    api?: (params: unknown) => Promise<unknown>
    initParams?: unknown
    isFrontendPagination?: boolean
    dataCallback?: (data: unknown) => T[]
  } = {},
) {
  const { isFrontendPagination = true } = options

  /** 表格数据 */
  const tableData = ref<T[]>([])

  /** 总条数 */
  const total = ref(0)

  /** 当前页码 */
  const currentPage = ref(1)

  /** 每页条数 */
  const pageSize = ref(10)

  /** 加载状态 */
  const loading = ref(false)

  /**
   * 前端分页后的当前页数据
   * 如果是后端分页，直接返回 tableData
   */
  const pageData = computed(() => {
    if (isFrontendPagination) {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return tableData.value.slice(start, end)
    }
    return tableData.value
  })

  /**
   * 获取列表数据
   * @param {Object} params 查询参数
   */
  const getList = async (params: unknown = {}) => {
    if (!options.api) return

    loading.value = true
    try {
      const res = await options.api({ ...options.initParams, ...params })
      if (res && res.code === "00000") {
        const rawData = res.data || []
        tableData.value = options.dataCallback ? options.dataCallback(rawData) : rawData
        total.value = isFrontendPagination ? tableData.value.length : res.total || tableData.value.length

        if (isFrontendPagination) {
          currentPage.value = 1
        }
      } else {
        tableData.value = []
        total.value = 0
      }
    } catch (e) {
      tableData.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  /**
   * 页码改变
   * @param {number} val 页码
   */
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    if (!isFrontendPagination) {
      // 后端分页需要重新请求
      // getList() // 需要外部触发或保存当前 params
    }
  }

  /**
   * 每页条数改变
   * @param {number} val 每页条数
   */
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    if (!isFrontendPagination) {
      // getList()
    }
  }

  return {
    tableData,
    pageData,
    total,
    currentPage,
    pageSize,
    loading,
    getList,
    handleCurrentChange,
    handleSizeChange,
  }
}
