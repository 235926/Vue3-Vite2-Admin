<template>
    <slot v-if="getUserAuthBtnList" />
</template>

<script setup>
const store = useStore() // vuex 实例


// props
const props = defineProps({
    value: {
        type: Array,
        default: () => [],
    },
})


// 获取用户信息
const userInfo = computed(() => {
    return store.getters.userInfo
})


// 获取 vuex 中的用户按钮权限
const getUserAuthBtnList = computed(() => {
    let flag = false
    userInfo.value.authBtnList.map((val) => {
        props.value.map((v) => {
            if (val === v) flag = true
        })
    })
    return flag
})
</script>

<style lang='scss' scoped>
</style>