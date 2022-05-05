<template>
    <slot v-if="getUserAuthBtnList" />
</template>

<script setup>
const store = useStore() // vuex 实例


// props
const props = defineProps({
    value: {
        type: String,
        default: () => '',
    },
})


// 获取用户信息
const userInfo = computed(() => {
    return store.getters.userInfo
})


// 获取 vuex 中的用户按钮权限
const getUserAuthBtnList = computed(() => {
    return userInfo.value.authBtnList.some((v) => v === props.value)
})
</script>

<style lang='scss' scoped>
</style>