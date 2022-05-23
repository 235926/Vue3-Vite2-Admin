import { defineStore } from 'pinia'


export const useShop = defineStore('shop', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            num: 0,
            name: '张三'
        }
    },
    getters: {
        changeNum() {
            console.log('getters')
            return this.num + 1000
        }
    },
    actions: {
        upNum(val) {
            this.num += val
        }
    },
    // 开启数据缓存，根据 pinia-plugin-persist 插件
    persist: {
        enabled: true,
        strategies: [ // pinia-plugin-persist 存储默认走的是 session
            {
                key: 'my_shop', // 指定 localStorage 的key，默认是根据模块的ID
                storage: localStorage,
                paths: ['name', 'num'], // 配置哪些需要缓存的数据，默认所有
            }
        ]
    }
})