<template>
    <el-header class="layout-header" :height="setHeaderHeight">
        <div class="layout-navbars-container">
            <div class="left">
                <!-- 切换 sidebar -->
                <ToggleSideBar v-if="layoutConfig.isShowCollapse" />

                <!-- 面包屑 -->
                <Breadcrumb v-if="layoutConfig.isBreadcrumb" />
            </div>
            <div class="right">
                <!-- 设置打开布局配置 -->
                <Settings v-if="layoutConfig.isSettings" />

                <!-- 用户通知 -->
                <UserNews v-if="layoutConfig.isUserNews" />

                <!-- 设置全局组件大小 -->
                <SizeSelect v-if="layoutConfig.isGlobalComponentSize" />

                <!-- 开启全屏 -->
                <FullScreen v-if="layoutConfig.isFullScreen" />

                <!-- 用户信息 -->
                <UserInfo />
            </div>
        </div>
        <TagsView v-if="layoutConfig.isTagsview" />
    </el-header>
</template>

<script setup name="layoutHeader">
import ToggleSideBar from './toggleSideBar.vue' // 切换 sidebar
import Breadcrumb from './breadcrumb.vue' // 面包屑
import TagsView from './tagsView/index.vue' // 导航视图
import UserInfo from './userInfo.vue' // 用户信息
import UserNews from './userNews.vue' // 用户通知
import FullScreen from './fullScreen.vue' // 开启全屏
import SizeSelect from './sizeSelect.vue' // 设置全局组件大小
import Settings from './settings.vue' // 设置打开布局配置
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 设置 header 的高度
const setHeaderHeight = computed(() => {
    let { isTagsview, layout } = store.getters.layoutConfig
    if (isTagsview && layout !== 'classic') return '85px'
    else return '50px'
})
</script>

<style lang='scss' scoped>
</style>