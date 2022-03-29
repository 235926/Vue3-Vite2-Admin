<template>
    <router-view v-slot="{ Component }">
        <transition :name="setTransitionName" mode="out-in">
            <keep-alive>
                <div class="h100 w100" :style="{ minHeight }">
                    <component :is="Component" />
                </div>
            </keep-alive>
        </transition>
    </router-view>
</template>

<script setup name="layoutRouterView">
const store = useStore() // 定义 vuex 实例


// props
const props = defineProps({
    minHeight: {
        type: String,
        default: '',
    },
})


// 设置主界面切换动画
const setTransitionName = computed(() => {
    return store.getters.layoutConfig.animation
})

</script>

<style lang='scss' scoped>
</style>