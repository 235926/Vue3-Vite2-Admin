<template>
    <el-card shadow="hover" header="tagsView 当前页演示">
        <div class="flex-warp">
            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="primary" @click="refreshCurrentTagsView">
                        <el-icon>
                            <Refresh />
                        </el-icon>
                        刷新当前页
                    </el-button>
                </div>
            </div>

            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="info" @click="closeCurrentTagsView">
                        <el-icon>
                            <Close />
                        </el-icon>
                        关闭当前页
                    </el-button>
                </div>
            </div>

            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="warning" @click="closeOtherTagsView">
                        <el-icon>
                            <CircleClose />
                        </el-icon>
                        关闭其它
                    </el-button>
                </div>
            </div>

            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="danger" @click="closeAllTagsView">
                        <el-icon>
                            <FolderDelete />
                        </el-icon>
                        全部关闭
                    </el-button>
                </div>
            </div>

            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="success" @click="openCurrenFullscreen">
                        <el-icon>
                            <FullScreen />
                        </el-icon>
                        当前页全屏
                    </el-button>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup name="funcTagsView">
const { proxy } = getCurrentInstance() // vue 实例
const route = useRoute() // 路由参数


// 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏
// 1、刷新当前 tagsView
const refreshCurrentTagsView = () => {
    proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 0, ...route }))
}


// 2、关闭当前 tagsView
const closeCurrentTagsView = () => {
    proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }))
}


// 3、关闭其它 tagsView
const closeOtherTagsView = () => {
    proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 2, ...route }))
}


// 4、关闭全部 tagsView
const closeAllTagsView = () => {
    proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 3, ...route }))
}


// 5、开启当前页面全屏
const openCurrenFullscreen = () => {
    proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 4, ...route }))
}
</script>

<style lang='scss' scoped>
</style>