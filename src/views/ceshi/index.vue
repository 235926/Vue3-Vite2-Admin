<template>
    <el-button ref="buttonRef" v-click-outside="onClickOutside">
        <span>Click me</span>
        <span @click.stop.prevent>Click home</span>
    </el-button>

    <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
        <span> Some content </span>
    </el-popover>
</template>

<script setup>
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}
</script>

<style lang='scss' scoped>
</style>