<template>
    <Defaults v-if="layoutConfig.layout === 'defaults'"/>
</template>

<script setup name="layout">
import Defaults from '@/layout/layoutStyle/defaults.vue' // 默认布局
const store = useStore() // vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})
</script>

<style lang='scss' scoped>
</style>