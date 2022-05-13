<template>
    <el-pagination
        v-model:currentPage="state.currentPage"
        v-model:page-size="state.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.total"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
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
