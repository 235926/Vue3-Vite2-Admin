<template>
    <!-- 页面权限 -->
    <LimitsFrontEndPage />

    <!-- 演示1：组件方式 -->
    <el-card shadow="hover" header="演示1：组件方式" class="mt20">
        <el-row class="mb10" style="color: #808080">单个权限验证（:value="xxx"）</el-row>
        <div class="flex-warp">
            <Auth :value="'btn.add'">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="primary">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>
                            新增
                        </el-button>
                    </div>
                </div>
            </Auth>
            <Auth :value="'btn.edit'">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="info">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            编辑
                        </el-button>
                    </div>
                </div>
            </Auth>
            <Auth :value="'btn.del'">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="danger">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </div>
                </div>
            </Auth>
            <Auth :value="'btn.link'">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="success">
                            <el-icon>
                                <Link />
                            </el-icon>
                            跳转
                        </el-button>
                    </div>
                </div>
            </Auth>
        </div>

        <el-row class="mb10 mt10" style="color: #808080">多个权限验证，满足一个则显示（:value="[xxx,xxx]"）</el-row>
        <div class="flex-warp">
            <Auths :value="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="primary">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>
                            新增
                        </el-button>
                    </div>
                </div>
            </Auths>
            <Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="info">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            编辑
                        </el-button>
                    </div>
                </div>
            </Auths>
            <Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="danger">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </div>
                </div>
            </Auths>
            <Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="success">
                            <el-icon>
                                <Link />
                            </el-icon>
                            跳转
                        </el-button>
                    </div>
                </div>
            </Auths>
        </div>

        <el-row class="mb10 mt10" style="color: #808080">多个权限验证，全部满足则显示（:value="[xxx,xxx]"）</el-row>
        <div class="flex-warp">
            <AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="primary">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>
                            新增
                        </el-button>
                    </div>
                </div>
            </AuthAll>
            <AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="info">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            编辑
                        </el-button>
                    </div>
                </div>
            </AuthAll>
            <AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="danger">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </div>
                </div>
            </AuthAll>
            <AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item">
                    <div class="flex-warp-item-box">
                        <el-button type="success">
                            <el-icon>
                                <Link />
                            </el-icon>
                            跳转
                        </el-button>
                    </div>
                </div>
            </AuthAll>
        </div>
    </el-card>

    <!-- 演示2：指令方式 -->
    <el-card shadow="hover" header="演示2：指令方式（页面初始化时执行）" class="mt20">
        <el-row class="mb10" style="color: #808080">单个权限验证（v-auth="xxx"）</el-row>
        <div class="flex-warp">
            <div class="flex-warp-item" v-auth="'btn.add'">
                <div class="flex-warp-item-box">
                    <el-button type="primary">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        新增
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auth="'btn.edit'">
                <div class="flex-warp-item-box">
                    <el-button type="info">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        编辑
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auth="'btn.del'">
                <div class="flex-warp-item-box">
                    <el-button type="danger">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auth="'btn.link'">
                <div class="flex-warp-item-box">
                    <el-button type="success">
                        <el-icon>
                            <Link />
                        </el-icon>
                        跳转
                    </el-button>
                </div>
            </div>
        </div>

        <el-row class="mb10 mt10" style="color: #808080">多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）</el-row>
        <div class="flex-warp">
            <div class="flex-warp-item" v-auths="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']">
                <div class="flex-warp-item-box">
                    <el-button type="primary">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        新增
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="info">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        编辑
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="danger">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="success">
                        <el-icon>
                            <Link />
                        </el-icon>
                        跳转
                    </el-button>
                </div>
            </div>
        </div>

        <el-row class="mb10 mt10" style="color: #808080">多个权限验证，全部满足则显示（v-authAll="[xxx,xxx]"）</el-row>
        <div class="flex-warp">
            <div class="flex-warp-item" v-authAll="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="primary">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        新增
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-authAll="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="info">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        编辑
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-authAll="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="danger">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item" v-authAll="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                <div class="flex-warp-item-box">
                    <el-button type="success">
                        <el-icon>
                            <Link />
                        </el-icon>
                        跳转
                    </el-button>
                </div>
            </div>
        </div>
    </el-card>

    <!-- 演示3：函数方式 -->
    <el-card shadow="hover" header="演示3：函数方式（点击按钮查看有无权限，用于判断）" class="mt20">
        <el-row class="mb10" style="color: #808080">auth('xxx')、auths(['xxx','xxx'])、authAll(['xxx','xxx'])</el-row>
        <div class="flex-warp">
            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="primary" @click="onAuthClick">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        新增
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="info" @click="onAuthsClick">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        编辑
                    </el-button>
                </div>
            </div>
            <div class="flex-warp-item">
                <div class="flex-warp-item-box">
                    <el-button type="danger" @click="onAuthAllClick">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup name="limitsFrontEndButton">
import LimitsFrontEndPage from '@/views/limits/frontEnd/page.vue' // 页面权限
import Auth from '@/components/Auth/auth.vue' // 单个权限验证
import Auths from '@/components/Auth/auths.vue' // 多个权限验证，满足一个则显示
import AuthAll from '@/components/Auth/authAll.vue' // 多个权限验证，全部满足则显示
import { auth, auths, authAll } from '@/utils/authFunction.js' // 权限验证函数
const { proxy } = getCurrentInstance() // vue 实例


// 单个权限验证
const onAuthClick = () => {
    if (!auth('btn.add')) proxy.$message.error('抱歉，您没有权限！')
    else proxy.$message.success('恭喜，您有权限！')
}


// 多个权限验证，满足一个则为 true
const onAuthsClick = () => {
    if (!auths(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) proxy.$message.error('抱歉，您没有权限！')
    else proxy.$message.success('恭喜，您有权限！')
}


// 多个权限验证，全部满足则为 true
const onAuthAllClick = () => {
    if (!authAll(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) proxy.$message.error('抱歉，您没有权限！')
    else proxy.$message.success('恭喜，您有权限！')
}
</script>

<style lang='scss' scoped>
</style>