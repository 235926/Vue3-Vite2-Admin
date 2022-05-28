<template>
    <el-breadcrumb
        class="layout-breadcrumb"
        :style="{ 'padding-left': layoutConfig.isShowCollapse ? '5px' : '20px' }"
    >
        <transition-group name="breadcrumb" mode="out-in">
            <el-breadcrumb-item v-for="(v, k) in state.breadcrumbList" :key="v.meta.title">
                <span v-if="k === state.breadcrumbList.length - 1">
                    <SvgIcon :name="v.meta.icon" v-if="layoutConfig.isBreadcrumbIcon" />
                    {{ v.meta.title }}
                </span>
                <a v-else @click.prevent="onBreadcrumbClick(v)">
                    <SvgIcon :name="v.meta.icon" v-if="layoutConfig.isBreadcrumbIcon" />
                    {{ v.meta.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup name="breadcrumb">
import { onBeforeRouteUpdate } from 'vue-router' // 路由
import { useTitle } from '@/utils/global.js' // 修改项目布局方法
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例

// 定义响应式数据>
const state = reactive({
    breadcrumbList: [], // 面包屑列表
    routeSplit: [],
    routeSplitFirst: '',
    routeSplitIndex: 1,
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 当前路由字符串切割成数组，并删除第一项空内容
const initRouteSplit = (path) => {
    // 如果为 false 不显示面包屑
    if (!layoutConfig.value.isBreadcrumb) return false
    state.breadcrumbList = [store.getters.routesList[0]]
    state.routeSplit = path.split('/')
    state.routeSplit.shift()
    state.routeSplitFirst = `/${state.routeSplit[0]}`
    state.routeSplitIndex = 1
    getBreadcrumbList(store.getters.routesList)
    if (route.name === 'dashboard' || (route.name === 'notFound' && state.breadcrumbList.length > 1)) state.breadcrumbList.shift();
	if (state.breadcrumbList.length > 0) state.breadcrumbList[state.breadcrumbList.length - 1].meta.tagsViewName = useTitle(route)
}


// 处理面包屑数据
const getBreadcrumbList = (arr) => {
    arr.map((item) => {
        state.routeSplit.map((v, k, arrs) => {
            if (state.routeSplitFirst === item.path) {
                state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`
                state.breadcrumbList.push(item)
                state.routeSplitIndex++
                if (item.children) getBreadcrumbList(item.children)
            }
        })
    })
}


// 面包屑点击时
const onBreadcrumbClick = (v) => {
    const { redirect, path } = v
    if (redirect) router.push(redirect)
    else router.push(path)
}


// 页面加载时
onMounted(() => {
    initRouteSplit(route.path)
})


// 路由更新时
onBeforeRouteUpdate((to) => {
    initRouteSplit(to.path)
})
</script>

<style lang='scss' scoped>
.layout-breadcrumb {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;

    .el-breadcrumb__item {
        .el-breadcrumb__inner.is-link,
        .el-breadcrumb__inner a {
            color: #303133;
            font-weight: 400;

            &:hover {
                color: var(--el-color-primary);
            }
        }

        &:last-child {
            .el-breadcrumb__inner span {
                color: #97a8be;
            }
        }
    }

    .svg-icon {
        margin-right: 5px;
    }
}
</style>