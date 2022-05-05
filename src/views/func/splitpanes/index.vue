<template>
    <div class="page-container">
        <el-card shadow="hover" header="splitpanes 窗格拆分器">
            <el-alert title="感谢优秀的 `splitpanes`，项目地址：https://github.com/antoniandre/splitpanes" type="success"
                :closable="false" class="mb20"></el-alert>

            <splitpanes class="default-theme" @resize="state.paneSize = $event[0].size" style="height: 500px">
                <pane :size="32">1</pane>
                <pane :size="36">
                    <splitpanes class="default-theme" :horizontal="true">
                        <pane :size="100">2</pane>
                        <pane :size="100">3</pane>
                    </splitpanes>
                </pane>
                <pane :size="32">4</pane>
            </splitpanes>
        </el-card>
    </div>
</template>

<script setup>
import { Splitpanes, Pane } from 'splitpanes' // 窗格拆分器插件
import 'splitpanes/dist/splitpanes.css' // 窗格拆分器样式


// 定义响应式数据>
const state = reactive({
    paneSize: 50,
})
</script>

<style lang='scss' scoped>
.splitpanes__pane {
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    font-size: 70px;
    color: var(--el-color-primary-light-5);
    border: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-color-primary) !important;
}
</style>