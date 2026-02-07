<template>
  <el-card :body-class="['base-card-body', customClass]" :body-style="bodyStyle" class="base-card">
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue"

/**
 * 基础卡片组件
 * @name BaseCard
 */
const props = defineProps({
  /**
   * 自定义类名
   */
  customClass: {
    type: String,
    default: "",
  },
  /**
   * 是否将底部内边距设为0
   */
  paddingBottomZero: {
    type: Boolean,
    default: false,
  },
})

/**
 * 计算卡片体样式
 * @returns {Object} 样式对象
 */
const bodyStyle = computed(() => {
  return props.paddingBottomZero ? { paddingBottom: "0px" } : {}
})
</script>

<style lang="scss" scoped>
.base-card {
  margin-bottom: 8px;
}
:deep(.base-card-body) {
  // 保持原有样式的兼容性
  &.search-cardFix {
    padding: 14px 15px 2px !important;
  }
}
</style>
