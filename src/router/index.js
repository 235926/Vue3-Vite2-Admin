import { createRouter, createWebHashHistory } from 'vue-router' // 路由
import store from '@/store/index.js' // vuex
import { Session } from '@/utils/storage.js' // 浏览器存储
import { staticRoutes } from './modules/staticRoutes.js' // 静态路由
import { initFrontEndControlRoutes } from '@/router/modules/frontEnd.js' // 前端控制路由：初始化方法
import { initBackEndControlRoutes } from '@/router/modules/backEnd.js' // 后端控制路由：初始化方法


/**
 * 1、前端控制路由时：isRequestRoutes 为 false，需要写 roles，需要走 setFilterRoute 方法
 * 2、后端控制路由时：isRequestRoutes 为 true，不需要写 roles，不需要走 setFilterRoute 方法）
 * 相关方法已拆解到对应的 `backEnd.ts` 与 `frontEnd.ts`（他们互不影响，不需要同时改 2 个文件）
 * 特别说明：
 * 1、前端控制：路由菜单由前端去写（无菜单管理界面，有角色管理界面），角色管理中有 roles 属性，需返回到 userInfo 中。
 * 2、后端控制：路由菜单由后端返回（有菜单管理界面、有角色管理界面）
 */


// 读取 `@/store/modules/settings.js` 是否开启后端控制路由配置
const { isRequestRoutes } = store.getters.layoutConfig
if (isRequestRoutes) staticRoutes.splice(0, 1)



/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
})



/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr) {
    if (arr.length <= 0) return false
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1))
        }
    }
    return arr
}



/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatTwoStageRoutes(arr) {
    if (arr.length <= 0) return false
    const newArr = []
    const cacheList = []
    arr.forEach((v) => {
        if (v.path === '/') {
            newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] })
        } else {
            // 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
            // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
            if (v.path.indexOf('/:') > -1) {
                v.meta['isDynamic'] = true
                v.meta['isDynamicPath'] = v.path
            }
            newArr[0].children.push({ ...v })
            // 存 name 值，keep-alive 中 include 使用，实现路由的缓存
            // 路径：@/layout/routerView/parent.vue
            if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
                cacheList.push(v.name)
                store.dispatch('keepAlive/setCacheKeepAlive', cacheList)
            }
        }
    })
    return newArr
}



// isRequestRoutes 为 true，则开启后端控制路由，路径：`@/store/modules/settings.js`
if (!isRequestRoutes) initFrontEndControlRoutes()



// 路由加载前
router.beforeEach(async (to, from, next) => {
    // 获取 token
    const token = Session.get('token')

    // 去登录页并且 token 不存在
    if (to.path === '/login' && !token) {
        next()
    } else {
        // token 不存在
        if (!token) {
            next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
            Session.clear() // 清除临时存储
        } else if (token && to.path === '/login') {
            next('/dashboard')
        } else {
            if (store.getters.routesList.length === 0) {
                if (isRequestRoutes) {
                    // 后端控制路由：路由数据初始化，防止刷新时丢失
                    await initBackEndControlRoutes()
                    // 动态添加路由：防止非首页刷新时跳转回首页的问题
                    // 确保 addRoute() 时动态添加的路由已经被完全加载上去
                    next({ ...to, replace: true })
                }
            } else {
                next()
            }
        }
    }
})



// 路由加载后
router.afterEach(() => {

})


export default router