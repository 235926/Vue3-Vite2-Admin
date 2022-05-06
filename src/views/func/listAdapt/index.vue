<template>
    <div class="page-container">
        <el-card shadow="hover" header="列表自适应演示(改变窗口查看效果)">
            <div class="flex-warp" v-if="state.tableData.length > 0">
                <el-row :gutter="15">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15"
                        v-for="(v, k) in state.tableData" :key="k" @click="onTableItemClick(v)">
                        <div class="flex-warp-item">
                            <div class="flex-warp-item-box">
                                <div class="item-img">
                                    <img :src="v.img" />
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
            <el-empty v-else description="暂无数据"></el-empty>
            <el-pagination v-model:currentPage="state.currentPage" v-model:page-size="state.pageSize"
                :page-sizes="[10, 20, 30, 50]" background layout="total, sizes, prev, pager, next, jumper"
                :total="state.total" hide-on-single-page @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup name="funcListAdapt">
import { filterList } from './mock.js' // 列表数据
const router = useRouter() // router 实例


// 定义响应式数据>
const state = reactive({
    tableData: filterList, // 列表数据
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 400, // 总条数
})


// 当前列表项点击
const onTableItemClick = (v) => {
    router.push({
        path: '/pages/filteringDetails',
        query: { id: v.id },
    })
}


// 切换每页条数
const handleSizeChange = (val) => {
    // 解决当前页不是第一页的时候进行切换每页展示条数不回到第一页的问题
    state.currentPage = 1
    state.pageSize = val
}


// 切换当前页
const handleCurrentChange = (val) => {
    state.currentPage = val
}
</script>

<style lang='scss' scoped>
.flex-warp {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;

    .flex-warp-item {
        padding: 5px;
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