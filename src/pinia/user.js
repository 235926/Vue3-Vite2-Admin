import { defineStore } from 'pinia'


export const user = defineStore('user', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            age: 18,
            name: '张三'
        }
    },
    getters: {
        changeAge() {
            console.log('getters')
            return this.age + 1000
        }
    },
    actions: {
        upAge(val) {
            this.age += val
        }
    }
})