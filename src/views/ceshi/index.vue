<template>
    ceshi
</template>

<script setup>
function dataByGroup(params) {
    const obj = {}
    const finalyArr = []
    params.filter((i, idx) => params.indexOf(i) === idx).sort((a, b) => a - b).forEach(i => {
        if (obj[i / 10 | 0]) {
            obj[i / 10 | 0].push(i)
        } else {
            obj[i / 10 | 0] = [i]
        }
    })
    Object.keys(obj).forEach(i => {
        finalyArr.push(obj[i])
    })
    console.log(finalyArr)
}
dataByGroup([1, 6, 12, 18, 19, 46, 16, 15, 17, 19, 22, 64, 76, 56, 45, 58, 93, 77, 12, 45])
</script>

<style lang='scss' scoped>
</style>