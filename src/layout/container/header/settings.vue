<template>
    <div class="svg-icon-container" @click="onLayoutSetingClick">
        <SvgIcon name="layout-config" />
    </div>
</template>

<script setup name="settings">
const { proxy } = getCurrentInstance() // vue 实例


// 打开布局设置抽屉
const onLayoutSetingClick = () => {
    proxy.mittBus.emit('openLayoutSetings')
}
</script>

<style lang='scss' scoped>
</style>