<template>
    <div class="asyncComponent">
        <Suspense>
            <template #default>
                <A />
            </template>
            <template #fallback> 加载中... </template>
        </Suspense>
        <B />
        <div ref="target">
            <C v-if="targetIsVisible" />
        </div>
    </div>
</template>

<script setup name="learningAsyncComponent">
import { useIntersectionObserver } from '@vueuse/core' // Vue Composition API的常用工具集
// import A from './component/A.vue'
import B from './component/B.vue'
// import C from './component/C.vue'

const A = defineAsyncComponent(() => import('./component/A.vue'))
const C = defineAsyncComponent(() => import('./component/C.vue'))

const target = ref(null)
const targetIsVisible = ref(false) // 判断是否加载

// 滑动到组件部分才加载组件
const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
        targetIsVisible.value = isIntersecting
    }
})
</script>

<style lang="scss" scoped></style>
