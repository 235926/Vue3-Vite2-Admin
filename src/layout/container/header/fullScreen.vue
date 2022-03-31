<template>
    <div class="svg-icon-container" @click="onScreenfullClick">
        <svg-icon :name="state.isScreenfull ? 'fullscreen-exit' : 'fullscreen'" />
    </div>
</template>

<script setup>
import screenfull from 'screenfull' // 全屏插件


// 定义响应式布局
const state = reactive({
	isScreenfull: false, // 是否全屏
})


// 点击切换全屏
const onScreenfullClick = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning('暂不不支持全屏')
        return false
    }
    screenfull.toggle()
    screenfull.on('change', () => {
        if (screenfull.isFullscreen) state.isScreenfull = true
        else state.isScreenfull = false
    })
}
</script>

<style lang='scss' scoped>
</style>