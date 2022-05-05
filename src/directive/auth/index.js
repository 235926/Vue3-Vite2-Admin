import store from '@/store/index.js' // vuex
import { judementSameArr } from '@/utils/tools.js' // 判断两数组是否相同

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */


// 单个权限验证（v-auth="xxx"）
export const auth = {
    mounted(el, binding) {
        const userInfo = store.getters.userInfo
        if (!userInfo.authBtnList.some((v) => v === binding.value)) el.parentNode.removeChild(el)
    }
}



// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
export const auths = {
    mounted(el, binding) {
        const userInfo = store.getters.userInfo
        let flag = false
        userInfo.authBtnList.map((val) => {
            binding.value.map((v) => {
                if (val === v) flag = true
            })
        })
        if (!flag) el.parentNode.removeChild(el)
    }
}



// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
export const authAll = {
    mounted(el, binding) {
        const userInfo = store.getters.userInfo
        let flag = judementSameArr(binding.value, userInfo.authBtnList)
        if (!flag) el.parentNode.removeChild(el)
    }
}