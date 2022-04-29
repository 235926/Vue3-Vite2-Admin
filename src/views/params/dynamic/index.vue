<template>
    <el-card shadow="hover" header="动态路由传参">
        <div class="flex-margin" style="width: 400px">
            <el-result icon="success" title="动态路由" subTitle="可 `开启 TagsView 共用` 进行单标签测试">
                <template #extra>
                    <el-input v-model="state.tagsViewName" placeholder="请输入tagsView 名称" clearable class="mb15"
                        style="width: 400px"></el-input>
                    <el-input v-model="state.value" placeholder="请输入路由参数 id 值" clearable style="width: 400px">
                    </el-input>
                    <el-button type="primary" class="mt15" @click="onGoDetailsClick">
                        动态路由传参
                    </el-button>
                </template>
            </el-result>
        </div>
    </el-card>
</template>

<script setup name="paramsDynamic">
const router = useRouter() // router 实例


// 定义响应式数据>
const state = reactive({
    value: '', // 路由参数 id 值
    tagsViewName: null, // tagsView 名称
})


// 跳转到详情
const onGoDetailsClick = () => {
    // name 值为路由中的 name
    router.push({
        name: 'paramsDynamicDetails',
        params: {
            t: 'vue-next-admin',
            id: state.value,
            tagsViewName: state.tagsViewName,
        },
    });
    state.value = ''
}
</script>

<style lang='scss' scoped>
</style>