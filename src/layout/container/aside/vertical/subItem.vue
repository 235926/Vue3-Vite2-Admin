<template>
    <template v-for="val in chils">
        <el-sub-menu
            :index="val.path"
            :key="val.path"
            v-if="val.children && val.children.length > 0"
        >
            <template #title>
                <svg-icon :name="val.meta.icon" />
                <span class="title">{{ val.meta.title }}</span>
            </template>
            <sub-item :chil="val.children" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="val.path" :key="val.path">
                <template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
                    <svg-icon :name="val.meta.icon" />
                    <span class="title">{{ val.meta.title }}</span>
                </template>
                <template v-else>
                    <a :href="val.meta.isLink" target="_blank" rel="opener">{{ val.meta.title }}</a>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>

<script setup name="layoutAsideSubItem">
const props = defineProps({
    chil: {
        type: Array,
        default: () => []
    }
})


// 获取父级菜单数据
const chils = computed(() => {
    return props.chil
})
</script>
