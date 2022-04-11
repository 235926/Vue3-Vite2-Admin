<template>
    <el-dialog v-model="state.dialogVisible" title="Tips" width="800px">
        <span>This is a message</span>
    </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    dialogVisible: false, // 弹窗状态
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    // 监听布局配置弹窗点击打开
    nextTick(() => {
        proxy.mittBus.on('openLayoutSetings', () => {
            state.dialogVisible = true
        })
    })
})


// 页面卸载时
onUnmounted(() => {
    proxy.mittBus.off('openLayoutSetings')
})
</script>

<style lang='scss' scoped>
</style>