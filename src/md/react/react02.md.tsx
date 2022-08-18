// react项目组件通信
const react02 = `
## 一、父-子通信

React 的数据流是单向的，父组件可以直接将 this.props 传入子组件

### 1、父组件

场景需求：
> - 添加成功后，更新接口
> - 关闭模态框
> - modalStatus, bankId, \`currentData（对象）\`, \`onDataChange（function）\`, onOk(function)

解决方法：

> - \`onDataChange={() => this.getData()}\`
> - \`onOk={() => cancel()}\`

\`\`\`js
componentDidMount(){
    this.getData()
}
getData(){
    if(this.state.currentId){
        api.bankApproveQueryAllDetail(this.state.currentId).then((data: any) => {
            this.setState({
                list: data.data || []
            })
        })
    }
}
\`\`\`

\`render(){}函数\`

\`\`\`js
const cancel = () => {
    this.setState({
        isModalVisible: false  
    })
}
\`\`\`

#### 回显场景

\`\`\`html
<TabPane tab={item.isDefault?'默认模板':item.templateName} key={item.approveId}>
    <AddTemplate modalStatus={'update'} bankId={this.state.currentId} currentData={item} onDataChange={() => this.getData()}></AddTemplate>
</TabPane>
\`\`\`

#### 添加场景

\`\`\`html
<Modal title="添加模板" width={'830px'} footer={null} visible={isModalVisible} onCancel={cancel}>
    <AddTemplate modalStatus={'create'} bankId={this.state.currentId} onDataChange={() => this.getData()} onOk={() => cancel()}></AddTemplate>
</Modal>
\`\`\`

### 2、子组件

> - currentData 可选传参数 ?:
> - onDataChange:() => void 更新接口函数
> - onOk ?:() => void 改变模态框函数

\`\`\`js
interface Props {
    currentData?: BankApproveDetailVo, 
    modalStatus: string, 
    bankId: number, 
    onDataChange: ()=>void, 
    onOk?: ()=>void
}

interface States {
    fields: any[],
    approveId: number,
    bankId: number
}

class AddTemplate extends Component<Props, States> {
    constructor(props: any){
        super(props)
        this.state = {
            fields: [],
            approveId: this.props.currentData?.approveId || 0,
            bankId: this.props.bankId
        }
    }
    handleDefault = () => {
        const { approveId, bankId } = this.state;
        api.bankApproveIsDefault( approveId, bankId ).then((data: any) => {
            if(data.code === 200){
                message.success('设置默认模板成功')
                this.props.onDataChange()
            }else{
                message.error('设置默认模板失败')
            }
        })
    }
}
\`\`\`

## 二、子-父通信

子组件在调用该函数时，就可以将想要交给父组件的数据以函数入参的形式给出去


### 父组件

\`\`\`js
class Father extends React.Component {
    // 初始化父组件的 state
    state = {
        text: "初始化的父组件的文本"
    };
    changeText = (newText) => {
        this.setState({
        text: newText
        });
    };
    // 渲染父组件
    render() {
        return (
            <div className="father">
                <p>{父组件的文本内容是：}{this.state.text}</p>
            <Child
                changeFatherText={this.changeText}
            />
        </div>
    );
}
\`\`\`

### 子组件
\`\`\`js
class Child extends React.Component {
    // 初始化子组件的 state
    state = {
        text: '子组件的文本'
    }

    // 子组件的按钮监听函数
    changeText = () => {
        this.props.changeFatherText(this.state.text)
    }
    render() {
        return (
            <div className="child">
            {/* 注意这里把修改父组件文本的动作放在了 Child 里 */}
            <button onClick={this.changeText}>
            点击更新父组件的文本
            </button>
        </div>
        );
    }
}
\`\`\`

### 3、跨组件通信

- 创建一个 context 对象
\`\`\`js
const AppContext = React.createContext()
\`\`\`

- 获取 Provider 和 Consume
\`\`\`js
const { Provider, Consumer } = AppContext
\`\`\`

- Provider 数据提供者
\`\`\`js
<Provider value={title: this.state.title, content: this.state.content}>
    <Title />
    <Content />
</Provider>
\`\`\`

- Consumer 数据消费者
\`\`\`js
<Consumer>
    {value => <div>{value.title}</div>}
</Consumer>
\`\`\`
`

export default react02