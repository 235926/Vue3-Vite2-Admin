<template>
    <el-dropdown trigger="click" :show-timeout="70" :hide-timeout="50" @command="handleSetSize">
        <div class="svg-icon-container">
            <svg-icon name="size" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="large" :disabled="state.disabledSize === 'large'">大型</el-dropdown-item>
                <el-dropdown-item command :disabled="state.disabledSize === 'default'">默认</el-dropdown-item>
                <el-dropdown-item command="small" :disabled="state.disabledSize === 'small'">小型</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup name="sizeSelect">
import { Local } from '@/utils/storage.js' // 浏览器存储
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    disabledSize: '', // 当前组件的默认大小
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 初始化全局组件大小
const initComponentSize = () => {
    switch (Local.get('layoutConfig').globalComponentSize) {
        case 'large':
            state.disabledSize = 'large'
            break
        case '':
            state.disabledSize = 'default'
            break
        case 'small':
            state.disabledSize = 'small'
            break
    }
}


// 切换组件默认大小
const handleSetSize = (size) => {
    Local.remove('layoutConfig')
    layoutConfig.value.globalComponentSize = size
    Local.set('layoutConfig', layoutConfig.value)
    initComponentSize()
    window.location.reload() // 需要重新加载下页面才能生效
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    if (Local.get('layoutConfig')) {
        initComponentSize()
    }
})
</script>

<style lang='scss' scoped>
</style>