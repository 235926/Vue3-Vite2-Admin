<template>
    <div class="filtering-radio">
        <el-alert title="过滤条件为单选" type="success" :closable="false" class="mb20"></el-alert>

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
    </div>
</template>

<script setup name="funcFiltering">
import { funcFiltering } from '@/api/system.js' // api
import { filtering } from '../mock.js' // 数据列表


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
        state.loading = false

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