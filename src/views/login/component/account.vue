<template>
    <el-form
        :rules="state.rules"
        :model="state.formModel"
        size="large"
        ref="loginForm"
        class="login-content-form"
    >
        <el-form-item prop="username" class="login-animation1">
            <el-input
                type="text"
                v-model.trim="state.formModel.username"
                autocomplete="off"
                placeholder="请输入用户名"
            >
                <template #prefix>
                    <svg-icon name="user-center" />
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="password" class="login-animation2">
            <el-input
                type="password"
                v-model.trim="state.formModel.password"
                show-password
                autocomplete="off"
                placeholder="请输入密码"
            >
                <template #prefix>
                    <svg-icon name="password" />
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class="login-animation3">
            <el-col :span="15">
                <el-input
                    type="text"
                    maxlength="4"
                    placeholder="请输入验证码"
                    v-model="state.formModel.code"
                    clearable
                    autocomplete="off"
                >
                    <template #prefix>
                        <svg-icon name="position" />
                    </template>
                </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="8">
                <el-button class="login-content-code">1234</el-button>
            </el-col>
        </el-form-item>

        <el-form-item class="login-animation4">
            <el-button
                type="primary"
                round
                :loading="state.loading"
                class="login-content-submit"
                @click="submitForm"
            >登 录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup name="loginAccount">
import { login } from '@/api/user.js' // api
import { formatAxis } from '@/utils/formatTime.js' // 时间问候语
import { initBackEndControlRoutes } from '@/router/modules/backEnd.js' // 后端控制路由：初始化方法，防止刷新时路由丢失
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例
const { proxy } = getCurrentInstance() // 获取 vue 实例


// 定义响应式数据>
const loginForm = ref(null)
const state = reactive({
    formModel: {
        username: 'admin', // 用户名
        password: '123456', // 用户密码
        code: '1234', // 验证码
    },
    rules: { // 表单验证规则
        username: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    },
    loading: false, // 加载状态
})


// 根据时间计算时间问候语
const currentTime = computed(() => {
    return formatAxis(new Date())
})


// 登录
const submitForm = () => {
    let params = {
        time: new Date().getTime()
    }
    loginForm.value.validate(async (valid) => {
        if (valid) {
            state.loading = true

            // 调用登录接口，获取用户信息
            await login(Object.assign(params, state.formModel)).then(res => {
                store.dispatch('user/setToken', res.token)
                store.dispatch('user/setUserInfo', res.userInfo)

                // 1、请注意执行顺序(用户信息已经存储到vuex)
                if (!store.getters.layoutConfig.isRequestRoutes) {
                    // 前端控制路由，2、请注意执行顺序
                    initFrontEndControlRoutes()
                    signInSuccess()
                } else {
                    // 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
                    initBackEndControlRoutes()
                    // 执行完 initBackEndControlRoutes，再执行 signInSuccess
                    signInSuccess()
                }
            }).catch(error => {
                state.loading = false
            })
        }
    })
}


// 登录成功后的跳转
const signInSuccess = () => {
    // 初始化登录成功时间问候语
    let currentTimeInfo = currentTime.value
    // 登录成功，跳到转首页
    // 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
    // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
    if (route.query?.redirect) {
        router.push({
            path: route.query?.redirect,
            query: Object.keys(route.query?.params).length > 0 ? JSON.parse(route.query?.params) : '',
        })
    } else {
        router.push('/')
    }
    // 关闭 loading
    state.loading = false
    // 登录成功提示
    const signInText = '欢迎回来！'
    proxy.$message.success(`${currentTimeInfo}，${signInText}`)
}
</script>

<style lang='scss' scoped>
.login-content-form {
    margin-top: 20px;

    @for $i from 1 through 4 {
        .login-animation#{$i} {
            opacity: 0;
            animation-name: error-num;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
            animation-delay: calc($i/10) + s;
        }
    }

    .login-content-code {
        width: 100%;
        padding: 0;
        font-weight: bold;
        letter-spacing: 5px;
    }

    .login-content-submit {
        width: 100%;
        margin-top: 15px;
    }
}
</style>