<template>
    <el-col :span="24" class="personal-information">
        <el-card shadow="hover" header="个人信息">
            <el-form :model="state.userInfo" label-width="80px" v-loading="state.loading">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="账户">
                            <el-input
                                disabled
                                v-model="state.userInfo.username"
                                placeholder="请输入账户"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="昵称">
                            <el-input
                                v-model="state.userInfo.nickname"
                                placeholder="请输入昵称"
                                clearable
                                @change="changeUserInfo"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="身份">
                            <el-input
                                disabled
                                v-model="state.userInfo.identity"
                                placeholder="请输入身份"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="性别">
                            <el-select
                                v-model="state.userInfo.gender"
                                placeholder="请选择性别"
                                @change="changeUserInfo"
                            >
                                <el-option label="男" :value="0"></el-option>
                                <el-option label="女" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="手机号">
                            <el-input
                                v-model="state.userInfo.phone"
                                placeholder="请输入手机号"
                                clearable
                                @change="changeUserInfo"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                        <el-form-item label="按钮权限">
                            <el-tag
                                v-for="(item, index) in state.userInfo.authBtnList"
                                :key="index"
                            >{{ item }}</el-tag>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </el-col>
</template>

<script setup>
import { userInfo } from '@/api/user.js' // api
const { proxy } = getCurrentInstance() // vue 实例


// 定义响应式数据>
const state = reactive({
    userInfo: {}, // 用户信息
    loading: false, // 加载状态
})


// 获取用户信息
const getUserInfo = () => {
    userInfo().then(res => {
        state.userInfo = res.userInfo
    })
}


// 修改用户信息
const changeUserInfo = () => {
    state.loading = true
    let params = {
        userInfo: state.userInfo
    }
    userInfo(params).then(res => {
        state.userInfo = res.userInfo
        setTimeout(() => {
            state.loading = false
            proxy.$message.success('个人信息更新成功！')
        }, 300)
    })
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getUserInfo()
})
</script>

<style lang='scss' scoped>
.personal-information {
    .el-tag {
        margin-right: 4px;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>