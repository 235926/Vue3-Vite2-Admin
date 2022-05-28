<template>
    <div class="page-container drag-container">
        <el-card shadow="hover" header="拖动指令效果（v-drag）作用于 Dialog 对话框">
            <el-button type="primary" @click="state.dialogVisible = true">
                <el-icon>
                    <Pointer />
                </el-icon>
                点击打开 Dialog
            </el-button>
        </el-card>

        <el-card shadow="hover" header="自定义div" class="mt20">
            <div class="drag-dom">
                <div class="drag-header">
                    <el-button type="success" v-drag="['.drag-container .drag-dom', '.drag-container .drag-header']">
                        <el-icon>
                            <Pointer />
                        </el-icon>
                        按住进行拖动测试
                    </el-button>
                </div>
            </div>
        </el-card>

        <!-- 弹窗 dialog 节点 -->
        <el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" destroy-on-close width="800px">
            <template #header>
                <div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']">拖动指令效果（v-drag）</div>
            </template>
            <el-scrollbar class="scrollbar-x">
                <div class="dialog-main">鼠标放标题头进行 Dialog 对话框拖动</div>
                <div>此处使用的是封装的拖拽指令，`el-dialog` 有自带的拖拽参数设置 draggable 即可</div>
            </el-scrollbar>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="state.dialogVisible = false">修 改</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="funcDrag">
// 定义响应式数据>
const state = reactive({
    dialogVisible: false, // 弹窗状态
})
</script>

<style lang='scss' scoped>
.drag-container {
    .drag-dom {
        position: relative; // 不设置的话，自定义拖拽不好使
        display: inline-block;

        .drag-header {
            display: inline-block;
        }
    }
}
</style>