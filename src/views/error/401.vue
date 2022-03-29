<template>401</template>

<script setup>
import { reactive, onMounted, getCurrentInstance } from 'vue' // vue 内置方法
import { useRoute, useRouter } from 'vue-router' // 路由
import { useStore } from 'vuex' // 引入 vuex
const { proxy: ctx } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例


// 定义响应式数据>
const state = reactive({

})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})
</script>

<style lang='scss' scoped>
</style>