<template>
    <div class="svg-icon-container" style="width: 50px;" @click="toggleSideBar">
        <SvgIcon :name="layoutConfig.isCollapse ? 'indent' : 'outdent'" />
    </div>
</template>

<script setup name="toggleSideBar">
import { Local } from '@/utils/storage.js' // 浏览器存储
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 切换侧边栏状态
const toggleSideBar = () => {
    layoutConfig.value.isCollapse = !layoutConfig.value.isCollapse
    setLayoutConfig()
}


// 存储布局配置
const setLayoutConfig = () => {
    Local.remove('layoutConfig')
    Local.set('layoutConfig', layoutConfig.value)
}
</script>

<style lang='scss' scoped>
</style>