<template>
    <div>message-details</div>
</template>

<script setup>
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    tempRoute: {}, // 临时路由
})


// 设置临时 TagsView 组件标题
const setTagsViewTitle = () => {
    // let title = '消息详情'
    // let newRoute = Object.assign({}, state.tempRoute, { title: `${title}-${route.params.id}` })
    // route.meta.title = '123'
    // console.log(route.meta)
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    setTagsViewTitle()
    // console.log(route.params.id)
})
</script>

<style lang='scss' scoped>
</style>