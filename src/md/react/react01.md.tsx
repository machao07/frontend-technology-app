// react项目页面跳转/传值
const vue01 = `
## 一、跳转
### 1、history.push 跳转

> - 引用 withRouter
> - 导出组件时使用

\`\`\`js
import { withRouter } from 'react-router-dom'；

class Header extends React.Component {

}
export default withRouter(Header);
\`\`\`

### 2、NavLink跳转

\`\`\`js
import { NavLink } from "react-router-dom";
<NavLink to="/modify">修改密码</NavLink>
\`\`\`


## 二、传值
### 1、路由传值 query/params

\`\`\`js
this.props.history.push({
    pathname: 'login',
    query: {
        id: 3231,
        name: 3231
    }
})
this.props.history.push('modify')
\`\`\`

### 2、路由传值获取参数

\`\`\`js
this.props.match.query.id // 3231
this.props.match.params.name // 3231
\`\`\`

![](https://user-images.githubusercontent.com/39411010/154386926-8257e0e2-86ad-49b4-bc98-0d6eafda2480.png)


### 3、props传值

父组件:
\`\`\`js
state = {
    collapsed: false,
};
render() {
    const { collapsed } = this.state;
    return (
        <Slider collapsed={collapsed}/>
    )
}
\`\`\`

子组件:
\`\`\`js
componentDidMount(){
    // console.log(this.props)
    const { pathname } = this.props.location

    if( pathname ) {
        this.setState({               
            selectedKeys:this.props.location.pathname
        })
    }
}
\`\`\`

> console.log(this.props)

![](https://user-images.githubusercontent.com/39411010/154386981-a4b12093-c5a1-46f0-a238-aa98695f497d.png)

`

export default vue01