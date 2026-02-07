<template>
  <BaseTable :data="data" :loading="loading" :downLoading="downLoading" :total="total" v-model:page="currentPage" v-model:pageSize="currentPageSize" :height="tableHeight" @change="handleTableChange">
    <el-table-column align="left" fixed="left" label="日期" min-width="180" prop="insuranceType" show-overflow-tooltip>
      <template #default="{ row }">
        {{ row.date }}
      </template>
    </el-table-column>

    <el-table-column v-for="item in columns" :key="item.key" :align="item.align" :label="item.name" :min-width="item.width" :prop="item.key" :resizable="false" show-overflow-tooltip />
  </BaseTable>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import BaseTable from "@/components/base/BaseTable.vue"

/**
 * 权益持仓归因结果表格组件
 * @name ResultTable
 */
interface Props {
  /** 表格数据 */
  data: unknown[]
  /** 加载状态 */
  loading: boolean
  downLoading: boolean
  /** 总条数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页条数 */
  pageSize: number
}

const props = defineProps<Props>()

/**
 * 组件事件定义
 */
const emit = defineEmits([
  /** 更新页码 */
  "update:page",
  /** 更新每页条数 */
  "update:pageSize",
  /** 刷新表格 */
  "refresh",
])

/** 当前页码计算属性 */
const currentPage = computed({
  get: () => props.page,
  set: val => emit("update:page", val),
})

/** 每页条数计算属性 */
const currentPageSize = computed({
  get: () => props.pageSize,
  set: val => emit("update:pageSize", val),
})

/** 表格高度 */
const tableHeight = ref(window.innerHeight - 280)

/** 表格列定义 */
const columns = [
  {
    key: "incomeYield",
    name: "当日收益率",
    width: "180px",
    align: "right",
  },
  {
    key: "timingContribution",
    name: "择时贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "industryContributionA",
    name: "A股行业贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "stockSelectionContributionA",
    name: "A股选股贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "contributionH",
    name: "H股贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "residualContribution",
    name: "残差贡献",
    width: "180px",
    align: "right",
  },
  {
    key: "position",
    name: "仓位",
    width: "180px",
    align: "right",
  },
]

/**
 * 处理表格变化（如分页）
 * @param {Object} pagination - 分页信息
 * @param {number} pagination.page - 当前页码
 * @param {number} pagination.pageSize - 每页条数
 */
const handleTableChange = (pagination: { page: number; pageSize: number }): void => {
  emit("refresh", pagination)
}
</script>
