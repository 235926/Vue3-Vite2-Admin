<template>
    <div class="page-container">
        <el-card shadow="hover" header="表单组件1">
            <FormRulesOne :data="state.formRulesOneData" ref="pagesFormRulesOneRef" />
        </el-card>

        <el-card shadow="hover" header="表单组件2" class="mt20">
            <FormRulesTwo ref="pagesFormRulesTwoRef" />
        </el-card>

        <el-card shadow="hover" header="表单组件3" class="mt20">
            <FormRulesThree ref="pagesFormRulesThreeRef" />
        </el-card>

        <el-card shadow="hover" class="mt20">
            <el-row class="flex">
                <div class="flex-margin">
                    <el-button @click="onResetForm">
                        <el-icon>
                            <RefreshRight />
                        </el-icon>
                        重置表单
                    </el-button>
                    <el-button type="primary" @click="onSubmitForm">
                        <el-icon>
                            <Flag />
                        </el-icon>
                        验证表单
                    </el-button>
                </div>
            </el-row>
        </el-card>
    </div>
</template>

<script setup name="funcFormRules">
import FormRulesOne from './component/formRulesOne.vue' // 表单一
import FormRulesTwo from './component/formRulesTwo.vue' // 表单二
import FormRulesThree from './component/formRulesThree.vue' // 表单三
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    formRulesOneData: { // 表单一数据
        name: 'cdl',
        email: 'cdl123@.com',
        autograph: 'cdl123456',
        occupation: '1',
    },
})


// 表单组件重置
const onResetForm = () => {
    proxy.$refs.pagesFormRulesOneRef.$refs.formRulesOneRef.resetFields()
    proxy.$refs.pagesFormRulesTwoRef.$refs.formRulesTwoRef.resetFields()
    proxy.$refs.pagesFormRulesThreeRef.$refs.formRulesThreeRef.resetFields()
}


// 表单组件验证
const formRulesValidate = (pageRef, sonRef) => {
    return new Promise((resolve) => {
        proxy.$refs[pageRef].$refs[sonRef].validate((valid) => {
            if (valid) resolve(valid)
        })
    })
}


// 验证表单
const onSubmitForm = () => {
    Promise.all([
        formRulesValidate('pagesFormRulesOneRef', 'formRulesOneRef'),
        formRulesValidate('pagesFormRulesTwoRef', 'formRulesTwoRef'),
        formRulesValidate('pagesFormRulesThreeRef', 'formRulesThreeRef'),
    ]).then(() => {
        proxy.$message.success('表单全部验证成功')
    })
}
</script>

<style lang='scss' scoped>
</style>