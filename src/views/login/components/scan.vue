<template>
    <div class="login-scan-container">
        <div ref="qrcodeRef"></div>
        <div class="login-msg">打开手机扫一扫，快速登录/注册</div>
    </div>
</template>

<script setup name="loginScan">
import QRCode from 'qrcodejs2-fixes' // 生成二维码插件


// 定义响应式
const qrcodeRef = ref('')


// 初始化生成二维码
const initQrcode = () => {
    qrcodeRef.value.innerHTML = ''
    new QRCode(qrcodeRef.value, {
        text: `https://qm.qq.com/cgi-bin/qm/qr?k=RdUY97Vx0T0vZ_1OOu-X1yFNkWgDwbjC&jump_from=webapi`,
        width: 260,
        height: 260,
        colorDark: '#000000',
        colorLight: '#ffffff',
    })
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initQrcode()
})
</script>

<style lang='scss' scoped>
// error-num 为 '@/assets/scss/transition.scss' 中过渡动画名称
.login-scan-animation {
    opacity: 0;
    animation-name: error-num;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.login-scan-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    @extend .login-scan-animation;
    animation-delay: 0.1s;

    ::v-deep(img) {
        margin: auto;
    }

    .login-msg {
        margin-top: 20px;
        color: #a8abb2;
        @extend .login-scan-animation;
        animation-delay: 0.2s;
    }
}
</style>