// 设置属性，主要承载一些属性，存储数据的
const state = {
    layoutConfig: { // 布局配置
        /**
         * @description 网站主标题（菜单导航、浏览器当前网页标题）
         */
        globalTitle: 'Vue3-Vite2-Admin',

        /**
         * @description 是否开启布局配置
         * @type {boolean} true | false
         */
        isSettings: true,

        /**
         * @description 默认 primary 主题颜色
         */
        primary: '#409eff',

        /**
         * @description 是否开启后端控制路由
         * @type {boolean} true | false
         */
        isRequestRoutes: true,

        /**
         * @description 布局切换
         * @type {string} 可选值"<defaults|classic|transverse|columns>"，默认 defaults
         */
        layout: 'defaults',

        /**
         * @description 主页面切换动画
         * @type {string} 可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
         */
        animation: 'slide-right',

        /**
         * @description 是否开启菜单手风琴效果
         * @type {boolean} true | false
         */
        isUniqueOpened: false,

        /**
         * @description 是否开启菜单水平折叠效果
         * @type {boolean} true | false
         */
        isCollapse: false,

        /**
         * @description 是否开启固定 Header
         * @type {boolean} true | false
         */
        isFixedHeader: true,

        /**
         * @description 是否开启 Breadcrumb，强制经典、横向布局不显示
         * @type {boolean} true | false
         */
        isBreadcrumb: true,

        /**
         * @description 是否开启 Breadcrumb 图标
         * @type {boolean} true | false
         */
        isBreadcrumbIcon: false,

        /**
         * @description 是否开启 Tagsview 视图
         * @type {boolean} true | false
         */
        isTagsview: true,

        /**
         * @description 是否开启 Tagsview 图标
         * @type {boolean} true | false
         */
        isTagsviewIcon: false,

        /**
         * @description 是否开启 TagsView 缓存
         * @type {boolean} true | false
         */
        isCacheTagsView: true,

        /**
         * @description 是否开启 TagsView 拖拽
         * @type {boolean} true | false
         */
        isSortableTagsView: true,

        /**
         * @description 是否开启 TagsView 共用
         * @description 地址相同但是查询字符串不同的时候是否共用同一个页面
         * @type {boolean} true | false
         */
        isShareTagsView: false,

        /**
         * @description 动态设置 tagsView 风格样式
         * @type {boolean} 可选值"<tags-style-one|tags-style-two|tags-style-three>"，默认 tags-style-one
         */
        tagsViewStyle: 'tags-style-one',

        /**
         * @description 是否开启 logo 图标展示
         * @type {boolean} true | false
         */
        isLogo: true,

        /**
         * @description 是否开启默认全局组件大小
         * @type {boolean} true | false
         */
        isGlobalComponentSize: true,

        /**
         * @description 默认全局组件大小
         * @type {boolean} 可选值"<large|''|small>"，默认 ''
         */
        globalComponentSize: '',

        /**
         * @description 是否开启全屏展示组件
         * @type {boolean} true | false
         */
        isFullScreen: true,

        /**
         * @description 是否开启国际化切换语言
         * @type {boolean} true | false
         */
        isLanguage: false,

        /**
         * @type {boolean} true | false
         * @description 灰色模式
         */
        isGrayscale: false,

        /**
         * @type {boolean} true | false
         * @description 色弱模式
         */
        isInvert: false,

    }
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 设置布局配置
    CHANGE_LAYOUT_CONFIG: (state, data) => {
        state.layoutConfig = data
    }
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 设置布局配置
    changeLayoutConfig({ commit }, data) {
        commit('CHANGE_LAYOUT_CONFIG', data)
    }
}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}