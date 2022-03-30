<template>
    <div class="tagsView">
        <el-scrollbar ref="scrollbarRef">
            <ul ref="tagsUlRef" class="tagsView-ul">
                <li
                    v-for="(tag, index) in state.tagsViewList"
                    :key="index"
                    :data-url="tag.url"
                    class="tagsView-li"
                    :class="{ 'is-active': isActive(tag) }, layoutConfig.tagsViewStyle"
                    :ref="(el) => { if (el) tagsRefs[index] = el }"
                    @click="onTagsClick(tag, index)"
                >
                    <span class="dot" v-if="isActive(tag)"></span>
                    <span class="title">{{ tag.meta.title }}</span>
                    <svg-icon
                        class="refresh"
                        name="refresh"
                        v-if="isActive(tag)"
                        @click.stop="refreshCurrentTagsView($route.fullPath)"
                    />
                    <svg-icon
                        class="close"
                        name="close"
                        v-if="!tag.meta.isAffix && isActive(tag)"
                        @click.stop="closeCurrentTagsView(layoutConfig.isShareTagsView ? tag.path : tag.url)"
                    />
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { onBeforeRouteUpdate } from 'vue-router' // 路由
import { isObjectValueEqual } from '@/utils/tools.js' // 工具方法
import { Session } from '@/utils/storage.js' // 浏览器存储
const { proxy } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const scrollbarRef = ref() // 滚动条
const tagsUlRef = ref()
const tagsRefs = ref([])
const state = reactive({
    routeActive: '',
    routePath: route.path,
    dropdown: { x: '', y: '' },
    tagsRefsIndex: 0,
    tagsViewList: [],
    sortable: '',
    tagsViewRoutesList: [],
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 设置 tagsView 高亮
const isActive = (v) => {
    if (layoutConfig.value.isShareTagsView) {
        return v.path === state.routePath
    } else {
        return v.url ? v.url === state.routeActive : v.path === state.routeActive
    }
}


// 获取 vuex 中的 tagsViewRoutes 列表
const getTagsViewRoutes = async () => {
    state.routeActive = await setTagsViewHighlight(route)
    state.routePath = (await route.meta.isDynamic) ? route.meta.isDynamicPath : route.path
    state.tagsViewList = []
    state.tagsViewRoutesList = store.getters.tagsViewRoutes
    initTagsView()
}


// 处理 tagsView 高亮（多标签详情时使用，单标签详情未使用）
const setTagsViewHighlight = (v) => {
    let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
    if (!params || Object.keys(params).length <= 0) return v.path
    let path = ''
    for (let i in params) {
        path += params[i]
    }
    // 判断是否是动态路由（xxx/:id/:name"）
    return `${v.meta.isDynamic ? v.meta.isDynamicPath : v.path}-${path}`
}


// vuex 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
const initTagsView = async () => {
    if (Session.get('tagsViewList') && layoutConfig.value.isCacheTagsView) {
        state.tagsViewList = await Session.get('tagsViewList')
    } else {
        await state.tagsViewRoutesList.map((v) => {
            if (v.meta.isAffix && !v.meta.isHide) {
                v.url = setTagsViewHighlight(v)
                state.tagsViewList.push({ ...v })
            }
        })
        await addTagsView(route.path, route)
    }
    // 初始化当前元素(li)的下标
    getTagsRefsIndex(layoutConfig.value.isShareTagsView ? state.routePath : state.routeActive)
}


// 1、添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中（可开启多标签详情，单标签详情）
const addTagsView = (path, to) => {
    // 防止拿取不到路由信息
    nextTick(async () => {
        // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
        let item = ''
        if (to && to.meta.isDynamic) {
            // 动态路由（xxx/:id/:name"）：参数不同，开启多个 tagsview
            if (!layoutConfig.value.isShareTagsView) await solveAddTagsView(path, to)
            else await singleAddTagsView(path, to)
            if (state.tagsViewList.some((v) => v.path === to.meta.isDynamicPath)) return false
            item = state.tagsViewRoutesList.find((v) => v.path === to.meta.isDynamicPath)
        } else {
            // 普通路由：参数不同，开启多个 tagsview
            if (!layoutConfig.value.isShareTagsView) await solveAddTagsView(path, to)
            else await singleAddTagsView(path, to)
            if (state.tagsViewList.some((v) => v.path === path)) return false
            item = state.tagsViewRoutesList.find((v) => v.path === path)
        }
        if (item.meta.isLink && !item.meta.isIframe) return false
        if (to && to.meta.isDynamic) item.params = to?.params ? to?.params : route.params
        else item.query = to?.query ? to?.query : route.query
        item.url = setTagsViewHighlight(item)
        await state.tagsViewList.push({ ...item })
        await addBrowserSetSession(state.tagsViewList)
    })
}


// 2、刷新当前 tagsView
const refreshCurrentTagsView = (fullPath) => {
	proxy.mittBus.emit('onTagsViewRefreshRouterView', fullPath)
}


// 处理可开启多标签详情，单标签详情（动态路由（xxx/:id/:name"），普通路由处理）
const solveAddTagsView = async (path, to) => {
    let isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path
    let current = state.tagsViewList.filter(
        (v) =>
            v.path === isDynamicPath &&
            isObjectValueEqual(
                to.meta.isDynamic ? (v.params ? v.params : null) : v.query ? v.query : null,
                to.meta.isDynamic ? (to?.params ? to?.params : null) : to?.query ? to?.query : null
            )
    )
    if (current.length <= 0) {
        // 防止：Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
        let findItem = state.tagsViewRoutesList.find((v) => v.path === isDynamicPath)
        if (findItem.meta.isAffix) return false
        if (findItem.meta.isLink && !findItem.meta.isIframe) return false
        to.meta.isDynamic ? (findItem.params = to.params) : (findItem.query = to.query)
        findItem.url = setTagsViewHighlight(findItem)
        state.tagsViewList.push({ ...findItem })
        addBrowserSetSession(state.tagsViewList)
    }
}


// 处理单标签时，第二次的值未覆盖第一次的 tagsViewList 值（Session Storage）
const singleAddTagsView = (path, to) => {
    let isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path
    state.tagsViewList.forEach((v) => {
        if (
            v.path === isDynamicPath &&
            !isObjectValueEqual(
                to.meta.isDynamic ? (v.params ? v.params : null) : v.query ? v.query : null,
                to.meta.isDynamic ? (to?.params ? to?.params : null) : to?.query ? to?.query : null
            )
        ) {
            to.meta.isDynamic ? (v.params = to.params) : (v.query = to.query)
            v.url = setTagsViewHighlight(v)
            addBrowserSetSession(state.tagsViewList)
        }
    })
}


// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
const addBrowserSetSession = (tagsViewList) => {
    Session.set('tagsViewList', tagsViewList)
}


// 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
const getTagsRefsIndex = (path) => {
    nextTick(async () => {
        // await 使用该写法，防止拿取不到 tagsViewList 列表数据不完整
        let tagsViewList = await state.tagsViewList
        state.tagsRefsIndex = tagsViewList.findIndex((v) => {
            if (layoutConfig.value.isShareTagsView) {
                return v.path === path
            } else {
                return v.url === path
            }
        })
        // 添加初始化横向滚动条移动到对应位置
        tagsViewmoveToCurrentTag()
    })
}


// 更新滚动条显示
const updateScrollbar = () => {
    proxy.$refs.scrollbarRef.update()
}


// 鼠标滚轮滚动
const onHandleScroll = (e) => {
    proxy.$refs.scrollbarRef.$refs.wrap$.scrollLeft += e.wheelDelta / 4
}


// tagsView 横向滚动
const tagsViewmoveToCurrentTag = () => {
    nextTick(() => {
        if (tagsRefs.value.length <= 0) return false
        // 当前 li 元素
        let liDom = tagsRefs.value[state.tagsRefsIndex]
        // 当前 li 元素下标
        let liIndex = state.tagsRefsIndex
        // 当前 ul 下 li 元素总长度
        let liLength = tagsRefs.value.length
        // 最前 li
        let liFirst = tagsRefs.value[0]
        // 最后 li
        let liLast = tagsRefs.value[tagsRefs.value.length - 1]
        // 当前滚动条的值
        let scrollRefs = proxy.$refs.scrollbarRef.$refs.wrap$
        // 当前滚动条滚动宽度
        let scrollS = scrollRefs.scrollWidth
        // 当前滚动条偏移宽度
        let offsetW = scrollRefs.offsetWidth
        // 当前滚动条偏移距离
        let scrollL = scrollRefs.scrollLeft
        // 上一个 tags li dom
        let liPrevTag = tagsRefs.value[state.tagsRefsIndex - 1]
        // 下一个 tags li dom
        let liNextTag = tagsRefs.value[state.tagsRefsIndex + 1]
        // 上一个 tags li dom 的偏移距离
        let beforePrevL = ''
        // 下一个 tags li dom 的偏移距离
        let afterNextL = ''
        if (liDom === liFirst) {
            // 头部
            scrollRefs.scrollLeft = 0
        } else if (liDom === liLast) {
            // 尾部
            scrollRefs.scrollLeft = scrollS - offsetW
        } else {
            // 非头/尾部
            if (liIndex === 0) beforePrevL = liFirst.offsetLeft - 5
            else beforePrevL = liPrevTag?.offsetLeft - 5
            if (liIndex === liLength) afterNextL = liLast.offsetLeft + liLast.offsetWidth + 5
            else afterNextL = liNextTag.offsetLeft + liNextTag.offsetWidth + 5
            if (afterNextL > scrollL + offsetW) {
                scrollRefs.scrollLeft = afterNextL - offsetW
            } else if (beforePrevL < scrollL) {
                scrollRefs.scrollLeft = beforePrevL
            }
        }
        // 更新滚动条，防止不出现
        updateScrollbar()
    })
}


// 当前的 tagsView 项点击时
const onTagsClick = (v, k) => {
    state.tagsRefsIndex = k
    router.push(v)
}









// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    // 初始化 vuex 中的 tagsViewRoutes 列表
    getTagsViewRoutes()
})


