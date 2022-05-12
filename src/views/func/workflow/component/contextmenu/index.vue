<template>
    <transition name="el-zoom-in-center">
        <div
            aria-hidden="true"
            class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu"
            role="tooltip"
            data-popper-placement="bottom"
            :style="`top: ${dropdowns.y + 5}px;left: ${dropdowns.x}px;`"
            :key="Math.random()"
            v-show="state.isShow"
        >
            <ul class="el-dropdown-menu">
                <li
                    v-for="(v, k) in state.dropdownList"
                    class="el-dropdown-menu__item"
                    aria-disabled="false"
                    tabindex="-1"
                    :key="k"
                    @click="onCurrentClick(v.contextMenuClickId)"
                >
                    <el-icon><component :is="v.icon" /></el-icon>
                    <span>{{ v.txt }}{{ state.item.type === "line" ? "线" : "节点" }}</span>
                </li>
            </ul>
            <div class="el-popper__arrow" style="left: 10px"></div>
        </div>
    </transition>
</template>

<script setup name="funcWorkflowContextMenu">
// props
const props = defineProps({
    dropdown: {
        type: Object,
    },
})

// 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告
const emit = defineEmits(["current"])

// 定义响应式数据>
const state = reactive({
    isShow: false,
    dropdownList: [
        { contextMenuClickId: 0, txt: "删除", icon: "Delete" },
        { contextMenuClickId: 1, txt: "编辑", icon: "Edit" },
    ],
    item: {
        type: "node",
    },
    conn: {},
})

// 父级传过来的坐标 x,y 值
const dropdowns = computed(() => {
    return props.dropdown
})

// 当前项菜单点击
const onCurrentClick = (contextMenuClickId) => {
    emit("current", Object.assign({}, { contextMenuClickId }, state.item), state.conn)
}

// 打开右键菜单：判断是否固定，固定则不显示关闭按钮
const openContextmenu = (item, conn = {}) => {
    state.item = item
    state.conn = conn
    closeContextmenu()
    setTimeout(() => {
        state.isShow = true
    }, 10)
}

// 关闭右键菜单
const closeContextmenu = () => {
    state.isShow = false
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    document.body.addEventListener("click", closeContextmenu)
    document.body.addEventListener("contextmenu", closeContextmenu)
})

// 页面卸载时，移除右键菜单监听事件
onUnmounted(() => {
    document.body.removeEventListener("click", closeContextmenu)
    document.body.removeEventListener("contextmenu", closeContextmenu)
})

// 暴露数据到 vue 实例
defineExpose({
    openContextmenu,
})
</script>

<style lang="scss" scoped>
.custom-contextmenu {
    transform-origin: center top;
    z-index: 2190;
    position: fixed;

    .el-dropdown-menu__item {
        font-size: 12px !important;
        white-space: nowrap;

        i {
            font-size: 12px !important;
        }
    }
}
</style>
