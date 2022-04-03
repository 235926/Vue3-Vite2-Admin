<template>
    <el-drawer v-model="state.drawer" :direction="state.direction" destroy-on-close size="400px">
        <template #title>
            <span>布局配置</span>
        </template>
        <template #default>
            <el-scrollbar class="layout-settings-main">
                <el-divider content-position="left">全局主题</el-divider>
                <div class="drawer-item">
                    <span>项目标题</span>
                    <el-input
                        v-model="layoutConfig.globalTitle"
                        placeholder="项目标题"
                        @change="onAddTitleChange"
                    />
                </div>

                <div class="drawer-item">
                    <span>主题颜色</span>
                    <el-color-picker
                        v-model="layoutConfig.primary"
                        @change="onColorPickerChange"
                        :predefine="predefineColors"
                    ></el-color-picker>
                </div>

                <div class="drawer-item">
                    <span>灰色模式</span>
                    <el-switch
                        v-model="layoutConfig.isGrayscale"
                        @change="onAddFilterChange('grayscale')"
                    />
                </div>

                <div class="drawer-item">
                    <span>色弱模式</span>
                    <el-switch
                        v-model="layoutConfig.isInvert"
                        @change="onAddFilterChange('invert')"
                    />
                </div>

                <div class="drawer-item">
                    <span>深色模式</span>
                    <el-switch v-model="layoutConfig.isDark" @change="onAddDarkChange" />
                </div>
            </el-scrollbar>
        </template>
    </el-drawer>
</template>

<script setup name="layoutSettings">
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const predefineColors = ref([ // 更改主题预定义颜色
    '#409eff', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',
])
const state = reactive({
    drawer: false, // 是否显示 Drawer
    direction: 'rtl', // Drawer 打开的方向
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 设置网站主标题
const onAddTitleChange = () => {
    setLocalThemeConfig()
}


// 切换主题颜色
const onColorPickerChange = () => {
    document.documentElement.style.setProperty('--el-color-primary', layoutConfig.value.primary)
    setDispatchThemeConfig()
}


// 全局主题 --> 灰色模式/色弱模式
const onAddFilterChange = (attr) => {
    if (attr === 'grayscale') {
        if (layoutConfig.value.isGrayscale) layoutConfig.value.isInvert = false
    } else {
        if (layoutConfig.value.isInvert) layoutConfig.value.isGrayscale = false
    }
    const cssAttr = attr === 'grayscale' ? `grayscale(${layoutConfig.value.isGrayscale ? 1 : 0})` : `invert(${layoutConfig.value.isInvert ? '80%' : '0%'})`

    document.body.setAttribute('style', `filter: ${cssAttr}`)
    setLocalThemeConfig()
}


// 深色模式
const onAddDarkChange = () => {
    const body = document.documentElement
    if (layoutConfig.value.isDark) body.setAttribute('data-theme', 'dark')
    else body.setAttribute('data-theme', '')
}


// 触发 store 布局配置更新
const setDispatchThemeConfig = () => {
    setLocalThemeConfig()
    setLocalThemeConfigStyle()
}


// 存储布局配置
const setLocalThemeConfig = () => {
    Local.remove('layoutConfig');
    Local.set('layoutConfig', layoutConfig.value)
}


// 存储布局配置全局主题样式（html根标签）,也就是 :root 部分
const setLocalThemeConfigStyle = () => {
    Local.set('layoutConfigStyle', document.documentElement.style.cssText)
}












// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    // 监听布局配置弹窗点击打开
    nextTick(() => {
        proxy.mittBus.on('openSetingsDrawer', () => {
            state.drawer = true
        })

        setTimeout(() => {
            // 默认样式
            onColorPickerChange()

            // 灰色模式
            if (layoutConfig.value.isGrayscale) onAddFilterChange('grayscale')

            // 色弱模式
            if (layoutConfig.value.isInvert) onAddFilterChange('invert')

            // 深色模式
            if (layoutConfig.value.isDark) onAddDarkChange()
        }, 100)
    })
})


// 页面卸载时
onUnmounted(() => {
    proxy.mittBus.off('openSetingsDrawer')
})
</script>

<style lang='scss' scoped>
.layout-settings-main {
    height: calc(100vh - 50px);
    padding: 0 20px;

    .drawer-item {
        color: $-color-text-default;
        font-size: 14px;
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > span,
        >.el-input {
            flex: 1;
        }
    }
}
</style>