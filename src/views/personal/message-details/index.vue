<template>
    <el-card shadow="hover" class="message-details">
        <h1>{{ state.item.title }}</h1>
    </el-card>
</template>

<script setup>
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    item: JSON.parse(route.query.item)
})
</script>

<style lang='scss' scoped>
.message-details {
    h1 {
        text-align: center;
    }
}
</style>