<template>
    <el-table :data="state.tableData" v-loading="state.loading">
        <el-table-column type="index" label="序号" width="60" />

        <el-table-column prop="userName" label="账户名称" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ scope.row.userName }}</span>
            </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
            <template #default="scope">
                <span>{{ scope.row.createTime }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
            <template #default="scope">
                <el-button
                    :disabled="scope.row.userName === 'admin'"
                    text
                    type="primary"
                    @click="onOpenEdit(scope.row)"
                    >修改</el-button
                >
                <el-button :disabled="scope.row.userName === 'admin'" text type="primary" @click="onRowDel(scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { systemUser } from '@/api/system.js' // api

// 定义响应式数据>
const state = reactive({
    tableData: [], // 列表数据
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 0, // 总条数
    loading: false, // 加载状态
})

const fetchData = () => {
    state.loading = true
    let params = {
        currentPage: state.currentPage,
        pageSize: state.pageSize,
    }
    systemUser(params).then((res) => {
        state.tableData = res.data
        state.total = res.total
        state.loading = false
    })
}

// 切换每页条数
const handleSizeChange = (val) => {
    // 解决当前页不是第一页的时候进行切换每页展示条数不回到第一页的问题
    state.currentPage = 1
    state.pageSize = val
}

// 切换当前页
const handleCurrentChange = (val) => {
    state.currentPage = val
}
</script>

<style lang="scss" scoped></style>
