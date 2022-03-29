<template>
	<router-view></router-view>
</template>

<script setup>
import { Local, Session } from '@/utils/storage.js' // 浏览器存储
const store = useStore() // 定义 vuex 实例



// 获取布局配置信息
const layoutConfig = computed(() => {
	return store.getters.layoutConfig
})


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
	nextTick(() => {
		// 获取缓存中的布局配置
		if (Local.get('layoutConfig')) {
			store.dispatch('settings/changeLayoutConfig', Local.get('layoutConfig'))
		}
	})
})


</script>

<style lang="scss" scoped>
</style>
