<template>
    <div class="CountUp">
        <slot name="prefix"></slot>
        <span ref="numberRef" class="number"></span>
        <slot name="suffix"></slot>
    </div>
</template>

<script setup name="CountUp">
import { CountUp } from 'countup.js' // 数字滚动插件
const { proxy } = getCurrentInstance() // vue 实例


// props
const props = defineProps({
    endVal: { // 结束值
        type: Number,
        required: true,
        default: 0
    },
    startVal: { // 开始值
        type: Number,
        default: 0
    },
    duration: { // 动画持续时间(秒)(2)
        type: Number,
        default: 2
    },
    useGrouping: { // 是否使用千分位
        type: Boolean,
        default: true
    },
    separator: { // 千位分隔符
        type: String,
        default: ','
    },
    decimal: { // 小数点分隔符
        type: String,
        default: '.'
    },
    useEasing: { // 是否开启动画过渡，默认动画函数为 easeOutExpo
        type: Boolean,
        default: true
    },
    smartEasingThreshold: { // 如果使用 easing(999)，则可以平滑地缓解上面的大数字
        type: Number,
        default: 999
    },
    smartEasingAmount: { // 超过阈值(333)的数字将被放宽
        type: Number,
        default: 333
    },
    enableScrollSpy: { // 在可视范围内才开始动画
        type: Boolean,
        default: true
    },
    scrollSpyDelay: { // 目标进入可视范围内后的延迟时间(毫秒)
        type: Number,
        default: 0
    },
})


// 定义响应式数据
const numberRef = ref() // 数值显示
const state = reactive({
    countup: null, // 定义数字滚动实例
    options: {
        startVal: props.startVal,
        duration: props.duration,
        useGrouping: props.useGrouping,
        separator: props.separator,
        decimal: props.decimal,
        useEasing: props.useEasing,
        smartEasingThreshold: props.smartEasingThreshold,
        smartEasingAmount: props.smartEasingAmount,
        enableScrollSpy: props.enableScrollSpy,
        scrollSpyDelay: props.scrollSpyDelay,
    }
})


// 初始化 countup.js
const initCountUp = () => {
    state.countup = new CountUp(proxy.$refs.numberRef, props.endVal, state.options)

    if (!state.countup.error) {
        state.countup.start()
    } else {
        console.error(state.countup.error)
    }
}


// 切换暂停/恢复，此方法之一在使用了 reset 方法之后才会生效
const pauseResume = () => {
    state.countup.pauseResume()
}


// 重置动画
const reset = () => {
    state.countup.reset()
}


// 更新end值和animate
const update = (num) => {
    state.countup.update(num)
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initCountUp()
})


// 暴露数据到 vue 实例，给父组件使用
defineExpose({
    pauseResume, reset, update
})
</script>

<style lang='scss' scoped>
.CountUp {
    .number {
        // color: var(--el-text-color-regular);
        font-weight: 700;
    }

    // 只有1个number插槽
    span:only-child {
        margin: 0;
    }

    // 必须是第二个元素，同时必须是倒数第一个元素
    span:nth-child(2):nth-last-child(1) {
        margin-left: 3px;
    }

    // 必须是第二个元素，同时必须是倒数第二个元素
    span:nth-child(2):nth-last-child(2) {
        margin-left: 3px;
        margin-right: 3px;
    }
}
</style>