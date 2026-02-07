<template>
  <el-form ref="ruleFormRef" :inline="true" :model="formModel" :rules="rules" class="demo-form-inline" label-position="left" label-width="80px">
    <el-row class="flex-box" :gutter="48">
      <!-- 账户类型 -->
      <el-col :span="6">
        <el-form-item label="账户类型" prop="treeType">
          <el-select v-model="formModel.treeType" placeholder="请选择账户类型" popper-class="custom-select" style="width: 100%" @change="handleTreeTypeChange">
            <el-option v-for="(item, i) in treeTypeListData" :key="i" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <!-- 自定义账户 -->
      <el-col :span="formModel.treeType == '4' ? 6 : 0">
        <el-form-item v-show="formModel.treeType == '4'" :rules="{ required: formModel.treeType == '4', message: '', trigger: ['blur', 'change'] }" class="margin-12" label="账户名称" prop="selfAcountTree">
          <el-tree-select v-model="formModel.selfAcountTree" :data="selectZdyzh" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择自定义账户" />
        </el-form-item>
      </el-col>

      <!-- 险种 -->
      <el-col :span="formModel.treeType == '2' ? 6 : 0">
        <el-form-item v-show="formModel.treeType == '2'" :rules="{ required: formModel.treeType == '2', message: '', trigger: ['blur', 'change'] }" label="账户名称" prop="insuranceType">
          <el-tree-select v-model="formModel.insuranceType" :data="selectInsuranceList" :max-collapse-tags="1" :render-after-expand="false" class="custom-checkbox" clearable collapse-tags filterable multiple node-key="value" placeholder="请选择险种" show-checkbox style="width: 100%" />
        </el-form-item>
      </el-col>

      <!-- 投资经理 -->
      <el-col :span="formModel.treeType == '1' ? 6 : 0">
        <el-form-item v-show="formModel.treeType == '1'" :rules="{ required: formModel.treeType == '1', message: '', trigger: ['blur', 'change'] }" label="账户名称" prop="sobCodeList">
          <el-select class="col-width-type" v-model="formModel.sobCodeListLabel" :filter-method="onQueryChanged" :max-collapse-tags="1" :render-after-expand="false" clearable collapse-tags filterable multiple placeholder="请选择投资经理" popper-class="custom-select-sob" style="width: 100%" @clear="handleClearSob">
            <template #empty>
              <el-tree-v2 ref="treeRef" :data="selectTzjlAll" :default-expanded-all="true" :filter-method="filterMethod" :highlight-current="true" :props="treeProps" show-checkbox @check-change="handleTreeCheckChange" />
            </template>
          </el-select>
        </el-form-item>
      </el-col>

      <!-- 开始日期 -->
      <el-col :span="6">
        <el-form-item class="start_time" label="开始日期" prop="startDate" style="width: 100%">
          <el-date-picker class="col-width-type" v-model="formModel.startDate" :clearable="false" :disabled-date="disabledDateStart" :editable="false" placeholder="请选择开始日期" style="width: 100%" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
      </el-col>

      <!-- 结束日期 -->
      <el-col :span="6">
        <el-form-item label="结束日期" prop="endDate" style="width: 100%">
          <el-date-picker class="col-width-type" v-model="formModel.endDate" :clearable="false" :disabled-date="disabledDateEnd" :editable="false" placeholder="请选择结束日期" style="width: 100%" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 按钮组 -->
    <div class="subBtn">
      <el-form-item class="margin-12">
        <el-button :loading="searchLoading" class="button-custom color-button" icon="Search" type="primary" @click="onSubmit"> 查询 </el-button>
        <el-button class="button-custom" icon="RefreshLeft" @click="onReset">重置</el-button>
        <el-button :disabled="disableExport" :loading="downloadLoading" class="button-custom" icon="Download" @click="onDownload"> 导出 </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import type { FormInstance, ElTreeV2 } from "element-plus"

/**
 * 权益持仓归因查询表单组件
 * @name SearchForm
 */
interface Props {
  /** 表单数据模型 */
  modelValue: unknown
  /** 账户类型列表数据 */
  treeTypeListData: unknown[]
  /** 自定义账户选项数据 */
  selectZdyzh: unknown[]
  /** 险种列表数据 */
  selectInsuranceList: unknown[]
  /** 投资经理树形数据 */
  selectTzjlAll: unknown[]
  /** 查询加载状态 */
  searchLoading: boolean
  /** 导出加载状态 */
  downloadLoading: boolean
  /** 是否禁用导出 */
  disableExport: boolean
}

const props = defineProps<Props>()

