import store from '@/store/index.js' // vuex
import { Session } from '@/utils/storage.js' // 浏览器临时缓存
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading
import { setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '@/router/index.js' // 动态添加路由方法
import { dynamicRoutes } from '@/router/modules/dynamicRoutes.js' // 动态路由表
import { generateRoutes } from '@/api/user.js' // 获取后端路由菜单 api



/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const layouModules = import.meta.glob('../../layout/routerView/*.{vue,tsx}');
const viewsModules = import.meta.glob('../../views/**/*.{vue,tsx}')
const dynamicViewsModules = Object.assign({}, { ...layouModules }, { ...viewsModules })



/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method NextLoading 界面 loading 动画开始执行
 * @method store.dispatch('user/setUserInfo') 触发初始化用户信息
 * @method store.dispatch('requestRoutes/setBackEndRoutes') 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export const initBackEndControlRoutes = async () => {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()

    // 无 token 停止执行下一步
    if (!Session.get('token')) return false

    // 触发初始化用户信息
    store.dispatch('user/setUserInfo')

    // 获取路由菜单数据
    const res = await getBackEndControlRoutes()

    // 存储接口原始路由（未处理component），根据需求选择使用
    store.dispatch('routesList/setBackEndControlRoutes', JSON.parse(JSON.stringify(res.data.routes)))

    // 处理路由（component），替换 dynamicRoutes（@/router/modules/dynamicRoutes.js）第一个顶级 children 的路由
    dynamicRoutes[0].children = await backEndComponent(res.data.routes)

    // 添加动态路由
    await setAddRoute()

    // 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    setFilterMenuAndCacheTagsViewRoutes()
}


/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export const getBackEndControlRoutes = () => {
    return generateRoutes()
}



/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export const backEndComponent = (routes) => {
    if (!routes) return
    return routes.map((item) => {
        if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component)
        item.children && backEndComponent(item.children)
        return item
    })
}



/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export const dynamicImport = (dynamicViewsModules, component) => {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace(/..\/..\/views|../, '')
        return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
    })
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0]
        return dynamicViewsModules[matchKey]
    }
    if (matchKeys?.length > 1) {
        return false
    }
}