// 组件更新前，页面仍未更新，但虚拟DOM已经配置
onBeforeUpdate(() => {
    tagsRefs.value = []
})


// 路由更新时
onBeforeRouteUpdate(async (to) => {
    state.routeActive = setTagsViewHighlight(to)
    state.routePath = to.meta.isDynamic ? to.meta.isDynamicPath : to.path
    await addTagsView(to.path, to)
    getTagsRefsIndex(layoutConfig.value.isShareTagsView ? state.routePath : state.routeActive)
})


// 监听路由的变化，动态赋值给 tagsView
watch(store.state, (val) => {
    if (val.tagsView.tagsViewRoutes.length === state.tagsViewRoutesList.length) return false
    getTagsViewRoutes()
})
</script>

<style lang='scss' scoped>
.tagsView {
    border-bottom: 1px solid $-color-border-light;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

    .tagsView-ul {
        height: 34px;
        list-style: none;
        display: flex;
        align-items: center;
        font-size: 12px;
        white-space: nowrap;
        padding: 0 15px;
        color: $-color-text-regular;

        .tagsView-li {
            .dot {
                background: #fff;
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                left: -3px;
            }

            .title {
                margin: 0 5px;
            }

            .close,
            .refresh {
                &:hover {
                    background: $-color-primary-hover;
                    border-radius: 50%;
                }
            }

            .close {
                position: relative;
                right: -5px;
            }

            .svg-icon {
                width: 14px;
                height: 14px;
            }
        }
    }

    // 风格1
    .tags-style-one {
        height: 26px;
        line-height: 26px;
        display: flex;
        align-items: center;
        border: 1px solid #e6e6e6;
        padding: 0 15px;
        margin-right: 5px;
        border-radius: 2px;
        position: relative;
        z-index: 0;
        cursor: pointer;
        justify-content: space-between;

        &.is-active {
            color: $-color-text-white;
            background: $-color-primary;
            border-color: $-color-primary;
            transition: border-color 3s ease;
        }
    }
}
</style>