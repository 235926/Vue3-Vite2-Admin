<template>
    <el-dropdown trigger="click" :show-timeout="70" :hide-timeout="50" @command="handleCommand">
        <span class="el-dropdown-link">
            <img class="avatar" :src="userInfo.avatar" />
            <span class="username">{{ userInfo.username }}</span>
            <SvgIcon name="arrow-down" />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="personal">
                    <a target="_blank" href="https://vue3-vite2-admin.vercel.app/#/dashboard">线上预览</a>
                </el-dropdown-item>
                <el-dropdown-item command="personal">
                    <a target="_blank" href="https://github.com/235926/Vue3-Vite2-Admin">项目地址</a>
                </el-dropdown-item>
                <el-dropdown-item divided command="401">401页面</el-dropdown-item>
                <el-dropdown-item command="404">404页面</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup name="userInfo">
import { logout } from '@/api/user.js' // api
import { Session } from '@/utils/storage.js' // 浏览器存储
const { proxy: ctx } = getCurrentInstance() // vue 实例
const store = useStore() // vuex 实例
const router = useRouter() // router 实例


// 获取用户信息 vuex
const userInfo = computed(() => {
    return store.getters.userInfo
})


// 下拉菜单点击时
const handleCommand = (command) => {
    switch (command) {
        case 'personal':
            router.push('/personal') // 跳转个人中心
            break
        case '401':
            router.push('/401') // 跳转401
            break
        case '404':
            router.push('/404') // 跳转404
            break
        case 'logout':
            handleLogout() // 退出登录
            break
    }
}


// 退出登录
const handleLogout = () => {
    ctx.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '退出中'

                // 调用退出登录接口
                logout().then(res => {
                    if (res.code === 200) {
                        setTimeout(() => {
                            done()
                            setTimeout(() => {
                                instance.confirmButtonLoading = false
                            }, 300)
                        }, 700)
                    }
                })
            } else {
                done()
            }
        }
    }).then(() => {
        Session.clear() // 清除缓存/token等
        ctx.$message.success('安全退出成功！')
        // 使用 reload 时，不需要调用 resetRoute() 重置路由
        window.location.reload()
    }).catch(() => { })
}
</script>

<style lang='scss' scoped>
.el-dropdown-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    margin-left: 5px;

    .avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .username {
        color: #606266;
        margin: 0 8px;
    }
}
</style>