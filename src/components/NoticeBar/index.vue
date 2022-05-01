<template>
    <div class="notice-bar" :style="{ background, height: `${height}px` }" v-show="!state.isMode">
        <div class="notice-bar-warp" :style="{ color, fontSize: `${size}px` }">
            <SvgIcon v-if="leftIcon" :name="leftIcon" class="notice-bar-warp-left-icon"></SvgIcon>
            <div class="notice-bar-warp-text-box" ref="noticeBarWarpRef">
                <div class="notice-bar-warp-text" ref="noticeBarTextRef" v-if="!scrollable">{{ text }}</div>
                <div class="notice-bar-warp-slot" v-else>
                    <slot />
                </div>
            </div>
            <SvgIcon v-if="rightIcon" :name="rightIcon" class="notice-bar-warp-right-icon" @click="onRightIconClick" />
        </div>
    </div>
</template>

<script setup name="noticeBar">
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// props
const props = defineProps({
    mode: { // 通知栏模式，可选值为 closeable link
        type: String,
        default: () => '',
    },
    text: { // 通知文本内容
        type: String,
        default: () => '',
    },
    color: { // 通知文本颜色
        type: String,
        default: () => 'var(--el-color-primary)',
    },
    background: { // 通知背景色
        type: String,
        default: () => 'var(--el-color-primary-light-9)',
    },
    size: { // 字体大小，单位px
        type: [Number, String],
        default: () => 14,
    },
    height: { // 通知栏高度，单位px
        type: Number,
        default: () => 40,
    },
    delay: { // 动画延迟时间 (s)
        type: Number,
        default: () => 1,
    },
    speed: { // 滚动速率 (px/s)
        type: Number,
        default: () => 100,
    },
    scrollable: { // 是否开启垂直滚动
        type: Boolean,
        default: () => false,
    },
    leftIcon: { // 自定义左侧图标
        type: String,
        default: () => '',
    },
    rightIcon: { // 自定义右侧图标
        type: String,
        default: () => '',
    },
})


// 定义响应式数据>
const noticeBarWarpRef = ref()
const noticeBarTextRef = ref()
const state = reactive({
    isMode: false,
    order: 1,
    oneTime: 0,
    twoTime: 0,
    warpOWidth: 0,
    textOWidth: 0,
})


// 初始化 animation 各项参数
const initAnimation = () => {
    nextTick(() => {
        state.warpOWidth = noticeBarWarpRef.value.offsetWidth
        state.textOWidth = noticeBarTextRef.value.offsetWidth
        document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${state.textOWidth}px;}}`)
        document.styleSheets[0].insertRule(`@keyframes twoAnimation {0% {left: ${state.warpOWidth}px;} 100% {left: -${state.textOWidth}px;}}`)
        computeAnimationTime()
        setTimeout(() => {
            changeAnimation()
        }, props.delay * 1000)
    })
}


// 计算 animation 滚动时长
const computeAnimationTime = () => {
    state.oneTime = state.textOWidth / props.speed
    state.twoTime = (state.textOWidth + state.warpOWidth) / props.speed
}


// 改变 animation 动画调用
const changeAnimation = () => {
    if (state.order === 1) {
        noticeBarTextRef.value.style.cssText = `animation: oneAnimation ${state.oneTime}s linear; opactity: 1;}`;
        state.order = 2
    } else {
        noticeBarTextRef.value.style.cssText = `animation: twoAnimation ${state.twoTime}s linear infinite; opacity: 1;`
    }
}


// 监听 animation 动画的结束
const listenerAnimationend = () => {
    noticeBarTextRef.value.addEventListener('animationend', () => {
        changeAnimation()
    }, false)
}


// 右侧 icon 图标点击
const onRightIconClick = () => {
    if (!props.mode) return false
    if (props.mode === 'closeable') {
        state.isMode = true
        emit('close')
    } else if (props.mode === 'link') {
        emit('link')
    }
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    if (props.scrollable) return false
    initAnimation()
    listenerAnimationend()
})
</script>

<style lang='scss' scoped>
.notice-bar {
    padding: 0 15px;
    width: 100%;
    border-radius: 4px;

    .notice-bar-warp {
        display: flex;
        align-items: center;
        width: 100%;
        height: inherit;

        .notice-bar-warp-text-box {
            flex: 1;
            height: inherit;
            display: flex;
            align-items: center;
            overflow: hidden;
            position: relative;

            .notice-bar-warp-text {
                white-space: nowrap;
                position: absolute;
                left: 0;
            }

            .notice-bar-warp-slot {
                width: 100%;
                white-space: nowrap;

                ::v-deep(.el-carousel__item) {
                    display: flex;
                    align-items: center;
                }
            }
        }

        .notice-bar-warp-left-icon {
            width: 24px;
            font-size: inherit !important;
        }

        .notice-bar-warp-right-icon {
            width: 24px;
            text-align: right;
            font-size: inherit !important;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>