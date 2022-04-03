<template>
    <el-card shadow="hover" :header="`Svg-Icon 图标：${icons.length}个`">
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
                <div class="flex-center" @click="handleCopy(icon, $event)">
                    <svg-icon :name="icon" />
                    <span class="icon-name">{{ icon }}</span>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import svgIcons from "./svg-icons.js" // svg 图标集合
import { handleClipboard } from "@/plugin/clipboard3.js" // 复制粘贴


// 定义响应式数据
const icons = ref(svgIcons)


// svg 图标集合名称
const generateIconCode = (name) => {
    return `<svg-icon name="${name}" />`
}


// 复制粘贴
const handleCopy = (name, event) => {
    let text = generateIconCode(name)
    handleClipboard(text, event)
}
</script>

<style lang='scss' scoped>
.svg-container {
    border-top: 1px solid $-color-border-default;
    border-left: 1px solid $-color-border-default;

    .icon-item {
        text-align: center;
        border-right: 1px solid $-color-border-default;
        border-bottom: 1px solid $-color-border-default;
        height: 120px;
        overflow: hidden;
        display: flex;
        transition: all 0.3s ease;

        .svg-icon {
            font-size: 30px;
        }

        .icon-name {
            margin-top: 10px;
        }

        &:hover {
            box-shadow: 0 2px 12px $-color-dark-hover;
            cursor: pointer;
            transition: all 0.3s ease;

            .svg-icon {
                color: $-color-primary;
                transition: all 0.3s ease;
            }

            .icon-name {
                color: $-color-primary;
                transition: all 0.3s ease;
            }
        }
    }
}
</style>