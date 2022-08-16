// vue项目添加TS
const vue02 = `
### 一、已有项目
#### 1、安装依赖

\`npm i vue-class-component vue-property-decorator —S\`

\`npm i ts-loader typescript tslint tslint-loader tslint-config-standard -D\`

- **vue-class-component：**扩展vue支持typescript，将原有的vue语法通过声明的方式来支持ts
- **vue-property-decorator：**基于vue-class-component扩展更多装饰器
- **ts-loader：**让webpack能够识别ts文件
- **tslint-loader：**tslint用来约束文件编码
- **tslint-config-standard：**tslint 配置 standard风格的约束

#### 2、初始化tsconfig 
> tsc --init 

\`\`\`js
{
    "compilerOptions": {
        "target": "es5",
        "module": "ESNext",
        "strict": true,
        "strictNullChecks": true,
        "esModuleInterop": true,
        "experimentalDecorators": true  // 启用装饰器
    }
}
\`\`\`

#### 3、vue.config.js

\`\`\`js
// webpack 配置
configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    }
},
\`\`\`

#### 4、新建ts解析.vue

> shims-tsx.d.ts
\`\`\`js
import Vue, { VNode } from 'vue';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
\`\`\`

> shims-vue.d.ts
\`\`\`js
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

\`\`\`

#### 5、添加tslint.json
\`\`\`js
    {
        "extends": "tslint-config-standard",
        "globals": {
            "require": true
        }
    }
\`\`\`

### 二、新项目

> yarn create vue

![](https://user-images.githubusercontent.com/39411010/154649007-6af3795f-4d23-4f40-aa43-706f67a92912.png)

##### 项目结构
\`\`\`js
vue-ts
├─.browserslistrc
├─babel.config.js
├─package.json
├─tsconfig.json
├─tslint.json
├─yarn.lock
├─src
|  ├─App.vue
|  ├─main.ts
|  ├─shims-tsx.d.ts
|  ├─shims-vue.d.ts
|  ├─views
|  |   ├─About.vue
|  |   └Home.vue
|  ├─store
|  |   └index.ts
|  ├─router
|  |   └index.ts
|  ├─components
|  |     └HelloWorld.vue
|  ├─assets
|  |   └logo.png
├─public
|   ├─favicon.ico
|   └index.html
\`\`\`

#### 写法差异及注意点

> - \`@Component\`  没有子组件也需要写出
> - 最后都需要导出 \`export default class Test extends Vue {}\`

\`\`\`html
<template>
    <div>

    </div>
</template>
\`\`\`

\`\`\`js
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import vHead from './header.vue';

@Component({
    components: {
        vHead,
    },
})

export default class Test extends Vue {
    private obj: any ={
        name: 'caho',
        age: 18,
        sex: 1
    }
};
</script>
\`\`\`
`
export default vue02