<template>
    <el-container class="layout-container custom-class">
        <!-- 侧边栏 -->
        <Vertical v-show="!isTagsViewCurrenFull" />

        <!-- 主体内容部分 -->
        <el-container class="flex-column" :class="{ 'layout-backtop': !layoutConfig.isFixedHeader }">
            <!-- 头部 -->
            <Header v-if="layoutConfig.isFixedHeader && !isTagsViewCurrenFull" />

            <!-- 内容渲染 -->
            <el-scrollbar :class="{ 'layout-backtop': layoutConfig.isFixedHeader }">
                <Header v-if="!layoutConfig.isFixedHeader && !isTagsViewCurrenFull" />
                <Main />
            </el-scrollbar>
        </el-container>

        <!-- 回到顶部 -->
        <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
    </el-container>
</template>

<script setup name="layoutDefaults">
import Vertical from '@/layout/container/aside/vertical/index.vue' // 垂直侧边栏
import Header from '@/layout/container/header/index.vue' // 头部
import Main from '@/layout/container/main/index.vue' // 主体
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 获取卡片全屏信息
const isTagsViewCurrenFull = computed(() => {
    return store.getters.isTagsViewCurrenFull
})
</script>

<style lang='scss' scoped>
</style>