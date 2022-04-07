<template>
    <el-col :span="24">
        <el-card shadow="hover" header="营销推荐">
            <el-row :gutter="20" class="personal-recommend-row">
                <el-col
                    :sm="6"
                    v-for="(v, k) in state.recommendList"
                    :key="k"
                    class="personal-recommend-col"
                >
                    <div class="personal-recommend" :style="{ 'background-color': v.bg }">
                        <div class="personal-recommend-icon flex-center">
                            <el-icon :style="{ color: v.iconColor }">
                                <component :is="v.icon" />
                            </el-icon>
                        </div>
                        <div class="personal-recommend-desc flex-column-center">
                            <div>{{ v.title }}</div>
                            <div class="personal-recommend-msg">{{ v.msg }}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<script setup>
import { userRecommendList } from '@/api/user.js' // api


// 定义响应式数据>
const state = reactive({
    recommendList: [], // 营销推荐
})


// 获取营销推荐
const getUserRecommendList = () => {
    userRecommendList().then(res => {
        state.recommendList = res.recommendList
    })
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getUserRecommendList()
})
</script>

<style lang='scss' scoped>
.personal-recommend-row {
    .personal-recommend-col {
        .personal-recommend {
            height: 100px;
            color: var(--el-text-color-primary);
            border-radius: 3px;
            overflow: hidden;
            cursor: pointer;
            display: flex;

            .personal-recommend-icon {
                flex: 0 0 30%;

                .el-icon {
                    font-size: 40px;
                }

                &:hover {
                    .el-icon {
                        animation: logoAnimation 0.3s ease-in-out;
                    }
                }
            }

            .personal-recommend-desc {
                align-items: flex-start;

                .personal-recommend-msg {
                    font-size: 12px;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>