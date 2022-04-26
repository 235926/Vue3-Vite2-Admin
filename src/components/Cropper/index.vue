<template>
    <el-dialog title="更换头像" v-model="state.isShowDialog" :close-on-click-modal="false" destroy-on-close width="800px">
        <el-scrollbar class="scrollbar-x">
            <div class="cropper-warp">
                <div class="cropper-warp-left">
                    <img :src="state.cropperImg" class="cropper-warp-left-img" />
                </div>
                <div class="cropper-warp-right">
                    <div class="cropper-warp-right-title">预览</div>
                    <div class="cropper-warp-right-item">
                        <div class="cropper-warp-right-value">
                            <img :src="state.cropperImgBase64" class="cropper-warp-right-value-img" />
                        </div>
                        <div class="cropper-warp-right-label">100 x 100</div>
                    </div>
                    <div class="cropper-warp-right-item">
                        <div class="cropper-warp-right-value">
                            <img :src="state.cropperImgBase64" class="cropper-warp-right-value-img cropper-size" />
                        </div>
                        <div class="cropper-warp-right-label">50 x 50</div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">修 改</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import Cropper from 'cropperjs' // 图片裁剪插件
import 'cropperjs/dist/cropper.css' // 图片裁剪插件样式
const emit = defineEmits(["newCropperImg"]) // 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告


// 定义响应式数据>
const state = reactive({
    isShowDialog: false, // 弹窗状态
    cropperImg: '', // 准备裁剪的图片
    cropperImgBase64: '', // 裁剪完成的图片
    cropper: null, // 用于 Cropper 插件实例化
})


// 打开弹窗
const openDialog = (imgs) => {
    state.cropperImg = imgs
    state.isShowDialog = true
    nextTick(() => {
        initCropper()
    })
}


// 关闭弹窗
const closeDialog = () => {
    state.isShowDialog = false
}


// 取消
const onCancel = () => {
    closeDialog()
}


// 修改
const onSubmit = () => {
    emit("newCropperImg", state.cropperImgBase64)
    closeDialog()
}


// 初始化 cropperjs 图片裁剪
const initCropper = () => {
    let letImg = document.querySelector('.cropper-warp-left-img')

    // 实例化裁剪图片
    state.cropper = new Cropper(letImg, {
        viewMode: 1, // 视图模式，默认：0，可选值：0，1，2，3
        dragMode: 'none', // 拖动模式, 默认：crop，可选值"<crop|move|none>"
        initialAspectRatio: 1, // 定义裁切框的初始长宽比，默认: NaN，仅当aspectRatio选项设置为NaN时可用
        aspectRatio: 1, // 默认: NaN，定义裁剪框的固定长宽比。默认情况下，裁切框具有空闲比率
        preview: '.before', // 添加额外的元素(容器)预览
        background: false, // 显示容器的网格背景，默认: true
        autoCropArea: 0.6, // 画布裁剪画布比例(百分比)，默认: 0.8
        zoomOnWheel: false, // 是否允许通过鼠标滚轮缩放图像，默认: true
        crop: () => {
            // toDataURL 方法返回一个包含图片展示的 data URI
            state.cropperImgBase64 = state.cropper.getCroppedCanvas().toDataURL('image/jpeg')
        }
    })
}


// 暴露数据到 vue 实例
defineExpose({
    openDialog
})
</script>

<style lang='scss' scoped>
.cropper-warp {
    display: flex;

    .cropper-warp-left {
        position: relative;
        display: inline-block;
        height: 350px;
        flex: 1;
        border: 1px solid var(--el-border-color);
        background: var(--el-color-white);
        overflow: hidden;
        background-repeat: no-repeat;
        cursor: move;
        border-radius: var(--el-border-radius-base);

        .cropper-warp-left-img {
            width: 100%;
            height: 100%;
        }
    }

    .cropper-warp-right {
        width: 150px;
        height: 350px;

        .cropper-warp-right-title {
            text-align: center;
            height: 20px;
            line-height: 20px;
        }

        .cropper-warp-right-item {
            margin: 15px 0;

            .cropper-warp-right-value {
                display: flex;

                .cropper-warp-right-value-img {
                    width: 100px;
                    height: 100px;
                    border-radius: var(--el-border-radius-circle);
                    margin: auto;
                }

                .cropper-size {
                    width: 50px;
                    height: 50px;
                }
            }

            .cropper-warp-right-label {
                text-align: center;
                font-size: 12px;
                color: var(--el-text-color-primary);
                height: 30px;
                line-height: 30px;
            }
        }
    }
}
</style>