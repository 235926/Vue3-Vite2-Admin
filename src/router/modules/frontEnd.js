import store from '@/store/index.js' // vuex
import { formatTwoStageRoutes, formatFlatteningRoutes, router } from '@/router/index.js' // 处理嵌套数组
import { Session } from '@/utils/storage.js' // 浏览器临时缓存
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading
import { dynamicRoutes } from '@/router/modules/dynamicRoutes.js' // 动态路由表
import { notFoundAndNoPower } from '@/router/modules/staticRoutes.js' // 前端静态路由表



/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method NextLoading 界面 loading 动画开始执行
 * @method store.dispatch('user/setUserInfo') 触发初始化用户信息
 * @method store.dispatch('requestRoutes/setBackEndRoutes') 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initFrontEndControlRoutes() {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()

    // 无 token 停止执行下一步
    if (!Session.get('token')) return false

    // 触发初始化用户信息
    store.dispatch('user/setUserInfo')

    // 添加动态路由
    await setAddRoute()

    // 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    await setFilterMenuAndCacheTagsViewRoutes()
}



/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（@/router/modules/staticRoutes.js）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
    await setFilterRouteEnd().forEach((route) => {
        router.addRoute(route)
    })
}



/**
 * 删除/重置路由
 * @method router.removeRoute
 * @description 此处循环为 dynamicRoutes（@/router/modules/staticRoutes.js）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#push
 */
export async function frontEndsResetRoute() {
    await setFilterRouteEnd().forEach((route) => {
        const routeName = route.name
        router.hasRoute(routeName) && router.removeRoute(routeName)
    })
}



/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @description 替换 dynamicRoutes（@/router/modules/staticRoutes.js）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
    let filterRouteEnd = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
    filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), ...notFoundAndNoPower]
    return filterRouteEnd;
}



/**
 * 获取当前用户权限标识去比对路由表（未处理成多级嵌套路由）
 * @description 这里主要用于动态路由的添加，router.addRoute
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param chil dynamicRoutes（/@/router/route）第一个顶级 children 的下路由集合
 * @returns 返回有当前用户权限标识的路由数组
 */
export function setFilterRoute(chil) {
    const userInfo = store.getters.userInfo
    let filterRoute = []
    chil.forEach((route) => {
        if (route.meta.roles) {
            route.meta.roles.forEach((metaRoles) => {
                userInfo.roles.forEach((roles) => {
                    if (metaRoles === roles) filterRoute.push({ ...route })
                })
            })
        }
    })
    return filterRoute
}



/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHidden)
 */
export function setCacheTagsViewRoutes() {
    // 获取有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
    const userInfo = store.getters.userInfo
    let rolesRoutes = setFilterHasRolesMenu(dynamicRoutes, userInfo.roles)
    // 添加到 vuex setTagsViewRoutes 中
    store.dispatch('tagsView/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes))[0].children)
}



/**
 * 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHidden)
 */
export function setFilterMenuAndCacheTagsViewRoutes() {
    const userInfo = store.getters.userInfo
    store.dispatch('routesList/setRoutesList', setFilterHasRolesMenu(dynamicRoutes[0].children, userInfo.roles))
    setCacheTagsViewRoutes()
}



/**
 * 判断路由 `meta.roles` 中是否包含当前登录用户权限字段
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @param route 当前循环时的路由项
 * @returns 返回对比后有权限的路由项
 */
export function hasRoles(roles, route) {
    if (route.meta && route.meta.roles) return roles.some((role) => route.meta.roles.includes(role))
    else return true
}



/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @param routes 当前路由 children
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
export function setFilterHasRolesMenu(routes, roles) {
    const menu = []
    routes.forEach((route) => {
        const item = { ...route }
        if (hasRoles(roles, item)) {
            if (item.children) item.children = setFilterHasRolesMenu(item.children, roles)
            menu.push(item)
        }
    })
    return menu
}