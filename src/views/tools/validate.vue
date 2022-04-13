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
                    验证可以输入小数或整数，0 开始，只能出现一次，保留小数点后保留2位小数，(负数时，模拟拼接负号给后台)
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
                <div class="tools-warp-form-msg">金额添加 `,` 进行区分，便于阅读 {{ state.ruleForm.numberComma }}</div>
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
                    验证手机号码 (true: 正确，false: 不正确) <span class="tools-warp-form-msg-red">{{ state.phone }}</span>
                </div>
                <el-input v-model="state.ruleForm.phone" @input="onVerifyPhone($event)" placeholder="请输入手机号进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="登录账号">
            <el-form-item prop="account">
                <div class="tools-warp-form-msg">
                    验证登录账号是否正确，字母开头，允许5-16字节，允许字母数字下划线 (true: 正确，false: 不正确)
                    <span class="tools-warp-form-msg-red">{{ state.account }}</span>
                </div>
                <el-input v-model="state.ruleForm.account" @input="onVerifyAccount($event)" placeholder="请输入账号进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="密码">
            <el-form-item prop="password">
                <div class="tools-warp-form-msg">
                    验证密码是否正确，以字母开头，长度在6~16之间，只能包含字母、数字和下划线 (true: 正确，false: 不正确)
                    <span class="tools-warp-form-msg-red">{{ state.password }}</span>
                </div>
                <el-input v-model="state.ruleForm.password" @input="onVerifyPassword($event)" placeholder="请输入密码进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="强密码">
            <el-form-item prop="passwordPowerful">
                <div class="tools-warp-form-msg">
                    验证强密码是否正确，字母+数字+特殊字符，长度在6-16之间 (true: 正确，false: 不正确)
                    <span class="tools-warp-form-msg-red">{{ state.passwordPowerful }}</span>
                </div>
                <el-input v-model="state.ruleForm.passwordPowerful" @input="onVerifyPasswordPowerful($event)"
                    placeholder="请输入密码进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="密码强度">
            <el-form-item prop="passwordStrength">
                <div class="tools-warp-form-msg">
                    验证密码强度，返回 强、中、弱 (弱：纯数字，纯字母，纯特殊字符，中：字母+数字，字母+特殊字符，数字+特殊字符，强：字母+数字+特殊字符)
                    <span class="tools-warp-form-msg-red">{{ state.passwordStrength }}</span>
                </div>
                <el-input v-model="state.ruleForm.passwordStrength" @input="onVerifyPasswordStrength($event)"
                    placeholder="请输入密码进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="IP地址">
            <el-form-item prop="iPAddress">
                <div class="tools-warp-form-msg">
                    验证IP地址是否正确 (true: 正确，false: 不正确)
                    <span class="tools-warp-form-msg-red">{{ state.iPAddress }}</span>
                </div>
                <el-input v-model="state.ruleForm.iPAddress" @input="onVerifyIPAddress($event)"
                    placeholder="请输入IP地址进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="邮箱">
            <el-form-item prop="email">
                <div class="tools-warp-form-msg">
                    验证邮箱是否正确 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.email }}</span>
                </div>
                <el-input v-model="state.ruleForm.email" @input="onVerifyEmail($event)" placeholder="请输入邮箱进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="身份证">
            <el-form-item prop="idCard">
                <div class="tools-warp-form-msg">
                    验证身份证是否正确 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.idCard }}</span>
                </div>
                <el-input v-model="state.ruleForm.idCard" @input="onVerifyIDCard($event)" placeholder="请输入身份证进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="姓名">
            <el-form-item prop="fullName">
                <div class="tools-warp-form-msg">
                    验证姓名是否正确，包括少数民族名字 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.fullName }}</span>
                </div>
                <el-input v-model="state.ruleForm.fullName" @input="onVerifyFullName($event)" placeholder="请输入姓名进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="邮政编码">
            <el-form-item prop="postalCode">
                <div class="tools-warp-form-msg">
                    验证邮政编码是否正确，不能以 0 开始 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.postalCode }}</span>
                </div>
                <el-input v-model="state.ruleForm.postalCode" @input="onVerifyPostalCode($event)"
                    placeholder="请输入邮政编码进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="url">
            <el-form-item prop="url">
                <div class="tools-warp-form-msg">
                    验证url是否正确 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.url }}</span>
                </div>
                <el-input v-model="state.ruleForm.url" @input="onVerifyUrl($event)" placeholder="请输入内容进行测试" />
            </el-form-item>
        </el-card>

        <el-card shadow="hover" header="车牌号">
            <el-form-item prop="carNum">
                <div class="tools-warp-form-msg">
                    验证车牌号是否正确 (true: 正确，false:不正确)
                    <span class="tools-warp-form-msg-red">{{ state.carNum }}</span>
                </div>
                <el-input v-model="state.ruleForm.carNum" @input="onVerifyCarNum($event)" placeholder="请输入车牌号进行测试" />
            </el-form-item>
        </el-card>
    </el-form>
