<template>
    <div class="h100">
        <router-view v-slot="{ Component }">
            <transition :name="layoutConfig.animation" mode="out-in">
                <keep-alive :include="getKeepAliveNames">
                    <component :is="Component" :key="state.refreshRouterViewKey" class="w100" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup name="layoutRouterView">
import { Session } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // 获取 vue 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例
const state = reactive({
    // 定义响应式数据
    refreshRouterViewKey: null, // 刷新页面key值
    keepAliveNameList: [], // 组件缓存列表(name值)
})

// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})

// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return layoutConfig.value.isTagsview ? store.getters.cachedViews : state.keepAliveNameList
})

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
    // https://gitee.com/lyt-top/vue-next-admin/issues/I58U75
    if (layoutConfig.value.isCacheTagsView) {
        const newArr = Session.get('tagsViewList')?.map((item) => {
            return item.name
        })
        store.dispatch('keepAlive/replaceCachedViews', newArr)
    }
    state.keepAliveNameList = store.getters.keepAlive

    // onTagsViewRefreshRouterView 为 tagsView 组件传递过来的刷新事件
    proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
        state.keepAliveNameList = store.getters.keepAlive.filter((name) => route.name !== name)
        state.refreshRouterViewKey = null
        nextTick(() => {
            state.refreshRouterViewKey = fullPath
            state.keepAliveNameList = store.getters.keepAlive
        })
    })
})

// 页面卸载时
onUnmounted(() => {
    proxy.mittBus.off('onTagsViewRefreshRouterView', () => {})
})

// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
    () => route.fullPath,
    () => {
        state.refreshRouterViewKey = decodeURI(route.fullPath)
    }
)
</script>

<style lang="scss" scoped>
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
