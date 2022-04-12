import { defineConfig, loadEnv } from 'vite' // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue' // 现在通过 @vitejs/plugin-vue 这个插件来支持 Vue
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // svg
import path from "path" // 主要用于 alias 文件路径别名
import AutoImport from 'unplugin-auto-import/vite' // 自动导入 composition api
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 让 vue 脚本设置语法支持 name 属性


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, __dirname)
    return {
        base: "./", // 开发或生产环境服务的公共基础路径
        plugins: [ // 需要用到的插件数组
            vue(),
            vueSetupExtend(), // 让 vue 脚本设置语法支持 name 属性
            AutoImport({ // 自动导入 vue、vue-router、vuex 相关函数
                imports: ['vue', 'vue-router', 'vuex'],
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
        optimizeDeps: { // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
            include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
        },
        server: { // 本地运行配置，及反向代理配置
            port: 8080, // 服务器端口
            host: "0.0.0.0", // 主机名， 127.0.0.1，  真机 0.0.0.0
            https: false, // 协议
            open: true, // 在服务器启动时自动在浏览器中打开应用程序
            hmr: true, // 是否开启热跟新
            proxy: { // 反向代理配置，注意 rewrite 写法，开始没看文档在这里踩了坑
                '/api': {
                    target: env.VITE_BASE_URL,
                    changeOrigin: true, // 是否跨域
                    ws: true, // proxy websockets
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            },
        },
        resolve: {
            alias: { // 配置文件别名
                '@': path.resolve(__dirname, 'src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
        },
        css: {
            preprocessorOptions: { // 指定传递给 CSS 预处理器的选项。例如
                scss: {
                    additionalData: '@import "@/assets/scss/variable.scss";', // 设置全局 css 变量
                }
            }
        },
        build: {
            target: 'modules', // 浏览器兼容性 "esnext"|"modules"
            outDir: './dist', // 指定输出路径
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            minify: 'terser', // 混淆器 terser 构建后文件体积更小
            chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
            rollupOptions: {
                output: {
                    manualChunks: {
                        'element-plus': ['element-plus'],
                        vue: ['vue', 'vue-router', 'vuex'],
                        echarts: ['echarts'],
                        // lodash: ['lodash']
                    }
                }
            },
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
                ie8: true,
                output: {
                    comments: true,
                },
            },
            brotliSize: false, // 关闭 brotliSize 显示可以稍微减少包装时间
        },
    }
})