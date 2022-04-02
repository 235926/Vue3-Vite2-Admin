<template>
    <el-dropdown trigger="click" :show-timeout="70" :hide-timeout="50" @command="handleClick">
        <div class="svg-icon-container">
            <svg-icon name="language" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command>中文</el-dropdown-item>
                <el-dropdown-item command>English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
const { proxy } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const state = reactive({

})


// 切换语言
const handleClick = (command) => {

}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})
</script>

<style lang='scss' scoped>
</style>