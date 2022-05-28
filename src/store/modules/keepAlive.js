/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 Tagsview）
 * @methods addCachedView 添加要缓存的路由 names（关闭 Tagsview）
 * @methods delCachedView 删除要缓存的路由 names（关闭 Tagsview）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 Tagsview）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 Tagsview）
 */

// 设置属性，主要承载一些属性，存储数据的
const state = {
    keepAliveNames: [], // 设置路由缓存（name字段）
    cachedViews: [], // 需要缓存的字段
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 设置要缓存的路由 names（开启 Tagsview）
    SET_CACHE_KEEP_ALIVE(state, data) {
        state.keepAliveNames = data
    },

    // addCachedView 添加要缓存的路由 names（关闭 Tagsview）
    ADD_CACHED_VIEW(state, data) {
        if (state.cachedViews.includes(data.name)) return
        if (data.meta.isKeepAlive) state.cachedViews.push(data.name)
    },

    // delCachedView 删除要缓存的路由 names（关闭 Tagsview）
    DEL_CACHED_VIEW(state, data) {
        const index = state.cachedViews.indexOf(data.name);
        index > -1 && state.cachedViews.splice(index, 1);
    },

    // delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 Tagsview）
    DEL_OTHER_CACHED_VIEWS(state, data) {
        if (data.meta.isKeepAlive) state.cachedViews = [data.name];
        else state.cachedViews = [];
    },

    // delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 Tagsview）
    DEL_CACHED_VIEWS(state) {
        state.cachedViews = [];
    },

    REPLACE_CACHED_VIEWS(state, data) {
        state.cachedViews = data
    }
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 设置路由缓存（name字段）
    async setCacheKeepAlive({ commit }, data) {
        commit('SET_CACHE_KEEP_ALIVE', data)
    },

    async addCachedView({ commit }, data) {
        commit('ADD_CACHED_VIEW', data)
    },

    async delCachedView({ commit }, data) {
        commit('DEL_CACHED_VIEW', data)
    },

    async delOthersCachedViews({ commit }, data) {
        commit('DEL_OTHER_CACHED_VIEWS', data)
    },

    async delAllCachedViews({ commit }) {
        commit('DEL_CACHED_VIEWS')
    },

    async replaceCachedViews({ commit }, data) {
        commit('REPLACE_CACHED_VIEWS', data)
    },
}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}