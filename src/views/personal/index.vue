<template>
    <div class="personal">
        <el-row :gutter="20" class="row-gap">
            <!-- 个人信息 -->
            <Welcome />

            <!-- 消息通知 -->
            <Message />

            <!-- 营销推荐 -->
            <Recommend />
        </el-row>
    </div>
</template>

<script setup>
import Welcome from './component/welcome.vue' // 个人信息
import Message from './component/message.vue' // 个人信息
import Recommend from './component/recommend.vue' // 营销推荐
const { proxy } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const state = reactive({

})
</script>

<style lang='scss' scoped>
</style>