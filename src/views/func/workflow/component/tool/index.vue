<template>
    <div class="workflow-tool">
        <div class="pl15">{{ setToolTitle }}</div>

        <div class="workflow-tool-right">
            <div class="workflow-tool-icon" v-for="(v, k) in state.toolList" :key="k" :title="v.title"
                @click="onToolClick(v.fnName)">
                <el-icon>
                    <component :is="v.icon" />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup name="funcWorkflowTool">
const store = useStore() // vuex 实例
const emit = defineEmits(['tool'])

// 定义响应式数据>
const state = reactive({
    toolList: [
        { icon: 'Help', title: '帮助', fnName: 'help' },
        { icon: 'Download', title: '下载', fnName: 'download' },
        { icon: 'Check', title: '提交', fnName: 'submit' },
        { icon: 'DocumentCopy', title: '复制', fnName: 'copy' },
        { icon: 'Delete', title: '删除', fnName: 'del' },
        { icon: 'FullScreen', title: '全屏', fnName: 'fullscreen' },
    ],
})


// 获取布局配置信息
const layoutConfig = computed(() => {
    return store.getters.layoutConfig
})


// 设置 tool 标题
const setToolTitle = computed(() => {
    let { globalTitle } = layoutConfig.value
    return `${globalTitle}工作流`
})


// 顶部工具栏
const onToolClick = (fnName) => {
    emit('tool', fnName)
}
</script>

<style lang='scss' scoped>
.workflow-tool {
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
    color: var(--el-text-color-primary);

    .workflow-tool-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .workflow-tool-icon {
        padding: 0 10px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;

        &:hover {
            background: rgba(0, 0, 0, 0.04);

            i {
                display: inline-block;
                animation: logoAnimation 0.3s ease-in-out;
            }
        }
    }
}
</style>