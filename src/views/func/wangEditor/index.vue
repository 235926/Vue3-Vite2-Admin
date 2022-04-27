<template>
    <el-card shadow="hover" header="wangEditor 富文本编辑器">
        <el-alert title="感谢优秀的 `wangEditor`，项目地址：https://github.com/wangeditor-team/wangEditor" type="success"
            :closable="false" class="mb20"></el-alert>
        <el-alert title="本项目根据 `wangEditor`，封装的富文本组件 @/components/wangEditor/index.vue" type="success" :closable="false"
            class="mb20"></el-alert>

        <!-- 富文本编辑器组件 -->
        <el-row :gutter="20" class="row-gap10">
            <el-col :span="24">
                <WangEditor v-model="state.editorVal" />
            </el-col>
            <el-col :span="24">
                {{ state.editorVal }}
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup name="funcWangEditor">
import WangEditor from '@/components/WangEditor/index.vue' // 富文本组件


// 定义响应式数据
const state = reactive({
    editorVal: '<p>hello</p>',
})
</script>

<style lang='scss' scoped>
.el-card {
    overflow: visible;
}
</style>