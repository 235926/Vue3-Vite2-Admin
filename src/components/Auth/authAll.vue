<template>
    <slot v-if="getUserAuthBtnList" />
</template>

<script setup>
import { judementSameArr } from '@/utils/tools.js' // 判断两数组是否相同
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
    return judementSameArr(props.value, userInfo.value.authBtnList)
})
</script>

<style lang='scss' scoped>
</style>