<template>
    <el-card shadow="hover" class="packages">
        <template #header>
            <div class="card-header">
                <span>Packages</span>
            </div>
        </template>
        <el-row :gutter="20" class="list row-gap20">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, index) in state.dependenciesList"
                :key="index">
                <div class="item">
                    <span>{{ item.name }}</span>
                    <el-tag effect="dark">{{ item.value }}</el-tag>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { packages } from "@/utils/package.js" // package.json 数据


// 定义响应式数据
const state = reactive({
    dependenciesList: [], // 插件集合
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    genDependencies()
})


// 插件数据格式化
const genDependencies = () => {
    for (let key in packages) {
        state.dependenciesList.push({
            name: key,
            value: packages[key],
        })
    }
}
</script>

<style lang='scss' scoped>
.packages {
    .list {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #ebeef5;
            padding: 20px;

            &:hover {
                background: #f5f7fa;
            }
        }
    }
}
</style>