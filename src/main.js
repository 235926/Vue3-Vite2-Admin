import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入 ElementPlus UI 库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 自定义的scss文件
import '@/assets/scss/index.scss'

// 引入路由
import router from '@/router/index.js'

// 引入 vuex store
import store from '@/store/index.js'

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

app.use(router).use(store).use(ElementPlus)
app.mount('#app')

// 同级组件传值
app.config.globalProperties.mittBus = mitt()