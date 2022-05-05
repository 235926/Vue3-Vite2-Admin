<template>
    <div class="page-container">
        <el-card shadow="hover" header="svgIcon：演示（支持本地svg）">
            <SvgIcon name="add" color="red" :size="30" />
            <SvgIcon name="404" color="var(--el-color-primary)" :size="30" />
            <SvgIcon name="all" color="#09f" :size="30" />
        </el-card>

        <el-card shadow="hover" header="svgIcon：参数" class="mt20">
            <el-table :data="state.tableData">
                <el-table-column prop="a1" label="参数"> </el-table-column>
                <el-table-column prop="a2" label="说明"> </el-table-column>
                <el-table-column prop="a3" label="类型"> </el-table-column>
                <el-table-column prop="a4" label="可选值"> </el-table-column>
                <el-table-column prop="a5" label="默认值"> </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup name="funcSvgIcon">
// 定义响应式数据>
const state = reactive({
    tableData: [
        {
            a1: 'name',
            a2: 'svg 图标组件名字 / svg 路径 url',
            a3: 'string',
            a4: '',
            a5: '',
        },
        {
            a1: 'size',
            a2: 'svg 大小',
            a3: 'number',
            a4: '',
            a5: 14,
        },
        {
            a1: 'color',
            a2: 'svg 颜色',
            a3: 'string',
            a4: '',
            a5: '',
        },
    ],
})
</script>

<style lang='scss' scoped>
</style>