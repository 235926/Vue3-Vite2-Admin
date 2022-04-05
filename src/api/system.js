import request from '@/plugin/axios.js' // axios

// 获取菜单列表
export const systemMenu = (data) => {
    return request({
        url: '/system/menu',
        method: 'get',
        data
    })
}