<template>
    <el-aside class="layout-aside" :class="setCollapseStyle">aside</el-aside>
</template>

<script setup name="layoutAsideVertical">
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 设置菜单展开/收起时的宽度
const setCollapseStyle = computed(() => {
    const { isCollapse } = store.getters.layoutConfig
    return {
        hideSidebar: isCollapse,
        openSidebar: !isCollapse,
    }
})
</script>

<style lang='scss' scoped>

</style>