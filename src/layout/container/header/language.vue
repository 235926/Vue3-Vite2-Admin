<template>
    <el-dropdown trigger="click" :show-timeout="70" :hide-timeout="50" @command="handleClick">
        <div class="svg-icon-container">
            <svg-icon name="language" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { Local } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // vue 实例
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const state = reactive({

})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 切换语言
const handleClick = (command) => {
    Local.remove('layoutConfig')
    layoutConfig.value.globalI18n = command
    Local.set('layoutConfig', layoutConfig.value)
    proxy.$i18n.locale = command
    initI18n()
}


// 初始化言语国际化
const initI18n = () => {
    switch (Local.get('layoutConfig').globalI18n) {
        case 'zh-cn':
            setI18nConfig('zh-cn')
            break
        case 'en':
            setI18nConfig('en')
            break
    }
}


// 设置 element plus 组件的国际化
const setI18nConfig = (locale) => {
    // 传递给 src/App.vue 组件
    proxy.mittBus.emit('getI18nConfig', proxy.$i18n.messages[locale])
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    if (Local.get('layoutConfig')) {
        initI18n()
    }
})
</script>

<style lang='scss' scoped>
</style>