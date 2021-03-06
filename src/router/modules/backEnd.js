import store from '@/store/index.js' // vuex
import { formatTwoStageRoutes, formatFlatteningRoutes, router } from '@/router/index.js' // 处理嵌套数组
import { Session } from '@/utils/storage.js' // 浏览器临时缓存
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading
import { dynamicRoutes } from '@/router/modules/dynamicRoutes.js' // 动态路由表
import { notFoundAndNoPower } from '@/router/modules/staticRoutes.js' // 前端静态路由表
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
 * @method setFilterMenuAndCacheTagsViewRoutes 设置路由到  vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
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
    store.dispatch('routesList/setBackEndControlRoutes', JSON.parse(JSON.stringify(res.routes)))

    // 处理路由（component），替换 dynamicRoutes（@/router/modules/dynamicRoutes.js）第一个顶级 children 的路由
    dynamicRoutes[0].children = await backEndComponent(res.routes)

    // 添加动态路由
    await setAddRoute()

    // 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    await setFilterMenuAndCacheTagsViewRoutes()
}



/**
 * 设置路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setFilterMenuAndCacheTagsViewRoutes() {
    store.dispatch('routesList/setRoutesList', dynamicRoutes[0].children)
    setCacheTagsViewRoutes()
}



/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView 菜单搜索中：未过滤隐藏的(isHide)
 */
export function setCacheTagsViewRoutes() {
    store.dispatch('tagsView/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children)
}



/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * 处理路由格式及添加捕获所有路由或 404 Not found 路由
 * @description 替换 dynamicRoutes（@/router/modules/dynamicRoutes.js）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
    // console.log(dynamicRoutes);
    let filterRouteEnd = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
    filterRouteEnd[0].children = [...filterRouteEnd[0].children, ...notFoundAndNoPower]
    return filterRouteEnd
}



/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（@/router/modules/dynamicRoutes.js）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
    await setFilterRouteEnd().forEach((route) => {
        router.addRoute(route)
    })
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
    let keys = Object.keys(dynamicViewsModules)
    let matchKeys = keys.filter((key) => {
        if (key.startsWith('../../layout/routerView')) {
            let k = key.replace(/..\/..\/layout|../, '')
            return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
        } else {
            let k = key.replace(/..\/..\/views|../, '')
            return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
        }
    })
    if (matchKeys?.length === 1) {
        let matchKey = matchKeys[0]
        return dynamicViewsModules[matchKey]
    }
    if (matchKeys?.length > 1) {
        return false
    }
}