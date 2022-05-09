<template>
    <div class="page-container filtering">
        <el-card shadow="hover">
            <div v-for="(val, key) in state.filtering" :key="key" :ref="(el) => { if (el) dlRefs[key] = el }"
                class="filtering-list clearfix">
                <div class="filtering-list-title">{{ val.title }}</div>
                <div class="filtering-list-item" :style="{ height: val.isMore ? 'auto' : '54px' }">
                    <el-tag :effect="v.active ? 'dark' : 'light'" v-for="(v, k) in val.children" :key="k"
                        @click="onSelItem(val, v)">{{ v.label }}</el-tag>
                    <div class="more" v-if="val.isShowMore" @click="val.isMore = !val.isMore">
                        <span>{{ val.isMore ? '收起' : '展开' }}</span>
                        <el-icon :size="16">
                            <component :is="!val.isMore ? 'CaretBottom' : 'CaretTop'" />
                        </el-icon>
                    </div>
                </div>
            </div>

            <div class="flex-warp mt20 mb20" v-loading="state.loading" v-if="state.tableData.length > 0">
                <el-row :gutter="20" class="row-gap20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(v, k) in state.tableData" :key="k">
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

            <el-empty v-else description="暂无数据" />

            <el-pagination v-model:currentPage="state.currentPage" v-model:page-size="state.pageSize"
                :page-sizes="[10, 20, 30, 50]" background layout="total, sizes, prev, pager, next, jumper"
                :total="state.total" hide-on-single-page @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup name="funcFiltering">
import { funcFiltering } from '@/api/system.js' // api
import { filtering } from './mock.js' // 数据列表


// 定义响应式数据>
const dlRefs = ref([]) // 导航
const state = reactive({
    filtering: filtering, // 导航数据
    setFiltering: {}, // 选中的导航数据
    tableData: [], // 列表数据
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 0, // 总条数
    loading: false, // 加载状态
})


// 初始化，默认过滤选项
const initActive = () => {
    state.filtering.map(item => {
        item.children.map(chil => {
            if (chil.active) {
                state.setFiltering[item.value] = chil.value
            }
        })
    })
}


// 获取数据列表
const getFuncFiltering = () => {
    state.loading = true
    let params = {
        currentPage: state.currentPage,
        pageSize: state.pageSize
    }
    Object.assign(params, state.setFiltering)
    funcFiltering(params).then(res => {
        state.tableData = res.filterList
        state.total = res.total
        setTimeout(() => {
            state.loading = false
        }, 500)
    })
}


// 初始化 `收起、展开` 按钮
const initBtnToggle = () => {
    nextTick(() => {
        let els = dlRefs.value
        els.map((v, k) => {
            v.scrollHeight < v.lastChild.scrollHeight ? (state.filtering[k].isShowMore = true) : (state.filtering[k].isShowMore = false)
        })
    })
}


// 过滤当前选中的数据
const onSelItem = (val, v) => {
    val.children.map((v) => (v.active = false))
    v.active = true
    let arr = []
    state.filtering.map((item) => {
        item.children.map((chil) => {
            if (chil.active) {
                arr.push({
                    ...item,
                    children: [{ ...chil }],
                })
            }
        })
    })
    initActive()
    getFuncFiltering()
}


// 切换每页条数
const handleSizeChange = (val) => {
    // 解决当前页不是第一页的时候进行切换每页展示条数不回到第一页的问题
    state.currentPage = 1
    state.pageSize = val
    getFuncFiltering()
}


// 切换当前页
const handleCurrentChange = (val) => {
    state.currentPage = val
    getFuncFiltering()
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initActive()
    getFuncFiltering()
    initBtnToggle()
    window.onresize = () => {
        initBtnToggle()
    }
})
</script>

<style lang='scss' scoped>
.filtering {
    overflow: hidden;

    .filtering-list {
        border-bottom: 1px dotted var(--el-border-color);

        &:first-child {
            border-top: 1px dotted var(--el-border-color);
        }

        .filtering-list-title {
            width: 65px;
            float: left;
            font-weight: 700;
            position: relative;
            color: #909399;
            margin: 15px 0;

            &:after {
                content: '';
                position: absolute;
                border: 1px solid #909399;
                border-width: 0 1px 1px 0;
                width: 4px;
                height: 4px;
                transform: rotate(-45deg) translateY(-50%);
                right: 10px;
                top: 10px;
            }
        }

        .filtering-list-item {
            overflow: hidden;
            position: relative;
            padding-right: 45px;

            .el-tag {
                margin-top: 15px;
                margin-right: 10px;

                &:last-of-type {
                    margin-bottom: 15px;
                    margin-right: 0;
                }

                &:hover {
                    // color: var(--el-color-primary);
                    cursor: pointer;
                }
            }
        }

        .more {
            position: absolute;
            right: 0;
            top: 18px;
            font-size: 14px;
            color: #a5a5a5;

            &:hover {
                cursor: pointer;
                color: #8d8d91;
            }
        }
    }

    .flex-warp {
        .flex-warp-item {
            width: 100%;
            height: 360px;

            .flex-warp-item-box {
                border: 1px solid var(--el-border-color-light);
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
                        color: var(--el-color-primary);
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
}
</style>