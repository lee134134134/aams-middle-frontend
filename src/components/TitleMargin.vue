<template>
  <div class="title">
    <h6>
      {{ title }}
    </h6>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.title {
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0px 12px 0px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;

  h6 {
    font-size: 16px;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 14px;
    color: #787878;
  }
}
</style>
