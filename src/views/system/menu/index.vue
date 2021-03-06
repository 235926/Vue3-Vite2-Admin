<template>
    <div class="page-container">
        <el-card class="system-menu">
            <div class="system-search flex mb20">
                <el-input v-model="state.search" placeholder="请输入菜单名称"></el-input>
                <el-button type="primary">
                    <el-icon>
                        <Search /> </el-icon
                    >查询
                </el-button>
                <el-button type="success" @click="onOpenAddMenu">
                    <el-icon>
                        <FolderAdd /> </el-icon
                    >新增菜单
                </el-button>
            </div>

            <el-table
                v-loading="state.loading"
                :data="menuTableData"
                row-key="path"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column label="菜单名称" show-overflow-tooltip>
                    <template #default="scope">
                        <SvgIcon :name="scope.row.meta.icon" />
                        <span class="ml10">{{ scope.row.meta.title }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="路由路径" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.path }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="组件路径" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.component }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="权限标识" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.meta.roles }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="菜单类型" show-overflow-tooltip width="150">
                    <template #default="scope">
                        <el-tag effect="dark" v-if="scope.row.menuType === 'menu'">菜单</el-tag>
                        <el-tag effect="dark" type="success" v-if="scope.row.menuType === 'link'">外链</el-tag>
                        <el-tag effect="dark" type="warning" v-if="scope.row.menuType === 'iframe'">内嵌</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" show-overflow-tooltip width="150">
                    <template #default="scope">
                        <el-button text type="primary" @click="onOpenAddMenu">新增</el-button>
                        <el-button text type="primary" @click="editMenu(scope.row)">编辑</el-button>
                        <el-button text type="primary" @click="delMenu(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增菜单 -->
        <addMenu ref="addMenuRef" />

        <!-- 编辑菜单 -->
        <EditMenu ref="editMenuRef" />
    </div>
</template>

<script setup name="systemMenu">
import { systemMenu, systemMenuDelete } from '@/api/system.js' // api
import addMenu from './component/addMenu.vue' // 新增菜单
import EditMenu from './component/editMenu.vue' // 编辑菜单
const { proxy } = getCurrentInstance() // vue 实例
const store = useStore() // vuex 实例

// 定义响应式数据
const addMenuRef = ref(null)
const editMenuRef = ref(null)
const state = reactive({
    search: '', // 查询参数
    menuTableData: [], // 菜单列表数据
    loading: false, // 加载状态
})

// 获取 vuex 中的路由
const menuTableData = computed(() => {
    const routeList = store.getters.routesList
    routeList.forEach((item) => {
        item.component = `${item.component} `
            .match(/\'(.+)\'/g)
            ?.join('')
            .replace(/\'/g, '')
        if (item.children) {
            item.children.forEach((citem) => {
                citem.component = `${citem.component} `
                    .match(/\'(.+)\'/g)
                    ?.join('')
                    .replace(/\'/g, '')
            })
        }
    })
    return routeList
})

// 获取菜单列表数据
const getSystemMenu = () => {
    state.loading = true
    systemMenu().then((res) => {
        state.menuTableData = res.routes
        state.loading = false
    })
}

// 打开新增菜单弹窗
const onOpenAddMenu = () => {
    addMenuRef.value.openDialog()
}

// 编辑菜单
const editMenu = (row) => {
    editMenuRef.value.openDialog(row)
}

// 删除菜单
const delMenu = (row) => {
    let params = {
        id: row.name,
        time: new Date().getTime(),
    }
    proxy
        .$confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            systemMenuDelete(params).then((res) => {
                proxy.$message.success('删除成功')
            })
        })
        .catch(() => {})
}

// 组件挂载后，此方法执行后，页面显示
onMounted(() => {
    getSystemMenu()
})
</script>

<style lang="scss" scoped>
.system-menu {
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
