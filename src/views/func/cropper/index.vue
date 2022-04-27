<template>
    <el-card shadow="hover" header="cropper 图片裁剪">
        <el-alert title="感谢优秀的 `cropperjs`，项目地址：https://github.com/fengyuanchen/cropperjs" type="success"
            :closable="false" class="mb20"></el-alert>
        <el-alert title="本项目根据 `cropperjs`，封装的图片裁剪组件 @/components/Cropper/index.vue" type="success" :closable="false"
            class="mb20"></el-alert>

        <div class="cropper-img-warp">
            <div class="mb15 flex">
                <div class="cropper-list flex flex-column-center">
                    <img class="cropper-img" :src="state.cropperImg" />
                    <span class="mt10">未裁剪时</span>
                </div>
                <div class="cropper-list flex flex-column-center">
                    <img class="cropper-img" :src="state.newCropperImg" />
                    <span class="mt10">裁剪完后</span>
                </div>
            </div>
            <el-button type="primary" @click="onCropperDialogOpen">
                <el-icon>
                    <Crop />
                </el-icon>
                更换头像
            </el-button>
        </div>
    </el-card>

    <!-- 图片裁剪组件 -->
    <Cropper ref="cropperRef" @newCropperImg="newCropperImg" />
</template>

<script setup name="funcCropper">
import Cropper from '@/components/Cropper/index.vue' // 图片裁剪组件
import cropperImg from '@/assets/images/cropper.webp' // cropper 默认图片


// 定义响应式数据>
const cropperRef = ref() // 图片裁剪ref
const state = reactive({
    cropperImg: cropperImg, // cropper 默认图片
    newCropperImg: '', // 裁剪后的新图片
})


// 打开裁剪弹窗
const onCropperDialogOpen = () => {
    cropperRef.value.openDialog(state.cropperImg)
}


// 裁剪后的新图片
const newCropperImg = (newImg) => {
    state.newCropperImg = newImg
}
</script>

<style lang='scss' scoped>
.cropper-img-warp {
    text-align: center;

    .cropper-img {
        width: 150px;
        height: 150px;
        border-radius: 100%;
    }
}
</style>