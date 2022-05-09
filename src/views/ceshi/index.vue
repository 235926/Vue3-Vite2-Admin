<template>
    <div class="page-container">
        <ul class="">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>0</li>
        </ul>
    </div>
</template>

<script setup name="ceshi">
const a = ['all','all1','all2']
console.log(a)
</script>

<style lang='scss' scoped>
.page-container {
    height: 5000px;
}



ul {
    // display: grid;
    // justify-content: space-between;
    // grid-template-columns: repeat(auto-fill, calc(25% - 15px));
    // gap: 20px 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(188px, 1fr));
    grid-gap: 20px;
    grid-auto-flow: row dense;
    grid-auto-rows: 20px;

    li {
        height: 20px;
        background: red;
    }
}
</style>