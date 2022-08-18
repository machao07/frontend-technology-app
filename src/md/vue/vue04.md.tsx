// vue.config.js 配置与项目优化
const vue04 = `
### 1、publicPath

- 默认 \`'/'\` 服务器根路径
- 也可设置为 \`('')\` 或 \`('./')\` 变为相对路径
- 若部署至子路径，则需要配置 \`'/xxx/'\`

### 2、outputDir
- 默认 dist

### 3、assetsDir

- 相对于outputDir的静态资源(js、css、img、fonts)目录

> \`assetsDir: 'static'\`

\`\`\`js
dist
├─static
  ├─css
  ├─fonts
  ├─img
  ├─js
\`\`\`

### 4、修改webpack配置

- \`configureWebpack\` 通过 \`操作对象\`的形式
- \`chainWebpack\` 通过 \`链式编程\`的形式

#### \`configureWebpack\`

\`\`\`js
configureWebpack: {
    resolve: {
        // 别名配置
        alias: {
            '@': 'src'
            'assets': '@assets',
            'components': '@components',
        }
    }
}
\`\`\`

\`\`\`js
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

configureWebpack: config => {
    config["externals"] = {
        'vue': "Vue",
        'vue-router': "VueRouter",
        'element-ui': "ELEMENT"
    }
}
}
\`\`\`

#### \`chainWebpack 链式操作\`

\`\`\`js
module.exports = {
    // ...
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@components', resolve('src/components'))
            .set('@assets', resolve('src/assets'))
            .set('@utils', resolve('src/utils'))

        config.module
            .rule("images")
            .test(/\.(gif|png|jpe?g|svg)$/i)
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options(customOptions)
            .end()

        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
        })

        config
            .plugin('speed-measure-webpack-plugin')
            .use(SpeedMeasurePlugin)
            .end()
    }
}
\`\`\`

### 5、项目优化
> index.html添加CDN资源

\`\`\`html
<link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.15.8/theme-chalk/index.css">
<script src="https://cdn.staticfile.org/vue/2.6.11/vue.min.js"></script>
<script src="https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js"></script>
<script src="https://cdn.staticfile.org/element-ui/2.15.8/index.js"></script>
\`\`\`

> vue.config.js
\`\`\`js
const path = require('path');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const resolve = (dir) => path.join(__dirname, dir);
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV);

const customOptions = {
    mozjpeg: { progressive: true, quality: 50 },
    optipng: { enabled: true },
    pngquant: { quality: [0.5, 0.65], speed: 4 },
    gifsicle: { interlaced: false }
}

module.exports = {
    lintOnSave: false,
    productionSourceMap: !IS_PRODUCTION,
    assetsDir: 'static',
    devServer: {
        hotOnly: true,
        proxy: {
            '/wlxt': {
                target: 'https://www.xxx.com'
            }
        }
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@components', resolve('src/components'))
            .set('@assets', resolve('src/assets'))
            .set('@utils', resolve('src/utils'))

        config.module
            .rule("images")
            .test(/\.(gif|png|jpe?g|svg)$/i)
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options(customOptions)
            .end()

        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
        })

        config
            .plugin('speed-measure-webpack-plugin')
            .use(SpeedMeasurePlugin)
            .end()
    }
}
\`\`\`

### 6、项目体积优化对比
> 打包优化前

![](https://user-images.githubusercontent.com/39411010/170208616-4de35c09-4ca0-41b6-83f8-8fd678b594ed.png)

> 打包优化后 （图片压缩、CDN）

![](https://user-images.githubusercontent.com/39411010/170211130-2a23666b-a987-43ea-9594-72a5216e2b47.png)

### 官方参考文档

**https://cli.vuejs.org/zh/config**

`
export default vue04