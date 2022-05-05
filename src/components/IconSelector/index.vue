<template>
    <div class="selector w100 h100">
        <el-input ref="inputRef" v-model="state.inputValue" :placeholder="state.inputPlaceholder" clearable
            @focus="onInputValueFocus" @blur="onInputValueBlur" @clear="onInputValueClear">
            <template #prepend>
                <SvgIcon class="font18" :name="state.svgValue" />
            </template>
        </el-input>

        <el-popover ref="popoverRef" :width="`${state.inputWidth}px`" trigger="click" placement="bottom"
            popper-class="icon-selector-popper" :virtual-ref="inputRef" virtual-triggering>
            <div class="icon-selector-warp-title">{{ title }}</div>
            <div class="icon-selector-popover-wrap">
                <el-scrollbar class="scrollbar-x">
                    <el-row :gutter="10" v-if="onSheetsFilterList.length >= 0" class="row-gap10 padding10">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="2" v-for="(item, index) in onSheetsFilterList"
                            :key="index" @click="onColClick(item)">
                            <span class="svg-wrap" :class="{ 'is-active': item === modelValue }">
                                <SvgIcon :name="item" />
                            </span>
                        </el-col>
                    </el-row>
                    <el-empty description="无相关图标" v-if="onSheetsFilterList.length <= 0" />
                </el-scrollbar>
            </div>
        </el-popover>
    </div>
</template>

<script setup name="iconSelector">
import svgIcons from '@/views/icons/component/svg-icon.js' // svg 图标集合


// props
const props = defineProps({
    // 图标的名称，双向绑定值，字段名为固定，改了之后将不生效
    // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    modelValue: String,

    // 输入框前置内容
    prepend: {
        type: String,
        default: () => 'pointer',
    },

    // 输入框占位文本
    placeholder: {
        type: String,
        default: () => '请输入内容搜索图标或者选择图标'
    },

    // 弹窗标题
    title: {
        type: String,
        default: () => '请选择图标',
    },
})


// emit
const emit = defineEmits(['update:modelValue', 'get', 'clear'])
// 定义响应式数据>
const popoverRef = ref() // popover 本身
const inputRef = ref() // input ref
const state = reactive({
    svgValue: '', // svg 图标名称
    inputValue: '', // input 输入的内容
    inputPlaceholder: '', // placeholder 值
    inputWidth: 0 // input 宽度
})


// 图标搜索及图标数据显示
const onSheetsFilterList = computed(() => {
    if (!state.inputValue) return svgIcons
    let search = state.inputValue.trim().toLowerCase()
    return svgIcons.filter((item) => {
        if (item.toLowerCase().indexOf(search) !== -1) return item
    })
})


// 处理 svg 图标双向绑定数值回显
const initModeValue = () => {
    // 设置 svg 和 placeholder 默认值
    state.svgValue = props.prepend
    state.inputPlaceholder = props.placeholder
    if (props.modelValue === '') return false
    state.svgValue = props.modelValue
    state.inputPlaceholder = props.modelValue
}


// 获取 input 的宽度
const getInputWidth = () => {
    nextTick(() => {
        state.inputWidth = inputRef.value?.$el.offsetWidth
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
}


// 处理 input 失去焦点时
const onInputValueBlur = () => {
    setTimeout(() => {
        let icon = svgIcons.filter((icon) => icon === state.inputValue)
        if (icon.length <= 0) state.inputValue = ''
    }, 300)
}


// 清空当前点击的 icon 图标
const onInputValueClear = () => {
    // state.svgValue = ''
    // emit('clear', state.svgValue)
    // emit('update:modelValue', state.svgValue)
}


// 获取当前点击的 icon 图标
const onColClick = (item) => {
    state.inputValue = ''

    // svg 图标名称
    state.svgValue = item

    // input placeholder
    state.inputPlaceholder = item

    // 关闭 popover 本身
    popoverRef.value.hide()

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

<style lang="scss">
// 下拉框弹出窗的样式，不要加 scoped
.icon-selector-popper {
    padding: 0 !important;

    .icon-selector-warp-title {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid var(--el-border-color);
    }

    .icon-selector-popover-wrap {
        height: 260px;
        overflow: hidden;

        .svg-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dcdfe6;
            padding: 10px;
            border-radius: 5px;

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
