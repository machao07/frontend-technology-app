module.exports = `
### 一、父子组件通信

- 事件机制(父=>子 \`props\`，子=>父 \`$on、$emit\`)
- 获取父子组件实例 \`$parent\`、\`$children\`
- \`ref\` 获取实例的方式调用组件的属性或者方法
- provide、inject (不推荐使用，组件库时很常用)

#### 1、父组件传参到子组件 props

\`\`\`html
<!--父组件-->
<Btn :title="'修改'" :currentId="id"  :layouts="layouts"/>

<!--子组件-->
<button>{{title}}</button>
<p>{{currentId}}</p>
<p>{{layouts.sign}}</p>
\`\`\`

`