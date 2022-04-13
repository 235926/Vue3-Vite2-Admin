<template>
    <el-form :model="state.ruleForm" :rules="state.rules" class="tools-warp-form" label-position="top">
        <el-card shadow="hover" header="验证百分比（不可以小数）">
            <el-form-item prop="numberPercentage">
                <div class="tools-warp-form-msg">验证可以输入大于0小于100的数字</div>
                <el-input v-model="state.ruleForm.numberPercentage" @input="onVerifyNumberPercentage($event)"
                    placeholder="请输入数字进行测试">
                    <template #append>%</template>
                </el-input>
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="验证百分比（可以小数）">
            <el-form-item prop="numberPercentageFloat">
                <div class="tools-warp-form-msg">验证可以输入大于0小于100的数字</div>
                <el-input v-model="state.ruleForm.numberPercentageFloat" @input="onVerifyNumberPercentageFloat($event)"
                    placeholder="请输入数字进行测试">
                    <template #append>%</template>
                </el-input>
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="小数或整数（不可以负数）">
            <el-form-item prop="numberIntegerAndFloat">
                <div class="tools-warp-form-msg">
                    验证可以输入小数或整数，0 开始， . 只能出现一次，保留小数点后保留2位小数。(负数时，模拟拼接负号给后台)
                </div>
                <el-input v-model="state.ruleForm.numberIntegerAndFloat" @input="onVerifyNumberIntegerAndFloat($event)"
                    placeholder="请输入小数或整数进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="正整数验证">
            <el-form-item prop="numberInteger">
                <div class="tools-warp-form-msg">验证只可以输入正整数，0 开始后面将不可以输入</div>
                <el-input v-model="state.ruleForm.numberInteger" @input="onVerifiyNumberInteger($event)"
                    placeholder="请输入整数进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="去掉中文及空格">
            <el-form-item prop="cnAndSpace">
                <div class="tools-warp-form-msg">验证不可以输入空格与中文</div>
                <el-input v-model="state.ruleForm.cnAndSpace" @input="onVerifyCnAndSpace($event)"
                    placeholder="请输入内容进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="去掉英文及空格">
            <el-form-item prop="enAndSpace">
                <div class="tools-warp-form-msg">验证不可以输入空格与英文</div>
                <el-input v-model="state.ruleForm.enAndSpace" @input="onVerifyEnAndSpace($event)"
                    placeholder="请输入内容进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="禁止输入空格">
            <el-form-item prop="andSpace">
                <div class="tools-warp-form-msg">验证不可以输入空格</div>
                <el-input v-model="state.ruleForm.andSpace" @input="onVerifyAndSpace($event)" placeholder="请输入内容进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="金额用 `,` 区分开">
            <el-form-item prop="numberComma">
                <div class="tools-warp-form-msg">金额添加 `,` 进行区分，便于阅读。{{ state.ruleForm.numberComma }}</div>
                <el-input v-model="state.ruleForm.numberComma" @input="onVerifyNumberComma($event)"
                    placeholder="请输入金额进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="匹配文字变色（搜索时）">
            <el-form-item prop="textColor">
                <div class="tools-warp-form-msg">示例：<span v-html="state.text"></span></div>
                <el-input v-model="state.ruleForm.textColor" @input="onVerifyTextColor($event)"
                    placeholder="请输入示例中的部分文字" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="数字转中文大写">
            <el-form-item prop="cnUppercase">
                <div class="tools-warp-form-msg">验证数字转成中文的大写<span class="tools-warp-form-msg-red">{{
                    state.cnText
                }}</span>
                </div>
                <el-input v-model="state.ruleForm.cnUppercase" @input="onVerifyNumberCnUppercase($event)"
                    placeholder="请输入金额进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="手机号码">
            <el-form-item prop="phone">
                <div class="tools-warp-form-msg">
                    验证手机号码 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ state.phone }}</span>
                </div>
                <el-input v-model="state.ruleForm.phone" @input="onVerifyPhone($event)" placeholder="请输入手机号进行测试" />
            </el-form-item>
        </el-card>
    </el-form>
</template>

