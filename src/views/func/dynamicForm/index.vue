<template>
    <div class="page-container">
        <el-card shadow="hover" header="动态复杂表单">
            <el-form :model="state.form" ref="formRulesOneRef" label-width="100px">
                <el-row :gutter="35" class="row-gap20">
                    <el-col :xs="val.xs" :sm="val.sm" :md="val.md" :lg="val.md" :xl="val.xl" v-show="val.isShow"
                        v-for="(val, key) in state.formData" :key="key">
                        <template v-if="val.type !== ''">
                            <el-form-item :label="val.label" :prop="val.prop"
                                :rules="[{ required: val.required, message: `${val.label}不能为空`, trigger: val.type === 'input' ? 'blur' : 'change' }]"
                                v-if="val.type !== ''">

                                <el-input v-model="state.form[val.prop]" :placeholder="val.placeholder" clearable
                                    v-if="val.type === 'input'" :disabled="val.disabled"></el-input>

                                <el-date-picker v-model="state.form[val.prop]" type="date"
                                    :placeholder="val.placeholder" v-else-if="val.type === 'date'"
                                    :disabled="val.disabled">
                                </el-date-picker>

                                <el-select v-model="state.form[val.prop]" :placeholder="val.placeholder"
                                    v-else-if="val.type === 'select'" :disabled="val.disabled">
                                    <el-option v-for="item in val.options" :key="item.value" :label="item.label"
                                        :value="item.value"> </el-option>
                                </el-select>

                                <el-input type="textarea" v-model="state.form[val.prop]" :placeholder="val.placeholder"
                                    clearable v-if="val.type === 'textarea'" :disabled="val.disabled"></el-input>
                            </el-form-item>
                        </template>

                        <template v-else>
                            <el-row :gutter="35" v-for="(v, k) in state.form.list" :key="k" class="mb20 last0">
                                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
                                    <el-form-item label="年度" :prop="`list[${k}].year`"
                                        :rules="[{ required: true, message: `年度不能为空`, trigger: 'blur' }]">
                                        <template #label>
                                            <el-button type="primary" circle @click="onAddRow" v-if="k === 0">
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>
                                            </el-button>
                                            <el-button type="danger" circle @click="onDelRow(k)" v-else>
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </el-button>
                                            <span class="ml10">年度</span>
                                        </template>
                                        <el-input v-model="state.form.list[k].year" placeholder="请输入">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
                                    <el-form-item label="月度" :prop="`list[${k}].month`"
                                        :rules="[{ required: true, message: `月度不能为空`, trigger: 'blur' }]">
                                        <el-input v-model="state.form.list[k].month" placeholder="请输入">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
                                    <el-form-item label="日度" :prop="`list[${k}].day`"
                                        :rules="[{ required: true, message: `日度不能为空`, trigger: 'blur' }]">
                                        <el-input v-model="state.form.list[k].day" placeholder="请输入">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </template>
                    </el-col>
                </el-row>
            </el-form>

            <el-row class="flex mt15">
                <div class="flex-margin">
                    <el-button @click="onResetForm">
                        <el-icon>
                            <RefreshRight />
                        </el-icon>
                        重置表单
                    </el-button>
                    <el-button size="default" type="primary" @click="onSubmitForm">
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

<script setup name="funcDynamicForm">
import { formData } from './mock.js' // 数据列表
const { proxy } = getCurrentInstance() // vue 实例


// 定义响应式数据>
const state = reactive({
    formData, // 数据列表
    form: { // form 表单
        name: '',
        email: '',
        autograph: '',
        occupation: '',
        list: [
            {
                year: '',
                month: '',
                day: '',
            },
        ],
        remarks: '',
    },
})


// 新增行
const onAddRow = () => {
    state.form.list.push({
        year: '',
        month: '',
        day: '',
    })
}


// 删除行
const onDelRow = (k) => {
    state.form.list.splice(k, 1)
}


// 表单验证
const onSubmitForm = () => {
    proxy.$refs.formRulesOneRef.validate((valid) => {
        if (valid) {
            proxy.$message.success('验证成功')
        } else {
            return false
        }
    })
}


// 重置表单
const onResetForm = () => {
    proxy.$refs.formRulesOneRef.resetFields()
}
</script>

<style lang='scss' scoped>
</style>