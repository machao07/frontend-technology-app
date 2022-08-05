import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtTabBar, } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

interface Props {
    currentIndex: number
}


export default class TabBar extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            current: props.currentIndex
        }
    }
    
    handleClick(value) {
        console.log(value, typeof value)
        this.setState({
            current: value
        }, () => {
            let url: string = '';
            switch (value) {
                case 0:
                    url = '/pages/index/index'
                    break;
                case 1:
                    url = '/pages/index/index'
                    break;
                case 2:
                    url = '/pages/my/index'
                    break;
                default:
                    break;
            }
            return Taro.redirectTo({ url })
        })
    }

    render() {
        return (
            <View className='tabBar'>
                <AtTabBar
                    tabList={[
                        { title: '首页', iconType: 'home' },
                        { title: '进阶', iconType: 'list' },
                        { title: '我的', iconType: 'user' }
                    ]}
                    onClick={this.handleClick.bind(this)}
                    current={this.state.current}
                />
            </View>
        )
    }

}
