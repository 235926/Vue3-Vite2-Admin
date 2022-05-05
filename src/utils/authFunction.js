import store from '@/store/index.js' // vuex
import { judementSameArr } from '@/utils/tools.js' // 判断两数组是否相同

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(value) {
    const userInfo = store.getters.userInfo
    return userInfo.authBtnList.some((v) => v === value)
}



/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(value) {
    const userInfo = store.getters.userInfo
    let flag = false
    userInfo.authBtnList.map((val) => {
        value.map((v) => {
            if (val === v) flag = true
        })
    })
    return flag
}



/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(value) {
    const userInfo = store.getters.userInfo
    return judementSameArr(value, userInfo.authBtnList)
}