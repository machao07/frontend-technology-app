// vue项目预渲染&SEO
const vue05 = `

### 预渲染
- 多适用于静态网站
- 解决 SEO 问题
- 安装 \`npm i prerender-spa-plugin -D\`
-  [github仓库地址][1]
- \`routes\` 对应自己的路由文件，比如a有参数，就需要写成 /a/param1

#### 1、vue.config.js

- \`routes\` 需要生成预渲染的路由
- \`staticDir\` 生成多页面的目录 只能是一级目录

\`\`\`js
// 引入
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// plugins
module.exports = {
    // ...
    chainWebpack: config => {
        config
            .plugin('prerender-spa-plugin')
            .use(PrerenderSPAPlugin, [{
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/', '/home', '/product', '/contact'],
                minify: {
                    minifyCSS: true,
                    removeComments: true  // 移除注释
                },
                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    headless: true,
                    renderAfterDocumentEvent: 'render-event',
                    // renderAfterTime: 5000  // 不完全是静态时用于获取数据后再保存渲染结果
                })
            }])
            .end()
    }
}
\`\`\`

#### 2、main.js文件

\`\`\`js

new Vue({
    router,
    render: h => h(App),
    mounted() {
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')
\`\`\`

> yarn build 打包生成目录

<img width="300" alt="image" src="https://user-images.githubusercontent.com/39411010/177259261-1b2b2ab8-5293-4c2c-99c8-3a9c42bd7f03.png">


#### 3、SEO优化 

- 自定义 \`keyWords\` \`description\`
- \`npm i vue-meta-info\`

> main.js
\`\`\`js
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
\`\`\`

> 在相应的vue页面的配置
\`\`\`js
export default {
    metaInfo: {
        meta: [
            {
                name: "keyWords",
                content: "ETC, ETC卡, ETC系统服",
            },
            {
                name: "description",
                content:
                    "中数信信息服务为企业提供车辆管理平台，并联合银行APP，支持企业对挂靠车辆实现ETC申卡、信用额度分配、ETC过路费及油费的支、还款及额度恢复、一键锁车、一键解锁等管理功能",
            },
        ],
    },
    // ...
}
\`\`\`

> 生成自定义的 meat 标签

<img width="778" alt="image" src="https://user-images.githubusercontent.com/39411010/177259323-a1bd9e72-b4c5-4d35-a589-f075ff29e4c1.png">

[1]:https://github.com/chrisvfritz/prerender-spa-plugin


#### 4、安装 http server 插件 

> 本地服务预览：

- cnpm i http-server -g
- yarn build
- cd dist 
- http-server

> 未使用预渲染页面效果：

<img width="780" alt="image" src="https://user-images.githubusercontent.com/39411010/177259429-f682f97e-9c8b-4fbc-aae1-d6bb1253736a.png">

> 使用预渲染页面效果：

<img width="780" alt="image" src="https://user-images.githubusercontent.com/39411010/177260257-4078fc56-ece5-4dae-b6bd-34196b0a9d86.png">


> 未配置预渲染路由页面效果：

<img width="780" alt="image" src="https://user-images.githubusercontent.com/39411010/177260314-20ce13e6-7025-4f6d-9339-443a942597ef.png">

`
export default vue05