<script setup>
import * as validate from '@/utils/validate.js' // 验证规则
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    text: '世间美好，与你环环相扣，祝你开心每一天！', // 测试匹配文字变色（搜索时）
    cnText: '', // 测试数字转中文大写
    phone: false, // 测试验证手机号码
    ruleForm: {
        numberPercentage: '', // 验证百分比（不可以小数）
        numberPercentageFloat: '', // 验证百分比（可以小数）
        numberIntegerAndFloat: '', // 小数或整数（不可以负数）
        numberInteger: '', // 正整数
        cnAndSpace: '', // 去掉中文及空格
        enAndSpace: '', // 去掉英文及空格
        andSpace: '', // 禁止输入空格
        numberComma: '', // 金额用 `,` 区分开
        textColor: '', // 匹配文字变色（搜索时）
        cnUppercase: '', // 数字转中文大写
        phone: '', // 手机号码
    },
    rules: {
        numberPercentage: [ // 验证百分比（不可以小数）
            { required: true, message: '请输入数字进行测试', trigger: 'change' }
        ],
        numberPercentageFloat: [ // 验证百分比（可以小数）
            { required: true, message: '请输入数字进行测试', trigger: 'change' }
        ],
        numberIntegerAndFloat: [ // 小数或整数（不可以负数）
            { required: true, message: '请输入小数或整数进行测试，不可以负数', trigger: 'change' }
        ],
        numberInteger: [ // 正整数
            { required: true, message: '请输入正整数进行测试', trigger: 'change' }
        ],
        cnAndSpace: [ // 去掉中文及空格
            { required: true, message: '请输入内容进行测试', trigger: 'change' }
        ],
        enAndSpace: [ // 去掉英文及空格
            { required: true, message: '请输入内容进行测试', trigger: 'change' }
        ],
        andSpace: [ // 禁止输入空格
            { required: true, message: '请输入内容进行测试', trigger: 'change' }
        ],
        numberComma: [ // 金额用 `,` 区分开
            { required: true, message: '请输入小数或整数进行测试', trigger: 'change' }
        ],
        textColor: [ // 匹配文字变色（搜索时）
            { required: true, message: '请输入内容进行测试', trigger: 'change' }
        ],
        cnUppercase: [ // 数字转中文大写
            { required: true, message: '请输入金额进行测试', trigger: 'change' }
        ],
        phone: [ // 手机号码
            { required: true, message: '请输入手机号进行测试', trigger: 'change' }
        ],
    }
})


// 验证百分比（不可以小数）
const onVerifyNumberPercentage = (val) => {
    state.ruleForm.numberPercentage = validate.verifyNumberPercentage(val)
}


// 验证百分比（可以小数）
const onVerifyNumberPercentageFloat = (val) => {
    state.ruleForm.numberPercentageFloat = validate.verifyNumberPercentageFloat(val)
}


// 小数或整数（不可以负数）
const onVerifyNumberIntegerAndFloat = (val) => {
    state.ruleForm.numberIntegerAndFloat = validate.verifyNumberIntegerAndFloat(val)
}


// 正整数验证
const onVerifiyNumberInteger = (val) => {
    state.ruleForm.numberInteger = validate.verifiyNumberInteger(val)
}


// 去掉中文及空格
const onVerifyCnAndSpace = (val) => {
    state.ruleForm.cnAndSpace = validate.verifyCnAndSpace(val)
}


// 去掉英文及空格
const onVerifyEnAndSpace = (val) => {
    state.ruleForm.enAndSpace = validate.verifyEnAndSpace(val)
}


// 禁止输入空格
const onVerifyAndSpace = (val) => {
    state.ruleForm.andSpace = validate.verifyAndSpace(val)
}


// 金额用 `,` 区分开
const onVerifyNumberComma = (val) => {
    state.ruleForm.numberComma = validate.verifyNumberComma(val)
}


// 匹配文字变色（搜索时）
const onVerifyTextColor = (val) => {
    state.ruleForm.textColor = validate.verifyAndSpace(val)
    if (state.ruleForm.textColor === '') state.text = `世间美好，与你环环相扣，祝你开心每一天！`
    else state.text = validate.verifyTextColor(state.ruleForm.textColor, state.text)
}


// 数字转中文大写
const onVerifyNumberCnUppercase = (val) => {
    state.ruleForm.cnUppercase = validate.verifyNumberIntegerAndFloat(val)
    if (state.ruleForm.cnUppercase === '') state.cnText = ''
    else state.cnText = validate.verifyNumberCnUppercase(state.ruleForm.cnUppercase)
}


// 手机号码
const onVerifyPhone = (val) => {
    state.phone = validate.verifyPhone(val)
}








// 组件挂载后，此方法执行后，页面显示
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.tools-warp-form {
    ::v-deep(.el-form-item--small.el-form-item) {
        margin-bottom: 0 !important;
    }

    .el-card {
        margin-bottom: 20px;

        :deep(.el-card__header) {
            color: var(--el-color-primary);
            font-weight: 700;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    .tools-warp-form-msg {
        color: var(--el-color-secondary);
        font-size: 14px;
        width: 100%;

        .tools-warp-form-msg-red {
            color: var(--el-color-error);
            margin-left: 5px;
        }
    }

    .tools-warp-form-msg+div {
        width: 100%;
    }
}
</style>