<template>
    <el-dialog v-model="state.isShowDialog" :close-on-click-modal="false" destroy-on-close width="800px">
        <template #title>
            <span class="dialog-title">Tips</span>
        </template>
        <template #default>
            <div class="dialog-main">123</div>
        </template>
        <template #footer>
            <div class="dialog-footer">footer</div>
        </template>
    </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    isShowDialog: false, // 弹窗状态
})


// 打开弹窗
const openDialog = () => {
    state.isShowDialog = true
}


// 关闭弹窗
const closeDialog = () => {
    state.isShowDialog = false
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})


// 暴露数据到 vue 实例
defineExpose({
    openDialog
})
</script>

<style lang='scss' scoped>
.dialog-main {
    height: 1000px;
}
</style>