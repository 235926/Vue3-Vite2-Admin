import router from '@/router/index.js' // 路由
import store from '@/store/index.js' // vuex
import { Session, Local } from '@/utils/storage.js' // 浏览器存储
// import VueEvent from '@/plugin/mittBus.js' // 事件总线，同级组件传值


/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export const useTitle = () => {
    nextTick(() => {
        let webTitle = ''
        let globalTitle = store.getters.layoutConfig.globalTitle
        webTitle = router.currentRoute.value.meta.title
        document.title = `${webTitle} - ${globalTitle}` || globalTitle
    })
}



/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize = Local.get('layoutConfig')?.globalComponentSize || store.getters.layoutConfig?.globalComponentSize



/**
 * 刷新当前页面
 */
export const refreshCurrentTagsView = (fullPath) => {
    // VueEvent.emit('onTagsViewRefreshRouterView', fullPath)
}