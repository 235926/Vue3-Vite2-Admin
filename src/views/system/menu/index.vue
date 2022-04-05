<template>
    <el-card class="system-menu">
        <div class="system-menu-search">
            <el-input placeholder="请输入菜单名称"></el-input>
            <el-button type="primary">
                <el-icon>
                    <search />
                </el-icon>查询
            </el-button>
            <el-button type="success">
                <el-icon>
                    <folder-add />
                </el-icon>新增菜单
            </el-button>
        </div>

        <el-table
            :data="menuTableData"
            row-key="path"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column label="菜单名称" show-overflow-tooltip>
                <template #default="scope">
                    <svg-icon :name="scope.row.meta.icon" />
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
        </el-table>
    </el-card>
</template>

<script setup name="systemMenu">
import { getSystemMenu } from '@/api/system.js' // api
const router = useRouter() // router 实例
const route = useRoute() // 路由参数
const store = useStore() // vuex 实例


// 获取 vuex 中的路由
const menuTableData = computed(() => {
    return store.getters.routesList
})
// console.log(menuTableData.value)
</script>

<style lang='scss' scoped>
.system-menu {
    .system-menu-search {
        .el-input {
            width: 180px;
        }

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>