<template>
    <div class="page-container">
        <p v-html="cutTextFunc(obj.NEWS_SHORTBODY, 10)"></p>
    </div>
</template>

<script setup name="ceshi">
const obj = {
    NEWS_SHORTBODY:
        '近日，在中国银保监会北京监管局公布的《北京银保监局办公室关于北京地区2022年“3&middot;15”消费者权益保护教育宣传周活动开展情况的通报》中，中华人寿荣获“北京地区2022年“3&middot;15”消费者权益保护教育宣传周活动表现突出的组织单位”的殊荣。本次评选综合考虑了各银行及保险机构消费者教育宣传基础工作、创新教育宣传活动、纠纷化解及清廉金融文化宣传情况等，共有3家寿险法人机构获奖。这既是监管部门对于中华人寿消费者教育宣传工作质量的肯定，也是对寿险系统各单位进一步做好消费者权益保护工作的激励。下一步，公司将持续加强教育宣传力度，筑牢消费者权益保护基础，为持续健康稳定发展贡献力量。',
    NEWS_BODY:
        '<p><span style="font-family:仿宋, fangsong;"></span><br /></p><p style="margin:0px;color:#303133;text-transform:none;line-height:37px;text-indent:43px;letter-spacing:normal;font-size:20px;font-style:normal;font-weight:400;word-spacing:0px;box-sizing:border-box;orphans:2;widows:2;background-color:#ffffff;font-variant-ligatures:normal;font-variant-caps:normal;-webkit-text-stroke-width:0px;text-decoration-style:initial;text-decoration-color:initial;"><span style="font-family:宋体;"><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">近日，</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">在</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">中国银保监会北京监管局公布</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">的</span><span style="font-size:21px;box-sizing:border-box;"><span style="box-sizing:border-box;font-family:宋体, simsun;">《北京银保监局办公室关于北京地区</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">2</span></span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">022</span><span style="font-size:21px;box-sizing:border-box;"><span style="box-sizing:border-box;font-family:宋体, simsun;">年</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">“</span></span><span style="font-family:宋体, simsun;">3·15</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">”消费者权益保护教育宣传周活动开展情况的通报》</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">中，中华人寿荣获</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">“北京地区2</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">022</span><span style="font-size:21px;box-sizing:border-box;"><span style="box-sizing:border-box;font-family:宋体, simsun;">年</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">“</span></span><span style="font-family:宋体, simsun;">3</span><span style="color:#303133;text-indent:43px;background-color:#ffffff;font-family:宋体, simsun;">·</span><span style="font-family:宋体, simsun;">15</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">”消费者权益保护教育宣传周活动表现突出的组织单位”</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">的殊荣。</span></span></p><p style="margin:0px;color:#303133;text-transform:none;line-height:37px;text-indent:43px;letter-spacing:normal;font-size:20px;font-style:normal;font-weight:400;word-spacing:0px;box-sizing:border-box;orphans:2;widows:2;background-color:#ffffff;font-variant-ligatures:normal;font-variant-caps:normal;-webkit-text-stroke-width:0px;text-decoration-style:initial;text-decoration-color:initial;"><span style="font-family:宋体;"><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">本次评选</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">综合考虑</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">了各银行及保险机构</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">消费者教育宣传基础工作、创新教育宣传活动、纠纷化解</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">及</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">清廉金融文化宣传情况等，</span><span style="font-family:宋体;font-size:21px;box-sizing:border-box;"><span style="box-sizing:border-box;font-family:宋体, simsun;">共有</span><span style="font-size:21px;box-sizing:border-box;font-family:宋体, simsun;">3家寿险法人机构获奖。这既是监管部门对于中华人寿消费者教育宣传工作质量的肯定，也是对寿险系统各单位进一步做好消费者权益保护工作的激励。下一步，公司将持续加强教育宣传力度，筑牢消费者权益保护基础，为持续健康稳定发展贡献力量。</span></span></span></p><p><br /></p>',
}

const cutTextFunc = (str, len) => {
    if (str == undefined) {
        str = '暂无摘要！'
    } else {
        if (str.length > len) {
            str = str.substring(0, len) + '...'
        }
    }
    return str
}
</script>

<style lang="scss" scoped></style>
