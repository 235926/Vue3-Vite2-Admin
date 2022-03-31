<template>
    <el-container class="layout-container">
        <Vertical v-show="!isTagsViewCurrenFull" />
        <el-container class="flex-column">
            <Header v-if="layoutConfig.isFixedHeader && !isTagsViewCurrenFull" />
            <el-scrollbar>
                <Header v-if="!layoutConfig.isFixedHeader && !isTagsViewCurrenFull" />
                <Main />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup name="layoutDefaults">
import Vertical from '@/layout/container/aside/vertical.vue' // 垂直侧边栏
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