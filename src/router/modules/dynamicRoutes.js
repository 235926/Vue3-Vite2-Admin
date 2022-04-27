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
                menuType: "menu",
                meta: {
                    title: '首页',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'dashboard',
                },
            },

            {
                path: '/system',
                name: 'system',
                component: () => import('@/layout/routerView/parent.vue'),
                menuType: "menu",
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
                        menuType: "menu",
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
                        menuType: "menu",
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
                        menuType: "menu",
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
            },

            {
                path: "/func",
                name: "func",
                component: () => import('@/layout/routerView/parent.vue'),
                menuType: "menu",
                redirect: '/func/tagsView',
                meta: {
                    title: "功能组件",
                    isLink: "",
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: [
                        "admin"
                    ],
                    icon: "func"
                },
                children: [
                    {
                        path: "/func/tagsView",
                        name: "funcTagsView",
                        component: () => import('@/views/func/tagsView/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "tagsView 操作",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "tagsView"
                        }
                    },
                    {
                        path: "/func/countUp",
                        name: "funcCountUp",
                        component: () => import('@/views/func/countUp/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "数字滚动",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "countup"
                        }
                    },
                    {
                        path: "/func/cropper",
                        name: "funcCropper",
                        component: () => import('@/views/func/cropper/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "图片裁剪",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "cropper"
                        }
                    },
                    {
                        path: "/func/wangEditor",
                        name: "funcWangEditor",
                        component: () => import('@/views/func/wangEditor/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "Editor 编辑器",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "wangEditor"
                        }
                    },
                    {
                        path: "/func/qrcode",
                        name: "funcQrcode",
                        component: () => import('@/views/func/qrcode/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "二维码生成",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "qrcode"
                        }
                    }
                ]
            },

            {
                path: '/icons',
                name: 'icons',
                component: () => import('@/views/icons/index.vue'),
                menuType: "menu",
                meta: {
                    title: '图标列表',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'icons',
                },
            },

            {
                path: '/personal',
                name: 'personal',
                component: () => import('@/views/personal/index.vue'),
                menuType: "menu",
                meta: {
                    title: '个人中心',
                    isLink: '',
                    isHidden: true,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'personal',
                },
                children: [
                    {
                        path: '/personal/message-more',
                        name: 'messageMore',
                        component: () => import('@/views/personal/message-more/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: '更多消息',
                            isLink: '',
                            isHidden: true,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'personal',
                        },
                    },
                    {
                        path: '/personal/message-details',
                        name: 'messageDetails',
                        component: () => import('@/views/personal/message-details/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: '消息详情',
                            isLink: '',
                            isHidden: true,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'personal',
                        },
                    },
                ]
            },

            {
                path: '/color',
                name: 'color',
                component: () => import('@/views/color/index.vue'),
                menuType: "menu",
                meta: {
                    title: '颜色变量',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'color',
                },
            },

            {
                path: '/ceshi',
                name: 'ceshi',
                component: () => import('@/views/ceshi/index.vue'),
                menuType: "menu",
                meta: {
                    title: '测试页面',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'test',
                },
            },

            {
                path: '/link',
                name: 'layoutLinkView',
                component: () => import('@/layout/routerView/link.vue'),
                menuType: "link",
                meta: {
                    title: '外链',
                    isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
                    isHidden: false,
                    isKeepAlive: false,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'link',
                },
            },
            {
                path: '/iframe',
                name: 'layoutIfameView',
                component: () => import('@/layout/routerView/iframe.vue'),
                menuType: "iframe",
                meta: {
                    title: '内嵌 iframe',
                    isLink: 'https://nodejs.org/zh-cn/',
                    isHidden: false,
                    isKeepAlive: false,
                    isAffix: false,
                    isIframe: true,
                    roles: ['admin'],
                    icon: 'iframe',
                },
            },
        ]
    }
]