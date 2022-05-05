<template>
    <el-aside class="layout-aside" :class="setCollapseStyle">
        <Logo v-if="layoutConfig.isLogo" />

        <el-scrollbar class="flex-auto">
            <el-menu router background-color="transparent" :default-active="state.defaultActive"
                :collapse="layoutConfig.isCollapse" :unique-opened="layoutConfig.isUniqueOpened"
                :collapse-transition="false">
                <template v-for="val in state.menuList">
                    <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
                        <template #title>
                            <SvgIcon :name="val.meta.icon" />
                            <span class="title">{{ val.meta.title }}</span>
                        </template>
                        <SubItem :chil="val.children" />
                    </el-sub-menu>
                    <template v-else>
                        <el-menu-item :index="val.path" :key="val.path">
                            <SvgIcon :name="val.meta.icon" />
                            <template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
                                <span class="title">{{ val.meta.title }}</span>
                            </template>
                            <template #title v-else>
                                <a :href="val.meta.isLink" target="_blank" rel="opener" class="w100 title">{{
                                    val.meta.title }}</a>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script setup name="layoutAsideVertical">
import SubItem from './subItem.vue' // 子级递归菜单
import Logo from '../logo/index.vue' // Logo 页面
import { onBeforeRouteUpdate } from 'vue-router' // 路由方法
import elementResizeDetectorMaker from "element-resize-detector" // 获取DOM元素宽高
import { Local } from '@/utils/storage.js' // 浏览器存储
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 定义响应式数据>
const state = reactive({
    isCollapse: false, // 是否开启菜单水平折叠效果
    menuList: [], // 菜单列表
    defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path, // 菜单高亮（详情时，父级高亮）
})


// 设置/过滤路由（非静态路由/是否显示在菜单中）
const setFilterRoutes = () => {
    if (store.getters.layoutConfig.layout === 'columns') return false
    state.menuList = filterRoutesFun(store.getters.routesList)
}


// 路由过滤递归函数
const filterRoutesFun = (arr) => {
    return arr.filter((item) => !item.meta.isHidden).map((item) => {
        item = Object.assign({}, item);
        if (item.children) item.children = filterRoutesFun(item.children)
        return item
    })
}


// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute) => {
    const { path, meta } = currentRoute
    const pathSplit = meta.isDynamic ? meta.isDynamicPath.split('/') : path.split('/')
    if (pathSplit.length >= 4 && meta.isHidden) return pathSplit.splice(0, 3).join('/')
    else return path
}


// 设置菜单展开/收起时的宽度
const setCollapseStyle = computed(() => {
    const { isCollapse } = store.getters.layoutConfig
    return {
        hideSidebar: isCollapse,
        openSidebar: !isCollapse,
    }
})


// 计算页面宽度，小于1000侧边栏收缩
const pageWidth = () => {
    // 获取缓存中的布局配置
    let localLayoutConfig = Local.get('layoutConfig')
    let app = document.querySelector('#app')
    let erd = elementResizeDetectorMaker()
    erd.listenTo(app, (element) => {
        let width = element.offsetWidth
        if (width <= 1000 && localLayoutConfig.isCollapse) {
            layoutConfig.value.isCollapse = true
        } else if (width <= 1000 && !localLayoutConfig.isCollapse) {
            layoutConfig.value.isCollapse = true
        } else if (width >= 1001 && localLayoutConfig.isCollapse) {
            layoutConfig.value.isCollapse = true
        } else if (width >= 1001 && !localLayoutConfig.isCollapse) {
            layoutConfig.value.isCollapse = false
        }
    })
}


// 监听
watch(store.getters.layoutConfig, () => {
    pageWidth()
}, {
    immediate: true,
})


// 监听vuex值的变化，动态赋值给菜单中
watch(store.state.routesList, () => {
    setFilterRoutes()
}, {
    deep: true,
})


// 组件挂载前，页面仍未展示，但虚拟DOM已经配置
onBeforeMount(() => {
    pageWidth()
    setFilterRoutes()
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    state.defaultActive = setParentHighlight(route)
})


// 路由更新时
onBeforeRouteUpdate((to) => {
    state.defaultActive = setParentHighlight(to)
})
</script>

<style lang='scss' scoped>
</style>