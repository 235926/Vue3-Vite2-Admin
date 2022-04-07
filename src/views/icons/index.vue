<template>
    <el-card shadow="hover">
        <el-tabs>
            <el-tab-pane label="Svg-Icons">
                <SvgIcons />
            </el-tab-pane>
            <el-tab-pane label="Element-Icons">
                <ElementIcons />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup>
import SvgIcons from './component/svg-icon.vue' // 个人 svg 图标
import ElementIcons from './component/element-icon.vue' // element 图标
</script>

<style lang='scss' scoped>
.svg-container {
    border-top: 1px solid $-color-border-default;
    border-left: 1px solid $-color-border-default;

    :deep(.icon-item) {
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
                color: var(--el-color-primary);
                transition: all 0.3s ease;
            }

            .icon-name {
                color: var(--el-color-primary);
                transition: all 0.3s ease;
            }
        }
    }
}
</style>