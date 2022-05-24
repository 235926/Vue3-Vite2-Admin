<template>
    <div class="mixin">
        <div>{{ num }}</div>
        <div>{{ fav }}</div>
    </div>
</template>

<script setup name="learningMixin">
import mixin from '@/mixins/index.js' // mixin 混入
let { num, fav } = mixin()
</script>

<style lang="scss" scoped></style>
