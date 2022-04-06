<template>
    <el-row class="svg-container">
        <el-col
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
            :xl="2"
            v-for="(icon, index) in icons"
            :key="index"
            class="icon-item"
        >
            <div class="flex-center" @click="handleCopy(icon.name, $event)">
                <el-icon class="svg-icon">
                    <component :is="icon.name" />
                </el-icon>
                <span class="icon-name">{{ icon.name }}</span>
            </div>
        </el-col>
    </el-row>
</template>

<script setup name="iconsElementIcon">
import * as ElIconModules from '@element-plus/icons-vue' // ElementPlus 自带的图标
import { handleClipboard } from "@/plugin/clipboard3.js" // 复制粘贴


// 定义响应式数据
const icons = ref(ElIconModules)


// svg 图标集合名称
const generateIconCode = (name) => {
    return `<el-icon><${name}/></el-icon>`
}


// 复制粘贴
const handleCopy = (name, event) => {
    let text = generateIconCode(name)
    handleClipboard(text, event)
}
</script>

<style lang='scss' scoped>
</style>