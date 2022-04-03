<template>
    <div class="layout-logo" v-if="!layoutConfig.isCollapse">
        <img :src="logoImg" class="layout-logo-img" />
        <span>{{ layoutConfig.globalTitle }}</span>
    </div>
    <div class="layout-logo" v-if="layoutConfig.isCollapse">
        <img :src="logoImg" class="layout-logo-img" />
    </div>
</template>

<script setup>
import logoImg from '@/assets/images/logo.png' // logo 图片
const store = useStore() // 定义 vuex 实例


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})
</script>

<style lang='scss' scoped>
.layout-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
    color: var(--el-color-primary);
    font-size: 16px;
    cursor: pointer;
    animation: logoAnimation 0.3s ease-in-out;

    .layout-logo-img {
        width: 30px;
    }

    span {
        margin-left: 10px;
    }
}
</style>