<template>
    <div class="workflow-drawer-node">
        <el-tabs type="border-card" v-model="state.tabsActive">
            <!-- 节点编辑 -->
            <el-tab-pane label="节点编辑" name="1">
                <el-scrollbar>
                    <el-form
                        :model="state.node"
                        :rules="state.nodeRules"
                        ref="nodeFormRef"
                        label-width="80px"
                        class="padding20"
                    >
                        <el-form-item label="数据id" prop="id">
                            <el-input v-model="state.node.id" placeholder="请输入数据id" clearable disabled></el-input>
                        </el-form-item>
                        <el-form-item label="节点id" prop="nodeId">
                            <el-input
                                v-model="state.node.nodeId"
                                placeholder="请输入节点id"
                                clearable
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
                            <el-input v-model="state.node.type" placeholder="请输入类型" clearable disabled></el-input>
                        </el-form-item>
                        <el-form-item label="left坐标" prop="left">
                            <el-input
                                v-model="state.node.left"
                                placeholder="请输入left坐标"
                                clearable
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="top坐标" prop="top">
                            <el-input
                                v-model="state.node.top"
                                placeholder="请输入top坐标"
                                clearable
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="icon图标" prop="icon">
                            <el-input v-model="state.node.icon" placeholder="请输入icon图标" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="state.node.name" placeholder="请输入名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onExtendRefresh">
                                <el-icon>
                                    <RefreshRight />
                                </el-icon>
                                重置
                            </el-button>
                            <el-button @click="onNodeSubmit" type="primary">
                                <el-icon>
                                    <Check />
                                </el-icon>
                                保存
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </el-tab-pane>

            <!-- 扩展表单 -->
            <el-tab-pane label="扩展表单" name="2">
                <el-scrollbar>
                    <el-form :model="state.form" ref="extendFormRef" label-width="80px" class="padding20">
                        <el-form-item
                            :label="val.label"
                            :prop="val.prop"
                            v-for="(val, key) in state.node.from"
                            :key="key"
                            :rules="[{ required: val.required, message: `${val.label}不能为空`, trigger: 'blur' }]"
                        >
                            <el-input
                                v-model="state.form[val.prop]"
                                :placeholder="val.placeholder"
                                clearable
                                v-if="val.type === 'input'"
                                :disabled="val.disabled"
                            ></el-input>
                            <el-select
                                v-model="state.form[val.prop]"
                                placeholder="请选择"
                                v-if="val.type === 'select'"
                                clearable
                                :disabled="val.disabled"
                            >
                                <el-option
                                    v-for="item in val.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-checkbox-group
                                v-model="state.form[val.prop]"
                                v-if="val.type === 'checkbox'"
                                :disabled="val.disabled"
                            >
                                <el-checkbox label="美食推荐" name="type"></el-checkbox>
                                <el-checkbox label="统计分析" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onNodeRefresh">
                                <el-icon>
                                    <RefreshRight />
                                </el-icon>
                                重置
                            </el-button>
                            <el-button @click="onExtendSubmit" type="primary">
                                <el-icon>
                                    <Check />
                                </el-icon>
                                保存
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </el-tab-pane>

            <!-- 图表可视化 -->
            <el-tab-pane label="图表可视化" name="3">
                <div class="chartsMonitorRef">
                    <div v-chartResize style="width: 100%; height: 100%" ref="chartsMonitorRef"></div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup name="funcWorkflowDrawerNode">
import * as echarts from "echarts" // echarts
const { proxy } = getCurrentInstance() // vue 实例

// 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告
const emit = defineEmits(["submit", "close"])

// 定义响应式数据>
const nodeFormRef = ref()
const extendFormRef = ref()
const chartsMonitorRef = ref()
const stateShallow = shallowRef({
    myChart: null, // echarts 图表
})
const state = reactive({
    node: {},
    nodeRules: {
        id: [{ required: true, message: "请输入数据id", trigger: "blur" }],
        nodeId: [{ required: true, message: "请输入节点id", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        left: [{ required: true, message: "请输入left坐标", trigger: "blur" }],
        top: [{ required: true, message: "请输入top坐标", trigger: "blur" }],
        icon: [{ required: true, message: "请输入icon图标", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    },
    form: {
        module: [],
    },
    tabsActive: "1",
    loading: {
        extend: false,
    },
})

// 获取父组件数据
const getParentData = (data) => {
    state.tabsActive = "1"
    state.node = data
}

// 节点编辑-重置
const onNodeRefresh = () => {
    state.node.icon = ""
    state.node.name = ""
}

// 节点编辑-保存
const onNodeSubmit = () => {
    nodeFormRef.value.validate((valid) => {
        if (valid) {
            emit("submit", state.node)
            emit("close")
        } else {
            return false
        }
    })
}

// 扩展表单-重置
const onExtendRefresh = () => {
    extendFormRef.value.resetFields()
}

// 扩展表单-保存
const onExtendSubmit = () => {
    extendFormRef.value.validate((valid) => {
        if (valid) {
            state.loading.extend = true
            setTimeout(() => {
                state.loading.extend = false
                proxy.$message.success("保存成功")
                emit("close")
            }, 1000)
        } else {
            return false
        }
    })
}

// 图表可视化-初始化
const initChartsMonitor = () => {
    stateShallow.myChart = echarts.init(chartsMonitorRef.value)

    // 指定图表的配置项和数据
    const option = {
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    }

    // 使用刚指定的配置项和数据显示图表。
    stateShallow.myChart.setOption(option)
}

onMounted(() => {
    nextTick(() => {
        initChartsMonitor()
    })
})

// 组件销毁完成后执行的函数
onUnmounted(() => {
    nodeFormRef.value.resetFields()
    extendFormRef.value.resetFields()
})

// 暴露数据到 vue 实例
defineExpose({
    getParentData,
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs) {
    box-shadow: unset;
    border: unset;

    .el-tabs__nav {
        display: flex;
        width: 100%;

        .el-tabs__item {
            flex: 1;
            padding: unset;
            text-align: center;

            &:first-of-type.is-active {
                border-left-color: transparent;
            }

            &:last-of-type.is-active {
                border-right-color: transparent;
            }
        }
    }

    .el-tabs__content {
        padding: 0;
        height: calc(100vh - 90px);

        .el-tab-pane {
            height: 100%;
        }
    }
}

.chartsMonitorRef {
    width: 100%;
    height: 300px;
}
</style>
