/**
 * 路由对象参数说明
 * meta: {
 *      title：         菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHidden：      是否隐藏此路由，不在侧边栏展示
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标
 * }
 */


/**
 * 定义动态路由
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/dashboard',
        meta: {
            isKeepAlive: true,
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '首页',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'dashboard',
                },
            },
            {
                path: '/system',
                name: 'system',
                component: () => import('@/layout/routerView/parent.vue'),
                redirect: '/system/menu',
                meta: {
                    title: '系统设置',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'setting',
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'systemMenu',
                        component: () => import('@/views/system/menu/index.vue'),
                        meta: {
                            title: '菜单管理',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'menu'
                        }
                    },
                    {
                        path: '/system/role',
                        name: 'systemRole',
                        component: () => import('@/views/system/role/index.vue'),
                        meta: {
                            title: '角色管理',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'role'
                        }
                    },
                    {
                        path: '/system/user',
                        name: 'systemUser',
                        component: () => import('@/views/system/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'user'
                        }
                    },
                ]
            }
        ]
    }
]