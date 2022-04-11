<template>
    <el-drawer v-model="state.drawer" :direction="state.direction" destroy-on-close size="400px">
        <template #title>
            <span>布局配置</span>
        </template>
        <template #default>
            <el-scrollbar class="layout-settings-main">
                <el-divider content-position="left">全局主题</el-divider>
                <div class="drawer-item">
                    <span>是否开启后端控制路由</span>
                    <el-switch v-model="layoutConfig.isRequestRoutes" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>项目标题</span>
                    <el-input
                        v-model="layoutConfig.globalTitle"
                        placeholder="项目标题"
                        @change="switchLayoutConfig"
                    />
                </div>

                <div class="drawer-item">
                    <span>主页面切换动画</span>
                    <el-select
                        v-model="layoutConfig.animation"
                        placeholder="请选择"
                        @change="switchLayoutConfig"
                    >
                        <el-option label="slide-right" value="slide-right"></el-option>
                        <el-option label="slide-left" value="slide-left"></el-option>
                        <el-option label="opacitys" value="opacitys"></el-option>
                    </el-select>
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

                <el-divider content-position="left">Header 部分</el-divider>
                <div class="drawer-item">
                    <span>开启固定 Header</span>
                    <el-switch v-model="layoutConfig.isFixedHeader" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启显示菜单水平折叠</span>
                    <el-switch v-model="layoutConfig.isShowCollapse" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Breadcrumb</span>
                    <el-switch v-model="layoutConfig.isBreadcrumb" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Breadcrumb 图标</span>
                    <el-switch
                        v-model="layoutConfig.isBreadcrumbIcon"
                        @change="switchLayoutConfig"
                    />
                </div>

                <div class="drawer-item">
                    <span>开启修改全局组件大小</span>
                    <el-switch
                        v-model="layoutConfig.isGlobalComponentSize"
                        @change="switchLayoutConfig"
                    />
                </div>

                <div class="drawer-item">
                    <span>开启全屏展示组件</span>
                    <el-switch v-model="layoutConfig.isFullScreen" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启国际化切换语言</span>
                    <el-switch v-model="layoutConfig.isLanguage" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Tagsview 视图</span>
                    <el-switch v-model="layoutConfig.isTagsview" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Tagsview 图标</span>
                    <el-switch v-model="layoutConfig.isTagsviewIcon" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Tagsview 缓存</span>
                    <el-switch v-model="layoutConfig.isCacheTagsView" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>开启 Tagsview 拖拽</span>
                    <el-switch
                        v-model="layoutConfig.isSortableTagsView"
                        @change="switchLayoutConfig"
                    />
                </div>

                <div class="drawer-item">
                    <span>开启 Tagsview 共用</span>
                    <el-switch v-model="layoutConfig.isShareTagsView" @change="switchLayoutConfig" />
                </div>

                <div class="drawer-item">
                    <span>设置 tagsView 风格</span>
                    <el-select
                        v-model="layoutConfig.tagsViewStyle"
                        placeholder="请选择"
                        @change="switchLayoutConfig"
                    >
                        <el-option label="风格1" value="tags-style-one"></el-option>
                        <el-option label="风格2" value="tags-style-two"></el-option>
                        <el-option label="风格3" value="tags-style-three"></el-option>
                    </el-select>
                </div>

                <el-divider content-position="left">Aside 部分</el-divider>
                <div class="drawer-item">
                    <span>是否开启 logo 图标展示</span>
                    <el-switch v-model="layoutConfig.isLogo" @change="switchLayoutConfig" />
                </div>

                <el-divider>到底了</el-divider>
            </el-scrollbar>
        </template>
    </el-drawer>
</template>

<script setup name="layoutSettingsDrawer">
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
import { getLightColor, getDarkColor } from '@/utils/theme.js' // 改变主题色方法
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const predefineColors = ref([ // 更改主题预定义颜色
    '#409eff', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',
])
const state = reactive({
    drawer: false, // 开启显示 Drawer
    direction: 'rtl', // Drawer 打开的方向
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 切换 layoutConfig 状态
const switchLayoutConfig = () => {
    setLocalThemeConfig()
}


// 切换主题颜色
const onColorPickerChange = () => {
    // 颜色加深
    document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(layoutConfig.value.primary, 0.1)}`)
    document.documentElement.style.setProperty('--el-color-primary', layoutConfig.value.primary)
    // 颜色变浅，不设置的话，更改完主题色，hover 效果什么的不发生变化，还是原来的主题色配套
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(layoutConfig.value.primary, i / 10)}`)
    }
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
    Local.remove('layoutConfig')
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
        > .el-input,
        > .el-select {
            flex: 1;
        }
    }
}
</style>