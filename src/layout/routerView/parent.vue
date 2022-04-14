<template>
    <div class="h100">
        <router-view v-slot="{ Component }">
            <transition :name="layoutConfig.animation" mode="out-in">
                <!-- <keep-alive :include="state.keepAliveNameList">
                    <component :is="Component" :key="state.refreshRouterViewKey" />
                </keep-alive> -->

                <div class="w100" :key="state.refreshRouterViewKey">
                    <component :is="Component" :key="state.refreshRouterViewKey" />
                </div>
            </transition>
        </router-view>
    </div>
</template>

<script setup name="layoutRouterView">
const { proxy } = getCurrentInstance() // 获取 vue 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例
const state = reactive({ // 定义响应式数据
    refreshRouterViewKey: null, // 刷新页面key值
    keepAliveNameList: [], // 组件缓存列表(name值)
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return store.getters.keepAlive
})


// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
    state.keepAliveNameList = getKeepAliveNames.value

    // onTagsViewRefreshRouterView 为 tagsView 组件传递过来的刷新事件
    proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
        state.keepAliveNameList = getKeepAliveNames.value.filter((name) => route.name !== name)
        state.refreshRouterViewKey = null
        nextTick(() => {
            state.refreshRouterViewKey = fullPath
            state.keepAliveNameList = getKeepAliveNames.value
        })
    })
})


// 页面卸载时
onUnmounted(() => {
    proxy.mittBus.off('onTagsViewRefreshRouterView')
})


// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(() => route.fullPath, () => {
    state.refreshRouterViewKey = route.fullPath
})
</script>

<style lang='scss' scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.28s;
}

.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>