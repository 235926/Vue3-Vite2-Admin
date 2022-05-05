<template>
    <div class="page-container">
        <el-card shadow="hover">
            <el-tabs>
                <el-tab-pane :label="`Svg-Icons(${state.svgIconsCount})`">
                    <SvgIcons ref="svgIcons" />
                </el-tab-pane>
                <el-tab-pane :label="`Element-Icons(${state.elementIconsCount})`">
                    <ElementIcons ref="elementIcons" />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup>
import SvgIcons from './component/svg-icon.vue' // 个人 svg 图标
import ElementIcons from './component/element-icon.vue' // element 图标
const svgIcons = ref()
const elementIcons = ref()
const state = reactive({
    svgIconsCount: 0,
    elementIconsCount: 0,
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    state.svgIconsCount = svgIcons?.value?.count
    state.elementIconsCount = elementIcons?.value?.count
})
</script>

<style lang='scss' scoped>
.svg-container {
    border-top: 1px solid var(--el-border-color-lighter);
    border-left: 1px solid var(--el-border-color-lighter);

    :deep(.icon-item) {
        text-align: center;
        border-right: 1px solid var(--el-border-color-lighter);
        border-bottom: 1px solid var(--el-border-color-lighter);
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
            box-shadow: 0 2px 12px var(--dl-color-dark-hover);
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