import chartResize from './chartResize/index.js' // echarts 自适应


// 自定义的指令
const directive = {
    chartResize
}


export function loadDirectives(app) {
    Object.keys(directive).forEach((key) => {
        app.directive(key, directive[key])
    })
}