// 设置属性，主要承载一些属性，存储数据的
const state = {
    keepAliveNames: [], // 设置路由缓存（name字段）
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 设置路由缓存（name字段）
    SET_CACHE_KEEP_ALIVE(state, data) {
        state.keepAliveNames = data
    },
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 设置路由缓存（name字段）
    async setCacheKeepAlive({ commit }, data) {
        commit('SET_CACHE_KEEP_ALIVE', data)
    },
}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}