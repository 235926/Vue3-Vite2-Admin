// 设置属性，主要承载一些属性，存储数据的
const state = {
    requestRoutes: [], // 原始路由（未处理component）
    routesList: [], // 设置路由，菜单中使用到（处理过component）
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 存储接口原始路由（未处理component）
    SET_BACK_END_CONTROL_ROUTES(state, data) {
        state.requestRoutes = data
    },

    // 设置路由，菜单中使用到（处理过component）
    SET_ROUTES_LIST(state, data) {
        state.routesList = data;
    },
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 存储接口原始路由（未处理component）
    setBackEndControlRoutes({ commit }, routes) {
        commit('SET_BACK_END_CONTROL_ROUTES', routes);
    },

    // 设置路由，菜单中使用到（处理过component）
    async setRoutesList({ commit }, data) {
        commit('SET_ROUTES_LIST', data)
    },

}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}