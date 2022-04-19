<template>
    <el-form :model="state.ruleForm" :rules="state.rules" ref="loginForm" size="large" class="login-content-form">
        <el-form-item prop="phone" class="login-animation1">
            <el-input type="text" placeholder="请输入手机号" v-model.trim="state.ruleForm.phone" clearable autocomplete="off">
                <template #prefix>
                    <el-icon>
                        <Iphone />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="code" class="login-animation2">
            <el-col :span="15">
                <el-input type="text" maxlength="4" placeholder="请输入验证码" v-model.trim="state.ruleForm.code" clearable
                    autocomplete="off" class="login-content-code">
                    <template #prefix>
                        <el-icon>
                            <Position />
                        </el-icon>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="8">
                <el-button class="login-content-code" @click="getCode">
                    <span v-if="state.waitState">获取验证码</span>
                    <span v-else>{{ state.wait }}</span>
                </el-button>
            </el-col>
        </el-form-item>

        <el-form-item class="login-animation3">
            <el-button type="primary" round :loading="state.loading" class="login-content-submit" @click="submitForm">登录
            </el-button>
        </el-form-item>

        <div class="login-animation4 login-msg">
            * 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式
        </div>
    </el-form>
</template>

<script setup name="loginMobile">
import { login } from '@/api/user.js' // api
import { formatAxis } from '@/utils/formatTime.js' // 时间问候语
import { initFrontEndControlRoutes } from '@/router/modules/frontEnd.js' // 前端控制路由：初始化方法，防止刷新时路由丢失
import { initBackEndControlRoutes } from '@/router/modules/backEnd.js' // 后端控制路由：初始化方法，防止刷新时路由丢失
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const loginForm = ref(null)
const state = reactive({
    ruleForm: {
        phone: '13888888888', // 手机号
        code: '1234', // 验证码
    },
    rules: { // 表单验证规则
        phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
    },
    wait: 5, // 倒计时时间
    waitState: true, // 倒计时状态
    loading: false, // 加载状态
})


// 根据时间计算时间问候语
const currentTime = computed(() => {
    return formatAxis(new Date())
})


// 获取验证码
const getCode = () => {
    state.waitState = false
    const clearTimer = setInterval(() => {
        state.wait--
        if (state.wait === 0) {
            clearInterval(clearTimer)
            state.waitState = true
            state.wait = 5
        }
    }, 1000)
}


// 登录
const submitForm = () => {
    let params = {
        time: new Date().getTime()
    }
    loginForm.value.validate(async (valid) => {
        if (valid) {
            state.loading = true

            // 调用登录接口，获取用户信息
            await login(Object.assign(state.ruleForm, params)).then(res => {
                store.dispatch('user/setToken', res.token)
                store.dispatch('user/setUserInfo', res.userInfo)

                // 1、请注意执行顺序(用户信息已经存储到vuex)
                if (!store.getters.layoutConfig?.isRequestRoutes) {
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

    .login-content-code,
    .login-content-code :deep(.el-input__inner) {
        width: 100%;
        padding: 0;
        font-weight: bold;
        letter-spacing: 5px;
        text-indent: 5px;
    }

    .login-content-submit {
        width: 100%;
        letter-spacing: 5px;
        text-indent: 5px;
        margin-top: 15px;
    }

    .login-msg {
        color: var(--el-text-color-placeholder);
    }
}
</style>