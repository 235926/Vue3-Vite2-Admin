<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
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
})


// 计算头部高度
const initHeaderHeight = () => {
    let { isTagsview } = store.getters.layoutConfig
    if (isTagsview) return (state.headerHeight = `85px`)
    else return (state.headerHeight = `50px`)
}



// 页面加载前
onBeforeMount(() => {
    initHeaderHeight()
})
</script>

<style lang='scss' scoped>
</style>