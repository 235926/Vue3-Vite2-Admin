<template>
    <div class="system-role">
        <el-button type="primary" @click="onOpenAddMenu">修 改</el-button>
        <addDialog ref="addMenuRef" />
    </div>
</template>

<script setup name="systemRole">
import addDialog from '@/template/dialog.vue'
const addMenuRef = ref(null)

const onOpenAddMenu = () => {
    addMenuRef.value.openDialog()
}
</script>

<style lang='scss' scoped>
</style>