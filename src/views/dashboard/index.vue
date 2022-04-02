<template>
    <div class="dashboard">
        <el-button>Default</el-button>
        <el-pagination
            v-model:currentPage="currentPage1"
            :page-size="100"
            background="background"
            layout="total, prev, pager, next"
            :total="1000"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup name="dashboard">
const currentPage1 = ref(5)
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}
</script>

<style lang='scss' scoped>
</style>