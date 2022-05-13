<template>
    <el-drawer :title="`${state.nodeData.type === 'line' ? '线' : '节点'}操作`" v-model="state.isOpen" size="400px">
        <el-scrollbar>
            <Line v-if="state.nodeData.type === 'line'" @change="onLineChange" @close="close" ref="lineRef" />
            <Node v-else @submit="onNodeSubmit" @close="close" ref="nodeRef" />
        </el-scrollbar>
    </el-drawer>
</template>

<script setup name="funcWorkflowDrawerLine">
import Line from "./line.vue"
import Node from "./node.vue"

// 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告
const emit = defineEmits(["label", "node"])

// 定义响应式数据>
const lineRef = ref()
const nodeRef = ref()
const state = reactive({
    isOpen: false,
    nodeData: {
        type: "node",
    },
    jsplumbConn: {},
})

// 打开抽屉
const open = (item, conn) => {
    state.isOpen = true
    state.jsplumbConn = conn
    state.nodeData = item
    nextTick(() => {
        if (item.type === "line") lineRef.value.getParentData(item)
        else nodeRef.value.getParentData(item)
    })
}

// 关闭
const close = () => {
    state.isOpen = false
}

// 线 label 内容改变时
const onLineChange = (label) => {
    state.jsplumbConn.label = label
    emit("label", state.jsplumbConn)
}

// 节点内容改变时
const onNodeSubmit = (data) => {
    emit("node", data)
}

// 暴露数据到 vue 实例
defineExpose({
    open,
})
</script>

<style lang="scss" scoped></style>
