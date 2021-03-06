import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入 ElementPlus UI 库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局使用 ElementPlus 自带的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 引入 自定义的scss文件
import '@/assets/scss/index.scss'

// 引入路由
import router from '@/router/index.js'

// 引入 vuex，pinia 状态管理
import store from '@/store/index.js'
import pinia from '@/pinia/index.js'

// 引入自定义指令
import { loadDirectives } from '@/directive/index.js'
loadDirectives(app)

// 引入 svg 图标注册脚本
import 'virtual:svg-icons-register'

// 同级组件传值
import mitt from 'mitt'

// 引入进度条插件
import '@/plugin/nprogress.js'

// 注册全局组件
import * as Components from '@/plugin/global-components.js'
Object.entries(Components).forEach(([key, component]) => {
    app.component(key, component)
})

import VueGridLayout from 'vue-grid-layout' // 拖拽布局插件

app.use(router).use(store).use(pinia).use(ElementPlus).use(VueGridLayout)
app.mount('#app')

// 同级组件传值
app.config.globalProperties.mittBus = mitt()