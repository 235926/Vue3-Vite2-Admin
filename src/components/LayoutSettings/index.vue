<template>
    <el-drawer v-model="state.drawer" :direction="state.direction" destroy-on-close>
        <template #title>
            <span>布局配置</span>
        </template>
        <template #default>
            <el-scrollbar class="layout-settings-main">123</el-scrollbar>
        </template>
    </el-drawer>
</template>

<script setup name="layoutSettings">
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    drawer: false, // 是否显示 Drawer
    direction: 'rtl', // Drawer 打开的方向
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    // 监听布局配置弹窗点击打开
    nextTick(() => {
        proxy.mittBus.on('openSetingsDrawer', () => {
            state.drawer = true
        })
    })
})


// 页面卸载时
onUnmounted(() => {
    proxy.mittBus.off('openSetingsDrawer')
})
</script>

<style lang='scss' scoped>
.layout-settings-main {
    height: calc(100vh - 50px - 40px);
}
</style>