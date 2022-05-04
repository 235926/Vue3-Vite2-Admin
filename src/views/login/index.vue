<template>
    <div class="login-container">
        <div class="login-content">
            <h4>Vue3-Vite2-Admin</h4>
            <el-tabs v-model="state.activeName" v-if="!state.isScan">
                <el-tab-pane label="账号密码登录" name="account">
                    <Account />
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="mobile">
                    <Mobile />
                </el-tab-pane>
            </el-tabs>

            <Scan v-if="state.isScan" />

            <!-- 扫码登录切换 -->
            <div class="login-content-main-sacn" @click="state.isScan = !state.isScan">
                <SvgIcon :name="state.isScan ? 'pc' : 'qrcode'" />
                <div class="login-content-main-sacn-delta"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Account from './component/account.vue' // 账号登录
import Mobile from './component/mobile.vue' // 手机号登录
import Scan from './component/scan.vue' // 扫码登录
import { NextLoading } from '@/utils/loading.js' // 页面全局 Loading


// 定义响应式数据>
const state = reactive({
    activeName: 'account', // 默认选中
    isScan: false, // 是否扫码登录
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    NextLoading.done()
})
</script>

<style lang='scss' scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    background-image: linear-gradient(25deg,
            #077f7c,
            #3aa693,
            #5ecfaa,
            #7ffac2);
    display: flex;
    justify-content: center;
    align-items: center;

    .login-content {
        width: 500px;
        height: 460px;
        padding: 20px 50px;
        border: 5px solid #d8ebff;
        border-radius: 5px;
        overflow: hidden;
        background-color: #fff;
        position: relative;

        // tabs 切换
        :deep(.el-tabs) {
            .el-tabs__nav {
                width: 100%;
                display: flex;

                .el-tabs__item {
                    flex: 1;
                    text-align: center;
                    font-size: 18px;
                }
            }
        }

        // 标题
        h4 {
            color: #303133;
            font-weight: 500;
            font-size: 22px;
            text-align: center;
            letter-spacing: 4px;
            white-space: nowrap;
            margin: 15px 0 30px;
            z-index: 5;
            position: relative;
            transition: all 0.3s ease;
        }

        // 二维码
        .login-content-main-sacn {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            transition: all ease 0.3s;

            .svg-icon {
                font-size: 50px;

                &:hover {
                    color: var(--el-color-primary)
                }
            }

            // 遮挡遮罩层
            .login-content-main-sacn-delta {
                position: absolute;
                width: 35px;
                height: 70px;
                z-index: 2;
                top: 2px;
                right: 21px;
                background: #fff;
                transform: rotate(-45deg);
            }
        }
    }
}
</style>