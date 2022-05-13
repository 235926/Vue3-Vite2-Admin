<template>
    <div class="system-user">
        <el-card shadow="hover">
            <div class="system-search flex mb20">
                <el-input v-model="state.search" placeholder="请输入菜单名称"></el-input>
                <el-button type="primary">
                    <el-icon><Search /></el-icon>查询
                </el-button>
                <el-button type="success" @click="onOpenAdd">
                    <el-icon><FolderAdd /></el-icon>新增用户
                </el-button>
            </div>

            <el-table :data="state.tableData" v-loading="state.loading">
                <el-table-column type="index" label="序号" width="60" />

                <el-table-column prop="userName" label="账户名称" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.userName }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="userNickname" label="用户昵称" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.userNickname }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="roleSign" label="关联角色" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.roleSign }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="department" label="部门" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.department }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.phone }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.email }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag effect="dark" v-if="scope.row.status">启用</el-tag>
                        <el-tag effect="dark" type="info" v-else>禁用</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="describe" label="用户描述" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.describe }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-button
                            :disabled="scope.row.userName === 'admin'"
                            text
                            type="primary"
                            @click="onOpenEdit(scope.row)"
                            >修改</el-button
                        >
                        <el-button
                            :disabled="scope.row.userName === 'admin'"
                            text
                            type="primary"
                            @click="onRowDel(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup name="systemName">
import { systemUser } from '@/api/system.js' // api
const { proxy: ctx } = getCurrentInstance() // 获取 vue 实例
const router = useRouter() // 定义 router 实例
const route = useRoute() // 路由参数
const store = useStore() // 定义 vuex 实例

// 定义响应式数据>
const state = reactive({
    search: '', // 查询参数
    tableData: [], // 数据列表
    currentPage: 1, // 当前页
    pageSize: 20, // 每页条数
    total: 0, // 总条数
    loading: false, // 加载状态
})

// 获取数据
const getSystemUser = () => {
    state.loading = true
    let params = {
        currentPage: state.currentPage,
        pageSize: state.pageSize,
    }
    systemUser(params).then((res) => {
        state.tableData = res.data
        state.total = res.total
        state.loading = false
    })
}

// 新增
const onOpenAdd = () => {}

// 编辑
const onOpenEdit = () => {}

// 删除
const onRowDel = () => {}

// 切换每页条数
const handleSizeChange = (val) => {
    // 解决当前页不是第一页的时候进行切换每页展示条数不回到第一页的问题
    state.currentPage = 1
    state.pageSize = val
}

// 切换当前页
const handleCurrentChange = (val) => {
    state.currentPage = val
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getSystemUser()
})
</script>

<style lang="scss" scoped>
.system-user {
    .system-search {
        .el-input {
            width: 180px;
        }

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>
