<template>
    <el-card shadow="hover" header="图片懒加载演示（F12 切换到 Network Img下进行图片加载查看）">
        <div class="flex-warp" v-if="state.dataList.length > 0">
            <el-row :gutter="15">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15" v-for="(v, k) in state.dataList" :key="k"
                    @click="onTableItemClick(v)">
                    <div class="flex-warp-item">
                        <div class="flex-warp-item-box">
                            <div class="item-img" v-loading="v.loading">
                                <img :data-img="v.img" :data-key="k" :data-lazy-img-list="k" />
                            </div>
                            <div class="item-txt">
                                <div class="item-txt-title">{{ v.title }}</div>
                                <div class="item-txt-other">
                                    <div style="width: 100%">
                                        <div class="item-txt-msg mb10">
                                            <span>评价 {{ v.evaluate }}</span>
                                            <span class="ml10">收藏 {{ v.collection }}</span>
                                        </div>
                                        <div class="item-txt-msg item-txt-price">
                                            <span class="font-price">
                                                <span>￥</span>
                                                <span class="font">{{ v.price }}</span>
                                            </span>
                                            <span>月销{{ v.monSales }}笔</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script setup>
import { filterList } from './mock' // 模拟的数据列表
import { lazyImg } from '@/utils/tools.js' // 图片懒加载方法


// 定义响应式数据>
const state = reactive({
    dataList: filterList, // 数据列表
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 400, // 总条数
    loading: false, // 加载状态
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    lazyImg('[data-lazy-img-list]', state.dataList)
})
</script>

<style lang='scss' scoped>
.flex-warp {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;

    .flex-warp-item {
        width: 100%;
        height: 360px;

        .flex-warp-item-box {
            border: 1px solid var(--next-border-color-light);
            width: 100%;
            height: 100%;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;

            &:hover {
                cursor: pointer;
                border: 1px solid var(--el-color-primary);
                transition: all 0.3s ease;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);

                .item-txt-title {
                    color: var(--el-color-primary) !important;
                    transition: all 0.3s ease;
                }

                .item-img {
                    img {
                        transition: all 0.3s ease;
                        transform: translateZ(0) scale(1.05);
                    }
                }
            }

            .item-img {
                width: 100%;
                height: 215px;
                overflow: hidden;

                img {
                    transition: all 0.3s ease;
                    width: 100%;
                    height: 100%;
                }
            }

            .item-txt {
                flex: 1;
                padding: 15px;
                display: flex;
                flex-direction: column;
                overflow: hidden;

                .item-txt-title {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    display: -webkit-box;
                    color: #666666;
                    transition: all 0.3s ease;

                    &:hover {
                        color: var(--el-color-primary);
                        text-decoration: underline;
                        transition: all 0.3s ease;
                    }
                }

                .item-txt-other {
                    flex: 1;
                    align-items: flex-end;
                    display: flex;

                    .item-txt-msg {
                        font-size: 12px;
                        color: #8d8d91;
                    }

                    .item-txt-price {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .font-price {
                            color: #ff5000;

                            .font {
                                font-size: 22px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>