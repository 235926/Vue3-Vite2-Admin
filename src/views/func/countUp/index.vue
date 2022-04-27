<template>
    <el-card shadow="hover" header="数字滚动演示">
        <el-alert title="感谢优秀的 `countup.js`，项目地址：https://github.com/inorganik/countUp.js" type="success"
            :closable="false" class="mb20"></el-alert>
        <el-alert title="本项目根据 `countup.js`，封装的数字滚动组件 @/components/CountUp/index.vue" type="success" :closable="false"
            class="mb20"></el-alert>

        <el-row :gutter="20" class="row-gap20 mb15">
            <el-col :sm="6" v-for="(v, k) in topCardItemList" :key="k">
                <div class="countup-card-item countup-card-item-box" :style="{ background: `var(${v.color})` }">
                    <div class="countup-card-item-flex">
                        <div class="countup-card-item-title pb3">{{ v.title }}</div>
                        <div class="countup-card-item-title-num pb6">
                            <CountUp :endVal="v.titleNum"></CountUp>
                        </div>
                        <div class="countup-card-item-tip pb3">{{ v.tip }}</div>
                        <div class="countup-card-item-tip-num">
                            <CountUp :endVal="v.tipNum"></CountUp>
                        </div>
                    </div>
                    <svg-icon :name="v.icon" :style="{ color: v.iconColor }" />
                </div>
            </el-col>
        </el-row>

        <div class="flex-warp">
            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="primary" @click="pauseResume">
                        <el-icon>
                            <RefreshRight />
                        </el-icon>
                        切换暂停/恢复
                    </el-button>
                    <el-button type="primary" @click="reset">
                        <el-icon>
                            <RefreshRight />
                        </el-icon>
                        重置动画
                    </el-button>
                    <el-button type="primary" @click="update">
                        <el-icon>
                            <RefreshRight />
                        </el-icon>
                        更新end值和animate
                    </el-button>
                </div>
            </div>
        </div>

        <CountUp :endVal="30000" :duration="5" ref="CountUpRef">
            <template #prefix>
                <span>金额</span>
            </template>
            <template #suffix>
                <span>元</span>
            </template>
        </CountUp>
    </el-card>
</template>

<script setup name="funcCountUp">
import CountUp from '@/components/CountUp/index.vue' // 数字滚动组件

// 定义响应式数据
const CountUpRef = ref()

// 模拟数据
const topCardItemList = [
    {
        title: '今日访问人数',
        titleNum: 8712,
        tip: '在场人数',
        tipNum: 911,
        color: '--el-color-primary',
        iconColor: '#fff',
        icon: 'todo',
    },
    {
        title: '实验室总数',
        titleNum: 9832,
        tip: '使用中',
        tipNum: 611,
        color: '--el-color-success',
        iconColor: '#fff',
        icon: 'laboratory',
    },
    {
        title: '申请人数（月）',
        titleNum: 2109,
        tip: '通过人数',
        tipNum: 911,
        color: '--el-color-warning',
        iconColor: '#fff',
        icon: 'request',
    },
    {
        title: '销售情况',
        titleNum: 2190,
        tip: '销售数',
        tipNum: 911,
        color: '--el-color-danger',
        iconColor: '#fff',
        icon: 'sales',
    },
]


// 切换暂停/恢复，此方法之一在使用了 reset 方法之后才会生效
const pauseResume = () => {
    CountUpRef.value.pauseResume()
}


// 重置动画
const reset = () => {
    CountUpRef.value.reset()
}


// 更新end值和animate
const update = () => {
    CountUpRef.value.update(9999999)
}
</script>

<style lang='scss' scoped>
.countup-card-item {
    width: 100%;
    height: 103px;
    background: var(--el-text-color-secondary);
    border-radius: 4px;
    transition: all ease 0.3s;

    &:hover {
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        transition: all ease 0.3s;
    }
}

.countup-card-item-box {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    &:hover {
        .svg-icon {
            right: 0px !important;
            bottom: 0px !important;
            transition: all ease 0.3s;
        }
    }

    .svg-icon {
        position: absolute;
        right: -10px;
        bottom: -10px;
        font-size: 70px;
        transform: rotate(-30deg);
        transition: all ease 0.3s;
    }

    .countup-card-item-flex {
        padding: 0 20px;
        color: var(--el-color-white);

        .countup-card-item-title,
        .countup-card-item-tip {
            font-size: 13px;
        }

        .countup-card-item-title-num {
            font-size: 18px;
        }

        .countup-card-item-tip-num {
            font-size: 13px;
        }
    }
}
</style>