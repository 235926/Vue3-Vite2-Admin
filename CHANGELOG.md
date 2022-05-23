# <a href="https://github.com/235926/Vue3-Vite2-Admin" target="_blank">Vue3-Vite2-Admin 更新日志</a>
- 🌟 更新
- 🎉 新增
- 🐞 修复
- 🎯 优化
- 💔 移除
- 🚧 调整
- 🌈 重构
- ❄️ 删除
- ⚠️ 警告


## 未解决问题
- ⚠️ 警告 未修复热更新报错 `parentComponent.ctx.deactivate is not a function`
- ⚠️ 警告 后端获取路由表单的时候第一次报警告 `No match found for location with path "xxx"`




## "version": "2.2.8"
## "date": "2022.05.23"
## "author": "cdl"

- 🎉 新增 pinia 数据管理 前往体验：[动态组件](https://vue3-vite2-admin.vercel.app/#/func/pinia)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.7"
## "date": "2022.05.20"
## "author": "cdl"

- 🎉 新增 动态组件 前往体验：[动态组件](https://vue3-vite2-admin.vercel.app/#/func/dynamicComponent)
- 🎉 新增 异步组件 前往体验：[异步组件](https://vue3-vite2-admin.vercel.app/#/func/asyncComponent)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.6"
## "date": "2022.05.13"
## "author": "cdl"

- 🎉 新增 tagsView 风格2
- 🎉 新增 用户管理操作

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.5"
## "date": "2022.05.12"
## "author": "cdl"

- 🎯 优化 用户信息通知添加有消息小红点提示，无消息通知去掉小红点提示
- 🎉 新增 工作流 前往体验：[工作流](https://vue3-vite2-admin.vercel.app/#/func/workflow)
- 🎯 优化 个人中心详情页跳转的标题
- 🌟 更新 适配 `"element-plus": "^2.2.0` 版本

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.4"
## "date": "2022.05.09"
## "author": "cdl"

- 🎉 新增 过滤筛选组件添加多选

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.3"
## "date": "2022.05.09"
## "author": "cdl"

- 🎯 优化 个人中心信息管理部分间距
- 🎯 优化 菜单管理页面加载状态
- 🎉 新增 过滤筛选组件 前往体验：[过滤筛选组件](https://vue3-vite2-admin.vercel.app/#/func/filtering)
- 🐞 修复 修改`@/store/modules/settings.js`配置时，需要每次都清理 `window.localStorage` 浏览器永久缓存，配置才会生效
- 🎯 优化 `tagsView` 边框线颜色

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.2"
## "date": "2022.05.07"
## "author": "cdl"

- 🎉 新增 表单表格验证 前往体验：[表单表格验证](https://vue3-vite2-admin.vercel.app/#/func/tableRules)
- 🎉 新增 多表单验证 前往体验：[多表单验证](https://vue3-vite2-admin.vercel.app/#/func/formRules)
- 🎉 新增 动态复杂表单 前往体验：[动态复杂表单](https://vue3-vite2-admin.vercel.app/#/func/dynamicForm)
- 🎯 优化 优化 [如果 url 中有中文等特殊字符，第一次切换该 tab 时 keep-alive 失效#I55JS7](https://gitee.com/lyt-top/vue-next-admin/issues/I55JS7)，(https://gitee.com/yuyong1566)
- 🎯 优化 优化注释
- 🎯 优化 tagsView 部分标签多了之后右侧没有空隙

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.1"
## "date": "2022.05.06"
## "author": "cdl"

- 🎉 新增 列表自适应 前往体验：[列表自适应](https://vue3-vite2-admin.vercel.app/#/func/listAdapt)
- 🎉 新增 表单自适应 前往体验：[表单自适应](https://vue3-vite2-admin.vercel.app/#/func/formAdapt)
- 🎉 新增 回到顶部功能

│────────────────────────────── end ──────────────────────────────│





## "version": "2.2.0"
## "date": "2022.05.06"
## "author": "cdl"

- 🎉 新增 头部用户通知部分，布局页面添加用户通知选项
- ❄️ 删除 布局页面删除国家化选项

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.9"
## "date": "2022.05.06"
## "author": "cdl"

- 🎉 新增 瀑布屏布局 前往体验：[瀑布屏](https://vue3-vite2-admin.vercel.app/#/func/waterfall)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.8"
## "date": "2022.05.05"
## "author": "cdl"

- 🐞 修复 单独使用 await 造成的打包报错问题
- 🌟 更新 插件更新版本
- 🚧 调整 封装的方法函数，把箭头函数调换成原生的函数样式
- 🐞 修复 解决 `transition` 下不能多个元素的问题，在每个页面的最外层套层 <div class="page-container"></div>
- 🎉 新增 拖拽指令和拖拽展示页面 前往体验：[拖拽展示](https://vue3-vite2-admin.vercel.app/#/func/drag)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.7"
## "date": "2022.05.05"
## "author": "cdl"

- 🎉 新增 权限验证组件 `@/components/Auth/auth.vue` 单个权限验证
- 🎉 新增 权限验证组件 `@/components/Auth/auths.vue` 多个权限验证，满足一个则显示
- 🎉 新增 权限验证组件 `@/components/Auth/authAll.vue` 多个权限验证，全部满足则显示
- 🎉 新增 权限验证指令 `@/directive/auth/index.js`
- 🎉 新增 权限管理展示页面 前往体验：[前端控制](https://vue3-vite2-admin.vercel.app/#/limits/frontEnd/page)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.6"
## "date": "2022.05.04"
## "author": "cdl"

- 🎯 优化 svgIcon 图标大小显示问题
- 🎯 优化 `NextLoading.start()`，防止第一次进入界面时出现短暂空白
- 🌈 重构 路由（`/src/router/index.js`）解决 No match found for location with path "xxx"(前端控制，后端控制未解决) 问题

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.5"
## "date": "2022.05.03"
## "author": "cdl"

- ❄️ 删除 插件 "default-passive-events"
- 🎉 新增 svgIcon 演示页面 前往体验：[svgIcon 演示页面](https://vue3-vite2-admin.vercel.app/#/func/svgIcon)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.4"
## "date": "2022.05.02"
## "author": "cdl"

- 🎯 优化 图标选择器参数，设置默认 prepend 和 placeholder，新增弹窗标题
- 🚧 调整图标选择器 Popover 气泡卡片触发方式改为虚拟触发
- 🎉 新增 图标选择器新增 title 标题参数

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.3"
## "date": "2022.05.01"
## "author": "cdl"

- 🐞 修复 图标选择器展示页面引入的图标选择器组件文件名大小写敏感问题

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.2"
## "date": "2022.05.01"
## "author": "cdl"

- 🎯 优化 图标选择器在不同分辨率下的展示方式
- 🎉 新增 图标选择器展示页面 前往体验：[图标选择器](https://vue3-vite2-admin.vercel.app/#/func/selector)
- 🌟 更新 element-plus 版本到 2.1.11

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.1"
## "date": "2022.05.01"
## "author": "cdl"

- 🐞 修复 深色模式下，刷新浏览器之后深色模式丢失
- 🎯 优化 css 变量
- 🎉 新增 滚动通知栏展示组件 前往体验：[滚动通知栏](https://vue3-vite2-admin.vercel.app/#/func/noticeBar)

│────────────────────────────── end ──────────────────────────────│





## "version": "2.1.0"
## "date": "2022.04.29"
## "author": "cdl"

- 🎉 新增 tagsView 支持自定义 tagsView 名称（文章详情时有用），前往体验：[路由参数/普通路由](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)
- 🎉 新增 普通路由和动态路由页面
- 🎯 优化 个人中心详情及标题

│────────────────────────────── end ──────────────────────────────│