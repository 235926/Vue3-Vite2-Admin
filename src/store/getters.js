export default {
    // 获取布局配置信息
    layoutConfig: (state) => state.settings.layoutConfig,

    // 用户信息
    userInfo: (state) => state.user.userInfo,

    // 原始路由（未处理component）
    requestRoutes: (state) => state.routesList.requestRoutes,

    // 菜单中使用到（处理过component）
    routesList: (state) => state.routesList.routesList,

    // 路由缓存（name字段）
    keepAlive: (state) => state.keepAlive.keepAliveNames,
    cachedViews: (state) => state.keepAlive.cachedViews,

    // tagsView 视图列表
    tagsViewRoutes: (state) => state.tagsView.tagsViewRoutes,

    // 卡片全屏
    isTagsViewCurrenFull: (state) => state.tagsView.isTagsViewCurrenFull,
}