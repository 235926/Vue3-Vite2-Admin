<template>
    <div class="pinia">
        <el-card shadow="hover" header="pinia 状态管理">
            <el-alert
                title="中文官网：https://pinia.web3doc.top/introduction.html"
                type="success"
                :closable="false"
                class="mb20"
            ></el-alert>

            <div>{{ num }} - {{ name }} <button @click="changeName">修改名称</button></div>
            <div>getters是有缓存机制的-{{ changeNum }}-{{ changeNum }}-{{ changeNum }}</div>
            <div><button @click="btn">actions操作</button></div>
        </el-card>
    </div>
</template>

<script setup name="learningPinia">
import { storeToRefs } from 'pinia' // pinia api
import { useShop } from '@/pinia/shop.js' // pinia
const shopStore = useShop()

// 如果需要修改数据需要使用storeToRefs进行结构
let { name, num, changeNum } = storeToRefs(shopStore)

// 修改名称
const changeName = () => {
    // name.value = '李四'
    // num.value = 10

    // 批量修改还可以用另一种方式
    shopStore.$patch((shopStore) => {
        shopStore.name = '李四'
        shopStore.num = 10
    })
}

// actions操作
const btn = () => {
    shopStore.upNum(200)
}
</script>

<style lang="scss" scoped></style>
