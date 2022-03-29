<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-scrollbar">
            <LayoutParent />
        </el-scrollbar>
    </el-main>
</template>

<script setup name="layoutMain">
import LayoutParent from '@/layout/routerView/parent.vue' // 路由出口
</script>

<style lang='scss' scoped>
</style>