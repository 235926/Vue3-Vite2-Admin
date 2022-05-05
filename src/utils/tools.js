import { nextTick } from 'vue' // vue 内置方法


/**
 * 判断两数组是否相同
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export function judementSameArr(news, old) {
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
export function isObjectValueEqual(a, b) {
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
export function deepClone(obj) {
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
export function handleEmpty(list) {
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
export function isMobile() {
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



/**
 * 将一维的扁平数组转换为多层级对象
 * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parent_id两个属性
 * @return {[type]} tree 多层级树状结构
 */
export function buildTree(list) {
    let temp = {}
    let tree = {}
    for (let i in list) {
        temp[list[i].id] = list[i]
    }
    for (let i in temp) {
        if (temp[i].parent_id) {
            if (!temp[temp[i].parent_id].children) {
                temp[temp[i].parent_id].children = new Object()
            }
            temp[temp[i].parent_id].children[temp[i].id] = temp[i]
        } else {
            tree[temp[i].id] = temp[i]
        }
    }
    return tree
}



/**
 * 防抖函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}



/**
 * 切换 class 类
 * @param {HTMLElement} element
 * @param {string} className
 * toggleClass(document.body, 'custom-theme')
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substring(0, nameIndex) +
            classString.substring(nameIndex + className.length)
    }
    element.className = classString
}



/**
 * 检查一个元素是否有类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}



/**
 * 向元素添加类
 * @param {HTMLElement} elm
 * @param {string} cls
 * addClass(document.body, 'showRightPanel')
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}



/**
 * 从元素中移除类
 * @param {HTMLElement} elm
 * @param {string} cls
 * removeClass(document.body, 'showRightPanel')
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}



/**
 * 判断内容是否为空
 * isNull(value)
 */
export function isNull(value) {
    return value === '' || value === undefined || value === null
}



/**
 * 把数值以10位分割成不同的数组结构
 * dataByGroup([1, 6, 12, 18, 19, 46, 16, 15, 17, 19, 22, 64, 76, 56, 45, 58, 93, 77, 12, 45])
 * 结果：[1, 6]，[12, 15, 16, 17, 18, 19]，[22]，[45, 46]，[56, 58]，[64]，[76, 77]，[93]
 */
export function dataByGroup(params) {
    const obj = {}
    const finalyArr = []
    params.filter((i, idx) => params.indexOf(i) === idx).sort((a, b) => a - b).forEach(i => {
        if (obj[i / 10 | 0]) {
            obj[i / 10 | 0].push(i)
        } else {
            obj[i / 10 | 0] = [i]
        }
    })
    Object.keys(obj).forEach(i => {
        finalyArr.push(obj[i])
    })
}



/**
 * 数组去重
 * duplicateRemoval([1, 2, 3, 4, 5, 6, 72, 2, 1, 2, 3, 5])
 * 结果：[1, 2, 3, 4, 5, 6, 72]
 */
export function duplicateRemoval(data) {
    return data.filter((item, index, arr) => {
        return arr.indexOf(item, 0) === index
    })
}



/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export function lazyImg(el, arr) {
    let io = new IntersectionObserver((res) => {
        res.forEach((v) => {
            if (v.isIntersecting) {
                let { img, key } = v.target.dataset
                v.target.src = img
                v.target.onload = () => {
                    io.unobserve(v.target)
                    arr[key]['loading'] = false
                }
            }
        })
    })
    nextTick(() => {
        document.querySelectorAll(el).forEach((img) => io.observe(img))
    })
}