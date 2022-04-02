<template>
    <div class="dashboard">
        <!-- 面板部分 -->
        <PanelGroup @handleSetLineChartData="handleSetLineChartData" />

        <!-- 折线图 -->
        <line-chart :chartData="state.chartData" />
    </div>
</template>

<script setup name="dashboard">
import PanelGroup from './component/panelGroup.vue' // 面板部分
import LineChart from './component/lineChart.vue' // 折线图


// 折线图数据
const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
}


// 定义响应式数据>
const state = reactive({
    chartData: lineChartData.newVisitis
})


// 调用子组件切换折线图数据
const handleSetLineChartData = (type) => {
    state.chartData = lineChartData[type]
}
</script>

<style lang='scss' scoped>
.dashboard {
    overflow: hidden;
}
</style>