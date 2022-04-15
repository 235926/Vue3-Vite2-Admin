<template>
    <el-dialog title="添加菜单" v-model="state.isShowDialog" :close-on-click-modal="false" destroy-on-close width="800px">
        <div class="dialog-main">123</div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">修 改</el-button>
            </div>
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


// 取消
const onCancel = () => {
    closeDialog()
}


// 新增
const onSubmit = () => {
    closeDialog()
}


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