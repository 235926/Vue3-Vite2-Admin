import { createRouter, createWebHashHistory } from 'vue-router' // 路由
import { staticRoutes } from './modules/staticRoutes.js' // 静态路由


/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { left: 0, top: 0 }
        }
    },
})


/**
 * 定义404界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
 const pathMatch = {
    path: '/:path(.*)*',
    redirect: '/404'
}













export default router