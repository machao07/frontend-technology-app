import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/tarBar'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'

interface listDTO {
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
}

export default class My extends Component<any, any> {
    render() {
        const list: listDTO[] = [
            {
                isArrow: true,
                arrow: 'right',
                title: '分享小程序'
            },
            {
                isArrow: true,
                arrow: 'right',
                title: '关于我们'
            },
            {
                isArrow: true,
                arrow: 'right',
                title: '赞赏支持'
            }
        ]

        const linkList: listDTO[] = [
            {
                isArrow: true,
                arrow: 'right',
                title: 'GitHub'
            },
            {
                isArrow: true,
                arrow: 'right',
                title: '个人技术博客'
            },
            {
                isArrow: true,
                arrow: 'right',
                title: 'CSDN博客'
            },
            {
                isArrow: true,
                arrow: 'right',
                title: '设计作品集'
            }
        ]
        return (
            <View className="my">
                <View className="avatar">
                    <AtAvatar size="large" circle image='https://jdc.jd.com/img/200'></AtAvatar>
                    <Text className="name">超</Text>
                </View>

                <AtList className="list">
                    {
                        list.map((item) => {
                            return <AtListItem
                                arrow={item.arrow}
                                title={item.title}
                            />
                        })
                    }
                </AtList>

                <AtList className="list">
                    {
                        linkList.map((item) => {
                            return <AtListItem
                                arrow={item.arrow}
                                title={item.title}
                            />
                        })
                    }
                </AtList>

                <TabBar currentIndex={2} />
            </View>
        )
    }
}
