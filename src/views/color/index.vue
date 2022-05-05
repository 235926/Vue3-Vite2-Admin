<template>
    <div class="page-container color">
        color
    </div>
</template>

<script setup>
onMounted(() => {
    const btnArr = [
        { a: 1 },
        { b: 2 },
        { c: 3 },
        { d: 4 },
    ]
    btnArr.unshift({ e: 5 })
    btnArr.unshift({ f: 6 })
    // console.log(btnArr)
})
</script>

<style lang='scss' scoped>
</style>