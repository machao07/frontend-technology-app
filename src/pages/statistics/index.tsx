import { View } from '@tarojs/components'
import { Component } from 'react'
import TabBar from '../../components/tarBar'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'

export default class Statistics extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
        }
    }

    handleClick(value) {
        this.setState({
            current: value
        })
    }

    render() {
        return (
            <View className="statistics">
                <AtTabs
                    current={this.state.current}
                    tabList={[
                        { title: '前端框架' },
                        { title: '标签页2' }
                    ]}
                    onClick={this.handleClick.bind(this)}>
                    <View className="main">
                        <AtTabsPane current={this.state.current} index={0}>
                            <View style='font-size:18px;text-align:center;height:100px;'>标签页一的内容</View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
                        </AtTabsPane>
                    </View>

                </AtTabs>
                <TabBar currentIndex={1} />
            </View>
        )
    }
}