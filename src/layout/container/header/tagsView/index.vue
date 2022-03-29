<template>
    <div class="tagsView">
        <el-scrollbar ref="scrollbarRef">
            <ul class="tagsView-ul">
                <li
                    class="tagsView-li"
                    v-for="(tag, index) in visitedViews"
                    :key="index"
                    :class="{ 'is-active': isActive(tag) }, layoutConfig.tagsViewStyle"
                >
                    <span class="dot" v-if="isActive(tag)"></span>
                    <span class="title">{{ tag.meta.title }}</span>
                    <svg-icon class="close" name="close" v-if="isActive(tag)" />
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup name="tagsView">
import { onBeforeRouteUpdate } from 'vue-router' // 路由
import { Session } from '@/utils/storage.js' // 浏览器存储
const { proxy: ctx } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const scrollbarRef = ref(null) // 滚动条
const state = reactive({
    affixTags: [], // 固定在视图的部分
    tagsViewList: [], // 视图数组
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 获取视图列表
const visitedViews = computed(() => {
    return store.getters.tagsView
})


// 判断当前页路由是否等于渲染的路由
const isActive = (tag) => {
    return tag.path === route.path
}


// 判断当前页路由是否是固定视图
const isAffix = (tag) => {
    return tag.meta && tag.meta.affix
}


// 初始化试图列表
const initTags = () => {
    let affixTags = state.affixTags = filterAffixTags(router.getRoutes())
    // 添加固定视图到视图列表中
    for (let tag of affixTags) {
        // store.dispatch('tagsView/setTagsView', tag)
    }
}


// 查找固定在 tagsView 视图部分，不可删除
const filterAffixTags = (routes) => {
    let tags = [] // 所有固定的视图
    routes.forEach(route => {
        if (route.name !== "layout" && route.meta && route.meta.isAffix) {
            tags.push(route)
        }

        // 递归获取带有子级数据的视图
        if (route.name !== "layout" && route.children && route.children.length > 0) {
            let tempTags = filterAffixTags(route.children)
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags] // es6合并
            }
        }
    })
    return tags
}


// 添加视图包括缓存视图
const addTags = () => {
    // store.dispatch('tagsView/setTagsView', route)
    addBrowserSetSession(visitedViews.value)
}


// 存储 tagsView 到浏览器临时缓存中，页面刷新时，保留记录
const addBrowserSetSession = (tagsView) => {
	Session.set('tagsView', tagsView)
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initTags()
    addTags()
})


// 监听数据
watch(route, () => {
    if (route) {
        addTags()
    }
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
                margin-right: 5px;
            }

            .close {
                width: 14px;
                height: 14px;
                margin-left: 5px;

                &:hover {
                    background: $-color-primary-hover;
                    border-radius: 50%;
                }
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