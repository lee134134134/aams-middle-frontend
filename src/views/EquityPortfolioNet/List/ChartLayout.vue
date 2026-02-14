<template>
  <div v-loading="isLoading" class="chart-container">
    <v-chart ref="sizeChartRef" class="chart-box" :option="sizeOption" autoresize @legendselectchanged="onLegendSizeChange"></v-chart>
    <v-chart ref="timeChartRef" class="chart-box" :option="timeOption" autoresize @legendselectchanged="onLegendTimeChange"></v-chart>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, Ref, ref } from "vue"
import VChart from "vue-echarts"

const isLoading = inject<Ref<boolean>>("pageLoading")
const pageData = inject<Ref<Record<string, unknown> | unknown[] | null | undefined>>("pageData")
const tabsName = inject<Ref<string>>("tabsName")
const sizeChartRef = ref(null)
const timeChartRef = ref(null)
const sizeOption = computed(() => {
  const data = pageData.value?.[tabsName.value]?.sizeWeightEchartsData
  if (!data) return {}
  const option = getOption("规模加权", data.xaxis, data.series[2].data, data.series[3].data, data.series[0].data, data.series[1].data)
  return option
})

const timeOption = computed(() => {
  const data = pageData.value?.[tabsName.value]?.timeWeightEchartsData
  if (!data) return {}
  const option = getOption("时间加权", data.xaxis, data.series[2].data, data.series[3].data, data.series[0].data, data.series[1].data)
  return option
})

const colorMap = {
  "累计超额收益率（规模加权）": "#f2ba00",
  "组合累计收益率（规模加权）": "#4673cb",
  基准累计收益率: "#ef7000",
  "累计回撤序列（规模加权）": "#76be42",
}

const selectedStatus = ref({
  "累计超额收益率（规模加权）": true,
  "组合累计收益率（规模加权）": true,
  基准累计收益率: true,
  "累计回撤序列（规模加权）": true,
})

