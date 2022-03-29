<template>
    <el-container class="layout-container">
        <Vertical />
        <el-container class="flex-column">
            <!-- <Header  /> -->
            <el-scrollbar>
                <Header />
                <Main />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup name="layoutDefaults">
import Vertical from '@/layout/container/aside/vertical.vue' // 垂直侧边栏
import Header from '@/layout/container/header/index.vue' // 头部
import Main from '@/layout/container/main/index.vue' // 主体

const store = useStore() // 定义 vuex 实例


// 是否开启固定 Header
const isFixedHeader = computed(() => {
    return store.getters.layoutConfig.isFixedHeader
})
</script>

<style lang='scss' scoped>
</style>