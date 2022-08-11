module.exports = `
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
`