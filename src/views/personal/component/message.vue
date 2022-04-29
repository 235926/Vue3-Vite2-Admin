<template>
    <el-col :xs="24" :sm="8" class="personal-message">
        <el-card shadow="hover">
            <template #header>
                <span>消息通知</span>
                <span class="personal-message-more" @click="router.push('/personal/message-more')">更多</span>
            </template>
            <div class="personal-message-box">
                <ul class="personal-message-ul">
                    <li v-for="(item, index) in state.newsInfoList" :key="index" class="personal-message-li">
                        <a class="personal-message-li-title" @click="jumpDetails(item, index)">{{ item.title }}</a>
                    </li>
                </ul>
            </div>
        </el-card>
    </el-col>
</template>

<script setup>
import { userMessageNotice } from '@/api/user.js' // api
const { proxy } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const state = reactive({
    newsInfoList: [], // 消息通知
    value: '',
})


// 获取消息通知
const getUserMessageNotice = () => {
    userMessageNotice().then(res => {
        state.newsInfoList = res.newsInfoList
    })
}


// 跳转详情页
const jumpDetails = (item, index) => {
    router.push({
        path: '/personal/message-details',
        query: {
            id: state.value,
            tagsViewName: item.title,
            item: JSON.stringify(item)
        }
    })
    state.value = ''

}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getUserMessageNotice()
})
</script>

<style lang='scss' scoped>
@import "@/assets/scss/mixin.scss";

.personal-message {
    .personal-message-more {
        float: right;
        color: var(--el-text-color-secondary);
        font-size: 13px;

        &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
        }
    }

    .personal-message-box {
        height: 130px;
        overflow: hidden;

        .personal-message-ul {
            list-style: none;

            .personal-message-li {
                font-size: 13px;
                padding-bottom: 10px;

                .personal-message-li-title {
                    display: inline-block;
                    @include text-ellipsis(1);
                    color: var(--el-text-color-secondary);
                    text-decoration: none;
                }

                & a:hover {
                    color: var(--el-color-primary);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>