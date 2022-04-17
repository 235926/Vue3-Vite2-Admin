<template>
    <el-dropdown ref="dropdownRef" trigger="click" class="icon-selector" popper-class="icon-selector-dropdown">
        <el-input ref="inputWidthRef" v-model="state.inputValue" :placeholder="state.inputPlaceholder" clearable
            @focus="onInputValueFocus" @blur="onInputValueBlur" @clear="onInputValueClear">
            <template #prepend>
                <svg-icon :name="state.svgValue" />
            </template>
        </el-input>
        <template #dropdown>
            <div :style="{ width: `${state.inputWidth}px` }" class="icon-selector-dropdown-wrap">
                <el-row :gutter="10">
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" v-for="(item, index) in svgIcons" :key="index"
                        @click="onColClick(item)">
                        <span class="svg-wrap" :class="{ 'is-active': item === modelValue }">
                            <svg-icon :name="item" />
                        </span>
                    </el-col>
                </el-row>
            </div>
        </template>
    </el-dropdown>
</template>

<script setup name="iconSelector">
import svgIcons from "@/views/icons/component/svg-icon.js" // svg 图标集合


// props
const props = defineProps({
    // 图标的名称，双向绑定值，字段名为固定，改了之后将不生效
    // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    modelValue: String,

    // 输入框占位文本
    placeholder: {
        type: String,
        default: () => '请输入内容搜索图标或者选择图标',
    },

})


// emit
const emit = defineEmits(['update:modelValue', 'get', 'clear'])
// 定义响应式数据>
const dropdownRef = ref() // dropdown 本身
const inputWidthRef = ref() // input ref
const state = reactive({
    svgValue: '', // svg 图标名称
    inputValue: '', // input 输入的内容
    inputPlaceholder: '', // placeholder 值
    inputWidth: 0, // input 宽度
})


// 处理 svg 图标双向绑定数值回显
const initModeValue = () => {
    if (props.modelValue === '') return false
    state.svgValue = props.modelValue
    state.inputPlaceholder = props.modelValue
}


// 获取 input 的宽度
const getInputWidth = () => {
    nextTick(() => {
        state.inputWidth = inputWidthRef.value.$el.offsetWidth
    })
}


// 监听页面宽度改变
const initResize = () => {
    window.addEventListener('resize', () => {
        getInputWidth()
    })
}


// 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
const onInputValueFocus = () => {
    if (!props.modelValue) return false
    state.inputValue = ''
}


// 处理 input 失去焦点时
const onInputValueBlur = () => {
    state.inputValue = ''
}


// 清空当前点击的 icon 图标
const onInputValueClear = () => {
    console.log(1)
}



// 获取当前点击的 icon 图标
const onColClick = (item) => {
    state.inputValue = ''

    // svg 图标名称
    state.svgValue = item

    // input placeholder 
    state.inputPlaceholder = item

    // 关闭 dropdown 本身
    dropdownRef.value.handleClose()

    // 更新 modelValue
    emit('get', state.svgValue)
    emit('update:modelValue', state.svgValue)
}



// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    initModeValue()
    initResize()
    getInputWidth()
})


// 监听双向绑定 modelValue 的变化
watch(() => props.modelValue, () => {
    initModeValue()
})
</script>

<style lang='scss' scoped>
.icon-selector {
    flex: 1;

    :deep(.el-tooltip__trigger) {
        flex: 1;
    }

    .svg-icon {
        font-size: 18px;
    }
}
</style>

<style lang="scss">
// 下拉框弹出窗的样式，不要加 scoped
.icon-selector-dropdown {
    .icon-selector-dropdown-wrap {
        padding: 10px;
        height: 260px;

        .svg-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dcdfe6;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;

            .svg-icon {
                font-size: 18px;
                color: var(--el-text-color-regular);
            }

            &.is-active {
                background-color: var(--el-color-primary-light-9);
                border: 1px solid var(--el-color-primary-light-6);

                .svg-icon {
                    color: var(--el-color-primary);
                }
            }

            &:hover {
                cursor: pointer;
                background-color: var(--el-color-primary-light-9);
                border: 1px solid var(--el-color-primary-light-6);

                .svg-icon {
                    color: var(--el-color-primary);
                }
            }
        }
    }
}
</style>