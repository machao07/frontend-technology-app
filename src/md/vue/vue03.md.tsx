// Vue中this.$router.push传参方式
const vue03 = `
### 1、params传参：
\`\`\`js
var id = this.tableDate[index].id;

this.$router.push({name:'testResult',params:{id:id}});

//目标页面接受参数
let id = this.$route.params.id
\`\`\`

> 路由动态传参：

\`\`\`js
//路由
{
    path: '/pay/:sellerId',
    component: alliance,
    meta: { title: '向商户付款',wechat_auth: true, alipay_auth: true }
}

//获取
this.sellerId = this.$route.params.sellerId;
\`\`\`

### 2、query传参：

\`\`\`js
//也可传数组、对象
this.$router.push({
    path:'/testResult',
    query:{
        sellerId: sellerId,
        code: code,
        payTool: payTool,
        allianceData: this.allianceData //对象
    }
});

//目标页面接受参数
this.sellerId= this.$route.query.sellerId;
this.code= this.$route.query.code;
this.payTool= this.$route.query.payTool;
this.allianceData = this.$route.query.allianceData;
\`\`\`

> Tips：
- \`query\`传参的参数会带在url后边展示在地址栏 \`(/page2?sellerId=xx&code=xxx&payTool=xxx)\`
- \`params\`传参的参数不会展示到地址栏

`
export default vue03