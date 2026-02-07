<template>
    <el-tab-pane v-bind="$attrs">
        <template #label>
            <el-tooltip :content="tootip" placement="bottom-start" effect="light" popper-class="custom-tootip1">
                <span>{{ label }}</span>
            </el-tooltip>
        </template>
        <slot></slot>
    </el-tab-pane>
</template>
<script setup>
defineProps({
    label: String,
    tootip: String
})
</script>

<style lang="scss">
.custom-tootip1 {
    background-color: white !important;
    color: #2173F7 !important;
}
</style>