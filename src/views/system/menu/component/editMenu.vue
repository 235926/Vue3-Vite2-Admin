<template>
    <el-dialog title="修改菜单" v-model="state.isShowDialog" :close-on-click-modal="false" destroy-on-close width="800px">
        <el-form :model="state.ruleForm" label-width="80px">
            <el-form-item label="上级菜单">
                <el-cascader :options="state.menuData" :props="{ checkStrictly: true, value: 'path', label: 'title' }"
                    placeholder="请选择上级菜单" clearable class="w100" v-model="state.ruleForm.menuSuperior">
                    <template #default="{ node, data }">
                        <span>{{ data.title }}</span>
                        <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                </el-cascader>
            </el-form-item>
        </el-form>
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
    ruleForm: { // 表单数据
        menuSuperior: [], // 上级菜单
    },
    menuData: [], // 上级菜单数据
})


// 打开弹窗
const openDialog = (row) => {
    state.isShowDialog = true
}


// 关闭弹窗
const closeDialog = () => {
    state.isShowDialog = false
}


// 获取 vuex 中的路由
const getMenuData = (routes) => {
    let arr = [] // 重新变量，把 title 遍历出来
    routes.map(val => {
        val['title'] = val.meta.title
        val['id'] = Math.random()
        arr.push({ ...val })
        if (val.children) getMenuData(val.children)
    })
    return arr
}


















// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    state.menuData = getMenuData(store.getters.routesList)
    console.log(state.menuData)
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