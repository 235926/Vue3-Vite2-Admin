/**
 * 判断两数组是否相同
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export const judementSameArr = (news, old) => {
    let count = 0
    const leng = old.length
    for (let i in old) {
        for (let j in news) {
            if (old[i] === news[j]) count++
        }
    }
    return count === leng ? true : false
}



/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export const isObjectValueEqual = (a, b) => {
    if (!a || !b) return false
    let aProps = Object.getOwnPropertyNames(a)
    let bProps = Object.getOwnPropertyNames(b)
    if (aProps.length != bProps.length) return false
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i]
        let propA = a[propName]
        let propB = b[propName]
        if (!b.hasOwnProperty(propName)) return false
        if (propA instanceof Object) {
            if (!isObjectValueEqual(propA, propB)) return false
        } else if (propA !== propB) {
            return false
        }
    }
    return true
}



/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export const deepClone = (obj) => {
    let newObj
    try {
        newObj = obj.push ? [] : {}
    } catch (error) {
        newObj = {}
    }
    for (let attr in obj) {
        if (typeof obj[attr] === 'object') {
            newObj[attr] = deepClone(obj[attr])
        } else {
            newObj[attr] = obj[attr]
        }
    }
    return newObj
}



/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export const handleEmpty = (list) => {
    let arr = []
    for (let i in list) {
        let d = []
        for (let j in list[i]) {
            d.push(list[i][j])
        }
        let leng = d.filter((item) => item === '').length
        if (leng !== d.length) {
            arr.push(list[i])
        }
    }
    return arr
}



/**
 * 判断是否是移动端
 */
export const isMobile = () => {
    if (
        navigator.userAgent.match(
            /('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
        )
    ) {
        return true
    } else {
        return false
    }
}