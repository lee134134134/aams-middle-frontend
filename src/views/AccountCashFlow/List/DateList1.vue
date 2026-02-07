<template>
  <el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="getContentList2" stripe border
    style="width: 100%" ref="tableRef" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }">
    <el-table-column v-for="(item, i) in tabcolums2" :key="i" :prop="item.key" :label="item.name" :min-width="item.width"
      :sortable="item.sortable"  :align="item.align" :show-overflow-tooltip="item.tooltip">
     <!-- <template #default="scope">
        <div class="cell-content-scope">{{
          (scope.row[item.key] === null || scope.row[item.key] === '')
          ? "-"
          : typeof scope.row[item.key] === "number" &&
            scope.row[item.key] !== 0
            ? formattedNumber(scope.row[item.key])
            : scope.row[item.key]
        }}</div>
      </template> -->
    </el-table-column>
	<template #empty>
		<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
			<img src="../../../assets/images/empty.png" style="height:200px;" />
			<div>请输入查询条件并点击查询</div>
		</div>
	</template>
  </el-table>
  <el-pagination v-model:current-page="pageNo2" v-model:page-size="pageSize2" :page-sizes="[10, 20, 30, 50, 100]"
    layout="->, total,jumper,prev, pager, next, sizes" :total="total2" background popper-class="select_bottom" 
	data-track-id="AccountCashFlow-pagination-btn1" data-track-name="账户现金流预测-品种明细-分页"
	/>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { tabcolums2 } from "./common.js";
import futureStore from "@/stores/modules/FutureCashFlowForecast.js";
let _futureStore = futureStore();
let { pageSize2, pageNo2, total2, isLoading, getContentList2 } =
  storeToRefs(_futureStore);

const formattedNumber = (num: any) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const tableRef = ref<TableInstance>();
const tableHeight = ref(window.innerHeight - 300);
// 获取列表数据

//分页
// const handleSizeChange = (val : number) => {
// 	formInline.value.pageNo = 1;
// 	pageNo2.value = 1;
// 	_futureStore.handleSizeChange(2, val);
// };
// const handleCurrentChange = (val : number) => {
// 	_futureStore.handleCurrentChange(2, val);
// };

defineExpose({
  tableRef,
});
</script>

<style scoped lang="scss">
.btnArr {
  margin: 10px 0;
}

.el-table {
  margin-bottom: 10px;
  :deep(tr td:nth-child(1) .cell) {
    // text-align: left;
    white-space: pre-wrap;
  }
}

.upload-demo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
