<template>
    <router-view></router-view>

    <!-- 关闭全屏展示 -->
    <CloseFullscreen/>
</template>

<script setup>
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
import CloseFullscreen from '@/components/CloseFullscreen/index.vue' // 关闭全屏
const store = useStore() // 定义 vuex 实例



// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    nextTick(() => {
        // 获取缓存中的布局配置
        if (Local.get('layoutConfig')) {
            store.dispatch('settings/changeLayoutConfig', Local.get('layoutConfig'))
        }

        // 获取缓存中的全屏配置
        if (Session.get('isTagsViewCurrenFull')) {
            store.dispatch('tagsView/setCurrenFullscreen', Session.get('isTagsViewCurrenFull'))
        }
    })
})


</script>

<style lang="scss" scoped>
</style>
