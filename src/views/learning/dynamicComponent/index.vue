<template>
    <div class="dynamicComponent">
        <ul>
            <li v-for="(item, index) in tabList" :key="index" @click="change(index)">{{ item.name }}</li>
        </ul>

        <component :is="state.com"></component>
    </div>
</template>

<script setup name="learningDynamicComponent">
import A from './component/A.vue'
import B from './component/B.vue'
import C from './component/C.vue'

// 因为 reactive 是响应式数据 proxy 但是组件确不需要响应式，所有需要使用 markRaw 或者 shallowRef 来避免
const tabList = reactive([
    { name: 'A 组件', com: markRaw(A) },
    { name: 'B 组件', com: markRaw(B) },
    { name: 'C 组件', com: markRaw(C) },
])
const state = reactive({
    com: tabList[0].com,
})

// 切换组件
const change = (index) => {
    state.com = tabList[index].com
}
</script>

<style lang="scss" scoped></style>
