import request from '@/plugin/axios.js' // axios

// 用户登录
export const getSystemMenu = (data) => {
    return request({
        url: '/system/menu',
        method: 'get',
        data
    })
}