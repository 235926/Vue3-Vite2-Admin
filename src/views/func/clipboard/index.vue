<template>
    <el-card shadow="hover" header="复制剪切演示">
        <el-alert title="感谢优秀的 `vue-clipboard3`，项目地址：https://github.com/JamieCurnow/vue-clipboard3" type="success"
            :closable="false" class="mb20"></el-alert>

        <el-input placeholder="请输入内容" v-model="state.copyVal">
            <template #append>
                <el-button @click="handleClipboard(state.copyVal)">复制链接</el-button>
            </template>
        </el-input>
        <el-input placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ " v-model="state.shearVal" class="mt15"> </el-input>
    </el-card>
</template>

<script setup name="funcClipboard">
import { handleClipboard } from "@/plugin/clipboard3.js" // 复制粘贴


// 定义响应式数据>
const state = reactive({
    copyVal: 'https://vue3-vite2-admin.vercel.app/#/dashboard',
    shearVal: '',
})
</script>

<style lang='scss' scoped>
</style>