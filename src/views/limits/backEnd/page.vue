<template>
    <el-alert
        title="温馨提示：1、此页面无法模拟后端控制路由，2、拉取代码后本地请求查看后端控制页面路由效果：`/src/store/modules/themeConfig.ts`中开启（isRequestRoutes 为 true，则开启后端控制路由）。3、此页面效果只作为演示使用，若出现不可逆转的bug，请尝试 `F5` 刷新页面。5、默认启用的是 `前端控制路由`。"
        type="warning" :closable="false"></el-alert>

    <el-button type="primary" class="mt20" @click="onGoToFrontEndPage">
        <el-icon>
            <ele-Position />
        </el-icon>
        立即前往前端控制路由
    </el-button>
</template>

<script setup>
const router = useRouter() // router 实例


// 立即前往前端控制路由
const onGoToFrontEndPage = () => {
    router.push('/limits/frontEnd/page')
}
</script>

<style lang='scss' scoped>
</style>