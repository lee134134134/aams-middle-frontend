import { reactive, ref } from "vue"

/**
 * 通用搜索逻辑 Hook
 * @template T 表单模型类型
 * @param {T} initialModel 初始表单模型
 * @param {Function} [onSearch] 搜索回调
 * @param {Function} [onReset] 重置回调
 * @return {Object} 返回搜索相关的状态和方法
 */
export function useSearch<T extends Record<string, unknown>>(initialModel: T, onSearch?: (model: T) => void, onReset?: () => void) {
  /** 搜索加载状态 */
  const searchLoading = ref(false)
  const downLoading = ref(true)

  /** 表单模型 */
  const formModel = reactive({ ...initialModel }) as T

  /** 初始状态备份（用于重置） */
  let initialSnapshot = ''
  
  const setInitialSnapshot = (model: T): void => {
    initialSnapshot = JSON.parse(JSON.stringify(model))
  }

  /**
   * 执行搜索
   */
  const handleSearch = async () => {
    searchLoading.value = true
    try {
      if (onSearch) {
        await onSearch(formModel)
        downLoading.value = false
      }
    } finally {
      searchLoading.value = false
    }
  }

  /**
   * 重置表单
   */
  const handleReset = () => {
    Object.keys(formModel).forEach(key => {
      formModel[key] = initialSnapshot[key]
    })

    if (onReset) {
      onReset()
    }
  }

  return {
    searchLoading,
    downLoading,
    formModel,
    handleSearch,
    handleReset,
    setInitialSnapshot,
  }
}
