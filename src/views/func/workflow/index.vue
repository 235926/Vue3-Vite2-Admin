<template>
    <div class="workflow">
        <div class="layout-view-bg-white workflow-wrap" :style="{ height: `calc(100vh - ${setViewHeight}` }">
            <!-- 顶部工具栏 -->
            <Tool @tool="onToolClick" />

            <!-- 内容部分 -->
            <div class="workflow-content">
                <!-- 左侧导航区 -->
                <div id="workflow-left">
                    <el-scrollbar>
                        <div
                            :id="`left${key}`"
                            v-for="(val, key) in state.leftNavList"
                            :key="val.id"
                            :style="{ height: val.isOpen ? 'auto' : '50px', overflow: 'hidden' }"
                            class="workflow-left-id"
                        >
                            <div class="workflow-left-title" @click="onTitleClick(val)">
                                <span>{{ val.title }}</span>
                                <el-icon>
                                    <component :is="val.isOpen ? 'ArrowDown' : 'ArrowRight'" />
                                </el-icon>
                            </div>
                            <div
                                class="workflow-left-item"
                                v-for="(v, k) in val.children"
                                :key="k"
                                :data-name="v.name"
                                :data-icon="v.icon"
                                :data-id="v.id"
                            >
                                <div class="workflow-left-item-icon">
                                    <SvgIcon :name="v.icon" />
                                    <div class="font10 pl5 name">{{ v.name }}</div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>

                <!-- 右侧绘画区 -->
                <div id="workflow-right">
                    <div
                        v-for="(v, k) in state.jsplumbData.nodeList"
                        :key="v.nodeId"
                        :id="v.nodeId"
                        :class="v.class"
                        :style="{ left: v.left, top: v.top }"
                        @click="onItemCloneClick(k)"
                        @contextmenu.prevent="onContextmenu(v, k, $event)"
                    >
                        <div
                            class="workflow-right-box"
                            :class="{ 'workflow-right-active': state.jsPlumbNodeIndex === k }"
                        >
                            <div class="workflow-left-item-icon">
                                <SvgIcon :name="v.icon" class="workflow-icon-drag" />
                                <div class="font10 pl5 name">{{ v.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 节点右键菜单 -->
        <Contextmenu :dropdown="state.dropdownNode" ref="contextmenuNodeRef" @current="onCurrentNodeClick" />

        <!-- 线右键菜单 -->
        <Contextmenu :dropdown="state.dropdownLine" ref="contextmenuLineRef" @current="onCurrentLineClick" />

        <!-- 顶部工具栏-帮助弹窗 -->
        <Help ref="helpRef" />

        <!-- 抽屉表单、线 -->
        <Drawer ref="drawerRef" @label="setLineLabel" @node="setNodeContent" />
    </div>
</template>

<script setup name="funcWorkflow">
import { jsPlumb } from "jsplumb" // 工作流插件
import Sortable from "sortablejs" // 拖拽插件
import Tool from "./component/tool/index.vue" // 顶部工具栏
import Help from "./component/tool/help.vue" // 顶部工具栏帮助弹窗
import Contextmenu from "./component/contextmenu/index.vue" // 右键菜单信息
import Drawer from './component/drawer/index.vue' // 抽屉表单、线
import { leftNavList } from "./js/mock.js" // 左侧导航数据
import { jsplumbDefaults, jsplumbMakeSource, jsplumbMakeTarget, jsplumbConnect } from "./js/config.js" // jsplumb 配置
import { handleClipboard } from "@/plugin/clipboard3.js" // 剪切板

const { proxy } = getCurrentInstance() // vue 实例
const store = useStore() // vuex 实例

// 定义响应式数据>
const contextmenuNodeRef = ref() // 模型轴ref
const contextmenuLineRef = ref() // 连接线ref
const helpRef = ref() // 顶部工具栏帮助弹窗ref
const drawerRef = ref() // 抽屉表单、线ref
const state = reactive({
    leftNavList: [], // 左侧导航数据
    jsPlumb: null, // 缓存实例化的 jsplumb 对象
    jsPlumbNodeIndex: null, // 当前选择的 jsPlumb
    jsplumbDefaults: jsplumbDefaults, // jsplumb 默认配置
    jsplumbMakeSource: jsplumbMakeSource, // 整个节点作为 source
    jsplumbMakeTarget: jsplumbMakeTarget, //  // 整个节点作为 target
    jsplumbConnect: jsplumbConnect, // // 连线参数
    jsplumbData: {
        // 画布数据
        nodeList: [], // 模型轴数据
        lineList: [], // 连接线数据
    },
    dropdownNode: { x: "", y: "" }, // 右键点击模型轴数据
    dropdownLine: { x: "", y: "" }, // 右键点击连接线数据
})

// 计算头部高度
const setViewHeight = computed(() => {
    let { isTagsview } = store.getters.layoutConfig
    let isTagsViewCurrenFull = store.getters.isTagsViewCurrenFull
    if (isTagsViewCurrenFull) {
        return `40px`
    } else {
        if (isTagsview) return `125px`
        else return `90px`
    }
})

// 左侧导航-数据初始化
const initLeftNavList = () => {
    state.leftNavList = leftNavList
    state.jsplumbData = {
        nodeList: [
            {
                nodeId: "huej738hbji",
                left: "148px",
                top: "93px",
                class: "workflow-right-clone",
                icon: "engine",
                name: "引擎",
                id: "11",
            },
            {
                nodeId: "52kcszzyxrd",
                left: "458px",
                top: "203px",
                class: "workflow-right-clone",
                icon: "template",
                name: "模版",
                id: "12",
            },
            {
                nodeId: "nltskl6k4me",
                left: "164px",
                top: "350px",
                class: "workflow-right-clone",
                icon: "name",
                name: "名称",
                id: "13",
            },
        ],
        lineList: [
            { sourceId: "huej738hbji", targetId: "52kcszzyxrd", label: "传送" },
            { sourceId: "huej738hbji", targetId: "nltskl6k4me", label: "" },
        ],
    }
}

// 左侧导航-初始化拖动
const initSortable = () => {
    state.leftNavList.forEach((v, k) => {
        Sortable.create(document.getElementById(`left${k}`), {
            group: {
                name: "Vue3-Vite2-Admin",
                pull: "clone",
                put: false,
            },
            animation: 0,
            sort: false,
            draggable: ".workflow-left-item",
            forceFallback: true,
            onEnd: function (evt) {
                const { name, icon, id } = evt.clone.dataset
                const { layerX, layerY, clientX, clientY } = evt.originalEvent
                const el = document.querySelector("#workflow-right")
                const { x, y, width, height } = el.getBoundingClientRect()
                if (clientX < x || clientX > width + x || clientY < y || y > y + height) {
                    proxy.$message.warning("请把节点拖入到画布中")
                } else {
                    // 节点id（唯一）
                    const nodeId = Math.random().toString(36).substr(2, 12)
                    // 处理节点数据
                    const node = {
                        nodeId,
                        left: `${layerX - 40}px`,
                        top: `${layerY - 15}px`,
                        class: "workflow-right-clone",
                        name,
                        icon,
                        id,
                    }
                    // 右侧视图内容数组
                    state.jsplumbData.nodeList.push(node)
                    // 元素加载完毕时
                    nextTick(() => {
                        // 整个节点作为source或者target
                        state.jsPlumb.makeSource(nodeId, state.jsplumbMakeSource)
                        // // 整个节点作为source或者target
                        state.jsPlumb.makeTarget(nodeId, state.jsplumbMakeTarget, jsplumbConnect)
                        // 设置节点可以拖拽（此处为id值，非class）
                        state.jsPlumb.draggable(nodeId, {
                            containment: "parent",
                            stop: (el) => {
                                state.jsplumbData.nodeList.forEach((v) => {
                                    if (v.nodeId === el.el.id) {
                                        // 节点x, y重新赋值，防止再次从左侧导航中拖拽节点时，x, y恢复默认
                                        v.left = `${el.pos[0]}px`
                                        v.top = `${el.pos[1]}px`
                                    }
                                })
                            },
                        })
                    })
                }
            },
        })
    })
}

// 左侧导航-菜单标题点击
const onTitleClick = (val) => {
    val.isOpen = !val.isOpen
}

// 初始化 jsPlumb
const initJsPlumb = () => {
    // jsPlumb.ready方法和jquery的ready方法差不多的功能，jsPlumb.connect用于建立连线
    jsPlumb.ready(() => {
        state.jsPlumb = jsPlumb.getInstance({
            detachable: false,
            Container: "workflow-right", // 连线的容器
        })
        state.jsPlumb.fire("jsPlumbDemoLoaded", state.jsPlumb)

        // 导入默认配置
        state.jsPlumb.importDefaults(state.jsplumbDefaults)

        // 会使整个 jsPlumb 立即重绘。
        state.jsPlumb.setSuspendDrawing(false, true)

        // 初始化节点、线的链接
        initJsPlumbConnection()

        // 点击线弹出右键菜单
        state.jsPlumb.bind("contextmenu", (conn, originalEvent) => {
            originalEvent.preventDefault()
            const { sourceId, targetId } = conn
            const { clientX, clientY } = originalEvent
            state.dropdownLine.x = clientX
            state.dropdownLine.y = clientY
            const v = state.jsplumbData.nodeList.find((v) => v.nodeId === targetId)
            const line = state.jsplumbData.lineList.find((v) => v.sourceId === sourceId && v.targetId === targetId)
            v.type = "line"
            v.label = line.label
            contextmenuLineRef.value.openContextmenu(v, conn)
        })

        // 连线之前
        state.jsPlumb.bind("beforeDrop", (conn) => {
            const { sourceId, targetId } = conn
            const item = state.jsplumbData.lineList.find((v) => v.sourceId === sourceId && v.targetId === targetId)
            if (item) {
                proxy.$message.warning("关系已存在，不可重复连接")
                return false
            } else {
                return true
            }
        })

        // 连线时
        state.jsPlumb.bind("connection", (conn) => {
            const { sourceId, targetId } = conn
            state.jsplumbData.lineList.push({
                sourceId,
                targetId,
                label: "",
            })
        })

        // 删除连线时回调函数
        state.jsPlumb.bind("connectionDetached", (conn) => {
            const { sourceId, targetId } = conn
            state.jsplumbData.lineList = state.jsplumbData.lineList.filter((line) => {
                if (line.sourceId == sourceId && line.targetId == targetId) {
                    return false
                }
                return true
            })
        })
    })
}

// 初始化节点、线的链接
const initJsPlumbConnection = () => {
    // 节点
    state.jsplumbData.nodeList.forEach((v) => {
        // 整个节点作为source或者target
        state.jsPlumb.makeSource(v.nodeId, state.jsplumbMakeSource)
        // 整个节点作为source或者target
        state.jsPlumb.makeTarget(v.nodeId, state.jsplumbMakeTarget, jsplumbConnect)
        // 设置节点可以拖拽（此处为id值，非class）
        state.jsPlumb.draggable(v.nodeId, {
            containment: "parent",
            stop: (el) => {
                state.jsplumbData.nodeList.forEach((v) => {
                    if (v.nodeId === el.el.id) {
                        // 节点x, y重新赋值，防止再次从左侧导航中拖拽节点时，x, y恢复默认
                        v.left = `${el.pos[0]}px`
                        v.top = `${el.pos[1]}px`
                    }
                })
            },
        })
    })

    // 线
    state.jsplumbData.lineList.forEach((v) => {
        state.jsPlumb.connect(
            {
                source: v.sourceId,
                target: v.targetId,
                label: v.label,
            },
            state.jsplumbConnect
        )
    })
}

// 右侧内容区-当前项点击
const onItemCloneClick = (k) => {
    state.jsPlumbNodeIndex = k
}

// 右侧内容区-当前项右键菜单点击
const onContextmenu = (v, k, e) => {
    state.jsPlumbNodeIndex = k
    const { clientX, clientY } = e
    state.dropdownNode.x = clientX
    state.dropdownNode.y = clientY
    v.type = "node"
    v.label = ""
    let item = {}
    state.leftNavList.forEach((l) => {
        if (l.children) if (l.children.find((c) => c.id === v.id)) item = l.children.find((c) => c.id === v.id)
    })
    v.from = item.form
    contextmenuNodeRef.value.openContextmenu(v)
}

// 右侧内容区-当前项右键菜单点击回调(节点)
const onCurrentNodeClick = (item) => {
    const { contextMenuClickId, nodeId } = item
    if (contextMenuClickId === 0) {
        const nodeIndex = state.jsplumbData.nodeList.findIndex((item) => item.nodeId === nodeId)
        state.jsplumbData.nodeList.splice(nodeIndex, 1)
        state.jsPlumb.removeAllEndpoints(nodeId)
        state.jsPlumbNodeIndex = null
    } else if (contextMenuClickId === 1) {
        drawerRef.value.open(item)
    }
}

// 右侧内容区-当前项右键菜单点击回调(线)
const onCurrentLineClick = (item, conn) => {
    const { contextMenuClickId } = item
    const { endpoints } = conn
    const intercourse = []
    endpoints.forEach((v) => {
        intercourse.push({
            id: v.element.id,
            innerText: v.element.innerText,
        })
    })
    item.contact = `${intercourse[0].innerText}(${intercourse[0].id}) => ${intercourse[1].innerText}(${intercourse[1].id})`
    if (contextMenuClickId === 0) state.jsPlumb.deleteConnection(conn)
    else if (contextMenuClickId === 1) drawerRef.value.open(item, conn)
}

// 设置线的 label
const setLineLabel = (obj) => {
    const { sourceId, targetId, label } = obj
    const conn = state.jsPlumb.getConnections({
        source: sourceId,
        target: targetId,
    })[0]
    conn.setLabel(label)
    if (!label || label === "") {
        conn.addClass("workflow-right-empty-label")
    } else {
        conn.removeClass("workflow-right-empty-label")
        conn.addClass("workflow-right-label")
    }
    state.jsplumbData.lineList.forEach((v) => {
        if (v.sourceId === sourceId && v.targetId === targetId) v.label = label
    })
}

// 设置节点内容
const setNodeContent = (obj) => {
    const { nodeId, name, icon } = obj
    // 设置节点 name 与 icon
    state.jsplumbData.nodeList.forEach((v) => {
        if (v.nodeId === nodeId) {
            v.name = name
            v.icon = icon
        }
    })
    // 重绘
    nextTick(() => {
        state.jsPlumb.setSuspendDrawing(false, true)
    })
}

// 顶部工具栏-当前项点击
const onToolClick = (fnName) => {
    switch (fnName) {
        case "help":
            onToolHelp()
            break
        case "download":
            onToolDownload()
            break
        case "submit":
            onToolSubmit()
            break
        case "copy":
            onToolCopy()
            break
        case "del":
            onToolDel()
            break
        case "fullscreen":
            onToolFullscreen()
            break
    }
}

// 顶部工具栏-帮助
const onToolHelp = () => {
    nextTick(() => {
        helpRef.value.open()
    })
}
// 顶部工具栏-下载
const onToolDownload = () => {
    const { globalTitle } = store.getters.layoutConfig
    const href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.jsplumbData, null, "\t"))
    const aLink = document.createElement("a")
    aLink.setAttribute("href", href)
    aLink.setAttribute("download", `${globalTitle}工作流.json`)
    aLink.click()
    aLink.remove()
    proxy.$message.success("下载成功")
}

