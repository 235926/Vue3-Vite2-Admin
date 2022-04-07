<template>
    <el-col :xs="24" :sm="8" class="personal-info">
        <el-card shadow="hover">
            <template #header>
                <span>消息通知</span>
                <span class="personal-info-more">更多</span>
            </template>
            <div class="personal-info-box">
                <ul class="personal-info-ul">
                    <li v-for="(v, k) in state.newsInfoList" :key="k" class="personal-info-li">
                        <a
                            :href="v.link"
                            target="_block"
                            class="personal-info-li-title"
                        >{{ v.title }}</a>
                    </li>
                </ul>
            </div>
        </el-card>
    </el-col>
</template>

<script setup>
import { userMessageNotice } from '@/api/user.js' // api


// 定义响应式数据>
const state = reactive({
    newsInfoList: [], // 消息通知
})


// 获取消息通知
const getUserMessageNotice = () => {
    userMessageNotice().then(res => {
        state.newsInfoList = res.newsInfoList
    })
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getUserMessageNotice()
})
</script>

<style lang='scss' scoped>
@import "@/assets/scss/mixin.scss";
.personal-info {
    .personal-info-more {
        float: right;
        color: var(--el-text-color-secondary);
        font-size: 13px;

        &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
        }
    }

    .personal-info-box {
        height: 130px;
        overflow: hidden;

        .personal-info-ul {
            list-style: none;

            .personal-info-li {
                font-size: 13px;
                padding-bottom: 10px;

                .personal-info-li-title {
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