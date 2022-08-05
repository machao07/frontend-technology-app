import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/tarBar'


export default class My extends Component<any, any> {

    render() {
        return (
            <View className="my">
                <Text>我的</Text>
                <TabBar currentIndex={2}/>
            </View>
        )
    }
}
