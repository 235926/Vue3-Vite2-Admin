<template>
    <el-dialog title="修改菜单" v-model="state.isShowDialog" :close-on-click-modal="false" destroy-on-close width="900px">
        <el-form :model="state.ruleForm" label-width="80px">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="上级菜单">
                        <el-cascader :options="state.menuData" :props="{
                            checkStrictly: true,
                            value: 'path',
                            label: 'title'
                        }" placeholder="请选择上级菜单" clearable class="w100" v-model="state.ruleForm.menuSuperior">
                            <template #default="{ node, data }">
                                <span>{{ data.title }}</span>
                                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="菜单类型">
                        <el-radio-group v-model="state.ruleForm.menuType">
                            <el-radio label="menu" border>菜单</el-radio>
                            <el-radio label="btn" border>按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="菜单名称">
                        <el-input v-model="state.ruleForm.meta.title" placeholder="请输入菜单名称" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="路由名称">
                        <el-input v-model="state.ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="路由路径">
                        <el-input v-model="state.ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="重定向">
                        <el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="菜单图标">
                        <IconSelector v-model="state.ruleForm.meta.icon" />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="组件路径">
                        <el-input v-model="state.ruleForm.component" placeholder="组件路径" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="链接地址">
                        <el-input v-model="state.ruleForm.meta.isLink" placeholder="外链/内嵌时链接地址（http:xxx.com）" clearable
                            :disabled="!state.isLink && !state.ruleForm.meta.isIframe"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="权限标识">
                        <el-select v-model="state.ruleForm.meta.roles" multiple placeholder="取角色管理" clearable>
                            <el-option label="admin" value="admin"></el-option>
                            <el-option label="common" value="common"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="菜单排序">
                        <el-input-number v-model="state.ruleForm.menuSort" :min="0" placeholder="请输入排序" />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="是否隐藏">
                        <el-radio-group v-model="state.ruleForm.meta.isHidden" class="radio-center">
                            <el-radio :label="true" border>隐藏</el-radio>
                            <el-radio :label="false" border>不隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="页面缓存">
                        <el-radio-group v-model="state.ruleForm.meta.isKeepAlive" class="radio-center">
                            <el-radio :label="true" border>缓存</el-radio>
                            <el-radio :label="false" border>不缓存</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="是否固定">
                        <el-radio-group v-model="state.ruleForm.meta.isAffix" class="radio-center">
                            <el-radio :label="true" border>固定</el-radio>
                            <el-radio :label="false" border>不固定</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
                    <el-form-item label="是否外链" class="mb0">
                        <el-radio-group v-model="state.isLink" :disabled="state.ruleForm.meta.isIframe"
                            class="radio-center">
                            <el-radio :label="true" border>是</el-radio>
                            <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="是否内嵌" class="mb0">
                        <el-radio-group v-model="state.ruleForm.meta.isIframe" class="radio-center"
                            @change="onSelectIframeChange">
                            <el-radio :label="true" border>是</el-radio>
                            <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">修 改</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import IconSelector from '@/components/IconSelector/index.vue' // icon 图标选择器
import { deepClone } from '@/utils/tools.js' // 工具方法
const { proxy } = getCurrentInstance() // vue 实例
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 定义响应式数据>
const state = reactive({
    isShowDialog: false, // 弹窗状态
    menuData: [], // 上级菜单列表
    isLink: false, // 是否外链
    ruleForm: {
        // 表单数据
        menuSuperior: [], // 上级菜单
        menuType: 'menu', // 菜单类型
        name: '', // 路由名称
        component: '', // 组件路径
        menuSort: 0, // 菜单排序
        path: '', // 路由路径
        redirect: '', // 路由重定向，有子集 children 时
        meta: {
            title: '', // 菜单名称
            icon: '', // 菜单图标
            isHidden: false, // 是否隐藏
            isKeepAlive: true, // 是否缓存
            isAffix: false, // 是否固定
            isLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink:true 2、链接地址不为空`
            isIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、链接地址不为空`
            roles: '' // 权限标识，取角色管理
        }
    }
})


// 打开弹窗
const openDialog = row => {
    // 不使用深拷贝的话，v-model会修改你表单的数据,然后你的表单和你的tree用的是同一个数据结构
    state.ruleForm = Object.assign(state.ruleForm, deepClone(row))

    // 判断 state.isLink 的状态
    if (state.ruleForm.meta.isIframe && state.ruleForm.meta.isLink !== '') {
        state.isLink = true
    } else if (!state.ruleForm.meta.isIframe && state.ruleForm.meta.isLink !== '') {
        state.isLink = true
    } else if (!state.ruleForm.meta.isIframe && state.ruleForm.meta.isLink === '') {
        state.isLink = false
    }
    state.isShowDialog = true
}


// 关闭弹窗
const closeDialog = () => {
    state.isShowDialog = false
}


// 取消
const onCancel = () => {
    closeDialog()
}


// 新增
const onSubmit = () => {
    closeDialog()
}


// 获取 vuex 中的路由
const getMenuData = routes => {
    let arr = [] // 重新变量，把 title 遍历出来
    routes.map(val => {
        val['title'] = val.meta.title
        val['id'] = Math.random()
        arr.push({ ...val })
        if (val.children) getMenuData(val.children)
    })
    return arr
}


// 是否内嵌下拉改变
const onSelectIframeChange = () => {
    if (state.ruleForm.meta.isIframe) state.isLink = true
    else state.isLink = false
}


// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    state.menuData = getMenuData(store.getters.routesList)
})


// 暴露数据到 vue 实例
defineExpose({
    openDialog
})
</script>

<style lang="scss" scoped>
</style>
