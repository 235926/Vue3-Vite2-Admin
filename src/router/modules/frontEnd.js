import store from '@/store/index.js' // vuex
import { Session } from '@/utils/storage.js' // 浏览器临时缓存
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading
import { setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '@/router/index.js' // 动态路由方法


/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method store.dispatch('user/setUserInfo') 触发初始化用户信息
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export const initFrontEndControlRoutes = async () => {
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