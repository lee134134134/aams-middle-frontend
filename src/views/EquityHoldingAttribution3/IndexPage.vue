<template>
  <div class="temporary-fix">
    <BaseCard :paddingBottomZero="true" customClass="search-cardFix">
      <div class="header">
        <SearchForm v-model="formInline" :disableExport="disableExport" :downloadLoading="downloadLoading" :searchLoading="searchLoading" :selectInsuranceList="selectInsuranceList" :selectTzjlAll="selectTzjlAll" :selectZdyzh="selectZdyzh" :treeTypeListData="treeTypeListData" @clearSob="handleSobClear" @download="handleExport" @reset="handleReset" @search="handleSearch" @update:sobCodeList="handleSobUpdate" />
      </div>
    </BaseCard>

    <BaseCard>
      <TitleMargin title="权益类组合持仓归因分析表" />
      <ResultTable v-model:page="currentPage" v-model:pageSize="pageSize" :data="pageData" :loading="tableLoading" :total="tableTotal" :downLoading="downLoading" />
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import BaseCard from "@/components/base/BaseCard.vue"
import TitleMargin from "@/components/TitleMargin.vue"
import SearchForm from "@/components/business/EquityHoldingAttribution/SearchForm.vue"
import ResultTable from "@/components/business/EquityHoldingAttribution/ResultTable.vue"
import { useEquityHoldingAttribution } from "@/hooks/business/useEquityHoldingAttribution"

/**
 * 权益持仓归因分析主页面
 * @name EquityHoldingAttributionIndex
 * @description 整合查询表单、结果展示表格和业务逻辑
 */
const { downLoading, searchLoading, tableLoading, downloadLoading, treeTypeListData, selectInsuranceList, selectTzjlAll, selectZdyzh, formInline, pageData, tableTotal, currentPage, pageSize, initData, handleSearch, handleReset, handleExport, handleSobChange, handleSobDataClear } = useEquityHoldingAttribution()

/**
 * 是否禁用导出按钮
 */
const disableExport = computed(() => {
  return downLoading.value
})

/**
 * 处理投资经理选择更新
 * @param {Object} payload - 事件负载
 * @param {unknown} payload.data - 数据
 * @param {unknown} payload.checked - 状态
 */
const handleSobUpdate = ({ data, checked }: { data: unknown; checked: boolean }): void => {
  handleSobChange({ data, checked })
}

/**
 * 处理清空投资经理
 */
const handleSobClear = (): void => {
  handleSobDataClear()
}

onMounted(() => {
  initData()
})
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
.temporary-fix {
  :deep(.search-cardFix) {
    padding: 14px 15px 2px !important;
  }

  :deep(.el-table td.el-table__cell div) {
    color: #666;
  }
}
</style>
