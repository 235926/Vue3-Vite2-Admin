<template>
    <el-config-provider :size="getGlobalComponentSize">
        <!-- 路由出口 -->
        <router-view />

        <!-- 关闭全屏展示 -->
        <CloseFullscreen />
    </el-config-provider>
</template>

<script setup>
import CloseFullscreen from '@/components/CloseFullscreen/index.vue' // 关闭全屏
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
import { useTitle, globalComponentSize } from '@/utils/global.js' // 修改项目布局方法
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    return globalComponentSize
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


// 监听路由的变化，设置网站标题
watch(() => route.path, () => {
    useTitle()
})
</script>

<style lang="scss" scoped>
</style>
