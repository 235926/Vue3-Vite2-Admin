<template>
    <router-view v-slot="{ Component }">
        <transition :name="setTransitionName" mode="out-in">
            <keep-alive :include="state.keepAliveNameList">
                <div class="h100 w100" :style="{ minHeight }">
                    <component :is="Component" :key="state.refreshRouterViewKey" />
                </div>
            </keep-alive>
        </transition>
    </router-view>
</template>

<script setup name="layoutRouterView">
const { proxy: ctx } = getCurrentInstance() // 获取 vue 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例
const state = reactive({ // 定义响应式数据
    refreshRouterViewKey: null, // component key 值
    keepAliveNameList: [], // 组件缓存列表(name值)
})


// props
const props = defineProps({
    minHeight: {
        type: String,
        default: '',
    },
})


// 设置主界面切换动画
const setTransitionName = computed(() => {
    return store.getters.layoutConfig.animation
})


// 设置最小高度
const minHeight = computed(() => {
    return props.minHeight
})


// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return store.getters.keepAlive
})


// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
    state.keepAliveNameList = getKeepAliveNames.value
    ctx.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
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
    ctx.mittBus.off('onTagsViewRefreshRouterView')
})


// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(() => route.fullPath, () => {
    state.refreshRouterViewKey = route.fullPath
})
</script>

<style lang='scss' scoped>
</style>