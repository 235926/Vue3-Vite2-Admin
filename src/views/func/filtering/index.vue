<template>
    <div class="page-container filtering">
        <el-tabs v-model="state.activeName" type="border-card">
            <el-tab-pane label="过滤条件为单选" name="radio">
                <filteringRadio v-if="state.activeName === 'radio'" />
            </el-tab-pane>
            <el-tab-pane label="过滤条件为多选" name="more">
                <filteringMore v-if="state.activeName === 'more'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup name="funcFiltering">
import filteringRadio from './component/filteringRadio.vue' // 过滤条件单选
import filteringMore from './component/filteringMore.vue' // 过滤条件单选


// 定义响应式数据>
const state = reactive({
    activeName: 'radio', // 默认选中
})
</script>

<style lang='scss' scoped>
.filtering {
    :deep(.filtering-list:nth-of-type(2)) {
        border-top: 1px dotted var(--el-border-color);
    }

    :deep(.filtering-list) {
        border-bottom: 1px dotted var(--el-border-color);

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

    :deep(.flex-warp) {
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