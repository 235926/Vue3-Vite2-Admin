import { computed } from "vue" // vue 内置方法
import { useStore, mapState, mapGetters, createNamespacedHelpers } from "vuex" // vuex


// useState 和 useGetters 两个函数相似度很高，在进一下封装
export const useMapper = (mapper, mapFn) => {
    const store = useStore()
    const storeStateFns = mapFn(mapper)
    const storeState = {}
    Object.keys(storeStateFns).forEach((fnKey) => {
        const fn = storeStateFns[fnKey].bind({ $store: store })
        storeState[fnKey] = computed(fn)
    })
    return storeState
}


// useState
export const useState = (mapper) => {
    let mapperFn = mapState
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState
    }
    return useMapper(mapper, mapperFn)
}


// useGetters
export const useGetters = (mapper) => {
    let mapperFn = mapGetters
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters
    }
    return useMapper(mapper, mapperFn)
}