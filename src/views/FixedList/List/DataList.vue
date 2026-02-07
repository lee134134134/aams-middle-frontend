<template>
    <el-table v-loading="isLoading" ref="tableRef" style="width: 100%" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
        :max-height="tableHeight" :data="tableData" :row-key="getRowKey" :header-cell-style="{
            background: '#E4EFFF',
            color: '#333333',
            height: '38px',
        }" border :tree-props="{ children: 'children' }" :expand-row-kes="expandedKeys"
        :row-class-name="setRowClassName" :row-style="handleRowStyle">
        <el-table-column prop="investManager" label="投资经理" min-width="230" show-overflow-tooltip align="left" fixed="left">
            <template #default="{ row }">
                <span :style="{ marginLeft: getIndent(row) + 'px' }">
                    {{ row.investManager }}
                </span>
            </template>
        </el-table-column>
        <el-table-column v-for="(item, i) in tabcolums" :key="item.key" :prop="item.key" :label="item.name"
            :fixed="item.fixed" :min-width="item.width" show-overflow-tooltip :align="item.align" :resizable="false">
            <template v-if="item.child">
                <el-table-column v-for="(items, index) in item.child" :key="items.key" :prop="items.key" :label="items.name"
                    :min-width="items.width" show-overflow-tooltip :align="items.align"
                    :resizable="false"></el-table-column>
            </template>
            <!-- <template #default="scope">
		        {{ scope.row[item.key] === null ? "-" : scope.row[item.key] }}
		    </template> -->
        </el-table-column>
        <template #empty>
            <div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
                <img src="../../../assets/images/empty.png" style="height:200px;" />
                <div>请输入查询条件并点击查询</div>
            </div>
        </template>
    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { getList, } from "@/api/FixedList.js";
import { data, sort } from "./common.js";
// 表格数据
const props = defineProps({
    tableData: {
        type: Object,
        default: [],
    },
});
const tableData = ref([]);
const tableRef = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 280);
const tabcolums = ref(data);
let isLoading = ref(false);

const emit = defineEmits(["DateListEvent", "upDataList"]);

//多选
let getRowKey = (row: any) => {
    return row.investManagerPath;
};

const expandedKeys = ref([] as any)


// 获取列表数据
let getContentList = async (obj: any) => {
    expandedKeys.value = []
    if (obj.order == "") {
        tableRef.value.clearSort();
    }
    isLoading.value = true;
    let res = await getList(obj);
    isLoading.value = false;
    if (res && res.code === '00000') {
        tableData.value = res.data || [];
        await nextTick();
        if (tableData.value.length > 0) {
            expandedKeys.value = tableData.value.filter(el => el.expand).map(item => item.investManager)
        }
        nextTick(() => {
            tableData.value.forEach(el => {
                if (el.expand) {
                    tableRef.value?.toggleRowExpansion(el, true)
                }
            })
        })
    }
};
const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
    if (row.level === 0 && (row.investManager === '合计' || row.investManager === '总计')) {
        return { fontWeight: 'bold', color: '#2173f7' }
    } else if (row.level === 0 || (row.level === 1 && row.nodeType !== '1')) {
        return { fontWeight: 'bold', color: '#666' }
    } else {
        return { color: '#666' }
    }
}
const setRowClassName = ({ row, rowIndex }) => {
    if (row.level === 0) {
        if (row.investManager !== '合计' && row.investManager !== '总计') {
            return 'changeClass11'
        }
    } else if (row.level === 1 && row.nodeType !== '1') {
        return 'changeClass22'
    }
    return ''
}


interface User {
    id: string;
    name: string;
    amount1: string;
    amount2: string;
    amount3: number;
    amount4: number;
}
interface SpanMethodProps {
    row: User;
    column: TableColumnCtx<User>;
    rowIndex: number;
    columnIndex: number;
}

// const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
//     if (row.level === 0 || (row.level === 1 && row.nodeType !== '1')) {
//         return { fontWeight: 'bold' }
//     }
// }

const getIndent = (row: any) => {
    if (row.level === 1 && row.nodeType === '1') {
        return 15
    }
    return 0
}
defineExpose({
    tableRef,
    tableData,
    getContentList
});
</script>

<style scoped lang="scss">
.btnArr {
    margin-bottom: 10px;
}

.upload-demo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.el-switch--small .el-switch__core) {
    width: 45px !important;
}

:deep(.el-table__header-wrapper .el-table__header .el-table__cell) {
    border-right: 1px solid #ddd !important;
}

:deep(.el-table__header-wrapper .el-table__header .is-center) {
    border-bottom: 1px solid #ddd !important;
}
</style>
<style>
.el-table tr.changeClass11 {
    background-color: #f2f7ff !important;
}

.el-table tr.changeClass22 {
    background-color: #fafafa !important;
}
</style>