</template>

<script setup>
import * as validate from '@/utils/validate.js' // 验证规则


// 定义响应式数据>
const state = reactive({
    text: '世间美好，与你环环相扣，祝你开心每一天！', // 测试匹配文字变色（搜索时）
    cnText: '', // 测试数字转中文大写
    phone: false, // 测试验证手机号码
    account: false, // 测试登录账号
    password: false, // 测试密码
    passwordPowerful: false, // 测试强密码
    passwordStrength: '', // 测试密码强度
    iPAddress: false, // 测试IP地址
    email: false, // 测试优秀
    idCard: false, // 测试身份证
    fullName: false, // 测试姓名
    postalCode: false, // 测试邮政编码
    url: false, // 测试 url
    carNum: false, // 测试车牌号
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
        account: '', // 登录账号
        password: '', // 密码
        passwordPowerful: '', // 强密码
        passwordStrength: '', // 密码强度
        iPAddress: '', // IP地址
        email: '', // 邮箱
        idCard: '', // 身份证
        fullName: '', // 姓名
        postalCode: '', // 邮政编码
        url: '', // url
        carNum: '', // 车牌号
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
        account: [ // 登录账号
            { required: true, message: '请输入账号进行测试', trigger: 'change' }
        ],
        password: [ // 密码
            { required: true, message: '请输入密码进行测试', trigger: 'change' }
        ],
        passwordPowerful: [ // 强密码
            { required: true, message: '请输入密码进行测试', trigger: 'change' }
        ],
        passwordStrength: [ // 强密码
            { required: true, message: '请输入密码进行测试', trigger: 'change' }
        ],
        iPAddress: [ // 强密码
            { required: true, message: '请输入IP地址进行测试', trigger: 'change' }
        ],
        email: [ // 邮箱
            { required: true, message: '请输入邮箱进行测试', trigger: 'change' }
        ],
        idCard: [ // 身份证
            { required: true, message: '请输入身份证进行测试', trigger: 'change' }
        ],
        fullName: [ // 姓名
            { required: true, message: '请输入姓名进行测试', trigger: 'change' }
        ],
        postalCode: [ // 姓名
            { required: true, message: '请输入邮政编码进行测试', trigger: 'change' }
        ],
        url: [ // url
            { required: true, message: '请输入内容进行测试', trigger: 'change' }
        ],
        carNum: [ // 车牌号
            { required: true, message: '请输入车牌号进行测试', trigger: 'change' }
        ]
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


// 登录账号
const onVerifyAccount = (val) => {
    state.ruleForm.account = validate.verifyCnAndSpace(val)
    state.account = validate.verifyAccount(state.ruleForm.account)
}


// 密码
const onVerifyPassword = (val) => {
    state.ruleForm.password = validate.verifyCnAndSpace(val)
    state.password = validate.verifyPassword(state.ruleForm.password)
}


// 强密码
const onVerifyPasswordPowerful = (val) => {
    state.ruleForm.passwordPowerful = validate.verifyCnAndSpace(val)
    state.passwordPowerful = validate.verifyPasswordPowerful(state.ruleForm.passwordPowerful)
}


// 密码强度
const onVerifyPasswordStrength = (val) => {
    state.ruleForm.passwordStrength = validate.verifyCnAndSpace(val)
    state.passwordStrength = validate.verifyPasswordStrength(state.ruleForm.passwordStrength)
}


// IP地址
const onVerifyIPAddress = (val) => {
    state.iPAddress = validate.verifyIPAddress(val)
}


// 邮箱
const onVerifyEmail = (val) => {
    state.ruleForm.email = validate.verifyCnAndSpace(val)
    state.email = validate.verifyEmail(state.ruleForm.email)
}


// 身份证
const onVerifyIDCard = (val) => {
    state.ruleForm.idCard = validate.verifyCnAndSpace(val)
    state.idCard = validate.verifyIdCard(state.ruleForm.idCard)
}


// 姓名
const onVerifyFullName = (val) => {
    state.ruleForm.fullName = validate.verifyAndSpace(val)
    state.fullName = validate.verifyFullName(state.ruleForm.fullName)
}


// 邮政编码
const onVerifyPostalCode = (val) => {
    state.ruleForm.postalCode = validate.verifiyNumberInteger(val)
    state.postalCode = validate.verifyPostalCode(state.ruleForm.postalCode)
}


// url
const onVerifyUrl = (val) => {
    state.ruleForm.url = validate.verifyAndSpace(val)
    state.url = validate.verifyUrl(state.ruleForm.url)
}


// 车牌号
const onVerifyCarNum = (val) => {
    state.ruleForm.carNum = validate.verifyAndSpace(val)
    state.carNum = validate.verifyCarNum(state.ruleForm.carNum)
}
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