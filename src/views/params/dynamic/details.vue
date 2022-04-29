<template>
    <el-card shadow="hover">
        <div class="color-primary">
            <div>paramsDynamicDetails</div>
            <div class="mt10 mb10">路径：path: {{ state.params.path }}</div>
            <div>参数：params: {{ state.params.params }}</div>
        </div>
    </el-card>
</template>

<script setup name="paramsDynamicDetails">
const route = useRoute() // 路由参数


// 定义响应式数据>
const state = reactive({
    params: {
        path: '',
        query: '',
    },
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    state.params = route
})
</script>

<style lang='scss' scoped>
</style>