<template>
    <div
        class="layout-view-bg-white flex"
        :style="{ height: `calc(100vh - ${setIframeHeight}`, border: 'none' }"
        v-loading="state.iframeLoading"
    >
        <iframe
            :src="state.iframeUrl"
            frameborder="0"
            height="100%"
            width="100%"
            id="iframe"
            v-show="!state.iframeLoading"
        ></iframe>
    </div>
</template>

<script setup name="layoutIfameView">
const route = useRoute() // 路由参数
const store = useStore() // vuex
const state = reactive({ // 定义响应式数据
    iframeLoading: true,
    iframeUrl: '',
})


// 初始化页面加载 loading
const initIframeLoad = () => {
    state.iframeUrl = route.meta.isLink
    nextTick(() => {
        state.iframeLoading = true
        const iframe = document.getElementById('iframe')
        if (!iframe) return false
        iframe.onload = () => {
            state.iframeLoading = false
        }
    })
}


// 设置 iframe 的高度
const setIframeHeight = computed(() => {
    let { isTagsview } = store.getters.layoutConfig
    let { isTagsViewCurrenFull } = store.getters.tagsViewRoutes
    if (isTagsViewCurrenFull) {
        return `1px`
    } else {
        if (isTagsview) return `85px`
        else return `50px`
    }
})


// 页面加载时
onMounted(() => {
    initIframeLoad();
})


// 监听路由变化，多个 iframe 时使用
watch(() => route.path, () => {
    initIframeLoad()
})
</script>
