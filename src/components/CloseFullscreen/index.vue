<template>
    <div class="layout-navbars-close-full" v-if="isTagsViewCurrenFull">
        <div class="layout-navbars-close-full-box" title="关闭全屏" @click="onCloseFullscreen">
            <SvgIcon name="close" />
        </div>
    </div>
</template>

<script setup name="layoutCloseFull">
const store = useStore() // vuex 实例


// 获取卡片全屏信息
const isTagsViewCurrenFull = computed(() => {
    return store.getters.isTagsViewCurrenFull
})


// 关闭当前全屏
const onCloseFullscreen = () => {
    store.dispatch('tagsView/setCurrenFullscreen', false)
}
</script>

<style scoped lang="scss">
.layout-navbars-close-full {
    position: fixed;
    z-index: 9999999999;
    right: -30px;
    top: -30px;

    .layout-navbars-close-full-box {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        position: relative;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;

        .svg-icon {
            position: absolute;
            left: 11px;
            top: 35px;
            color: #333333;
            transition: all 0.3s ease;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;

            .svg-icon {
                color: var(--el-color-primary);
                transition: all 0.3s ease;
            }
        }
    }
}
</style>
