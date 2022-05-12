<template>
    <div class="page-container">
        <div id="main" style="width: 100%; height: 400px"></div>
    </div>
</template>

<script setup name="ceshi">
import * as echarts from 'echarts' // echarts 图表

const initJsPlumb = () => {
    var myChart = echarts.init(document.getElementById("main"))

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: {
            data: ["销量"],
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initJsPlumb()
})
</script>

<style lang="scss" scoped></style>
