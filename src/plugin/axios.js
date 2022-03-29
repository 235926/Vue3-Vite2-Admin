"use strict";

import axios from "axios" // ajax 请求插件

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 50000,
    withCredentials: true, // 当发送跨域请求时携带cookie
    headers: { 'Content-Type': 'application/json' },
})



// 拦截请求
service.interceptors.request.use((config) => {
    return config
}, (error) => {
    // 处理请求错误
    console.log(error) // 为了调试
    return Promise.reject(error)
})



// 拦截响应
service.interceptors.response.use((response) => {
    return response
}, (error) => {
    // 处理请求错误
    console.log(error) // 为了调试
    return Promise.reject(error)
})

export default service