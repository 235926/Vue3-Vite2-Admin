import request from '@/plugin/axios.js' // axios

// 获取菜单列表
export const systemMenu = (data) => {
    return request({
        url: '/system/menu',
        method: 'get',
        params: data
    })
}


// 新增菜单
export const systemMenuAdd = (data) => {
    return request({
        url: '/system/menu/add',
        method: 'get',
        params: data
    })
}


// 编辑菜单
export const systemMenuEdit = (data) => {
    return request({
        url: '/system/menu/edit',
        method: 'get',
        params: data
    })
}


// 删除菜单
export const systemMenuDelete = (data) => {
    return request({
        url: '/system/menu/delete',
        method: 'get',
        params: data
    })
}


// 获取用户列表
export const systemUser = (data) => {
    return request({
        url: '/system/user',
        method: 'get',
        params: data
    })
}


// 新增用户
export const systemUserAdd = (data) => {
    return request({
        url: '/system/user/add',
        method: 'get',
        params: data
    })
}


// 编辑用户
export const systemUserEdit = (data) => {
    return request({
        url: '/system/user/edit',
        method: 'get',
        params: data
    })
}


// 删除用户
export const systemUserDelete = (data) => {
    return request({
        url: '/system/user/delete',
        method: 'get',
        params: data
    })
}


























// 功能展示 - 过滤筛选组件列表
export const funcFiltering = (data) => {
    return request({
        url: '/func/filtering',
        method: 'get',
        params: {
            // 传递数组需要JSON.stringify转换
            data: JSON.stringify(data)
        }
    })
}