<template>
    <el-config-provider :locale="state.i18nLocale" :size="getGlobalComponentSize">
        <!-- 路由出口 -->
        <router-view v-if="state.isShow" />

        <!-- 布局配置页面 -->
        <LayoutSettingsDrawer v-if="layoutConfig.isLayoutPlan" />
        <LayoutSettingsDialog v-else />

        <!-- 关闭全屏展示 -->
        <CloseFullscreen />
    </el-config-provider>
</template>

<script setup>
import CloseFullscreen from '@/components/CloseFullscreen/index.vue' // 关闭全屏
import LayoutSettingsDrawer from '@/components/LayoutSettings/drawer.vue' // 布局配置页面(drawer)
import LayoutSettingsDialog from '@/components/LayoutSettings/dialog.vue' // 布局配置页面(dialog)
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
import { useTitle, globalComponentSize } from '@/utils/global.js' // 修改项目布局方法
const { proxy } = getCurrentInstance() // vue 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据
const state = reactive({
    isShow: true, // 是否刷新页面
    i18nLocale: null, // 国际化
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    return globalComponentSize
})


// 刷新页面
const reload = () => {
    // reload方法首先将 isShow 设置为 false，将 router-view 通过 if 判断取消
    state.isShow = false
    // Vue.nextTick 用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象
    nextTick(() => {
        state.isShow = true
    })
}


// 把方法传递给需要调用的组件
provide("reload", reload)


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    nextTick(() => {
        // 设置 i18n，App.vue 中的 el-config-provider
        proxy.mittBus.on('getI18nConfig', (locale) => {
            state.i18nLocale = locale
        })

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


// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
    proxy.mittBus.off('getI18nConfig', () => { })
})


// 监听路由的变化，设置网站标题
watch(() => route.path, () => {
    useTitle()
})
</script>

<style lang="scss" scoped>
</style>
