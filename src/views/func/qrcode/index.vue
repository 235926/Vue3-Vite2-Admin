<template>
    <el-card shadow="hover" header="qrcodejs2 二维码生成">
        <el-alert title="感谢优秀的 `qrcodejs2`，项目地址：https://github.com/davidshimjs/qrcodejs" type="success"
            :closable="false" class="mb20"></el-alert>

        <div class="qrcode-img-warp">
            <div class="mb20 qrcode-img">
                <div class="qrcode" ref="qrcodeRef"></div>
            </div>
            <el-button type="primary" @click="onInitQrcode">
                <el-icon>
                    <Refresh />
                </el-icon>
                重新生成
            </el-button>
        </div>
    </el-card>
</template>

<script setup name="funcQrcode">
import QRCode from 'qrcodejs2-fixes' // 生成二维码插件
const { proxy } = getCurrentInstance() // vue 实例


// 定义响应式数据>
const state = reactive({
    qrcode: '',
})


// 初始化生成二维码
const initQrcode = () => {
    new QRCode(proxy.$refs.qrcodeRef, {
        text: `https://lyt-top.gitee.io/vue-next-admin-preview/#/login?t=${new Date().getTime()}`,
        width: 125,
        height: 125,
        colorDark: '#000000',
        colorLight: '#ffffff',
    })
}


// 重新生成
const onInitQrcode = () => {
    proxy.$refs.qrcodeRef.innerHTML = ''
    initQrcode()
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initQrcode()
})
</script>

<style lang='scss' scoped>
.qrcode-img-warp {
    text-align: center;

    .qrcode-img {
        display: flex;
        width: 100%;
        height: 125px;

        .qrcode {
            margin: auto;
            width: 125px;
            height: 125px;
        }
    }
}
</style>