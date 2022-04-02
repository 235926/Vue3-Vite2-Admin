<template>
    <el-dropdown trigger="click" :show-timeout="70" :hide-timeout="50" @command="handleCommand">
        <span class="el-dropdown-link">
            <img class="avatar" :src="userInfo.avatar" />
            <span class="username">{{ userInfo.username }}</span>
            <svg-icon name="arrow-down" />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <a target="_blank" href="https://github.com/235926/Vue3-Vite2-Admin">
                    <el-dropdown-item command="personal">项目地址</el-dropdown-item>
                </a>
                <a target="_blank" href="https://vue3-vite2-admin.vercel.app/#/login?redirect=/&params={}">
                    <el-dropdown-item command="personal">线上预览</el-dropdown-item>
                </a>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup name="userInfo">
import { logout } from '@/api/user.js' // api
import { Session } from '@/utils/storage.js' // 浏览器存储
import { resetRoute } from '@/router/index.js' // 删除/重置路由
const { proxy: ctx } = getCurrentInstance() // 获取 vue 实例
const store = useStore() // 定义 vuex 实例
const router = useRouter() // 定义 router 实例


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
        resetRoute() // 删除/重置路由
        ctx.$message.success('安全退出成功！')
        setTimeout(() => {
            window.location.href = ''
        }, 300)
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