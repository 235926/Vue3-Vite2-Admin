import { Session } from '@/utils/storage.js' // 浏览器存储


// 设置属性，主要承载一些属性，存储数据的
const state = {
    tagsViewRoutes: [], // TagsView 路由
    isTagsViewCurrenFull: false, // 卡片全屏
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 设置 TagsView 路由
    SET_TAGS_VIEW_ROUTES(state, data) {
        state.tagsViewRoutes = data
    },


    // 设置卡片全屏
    SET_CURREN_FULL_SCREEN(state, bool) {
        Session.set('isTagsViewCurrenFull', bool)
        state.isTagsViewCurrenFull = bool
    },
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 设置 TagsView 路由
    async setTagsViewRoutes({ commit }, data) {
        commit('SET_TAGS_VIEW_ROUTES', data)
    },


    // 设置卡片全屏
    setCurrenFullscreen({ commit }, bool) {
        commit('SET_CURREN_FULL_SCREEN', bool)
    },
}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}