import { createI18n } from 'vue-i18n' // 导入国际化插件
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn' // 中文
import store from '@/store/index.js' // vuex


/**
 * 说明：
 * /src/i18n/lang 下的 js 为框架的国际化内容
 * /src/i18n/pages 下的 js 为各界面的国际化内容
 */


const messages = {
    [zhcnLocale.name]: {
        ...zhcnLocale,
    }
}



// 导出语言国际化
export const i18n = createI18n({
    locale: store.getters.layoutConfig.globalI18n,
    fallbackLocale: zhcnLocale.name,
    messages,
})