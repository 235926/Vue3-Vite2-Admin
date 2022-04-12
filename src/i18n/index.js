import store from '@/store/index.js' // vuex
import { Local } from '@/utils/storage.js' // 浏览器存储
import { createI18n } from 'vue-i18n' // 导入国际化插件

// 引入 element plus 自带多国语言
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn' // element 中文
import enLocale from 'element-plus/lib/locale/lang/en' // element 英文

// 引入自定义多国语言（框架）
import nextZhcn from '@/i18n/lang/zh-cn.js' // vue-i18n 中文
import nextEn from '@/i18n/lang/en.js' // vue-i18n 英文

// 引入自定义多国语言（页面）
// 建议一个模块起一个文件夹，文件夹名与模块名相同。如：home


/**
 * 说明：
 * /src/i18n/lang 下的 js 为框架的国际化内容
 * /src/i18n/pages 下的 js 为各界面的国际化内容
 */


//  多国语言初始化，注意 element plus 字段语言不要放入到 message 字段里。message 字段为自定义多国语言
const messages = {
    [zhcnLocale.name]: {
        ...zhcnLocale,
        message: {
            ...nextZhcn,
        },
    },
    [enLocale.name]: {
        ...enLocale,
        message: {
            ...nextEn,
        },
    },
}



const locale = Local.get('layoutConfig')?.globalI18n || store.getters.layoutConfig?.globalI18n

// 导出语言国际化
export const i18n = createI18n({
    locale: locale, // 默认语言
    fallbackLocale: zhcnLocale.name,
    globalInjection: true, // 全局注册 $t方法
    messages, // 语言库
})