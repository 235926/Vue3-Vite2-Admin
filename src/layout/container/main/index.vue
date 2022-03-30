<template>
    <el-main class="layout-main">
        <el-scrollbar
            class="layout-scrollbar"
            ref="layoutScrollbarRef"
            :style="{ padding: state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe ? 0 : '', transition: 'padding 0.3s ease-in-out' }"
        >
            <!-- 40 是 padding 的值 -->
            <LayoutParent
                :minHeight="state.headerHeight"
                :style="{ minHeight: `calc(100vh - ${state.headerHeight} - 40px)` }"
            />
        </el-scrollbar>
    </el-main>
</template>

<script setup name="layoutMain">
import LayoutParent from '@/layout/routerView/parent.vue' // 路由出口
const { proxy } = getCurrentInstance() // 获取 vue 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex


// 定义响应式数据
const state = reactive({
    headerHeight: '', // 计算头部高度
    currentRouteMeta: {}, // 当前路由 meta
})


// 计算头部高度
const initHeaderHeight = () => {
    let { isTagsview } = store.getters.layoutConfig
    if (isTagsview) return (state.headerHeight = `85px`)
    else return (state.headerHeight = `50px`)
}


// 初始化获取当前路由 meta，用于设置 iframes padding
const initGetMeta = () => {
    state.currentRouteMeta = route.meta
}


// 页面加载前
onBeforeMount(() => {
    initHeaderHeight()
    initGetMeta()
})
</script>

<style lang='scss' scoped>
</style>