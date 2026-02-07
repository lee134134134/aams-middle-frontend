<template>
  <el-table v-loading="isLoading" :max-height="tableHeight" empty-text="请输入查询条件并点击查询" :data="getContentList1" stripe border
    style="width: 100%" ref="tableRef" :header-cell-style="{
      background: '#E4EFFF',
      color: '#333333',
      height: '38px',
    }">
    <el-table-column v-for="(item, i) in tabcolums1" :key="i" :prop="item.key" :label="item.name" :min-width="item.width"
      :sortable="item.sortable" :align="item.align" :fixed="item.fixed">
      <template #default="scope">
        {{
          (scope.row[item.key] === null || scope.row[item.key] === '')
          ? "-"
          : typeof scope.row[item.key] === "number" &&
            scope.row[item.key] !== 0
            ? formattedNumber(scope.row[item.key])
            : scope.row[item.key]
        }}
      </template>
    </el-table-column>
	<template #empty>
		<div style="display:flex;justify-content: center; align-items:center;flex-direction: column;">
			<img src="../../../assets/images/empty.png" style="height:200px;" />
			<div>请输入查询条件并点击查询</div>
		</div>
	</template>
  </el-table>
  <el-pagination v-model:current-page="pageNo1" v-model:page-size="pageSize1" :page-sizes="[10, 20, 30, 50, 100]"
    layout="->, total,jumper,prev, pager, next, sizes" :total="total1" background popper-class="select_bottom" 
	data-track-id="TeamAssets-pagination-btn" data-track-name="团队资产时序查询-分页"
	/>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { tabcolums1 } from "./common.js";
import TeamStore from "@/stores/modules/TeamAssets.js";
let _TeamStore = TeamStore();
let { pageSize1, pageNo1, total1, isLoading, getContentList1 } =
  storeToRefs(_TeamStore);

const formattedNumber = (num: any) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const tableHeight = ref(window.innerHeight - 300);

const tableRef = ref<TableInstance>();
// 获取列表数据

// //分页
// const handleSizeChange = (val : number) => {
// 	formInline.value.pageNo = 1;
// 	pageNo1.value = 1;
// 	_futureStore.handleSizeChange(1, val);
// };
// const handleCurrentChange = (val : number) => {
// 	_futureStore.handleCurrentChange(1, val);
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

  :deep(.cell) {
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