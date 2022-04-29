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
            <div class="flex-column-center" @click="handleCopy(icon, $event)">
                <SvgIcon :name="icon" />
                <span class="icon-name">{{ icon }}</span>
            </div>
        </el-col>
    </el-row>
</template>

<script setup name="iconsSvgIcon">
import svgIcons from "./svg-icon.js" // svg 图标集合
import { handleClipboard } from "@/plugin/clipboard3.js" // 复制粘贴


// 定义响应式数据
const icons = ref(svgIcons)


// svg 图标集合名称
const generateIconCode = (name) => {
    return `<SvgIcon name="${name}" />`
}


// 复制粘贴
const handleCopy = (name, event) => {
    let text = generateIconCode(name)
    handleClipboard(text, event)
}


// 暴露给vue实例上的数据
defineExpose({
    count: svgIcons.length
})
</script>

<style lang='scss' scoped>
</style>