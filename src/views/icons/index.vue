<template>
    <div class="svg-container">
        <div class="title">Svg 图标</div>
        <ul class="icon-list">
            <li v-for="icon in icons" :key="icon" @click="handleCopy(icon, $event)">
                <div class="icon-item">
                    <span class="icon">
                        <svg-icon :name="icon" />
                    </span>
                    <span class="icon-name">{{ icon }}</span>
                </div>
            </li>
        </ul>
    </div>
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
    box-sizing: border-box;
    border-radius: 3px;

    .title {
        font-weight: 400;
        color: #1f2f3d;
        font-size: 28px;
    }

    .icon-list {
        margin: 20px 0;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 150px);
        grid-gap: 10px;

        li {
            color: #666;
            font-size: 13px;
            border: 1px solid #ccc;
            height: 150px;

            .icon-item {
                width: 100%;
                height: 100%;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            &:hover {
                box-shadow: 0 2px 12px #0000001a;
                transition: all 0.3s ease 0s;

                .icon,
                .icon-name {
                    color: #0095e1;
                }
            }

            .icon {
                font-size: 32px;
                margin-bottom: 15px;
            }

            .icon-name {
                text-align: center;
                display: inline-block;
                vertical-align: middle;
                line-height: normal;
                color: #99a9bf;
                transition: color 0.15s linear;
            }
        }
    }
}
</style>