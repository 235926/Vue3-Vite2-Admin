<template>
    <div class="padding20">
        <el-form :model="state.line" label-width="50px">
            <el-form-item label="来往">
                <el-input v-model="state.line.contact" placeholder="来往" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="state.line.type" placeholder="类型" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="label">
                <el-input v-model="state.line.label" placeholder="请输入label内容" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onLineTextReset">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    重置
                </el-button>
                <el-button @click="onLineTextChange" type="primary">
                    <el-icon>
                        <Check />
                    </el-icon>
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup name="funcWorkflowDrawer">
// 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告
const emit = defineEmits(["change", "close"])

// 定义响应式数据>
const state = reactive({
    line: {},
})

// 获取父组件数据
const getParentData = (data) => {
    state.line = data
}

// 重置
const onLineTextReset = () => {
    state.line.label = ""
}

// 保存
const onLineTextChange = () => {
    emit("change", state.line.label)
    emit("close")
}

// 暴露数据到 vue 实例
defineExpose({
    getParentData,
})
</script>

<style lang="scss" scoped></style>
