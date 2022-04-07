<template>
    <el-col :xs="24" :sm="16">
        <el-card shadow="hover" header="个人信息">
            <div class="personal-user">
                <div class="personal-user-left">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :limit="1"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                    >
                        <img :src="userInfo.avatar" />
                    </el-upload>
                </div>
                <div class="personal-user-right">
                    <el-row>
                        <el-col
                            :span="24"
                            class="personal-title"
                        >{{ currentTime }}，{{ userInfo.username }}，生活变的再糟糕，也不妨碍我变得更好！</el-col>
                        <el-col :span="24">
                            <el-row>
                                <el-col :xs="24" :sm="8" class="personal-item">
                                    <div class="personal-item-label">昵称：</div>
                                    <div class="personal-item-value">{{ userInfo.name }}</div>
                                </el-col>
                                <el-col :xs="24" :sm="16" class="personal-item">
                                    <div class="personal-item-label">身份：</div>
                                    <div class="personal-item-value">{{ userInfo.identity }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24">
                            <el-row>
                                <el-col :xs="24" :sm="8" class="personal-item">
                                    <div class="personal-item-label">登录IP：</div>
                                    <div class="personal-item-value">192.168.1.1</div>
                                </el-col>
                                <el-col :xs="24" :sm="16" class="personal-item">
                                    <div class="personal-item-label">登录时间：</div>
                                    <div class="personal-item-value">2021-02-05 18:47:26</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
    </el-col>
</template>

<script setup>
import { formatAxis } from '@/utils/formatTime.js' // 时间方法
const { proxy } = getCurrentInstance() // vue 实例
const store = useStore() // vuex 实例


// 获取用户信息
const userInfo = computed(() => {
    return store.getters.userInfo
})


// 当前时间提示语
const currentTime = computed(() => {
    return formatAxis(new Date())
})


// 限制用户上传文件的格式和大小
const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        proxy.$message.error('头像图片必须为JPG格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        proxy.$message.error('头像图片大小不能超过2MB!')
        return false
    }
    return true
}


// 文件上传成功时的钩子
const handleAvatarSuccess = (response, uploadFile) => {
    console.log(response)
    console.log(uploadFile)
    // URL.createObjectURL(uploadFile.raw) // 上传的新图片
}
</script>

<style lang='scss' scoped>
@import "@/assets/scss/mixin.scss";
.personal-user {
    height: 130px;
    display: flex;
    align-items: center;

    .personal-user-left {
        width: 100px;
        height: 130px;
        border-radius: 3px;

        :deep(.el-upload) {
            height: 100%;
        }

        .avatar-uploader {
            height: 100%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 3px;
            }

            &:hover {
                img {
                    animation: logoAnimation 0.3s ease-in-out;
                }
            }
        }
    }

    .personal-user-right {
        flex: 1;
        padding: 0 15px;

        .personal-title {
            font-size: 18px;
            margin-bottom: 20px;
            @include text-ellipsis(1);
        }

        .personal-item {
            display: flex;
            align-items: center;
            font-size: 13px;
            margin-bottom: 10px;

            .personal-item-label {
                color: var(--el-text-color-secondary);
                @include text-ellipsis(1);
            }

            .personal-item-value {
                @include text-ellipsis(1);
            }
        }
    }
}
</style>