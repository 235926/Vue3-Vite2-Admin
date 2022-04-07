<template>
    <el-card shadow="hover" class="line-chart">
        <div v-chartResize :style="{ height: height, width: width }" ref="main"></div>
    </el-card>
</template>

<script setup name="lineChart">
import * as echarts from 'echarts' // echarts 图表


// props
const props = defineProps({
    chartData: {
        type: Object,
        required: true
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '350px'
    },
})


// 定义响应式数据>
const main = ref(null) // template 主体
const state = shallowRef({
    myChart: null, // echarts 图表
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    nextTick(() => {
        initChart()
    })
})


// 监听数据变化
watch(() => [props.chartData], (newVal, oldVal) => {
    if (newVal) {
        setOptions(props.chartData)
    }
})


// 初始化 echarts
const initChart = () => {
    state.myChart = echarts.init(main.value)
    setOptions(props.chartData)
}


// echart 填充数据
const setOptions = ({ expectedData, actualData }) => {
    state.myChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
        },
        legend: {
            data: ['expected', 'actual']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#5470c6'
                }
            },
        },
        yAxis: {
            type: 'value',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#5470c6'
                }
            },
        },
        series: [
            {
                name: 'expected',
                smooth: true,
                type: 'line',
                itemStyle: {
                    color: '#FF005A',
                    lineStyle: {
                        color: '#FF005A',
                        width: 2,
                    }
                },
                animationDuration: 2800,
                animationEasing: 'cubicInOut',
                data: expectedData,
            },
            {
                type: 'line', // echart 类型
                name: 'actual', // 系列名称，用于tooltip的显示
                smooth: true, // 是否平滑曲线显示
                itemStyle: { // 折线拐点标志的样式
                    color: '#3888fa', // 图形的颜色
                },
                lineStyle: { // 线条样式
                    color: '#3888fa', // 线的颜色
                    width: 2, // 线宽
                },
                areaStyle: { // 区域填充样式。设置后显示成区域面积图
                    color: 'rgba(200,200,200,0.3)', // 颜色值要用rgba否则鼠标滑入填充色会消失
                },
                animationDuration: 2800, // 初始动画的时长
                animationEasing: 'quadraticOut', // 初始动画的缓动效果
                data: actualData, // 数据
            }
        ]
    })
}

// 组件销毁完成后执行的函数
onUnmounted(() => {
    if (!state.myChart) {
        return
    }
    state.myChart.dispose()
    state.myChart = null
})
</script>

<style lang='scss' scoped>
.line-chart {
    margin: 20px 0;
}
</style>