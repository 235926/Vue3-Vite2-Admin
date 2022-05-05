<template>
    <div class="page-container">
        <el-card shadow="hover" header="切换用户演示，前端控制不同用户显示不同页面、按钮权限">
            <el-alert
                title="温馨提示：此权限页面代码及效果只作为演示使用，若出现不可逆转的bug，请尝试 `F5` 刷新页面。若实际项目中非要实现此用户权限切换功能，请在切换方法 `onRadioChange` 最后面添加刷新代码 `window.location.reload()`。 请注意：按钮权限页面中的演示2（指令模式）、演示3（函数模式）切换用户时无法动态演示，想要动态演示，请按 `F5` 或者添加 `window.location.reload()`。"
                type="warning" :closable="false"></el-alert>

            <el-alert :title="`当前用户页面权限：[${userInfo.roles}]，当前用户按钮权限：[${userInfo.authBtnList}]`" type="success"
                :closable="false" class="mt20"></el-alert>

            <el-radio-group class="mt20" v-model="state.userAuth" @change="onRadioChange">
                <el-radio-button label="admin"></el-radio-button>
                <el-radio-button label="common"></el-radio-button>
            </el-radio-group>
        </el-card>
    </div>
</template>

<script setup name="limitsFrontEndPage">
import { Session } from '@/utils/storage.js' // 浏览器存储
import { frontEndsResetRoute, setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '@/router/modules/frontEnd.js' // 前端控制权限部分
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    userAuth: '', // 初始化用户权限
})


// 获取用户信息权限
const userInfo = computed(() => {
    return store.getters.userInfo
})


// 初始化用户权限
const initUserAuth = () => {
    state.userAuth = userInfo.value.roles[0]
}


// 用户权限改变时
const onRadioChange = async () => {
    // 模拟数据
    frontEndsResetRoute()
    let defaultRoles = [] // 用户角色
    let defaultAuthBtnList = [] // 用户按钮权限

    // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
    let adminRoles = ['admin']
    // admin 按钮权限标识
    let adminAuthBtnList = ['btn.add', 'btn.del', 'btn.edit', 'btn.link']

    // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
    let testRoles = ['common']
    // test 按钮权限标识
    let testAuthBtnList = ['btn.add', 'btn.link']

    // 不同用户模拟不同的用户权限
    if (state.userAuth === 'admin') {
        defaultRoles = adminRoles
        defaultAuthBtnList = adminAuthBtnList
    } else {
        defaultRoles = testRoles
        defaultAuthBtnList = testAuthBtnList
    }

    // 模拟用户信息
    const userInfo = {
        username: state.userAuth,
        nickname: state.userAuth === 'admin' ? '竹忧' : '测试',
        avatar: state.userAuth === 'admin'
            ? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
            : 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
        identity: state.userAuth === 'admin' ? '超级管理员' : '测试员',
        gender: state.userAuth === 'admin' ? 0 : 1,
        phone: 13888888888,
        time: new Date().getTime(),
        roles: defaultRoles,
        authBtnList: defaultAuthBtnList,
    }
    Session.set('userInfo', userInfo)
    // 触发初始化用户信息
    store.dispatch('user/setUserInfo', userInfo)
    await setAddRoute()
    setFilterMenuAndCacheTagsViewRoutes()
    // window.location.reload()
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initUserAuth()
})
</script>

<style lang='scss' scoped>
</style>