<template>
    <div class="full-screen-container">
        <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editorRef" :defaultConfig="state.toolbarConfig"
            :mode="state.mode" />
        <Editor style="height: 300px;" v-model="valueHtml" :defaultConfig="state.editorConfig"
            :mode="state.mode" @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 富文本编辑器插件
import '@wangeditor/editor/dist/css/style.css' // 富文本编辑器插件 css


// props
const props = defineProps({
    // 编辑器内容，双向绑定值，字段名为固定，改了之后将不生效
    // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    modelValue: String,

    // 输入框占位文本
    placeholder: {
        type: String,
        default: () => '请输入内容...'
    }
})


// emit
const emit = defineEmits(['update:modelValue'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const valueHtml = ref() // 编辑器内容
const state = reactive({
    mode: 'default', // 默认模式 - 集成了 wangEditor 所有功能，simple 简洁模式 - 仅有部分常见功能，但更加简洁易用
    toolbarConfig: {}, // 菜单栏配置
    editorConfig: { // 编辑器的配置
        placeholder: props.placeholder
    }
})


// 编辑器创建完毕时的回调函数
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    valueHtml.value = props.modelValue
}


// 编辑器内容、选区变化时的回调函数
const handleChange = (editor) => {
    let text = editor.getText() // 获取当前编辑器的纯文本内容
    let html = editor.getHtml() // 获取非格式化的 html
    emit('update:modelValue', html)
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<style lang='scss' scoped>
.full-screen-container {
    z-index: 100; // 如有需要，可以自定义 z-index
    border: 1px solid #ccc;
}
</style>