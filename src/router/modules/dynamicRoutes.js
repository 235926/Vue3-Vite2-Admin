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
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes = [
    {
        path: '/',
        name: '/',
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
                    roles: ['admin', 'common'],
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
                path: '/limits',
                name: 'limits',
                component: () => import('@/layout/routerView/parent.vue'),
                menuType: "menu",
                redirect: '/limits/frontEnd',
                meta: {
                    title: '权限管理展示',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'limits',
                },
                children: [
                    {
                        path: '/limits/frontEnd',
                        name: 'limitsFrontEnd',
                        component: () => import('@/layout/routerView/parent.vue'),
                        menuType: "menu",
                        redirect: '/limits/frontEnd/page',
                        meta: {
                            title: '前端控制',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin', 'common'],
                            icon: 'frontEnd'
                        },
                        children: [
                            {
                                path: '/limits/frontEnd/page',
                                name: 'limitsFrontEndPage',
                                component: () => import('@/views/limits/frontEnd/page.vue'),
                                menuType: "menu",
                                meta: {
                                    title: '页面权限',
                                    isLink: '',
                                    isHidden: false,
                                    isKeepAlive: true,
                                    isAffix: false,
                                    isIframe: false,
                                    roles: ['admin', 'common'],
                                    icon: 'page'
                                }
                            },
                            {
                                path: '/limits/frontEnd/button',
                                name: 'limitsFrontEndButton',
                                component: () => import('@/views/limits/frontEnd/button.vue'),
                                menuType: "menu",
                                meta: {
                                    title: '按钮权限',
                                    isLink: '',
                                    isHidden: false,
                                    isKeepAlive: true,
                                    isAffix: false,
                                    isIframe: false,
                                    roles: ['admin', 'common'],
                                    icon: 'button'
                                }
                            },
                        ]
                    },
                    {
                        path: '/limits/backEnd',
                        name: 'limitsBackEnd',
                        component: () => import('@/layout/routerView/parent.vue'),
                        menuType: "menu",
                        redirect: '/limits/backEnd/page',
                        meta: {
                            title: '后端控制',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin', 'common'],
                            icon: 'backEnd'
                        },
                        children: [
                            {
                                path: '/limits/backEnd/page',
                                name: 'limitsBackEndPage',
                                component: () => import('@/views/limits/backEnd/page.vue'),
                                menuType: "menu",
                                meta: {
                                    title: '页面权限',
                                    isLink: '',
                                    isHidden: false,
                                    isKeepAlive: true,
                                    isAffix: false,
                                    isIframe: false,
                                    roles: ['admin', 'common'],
                                    icon: 'page'
                                }
                            },
                            {
                                path: '/limits/backEnd/button',
                                name: 'limitsBackEndButton',
                                component: () => import('@/views/limits/backEnd/button.vue'),
                                menuType: "menu",
                                meta: {
                                    title: '按钮权限',
                                    isLink: '',
                                    isHidden: false,
                                    isKeepAlive: true,
                                    isAffix: false,
                                    isIframe: false,
                                    roles: ['admin', 'common'],
                                    icon: 'button'
                                }
                            },
                        ]
                    }
                ]
            },

            {
                path: "/func",
                name: "func",
                component: () => import('@/layout/routerView/parent.vue'),
                menuType: "menu",
                redirect: '/func/tagsView',
                meta: {
                    title: "功能展示",
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
                        path: "/func/drag",
                        name: "funcDrag",
                        component: () => import('@/views/func/drag/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "拖拽指令",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "drag"
                        }
                    },
                    {
                        path: "/func/selector",
                        name: "funcSelector",
                        component: () => import('@/views/func/selector/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "图标选择器",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "selector"
                        }
                    },
                    {
                        path: "/func/noticeBar",
                        name: "funcNoticeBar",
                        component: () => import('@/views/func/noticeBar/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "滚动通知栏",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "notice"
                        }
                    },
                    {
                        path: "/func/waves",
                        name: "funcWaves",
                        component: () => import('@/views/func/waves/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "波浪效果",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "waves"
                        }
                    },
                    {
                        path: "/func/lazyImg",
                        name: "funcLazyImg",
                        component: () => import('@/views/func/lazyImg/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "图片懒加载",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "lazyImg"
                        }
                    },
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
                    },
                    {
                        path: "/func/clipboard",
                        name: "funcClipboard",
                        component: () => import('@/views/func/clipboard/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "复制剪切",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "clipboard"
                        }
                    },
                    {
                        path: "/func/splitpanes",
                        name: "funcSplitpanes",
                        component: () => import('@/views/func/splitpanes/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "窗格拆分器",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "panes"
                        }
                    },
                    {
                        path: "/func/gridLayout",
                        name: "funcGridLayout",
                        component: () => import('@/views/func/gridLayout/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "拖拽布局",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "drag"
                        }
                    },
                    {
                        path: "/func/printJs",
                        name: "funcPrintJs",
                        component: () => import('@/views/func/printJs/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "页面打印",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "print"
                        }
                    },
                    {
                        path: "/func/svgIcon",
                        name: "funcSvgIcon",
                        component: () => import('@/views/func/svgIcon/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: "svgIcon 演示",
                            isLink: "",
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: [
                                "admin"
                            ],
                            icon: "svgIcon"
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
                    roles: ['admin', 'common'],
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
                            roles: ['admin', 'common'],
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
                            roles: ['admin', 'common'],
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
                path: '/params',
                name: 'params',
                component: () => import('@/layout/routerView/parent.vue'),
                menuType: "menu",
                redirect: '/params/common',
                meta: {
                    title: '路由参数',
                    isLink: '',
                    isHidden: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'params',
                },
                children: [
                    {
                        path: '/params/common',
                        name: 'paramsCommon',
                        component: () => import('@/views/params/common/index.vue'),
                        menuType: "menu",
                        meta: {
                            title: '普通路由',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'common',
                        },
                    },
                    {
                        path: '/params/common/details',
                        name: 'paramsCommonDetails',
                        component: () => import('@/views/params/common/details.vue'),
                        meta: {
                            title: '普通路由传参',
                            isLink: '',
                            isHidden: true,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'common',
                        },
                    },
                    {
                        path: '/params/dynamic',
                        name: 'paramsDynamic',
                        component: () => import('@/views/params/dynamic/index.vue'),
                        meta: {
                            title: '动态路由',
                            isLink: '',
                            isHidden: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'dynamic',
                        },
                    },
                    /**
                     * tagsViewName 为要设置不同的 "tagsView 名称" 字段
                     * 如若需设置不同 "tagsView 名称"，tagsViewName 字段必须要有
                     */
                    {
                        path: '/params/dynamic/details/:t/:id/:tagsViewName',
                        name: 'paramsDynamicDetails',
                        component: () => import('@/views/params/dynamic/details.vue'),
                        meta: {
                            title: '动态路由传参',
                            isLink: '',
                            isHidden: true,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'dynamic',
                        },
                    },
                ]
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
                    isAffix: false,
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