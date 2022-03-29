<template>
    <el-aside class="layout-aside" :class="setCollapseStyle">
        <el-scrollbar class="flex-auto">
            <el-menu
                router
                background-color="transparent"
                :default-active="state.defaultActive"
                :collapse="layoutConfig.isCollapse"
                :unique-opened="layoutConfig.isUniqueOpened"
                :collapse-transition="false"
            >
                <template v-for="val in state.menuList">
                    <el-sub-menu
                        :index="val.path"
                        v-if="val.children && val.children.length > 0"
                        :key="val.path"
                    >
                        <template #title>
                            <svg-icon :name="val.meta.icon" />
                            <span>{{ val.meta.title }}</span>
                        </template>
                        <SubItem :chil="val.children" />
                    </el-sub-menu>
                    <template v-else>
                        <el-menu-item :index="val.path" :key="val.path">
                            <svg-icon :name="val.meta.icon" />
                            <template
                                #title
                                v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)"
                            >
                                <span>{{ val.meta.title }}</span>
                            </template>
                            <template #title v-else>
                                <a
                                    :href="val.meta.isLink"
                                    target="_blank"
                                    rel="opener"
                                    class="w100"
                                >{{ val.meta.title }}</a>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script setup name="layoutAsideVertical">
import { onBeforeRouteUpdate } from 'vue-router' // 路由方法
import SubItem from '@/layout/container/aside/subItem.vue' // 子级递归菜单
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 定义响应式数据>
const state = reactive({
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
    return arr.filter((item) => !item.meta.isHide).map((item) => {
        item = Object.assign({}, item);
        if (item.children) item.children = filterRoutesFun(item.children)
        return item
    })
}


// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute) => {
    const { path, meta } = currentRoute
    const pathSplit = meta.isDynamic ? meta.isDynamicPath.split('/') : path.split('/')
    if (pathSplit.length >= 4 && meta.isHide) return pathSplit.splice(0, 3).join('/')
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


// 组件挂载前，页面仍未展示，但虚拟DOM已经配置
onBeforeMount(() => {
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