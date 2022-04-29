<template>
    <el-card shadow="hover" class="message-more">
        <template #header>
            <span>消息通知</span>
        </template>
        <el-table :data="state.newsInfoList" border v-loading="state.loading" @row-click="jumpDetails">
            <el-table-column label="排序" align="center" type="index" width="55" />

            <el-table-column label="日期" show-overflow-tooltip width="100">
                <template #default="scope">
                    <span>{{ scope.row.date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="标题" show-overflow-tooltip>
                <template #default="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column label="链接" show-overflow-tooltip>
                <template #default="scope">
                    <span>{{ scope.row.link }}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:currentPage="state.currentPage" v-model:page-size="state.pageSize"
            :page-sizes="[10, 20, 30, 50]" background layout="total, sizes, prev, pager, next, jumper"
            :total="state.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup>
import { userMessageNotice } from '@/api/user.js' // api
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    newsInfoList: [], // 消息通知
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 400, // 总条数
    loading: false, // 加载状态
})


// 获取消息通知
const getUserMessageNotice = () => {
    state.loading = true
    let params = {
        currentPage: state.currentPage,
        pageSize: state.pageSize
    }
    userMessageNotice(params).then(res => {
        state.total = res.total
        state.newsInfoList = res.newsInfoList
        state.loading = false
    })
}


// 跳转详情页
const jumpDetails = (row) => {
    router.push({
        path: '/personal/message-details',
        query: {
            tagsViewName: '跳转详情',
            // item: JSON.stringify(row),
        }
    })
}


// 切换每页条数
const handleSizeChange = (val) => {
    // 解决当前页不是第一页的时候进行切换每页展示条数不回到第一页的问题
    state.currentPage = 1
    state.pageSize = val
    getUserMessageNotice()
}


// 切换当前页
const handleCurrentChange = (val) => {
    state.currentPage = val
    getUserMessageNotice()
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getUserMessageNotice()
})
</script>

<style lang='scss' scoped>
.message-more {
    :deep(.el-table) {
        tr {
            cursor: pointer;
        }
    }
}
</style>