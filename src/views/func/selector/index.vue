<template>
    <div class="page-container">
        <el-card shadow="hover" header="图标选择器(宽度自动)：">
            <IconSelector @get="onGetIcon" @clear="onClearIcon" v-model="state.modelIcon" />
        </el-card>

        <el-card shadow="hover" header="图标选择器(宽度自动)：参数" class="mt20">
            <el-table :data="state.tableData">
                <el-table-column prop="a1" label="参数"> </el-table-column>
                <el-table-column prop="a2" label="说明"> </el-table-column>
                <el-table-column prop="a3" label="类型"> </el-table-column>
                <el-table-column prop="a4" label="可选值"> </el-table-column>
                <el-table-column prop="a5" label="默认值"> </el-table-column>
            </el-table>
        </el-card>

        <el-card shadow="hover" header="图标选择器(宽度自动)：事件" class="mt20">
            <el-table :data="state.tableData1">
                <el-table-column prop="a1" label="事件名称"> </el-table-column>
                <el-table-column prop="a2" label="说明"> </el-table-column>
                <el-table-column prop="a3" label="类型"> </el-table-column>
                <el-table-column prop="a4" label="回调参数"> </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup name="funcSelector">
import IconSelector from '@/components/IconSelector/index.vue' // 图标选择器组件


// 定义响应式数据>
const state = reactive({
    modelIcon: '', // 当前选择的图标
    tableData: [
        {
            a1: 'prepend',
            a2: '输入框前置内容，只能字体图标',
            a3: 'string',
            a4: '',
            a5: 'pointer',
        },
        {
            a1: 'placeholder',
            a2: '输入框占位文本',
            a3: 'string',
            a4: '',
            a5: '请输入内容搜索图标或者选择图标',
        },
        {
            a1: 'size',
            a2: '尺寸',
            a3: 'string',
            a4: 'large / default / small',
            a5: 'default',
        },
        {
            a1: 'title',
            a2: '弹窗标题',
            a3: 'string',
            a4: '',
            a5: '请选择图标',
        },
        {
            a1: 'type',
            a2: 'icon 图标类型',
            a3: 'string',
            a4: 'ali / ele / awe / all',
            a5: 'ele',
        },
        {
            a1: 'disabled',
            a2: '禁用',
            a3: 'boolean',
            a4: 'true',
            a5: 'false',
        },
        {
            a1: 'clearable',
            a2: '是否可清空',
            a3: 'boolean',
            a4: 'false',
            a5: 'true',
        },
        {
            a1: 'emptyDescription',
            a2: '自定义空状态描述文字',
            a3: 'String',
            a4: '',
            a5: '无相关图标',
        },
    ],
    tableData1: [
        {
            a1: 'get',
            a2: '获取当前点击的 icon 图标',
            a3: 'function',
            a4: '(icon: string)',
        },
        {
            a1: 'clear',
            a2: '清空当前点击的 icon 图标',
            a3: 'function',
            a4: '(icon: string)',
        },
    ],
})


// 获取当前点击的 icon 图标
const onGetIcon = (icon) => {
    console.log(icon)
}


// 清空当前点击的 icon 图标，在 src/components/IconSelector/index.vue 中去掉了清除功能，只保留了 el-input 原生的清除事件
const onClearIcon = (icon) => {
    console.log(icon)
}
</script>

<style lang='scss' scoped>
</style>