const selectedTimeStatus = ref({
  "累计超额收益率（规模加权）": true,
  "组合累计收益率（规模加权）": true,
  基准累计收益率: true,
  "累计回撤序列（规模加权）": true,
})
// 获取图表参数
const getOption = (title: string, dates: Array<unknown>, portfolioReturn: Array<unknown>, benchmarkReturn: Array<unknown>, excessReturn: Array<unknown>, drawdown: Array<unknown>): void => ({
  title: {
    text: "{a|}{s|}{t|" + title + "}",
    left: 16,
    top: 6,
    lineHeight: 20,
    textStyle: {
      rich: {
        a: {
          backgroundColor: "#2173f7",
          width: 5,
          height: 20,
          borderRadius: 5,
          verticalAlign: "middle",
        },
        s: {
          width: 4,
        },
        t: {
          fontSize: 16,
          fontWeight: "600",
          color: "#333333",
          padding: [4, 0, 0, 0],
          verticalAlign: "middle",
        },
      },
    },
  },
  dataZoom: [
    {
      type: "slider", // 滑动条类型
      show: true, // 显示滑动条
      xAxisIndex: [0], // 作用于第一个 xAxis
      start: 0,
      end: 100, // 初始化展示范围：100%
      bottom: "10", // 距离底部的距离
      height: 20, // 组件高度
      handleSize: "80%", // 两侧手柄的大小
      textStyle: {
        color: "#999", // 两侧日期文字的颜色
      },
    },
    {
      type: "inside", // 内置于坐标系内，支持鼠标滚轮缩放和鼠标拖拽
      xAxisIndex: [0],
      start: 0,
      end: 100,
    },
  ],
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    formatter: function (params: unknown[]) {
      let res = `${params[0].name}<br/>`
      params.forEach(item => {
        const targetColor = colorMap[item.seriesName]
        const marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${targetColor};"></span>`
        const val = (item.value * 1).toFixed(2) + "%"
        res += `${marker} ${item.seriesName}: <span style="font-weight:bold;float:right;margin-left:15px;">${val}</span><br/>`
      })
      return res
    },
  },
  legend: [
    {
      top: "20",
      left: "center",
      itemWidth: 20,
      itemHeight: 1,
      itemGap: 20,
      icon: "none",
      selectedMode: true,
      inactiveColor: "#ccc",
      formatter: name => {
        const isSelected = title === "规模加权" ? selectedStatus.value[name] : selectedTimeStatus.value[name]
        const suffix = isSelected ? "" : "Inactive"
        if (name === "累计超额收益率（规模加权）") {
          return `{excessIcon${suffix}|}{nameText|${name}}`
        }
        if (name === "组合累计收益率（规模加权）") {
          return `{drawdownIcon${suffix}|}{nameText|${name}}`
        }
        if (name === "基准累计收益率") {
          return `{lineIcon${suffix}|}{nameText|${name}}`
        }
        if (name === "累计回撤序列（规模加权）") {
          return `{blockIcon${suffix}|}{nameText|${name}}`
        }
        return name
      },
      textStyle: {
        rich: {
          nameText: { fontSize: 12, padding: [0, 0, 0, 5] },
          excessIcon: { width: 12, height: 4, backgroundColor: "#f2ba00", verticalAlign: "middle" },
          excessIconInactive: { width: 12, height: 4, backgroundColor: "#ccc", verticalAlign: "middle" },
          drawdownIcon: { width: 12, height: 1, backgroundColor: "#4673cb", verticalAlign: "middle" },
          drawdownIconInactive: { width: 12, height: 1, backgroundColor: "#ccc", verticalAlign: "middle" },
          lineIcon: { width: 12, height: 1, backgroundColor: "#ef7000", verticalAlign: "middle" },
          lineIconInactive: { width: 12, height: 1, backgroundColor: "#ccc", verticalAlign: "middle" },
          blockIcon: { width: 12, height: 4, backgroundColor: "#76be42", verticalAlign: "middle" },
          blockIconInactive: { width: 12, height: 4, backgroundColor: "#ccc", verticalAlign: "middle" },
        },
      },
      data: [{ name: "组合累计收益率（规模加权）" }, { name: "基准累计收益率" }, { name: "累计超额收益率（规模加权）" }, { name: "累计回撤序列（规模加权）" }],
    },
  ],
  grid: {
    left: "50", // 左边的宽度
    right: "50", // 右边的宽度
    top: "18%",
    bottom: "16%",
    containLabel: false,
  },
  xAxis: {
    type: "category",
    data: dates,
    axisLabel: {
      rotate: 0,
      interval: "auto",
      color: "#333",
      hideOverlap: true,
    },
    axisLine: { lineStyle: { color: "#ccc" } },
  },
  yAxis: [
    {
      type: "value",
      name: "",
      scale: true,
      axisLabel: { formatter: (value: number) => value + "%" },
      splitLine: { show: true, lineStyle: { type: "dashed" } },
    },
    {
      type: "value",
      name: "",
      scale: true,
      axisLabel: { formatter: (value: number) => value + "%" },
      splitLine: { show: true, lineStyle: { type: "dashed" } }, // 隐藏右侧坐标轴的网格线，避免混乱
    },
  ],
  series: [
    {
      name: "组合累计收益率（规模加权）",
      type: "line",
      symbol: "none",
      lineStyle: { color: "#4673cb", width: 2 },
      data: portfolioReturn,
      yAxisIndex: 0,
    },
    {
      name: "基准累计收益率",
      type: "line",
      symbol: "none",
      lineStyle: { color: "#ef7000", width: 2 },
      data: benchmarkReturn,
      yAxisIndex: 0,
    },
    {
      name: "累计超额收益率（规模加权）",
      type: "line",
      symbol: "none",
      areaStyle: { color: "#f2ba00", opacity: 1 },
      lineStyle: { width: 0 },
      data: excessReturn,
      yAxisIndex: 0,
    },
    {
      name: "累计回撤序列（规模加权）",
      type: "line",
      symbol: "none",
      areaStyle: { color: "#76be42", opacity: 1 },
      lineStyle: { width: 0 },
      data: drawdown,
      yAxisIndex: 1,
    },
  ],
})

const onLegendSizeChange = (params): void => {
  selectedStatus.value = params.selected

  nextTick(() => {
    if (sizeChartRef.value) {
      const lastOption = sizeOption.value
      sizeChartRef.value.setOption(lastOption)
    }
  })
}

const onLegendTimeChange = (params): void => {
  selectedTimeStatus.value = params.selected

  nextTick(() => {
    if (timeChartRef.value) {
      const lastOption = timeOption.value
      timeChartRef.value.setOption(lastOption)
    }
  })
}
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f2f7ff;
}

.chart-box {
  width: 100%;
  height: 360px;
  background-color: #ffffff;
  border-radius: 4px;
}
</style>
