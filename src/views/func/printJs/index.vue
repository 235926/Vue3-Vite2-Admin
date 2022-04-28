<template>
    <el-card id="printRef" shadow="hover" header="打印演示">
        <el-alert title="感谢优秀的 `print-js`，项目地址：https://github.com/crabbly/Print.js。请在打印弹窗 `更多设置` 中开启 `背景图形。`"
            type="success" :closable="false" class="mb20"></el-alert>

        <el-button @click="onPrintJs" type="primary">
            <svg-icon name="print" />
            点击打印演示
        </el-button>
    </el-card>
</template>

<script setup name="funcPrintJs">
import printJs from 'print-js' // 页面打印插件


// 点击打印演示
const onPrintJs = () => {
    printJs({
        printable: 'printRef',
        type: 'html',
        css: ['//at.alicdn.com/t/font_2298093_o73r8wjdhlg.css', '//unpkg.com/element-plus/dist/index.css'],
        scanStyles: false,
        style: `@media print{.mb15{margin-bottom:15px;}.el-button--small i.iconfont{font-size: 12px !important;margin-right: 5px;}}`,
    })
}
</script>

<style lang='scss' scoped>
</style>