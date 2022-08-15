// Vue组件通信汇总
const vue02 = `
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


\`\`\`js
// 对象的方式（1）
props: {
    title: String,
    currentId: String,
    layouts: {
        spans: Number,
        sign: String,
    }
}

// 对象的方式（2） 类型、默认值
props: { 
    title: { 
        type: String, 
        default:'按钮' 
    },
    currentId: { 
        type: String, 
        default: '0' 
    }
}

// 数组的方式
props:['title', 'currentId', 'layouts']
\`\`\`

> 传对象时 也可以用watch监听对象的属性变化

\`\`\`js
// 父组件
<activies-create :formData.sync="createForm"/>

// 初始声明
createForm:{
    sellerId: 0,
    activityid: 0
}

// 子组件
props:{
    formData: Object
},
watch: {
    formData: {
        immediate: true,
        handler (val) {
            this.sellerId = val.sellerId;
            this.activityid = val.activityid;
            this.getList();
        },
        deep: true
    }
}
\`\`\`

#### 2、父组件操作子组件 this.$refs

> - **this.$refs** 指的是父组件中所有添加 **ref**属性的元素或组件

<img width="600" alt="image" src="https://user-images.githubusercontent.com/39411010/172776993-1a9735c4-be3a-4474-90e5-f0c495b966c6.png">

\`\`\`html
<!--父组件-->
<el-form ref="ruleForm"></el-form>
<Upload ref='upload'></Upload>
\`\`\`

\`\`\`js
// 父组件
console.log(this.$refs); // ruleFrom、upload

this.$refs.upload.imageUrl
this.$refs.upload.beforeAvatarUpload();
\`\`\`

#### 3、子组件操作父组件 $emit

> 传一个值时：**_valueChange**
> 传多个值时：**_confirmEvent(arguments)**

\`\`\`html
<!--父组件-->
<calculation  @confirmEvent="_confirmEvent(arguments)" @valChange="_valueChange"/>
\`\`\`

\`\`\`js
// 父组件获取 单个值
_valueChange(res) {
    this.payMoney = res;
}

// 父组件获取 多个值
_confirmEvent(res){
    this.payMoney = res[0];
    this.payTool = res[1];
}
\`\`\`

\`\`\`js
// 子组件  传单个值
this.$emit('valChange',this.money)

// 子组件  传多个值:（逗号分隔）
handleBuy(){
    let S = this.money;
    //未输入
    if (!S.length){
        return false;
    }
    //保留两位
    S = Number(S).toFixed(2);
    this.$emit('confirmEvent', S, this.payTool)
}
\`\`\`

### 二、兄弟组件通信

- Vuex
- `eventBus` 这种方法**通过一个空的 Vue实例作为中央事件总线（事件中心）**，用它来`触发事件`和`监听事件`，从而实现任何组件间的通信，包括`父子、隔代、兄弟组件`

挂载到原型
\`\`\`js
Vue.prototype.$bus = new Vue()
\`\`\`

> 新建bus.js 引入使用
\`\`\`js
import Vue from 'vue';

// 使用 Event Bus
const bus = new Vue();

export default bus;
\`\`\`

> 需要的文件中引入bus.js 文件使用
\`\`\`js
import bus from '../bus';

bus.$on('collapse', msg => {
  this.collapse = msg;
})

bus.$emit('collapse',this.collapse);
\`\`\`

### 三、跨级组件通信

- Vuex
- $attrs、$listeners
- Provide、inject
`

export default vue02