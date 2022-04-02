<template>
    <el-row :gutter="20" class="panel-group">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <el-card class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <div
                    :class="{ active: state.active == 'newVisitis' }"
                    class="card-panel-icon-wrapper icon-people"
                >
                    <svg-icon name="peoples" />
                </div>
                <div class="card-panel-desc">
                    <div class="card-panel-text">New Visits</div>
                    <count-to :start-val="0" :end-val="102400" :duration="2600" class="panel-num" />
                </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <el-card class="card-panel" @click="handleSetLineChartData('messages')">
                <div
                    :class="{ active: state.active == 'messages' }"
                    class="card-panel-icon-wrapper icon-message"
                >
                    <svg-icon name="message" />
                </div>
                <div class="card-panel-desc">
                    <div class="card-panel-text">Messages</div>
                    <count-to :start-val="0" :end-val="81212" :duration="3000" class="panel-num" />
                </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <el-card class="card-panel" @click="handleSetLineChartData('purchases')">
                <div
                    :class="{ active: state.active == 'purchases' }"
                    class="card-panel-icon-wrapper icon-money"
                >
                    <svg-icon name="money" />
                </div>
                <div class="card-panel-desc">
                    <div class="card-panel-text">Purchases</div>
                    <count-to :start-val="0" :end-val="9280" :duration="3200" class="panel-num" />
                </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <el-card class="card-panel" @click="handleSetLineChartData('shoppings')">
                <div
                    :class="{ active: state.active == 'shoppings' }"
                    class="card-panel-icon-wrapper icon-shopping"
                >
                    <svg-icon name="shopping" />
                </div>
                <div class="card-panel-desc">
                    <div class="card-panel-text">Shoppings</div>
                    <count-to :start-val="0" :end-val="13600" :duration="3600" class="panel-num" />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { CountTo } from 'vue3-count-to' // 数字滚动插件
const emit = defineEmits(['handleSetLineChartData']) // 使用 emit需要把自定义的事件在defineEmits定义，要不会有警告


// 定义响应式数据
const state = reactive({
    active: 'newVisitis'
})


// 切换折线图数据传递给父组件
const handleSetLineChartData = (type) => {
    state.active = type
    emit('handleSetLineChartData', type)
}
</script>

<style lang='scss' scoped>
.panel-group {
    margin-bottom: 0;

    :deep(.el-card__body) {
        cursor: pointer;
        color: #666;
        background: #fff;
        display: flex;
        justify-content: space-between;

        .card-panel-icon-wrapper {
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;

            .svg-icon {
                font-size: 48px;
            }

            &.icon-people {
                color: #40c9c6;
            }

            &.icon-message {
                color: #36a3f7;
            }

            &.icon-money {
                color: #f4516c;
            }

            &.icon-shopping {
                color: #34bfa3;
            }

            &.active {
                color: #fff;
            }

            &.active.icon-people {
                background: #40c9c6;
            }

            &.active.icon-message {
                background: #36a3f7;
            }

            &.active.icon-money {
                background: #f4516c;
            }

            &.active.icon-shopping {
                background: #34bfa3;
            }
        }

        .card-panel-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 12px;
            }

            .panel-num {
                font-size: 20px;
            }
        }

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3;
            }
        }
    }
}
</style>