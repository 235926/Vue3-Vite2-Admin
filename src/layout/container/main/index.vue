<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef"
            :style="{ padding: state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe ? 0 : '', transition: 'padding 0.3s ease-in-out' }">
            <!-- 40 是 padding 的值 -->
            <LayoutParent
                :style="{ minHeight: `calc(100vh - ${state.headerHeight})`, transition: 'padding 0.3s ease-in-out' }" />
        </el-scrollbar>
    </el-main>
</template>

<script setup name="layoutMain">
import LayoutParent from '@/layout/routerView/parent.vue' // 路由出口
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading
const { proxy } = getCurrentInstance() // vue 实例
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
    if (isTagsview) return (state.headerHeight = `125px`)
    else return (state.headerHeight = `90px`)
}


// 初始化获取当前路由 meta，用于设置 iframes padding
const initGetMeta = () => {
    state.currentRouteMeta = route.meta
}


// 页面加载前
onBeforeMount(() => {
    initHeaderHeight()
    initGetMeta()
    NextLoading.done()
})


// 监听 layoutConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(store.getters.layoutConfig, (val) => {
    state.headerHeight = val.isTagsview ? '125px' : '90px'
    if (val.isFixedHeaderChange !== val.isFixedHeader) {
        if (!proxy.$refs.layoutScrollbarRef) return false
        proxy.$refs.layoutScrollbarRef.update()
    }
})


// 监听路由变化
watch(() => route.path, () => {
    state.currentRouteMeta = route.meta
    let bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe
    state.headerHeight = bool ? `85px` : `125px`
    proxy.$refs.layoutScrollbarRef.update()
})


// 监听 layoutConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(store.getters.layoutConfig, (val) => {
    state.currentRouteMeta = route.meta
    let bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe
    state.headerHeight = val.isTagsview ? (bool ? `85px` : `125px`) : '50px'
    if (val.isFixedHeaderChange !== val.isFixedHeader) {
        if (!proxy.$refs.layoutScrollbarRef) return false
        proxy.$refs.layoutScrollbarRef.update()
    }
})
</script>

<style lang='scss' scoped>
</style>