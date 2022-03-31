import router from '@/router/index.js' // 路由
import store from '@/store/index.js' // vuex



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