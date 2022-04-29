import chartResize from './chartResize/index.js' // echarts 自适应
import waves from './waves/index.js' // echarts 自适应


// 引入自定义的指令
const directive = {
    chartResize, waves
}


// 全局注册自定义指令
export function loadDirectives(app) {
    Object.keys(directive).forEach((key) => {
        app.directive(key, directive[key])
    })
}