<template>
    <div
        class="layout-view-bg-white flex layout-view-link"
        :style="{ height: `calc(100vh - ${setLinkHeight}` }"
    >
        <a
            :href="state.currentRouteMeta.isLink"
            target="_blank"
            rel="opener"
            class="flex-margin"
        >{{ state.currentRouteMeta.title }}：{{ state.currentRouteMeta.isLink }}</a>
    </div>
</template>

<script setup name="layoutLinkView">
const route = useRoute() // 路由参数
const store = useStore() // vuex
const state = reactive({ // 定义响应式数据
    currentRouteMeta: {
        isLink: '',
        title: '',
    },
})


// 设置 link 的高度
const setLinkHeight = computed(() => {
    let { isTagsview } = store.getters.layoutConfig
    if (isTagsview) return `125px`
    else return `80px`
})


// 监听路由的变化，设置内容
watch(() => route.path, () => {
    state.currentRouteMeta = route.meta
}, {
    immediate: true
})
</script>
