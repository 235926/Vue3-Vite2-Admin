import request from '@/plugin/axios.js' // axios

// 用户登录
export const login = (data) => {
    return request({
        url: '/login',
        method: 'get',
        params: data
    })
}


// 获取用户信息
export const userInfo = (data) => {
    return request({
        url: '/userInfo',
        method: 'get',
        params: data
    })
}


// 获取权限菜单
export const generateRoutes = (data) => {
    return request({
        url: '/routes',
        method: 'get',
        params: data
    })
}


// 用户退出登录
export const logout = (data) => {
    return request({
        url: '/logout',
        method: 'get',
        params: data
    })
}


// 用户消息通知
export const userMessageNotice = (data) => {
    return request({
        url: '/user/message/notice',
        method: 'get',
        params: data
    })
}


// 用户营销推荐
export const userRecommendList = (data) => {
    return request({
        url: '/user/recommendList',
        method: 'get',
        params: data
    })
}