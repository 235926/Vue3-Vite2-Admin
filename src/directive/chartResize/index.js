import elementResizeDetectorMaker from "element-resize-detector" // 获取DOM元素宽高
import * as echarts from 'echarts' // echarts


// 判断提示语
if (!elementResizeDetectorMaker) {
    throw new Error('你应该安装 `element-resize-detector` 插件 ')
}

let erd = elementResizeDetectorMaker() // 定义实例
const chartResize = {
    // 仅调用一次，当指令第一次绑定元素的时候
    beforeMount(el) {
        nextTick(() => {
            erd.listenTo(el, function (element) {
                let width = element.offsetWidth
                let height = element.offsetHeight
                let chart = echarts.getInstanceByDom(el)
                if (width || height) {
                    if (!chart) {
                        return
                    }
                    // 防抖，避免多次加载
                    myChartResize(chart)
                }
            })
        })
    },
    // 当指令卸载后调用，仅调用一次
    unmounted(el) {
        erd.uninstall(el)
    }
}


// 添加防抖函数，监听图表容器的大小并改变图表大小
// 暂时没加防抖
const myChartResize = (chart) => {
    chart.resize()
}


export default chartResize