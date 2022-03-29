import { createStore } from 'vuex' // vuex
import getters from './getters.js' // 获取数据

const modulesFiles = import.meta.globEager('./modules/*.js') // 引入 modules 下所有的文件

// 不需要把模块中的文件单独引入根文件，下面封装之后会自动引入
const modules = Object.entries(modulesFiles).reduce((modules, [path, mod]) => {
    const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
    modules[moduleName] = mod.default
    return modules
}, {})


export default createStore({
    modules,
    getters
})