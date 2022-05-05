<template>
    <div class="page-container">
        <el-card shadow="hover" header="波浪指令效果（v-waves）作用于 btn">
            <el-row class="mb10" style="color: #808080">可选参数 v-waves=" |light|red|orange|purple|green|teal"</el-row>

            <div class="flex-warp">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button v-waves>默认效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="primary" v-waves="'light'">light 效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="success" v-waves="'red'">red 效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="info" v-waves="'orange'">orange 效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="warning" v-waves="'purple'">purple 效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="danger" v-waves="'green'">green 效果</el-button>
                    </div>
                </div>
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="primary" v-waves="'teal'">teal 效果</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup name="funcWaves">
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({

})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.flex-warp {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;

    .flex-warp-item {
        padding: 5px;

        .flex-warp-item-box {
            width: 100%;
            height: 100%;
        }
    }
}

.waterfall-first {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(188px, 1fr));
    grid-gap: 0.25em;
    grid-auto-flow: row dense;
    grid-auto-rows: 20px;

    .waterfall-first-item {
        width: 100%;
        background: var(--el-color-primary);
        color: var(--el-color-white);
        transition: all 0.3s ease;
        border-radius: 3px;

        &:nth-of-type(3n + 1) {
            grid-row: auto / span 5;
        }

        &:nth-of-type(3n + 2) {
            grid-row: auto / span 6;
        }

        &:nth-of-type(3n + 3) {
            grid-row: auto / span 8;
        }

        &:hover {
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            transition: all 0.3s ease;
            cursor: pointer;
        }
    }
}
</style>