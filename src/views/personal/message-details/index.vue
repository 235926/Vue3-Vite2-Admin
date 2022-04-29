<template>
    <el-card shadow="hover" class="message-details">
        <h1>{{ state.item.title }}</h1>
    </el-card>
</template>

<script setup>
const route = useRoute() // 路由参数


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