// 顶部工具栏-提交
const onToolSubmit = () => {
    proxy.$message.success("数据提交成功")
}

// 顶部工具栏-复制
const onToolCopy = () => {
    handleClipboard(JSON.stringify(state.jsplumbData))
}

// 顶部工具栏-删除
const onToolDel = () => {
    proxy
        .$confirm("此操作将清空画布，是否继续？", "提示", {
            confirmButtonText: "清空",
            cancelButtonText: "取消",
        })
        .then(() => {
            state.jsplumbData.nodeList.forEach((v) => {
                state.jsPlumb.removeAllEndpoints(v.nodeId)
            })
            nextTick(() => {
                state.jsplumbData = {
                    nodeList: [],
                    lineList: [],
                }
                proxy.$message.success("清空画布成功")
            })
        })
        .catch(() => {})
}

// 顶部工具栏-全屏
const onToolFullscreen = () => {
    store.dispatch("tagsView/setCurrenFullscreen", true)
}

// 组件挂载后，此方法执行后，页面显示
onMounted(async () => {
    await initLeftNavList()
    initJsPlumb()
    initSortable()
})
</script>

<style lang="scss" scoped>
.workflow-wrap {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;

    // 内容部分
    .workflow-content {
        display: flex;
        height: calc(100% - 40px);

        // 左侧导航区
        #workflow-left {
            width: 220px;
            height: 100%;
            border-right: 1px solid var(--el-border-color-light, #ebeef5);

            :deep(.el-collapse-item__content) {
                padding-bottom: 0;
            }

            .workflow-left-title {
                height: 50px;
                display: flex;
                align-items: center;
                padding: 0 10px;
                border-top: 1px solid var(--el-border-color-light, #ebeef5);
                color: var(--el-text-color-primary);
                cursor: default;

                span {
                    flex: 1;
                }
            }

            .workflow-left-item {
                display: inline-block;
                width: calc(50% - 15px);
                position: relative;
                cursor: move;
                margin: 0 0 10px 10px;

                .workflow-left-item-icon {
                    height: 35px;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                    padding: 5px 10px;
                    border: 1px dashed transparent;
                    background: var(--dl-bg-color);
                    border-radius: 3px;

                    .svg-icon,
                    .name {
                        color: var(--el-text-color-secondary);
                        transition: all 0.3s ease;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    &:hover {
                        transition: all 0.3s ease;
                        border: 1px dashed var(--el-color-primary);
                        background: var(--el-color-primary-light-9);
                        border-radius: 5px;

                        .svg-icon,
                        .name {
                            transition: all 0.3s ease;
                            color: var(--el-color-primary);
                        }
                    }
                }
            }

            & .workflow-left-id:first-of-type {
                .workflow-left-title {
                    border-top: none;
                }
            }
        }

        // 右侧绘画区
        #workflow-right {
            flex: 1;
            position: relative;
            overflow: hidden;
            height: 100%;
            background-image: linear-gradient(90deg, rgb(156 214 255 / 15%) 10%, rgba(0, 0, 0, 0) 10%),
                linear-gradient(rgb(156 214 255 / 15%) 10%, rgba(0, 0, 0, 0) 10%);
            background-size: 10px 10px;

            .workflow-right-clone {
                position: absolute;

                .workflow-right-box {
                    height: 35px;
                    align-items: center;
                    color: var(--el-text-color-secondary);
                    padding: 0 10px;
                    border-radius: 3px;
                    cursor: move;
                    transition: all 0.3s ease;
                    min-width: 94.5px;
                    background: var(--el-color-white);
                    border: 1px solid var(--el-border-color-light, #ebeef5);

                    .workflow-left-item-icon {
                        display: flex;
                        align-items: center;
                        height: 35px;
                    }

                    &:hover {
                        border: 1px dashed var(--el-color-primary);
                        background: var(--el-color-primary-light-9);
                        transition: all 0.3s ease;
                        color: var(--el-color-primary);

                        i {
                            cursor: Crosshair;
                        }
                    }
                }

                .workflow-right-active {
                    border: 1px dashed var(--el-color-primary);
                    background: var(--el-color-primary-light-9);
                    color: var(--el-color-primary);
                }
            }

            :deep(.jtk-overlay):not(.aLabel) {
                padding: 4px 10px;
                border: 1px solid var(--el-border-color-light, #ebeef5) !important;
                color: var(--el-text-color-secondary) !important;
                background: var(--el-color-white) !important;
                border-radius: 3px;
                font-size: 10px;
            }

            :deep(.jtk-overlay.workflow-right-empty-label) {
                display: none;
            }
        }
    }
}
</style>
