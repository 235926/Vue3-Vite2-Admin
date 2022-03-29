import { Session } from '@/utils/storage.js' // localStorage 存储


// 设置属性，主要承载一些属性，存储数据的
const state = {
    token: Session.get('token') || null, // token
    userInfo: Session.get('userInfo') || {}, // 用户信息
}


// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // 存储用户 token
    SET_TOKEN(state, token) {
        Session.set('token', token)
        state.token = token
    },


    // 存储用户信息
    SET_USER_INFO(state, userInfo) {
        Session.set('userInfo', userInfo)
        state.userInfo = userInfo
    },
}


// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    // 设置 token
    async setToken({ commit }, data) {
        commit('SET_TOKEN', data)
    },


    // 设置用户信息
    async setUserInfo({ commit }, data) {
        if (data) {
            commit('SET_USER_INFO', data)
        } else {
            if (Session.get('userInfo')) commit('SET_USER_INFO', Session.get('userInfo'))
        }
    },
}


// 暴露对象，让其他页面可以拿到
export default {
    namespaced: true, // 命名空间，必须加文件名/方法函数
    state,
    mutations,
    actions
}