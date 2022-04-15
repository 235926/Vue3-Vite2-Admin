<template>
    <el-dropdown trigger="click" class="icon-selector">
        <el-input v-model="state.input1" :placeholder="placeholder">
            <template #prepend>
                <svg-icon name="user" />
            </template>
        </el-input>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup name="iconSelector">
// props
const props = defineProps({
    // 输入框占位文本
    placeholder: {
        type: String,
        default: () => '请输入内容搜索图标或者选择图标',
    },
})


// 定义响应式数据>
const state = reactive({
    isShowPopover: false, // Popover 气泡卡片状态
    input1: ''
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.icon-selector {
    flex: 1;

    :deep(.el-tooltip__trigger) {
        flex: 1;
    }

}
</style>