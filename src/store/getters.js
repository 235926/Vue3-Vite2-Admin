export default {
    // 获取布局配置信息
    layoutConfig: (state) => state.settings.layoutConfig,

    // 用户信息
    userInfo: (state) => state.user.userInfo,

    // 路由列表
    routesList: (state) => state.routesList.routesList,

    // 路由缓存（name字段）
    keepAlive: (state) => state.keepAlive.keepAliveNames,

    // tagsView 视图列表
    tagsViewRoutes: (state) => state.tagsView.tagsViewRoutes,
}