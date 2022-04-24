<template>
    <CountUp :endVal="30000" :duration="5" ref="CountUpRef">
        <template #prefix>
            <span>金额</span>
        </template>
        <template #suffix>
            <span>元</span>
        </template>
    </CountUp>

    <div class="flex-warp">
        <div class="flex-warp-item">
            <div class="flex-warp-item-box">
                <el-button type="primary" size="default" @click="refreshCurrent">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    重置/刷新数值
                </el-button>
                <el-button type="primary" size="default" @click="reset">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    重置/刷新数值
                </el-button>
                <el-button type="primary" size="default" @click="update">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    重置/刷新数值
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CountUp from '@/components/CountUp/index.vue' // 数字滚动组件
const { proxy } = getCurrentInstance() // vue 实例

const CountUpRef = ref()



const refreshCurrent = () => {
    CountUpRef.value.pauseResume()
}
const reset = () => {
    CountUpRef.value.reset()
}
const update = () => {
    CountUpRef.value.update(9999999)
}
// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    console.log(CountUpRef.value)
})

</script>

<style lang='scss' scoped>
</style>