/**
 * 组件事件定义
 */
const emit = defineEmits([
  /** 更新表单数据模型 */
  "update:modelValue",
  /** 触发查询 */
  "search",
  /** 触发重置 */
  "reset",
  /** 触发导出 */
  "download",
  /** 更新投资经理选中列表 */
  "update:sobCodeList",
  /** 更新投资经理选中标签 */
  "update:sobCodeListLabel",
  /** 清空投资经理选择 */
  "clearSob",
])

/** 表单模型计算属性 */
const formModel = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val),
})

const ruleFormRef = ref<FormInstance>()
const treeRef = ref<InstanceType<typeof ElTreeV2>>()

/** 表单验证规则 */
const rules = {
  treeType: [{ required: true, message: "", trigger: ["blur", "change"] }],
  startDate: [{ required: true, message: "", trigger: "change" }],
  endDate: [{ required: true, message: "", trigger: "change" }],
}

const treeProps = {
  value: "value",
  label: "label",
  children: "children",
}

/**
 * 将日期转换为时间戳
 * @param {any} date - 日期对象或字符串
 * @returns {number} 时间戳
 */
const dateVal = (date: unknown): number => {
  return Date.parse(new Date(date) as unknown)
}

/**
 * 禁用结束日期逻辑
 * @param {any} time - 当前日期
 * @returns {boolean} 是否禁用
 */
const disabledDateEnd = (time: unknown): boolean => {
  if (formModel.value.startDate) {
    return time.getTime() < dateVal(formModel.value.startDate)
  }
  return false
}

/**
 * 禁用开始日期逻辑
 * @param {any} time - 当前日期
 * @returns {boolean} 是否禁用
 */
const disabledDateStart = (time: unknown): boolean => {
  if (formModel.value.endDate) {
    return time.getTime() > dateVal(formModel.value.endDate) - 86400000
  }
  return false
}

/**
 * 投资经理树过滤方法
 * @param {string} query - 搜索关键词
 */
const onQueryChanged = (query: string): void => {
  treeRef.value?.filter(query)
  if (!query) {
    // 假设有 getCheckedKeys 方法，需要验证 ElTreeV2 的 API
    // treeRef.value!.setExpandedKeys(treeRef.value?.getCheckedKeys())
  }
}

/**
 * 树节点过滤逻辑
 * @param {string} query - 搜索关键词
 * @param {unknown} node - 树节点数据
 * @returns {boolean} 是否匹配
 */
const filterMethod = (query: string, node: unknown): boolean => node.label?.includes(query)

/**
 * 投资经理树选中状态改变处理
 * @param {unknown} data - 节点数据
 * @param {boolean} checked - 是否选中
 */
const handleTreeCheckChange = (data: unknown, checked: boolean): void => {
  // 这里需要父组件处理逻辑，或者在这里处理后 emit
  // 为了简化，这里 emit 一个自定义事件，让父组件处理具体的业务逻辑
  emit("update:sobCodeList", { data, checked })
}

/**
 * 清空投资经理选择处理
 */
const handleClearSob = (): void => {
  emit("clearSob")
  treeRef.value?.setCheckedKeys([])
  treeRef.value?.setExpandedKeys([])
}

/**
 * 账户类型切换处理
 */
const handleTreeTypeChange = (): void => {
  // 可以在这里处理类型切换时的清空逻辑，或者由父组件监听
}

/**
 * 提交查询
 */
const onSubmit = (): void => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(valid => {
    if (valid) {
      emit("search")
    }
  })
}

/**
 * 重置表单
 */
const onReset = (): void => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
  treeRef.value?.setCheckedKeys([])
  treeRef.value?.setExpandedKeys([])
  emit("reset")
}

/**
 * 导出数据
 */
const onDownload = (): void => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(valid => {
    if (valid) {
      emit("download")
    }
  })
}
</script>

<style lang="scss" scoped>
.flex-box {
  width: calc(100% - 260px);

  :deep(.el-form-item__label) {
    margin-right: 35px;
  }
}

:deep(.el-form--inline.el-form--label-top) {
  justify-content: space-between;
}

.subBtn {
  position: absolute;
  right: 16px;
  bottom: 2px;
  display: flex;
  align-items: end;

  :deep(.el-form-item) {
    margin-right: 0px !important;
  }

  .button-custom {
    width: 76px;
  }
}

:deep(.el-input__wrapper) {
  position: relative;
  .el-input__suffix {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.demo-form-inline {
  position: relative;

  :deep(.el-form-item) {
    width: 100%;
    margin-bottom: 8px !important;
  }
}
</style>
