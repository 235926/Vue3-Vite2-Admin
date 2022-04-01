import axios from "axios" // ajax 请求插件
import { ElMessage, ElMessageBox } from 'element-plus' // ElementPlus 消息方法
import { Session } from '@/utils/storage.js' // 浏览器存储


// 创建一个 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 50000,
    withCredentials: true, // 当发送跨域请求时携带cookie
    headers: { 'Content-Type': 'application/json' },
})



// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 在发送请求之前做些什么 token
    if (Session.get('token')) {
        config.headers.common['Authorization'] = `${Session.get('token')}`
    }
    return config
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
})



// 添加响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default service