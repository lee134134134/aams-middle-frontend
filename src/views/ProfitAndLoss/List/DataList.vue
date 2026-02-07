<template>
    <el-table v-loading="isLoading" ref="tableRef" style="width: 100%" show-overflow-tooltip empty-text="请输入查询条件并点击查询"
        :max-height="tableHeight" :data="tableData"  :header-cell-style="{
            background: '#E4EFFF',
            color: '#333333',
            height: '38px',
        }" border :span-method="arraySpanMethod" :row-style="handleRowStyle" stripe :row-class-name="rowClassName">
		<el-table-column prop="assetCategory" label="资产大类" fixed="left" :min-width="150" show-overflow-tooltip align="left"
		    class-name="customBold" :resizable="false">
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
                <div v-if="downloadBool">请输入查询条件并点击查询</div>
				<div v-else>暂无数据</div>
            </div>
        </template>
    </el-table>
</template>
  
<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { getList, } from "@/api/ProfitAndLoss.js";
import { data } from "./common.js";
// 表格数据
const props = defineProps({
    tableData: {
        type: Object,
        default: [],
    },
	downloadBool:{
		type: Boolean,
		default: true,
	}
});
let formInline = ref({
    pageSize: 10,
    pageNo: 1,
});
const total = ref(0);
const tableData = ref([]);
const tableRef = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 270);
const tabcolums = ref(data);
let isLoading = ref(false);
// 获取列表数据
let getContentList = async (obj: any) => {
    if (obj.order == "") {
        tableRef.value.clearSort();
    }
    isLoading.value = true;
    let res = await getList(obj);
    isLoading.value = false;
    if (res && res.code === '00000') {
        tableData.value = res.data || [];
    }
};


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


const spanMap = computed(() => {
    const map = new Map<number, number>();
    let currentA: string | null = null;
    let startIndex = 0;
    tableData.value.forEach((row, index) => {
        if (row.assetCategory !== currentA) {
            currentA = row.assetCategory;
            startIndex = index;
            map.set(startIndex, 1);
        } else {
            map.set(startIndex, map.get(startIndex)! + 1)
        }
    })
    return map
})

const arraySpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (row.assetCategory === row.assetSubcategory) {
        if (columnIndex === 0) {
            return [1, 2]
        } else if (columnIndex === 1) {
            return [0, 0]
        }
    }
    if (columnIndex === 0) {
        for (const [start, count] of spanMap.value.entries()) {
            if (rowIndex >= start && rowIndex < start + count) {
                return rowIndex === start ? [count, 1] : [0, 0]
            }
        }
    }

    return [1, 1]
};

const handleRowStyle = ({ row, rowIndex }: SpanMethodProps) => {
    let isBold = ["流动性小计", "固定收益类小计", "权益类小计", "不动产类小计", "其他金融产品类小计", "其他资产小计", "管理规模合计", "净资产合计"]
    if (isBold.includes(row.assetCategory)) {
        return { fontWeight: 'bold' }
    }
	let isNoBold = ["减：正回购","减：其他应付款-其他","减：其他负债"]
	if (isNoBold.includes(row.assetClass)) {
	    return { fontWeight: 'normal' }
	}
}
const rowClassName = ({ row, rowIndex }: SpanMethodProps) => {
    if (row.assetCategory === "资产合计" || row.assetCategory === "管理规模合计" || row.assetCategory === "净资产合计") {
        return 'customColor'
    }
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

:deep(.customColor) {
    .cell {
        color: #2173F7 !important;
        font-weight: 600;
    }
}
:deep(.customBold) {
    font-weight: 600;
}
:deep(.el-table__body tbody .el-table__row:nth-last-child(3) td.customBold),
:deep(.el-table__body tbody .el-table__row:nth-last-child(4) td.customBold),
:deep(.el-table__body tbody .el-table__row:nth-last-child(5) td.customBold){
	font-weight: normal !important;
}
</style>