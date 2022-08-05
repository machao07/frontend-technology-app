import { Component } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro';

class App extends Component {
    render() {
        Taro.showShareMenu({
            withShareTicket: true,
            // @ts-ignore
            menus: ['shareAppMessage', 'shareTimeline'],
            showShareItems: ['shareAppMessage', 'shareTimeline'],
        });

        // this.props.children 是将要会渲染的页面
        return this.props.children
    }
}

export default App
