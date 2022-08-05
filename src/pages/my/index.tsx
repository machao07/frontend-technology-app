import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/tarBar'
import List from '../../components/list'
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'

interface listDTO {
    key: string
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
}

interface States {
    userInfo: any
}

export default class My extends Component<any, States> {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {}
        }
    }

    getUserProfile() {
        Taro.getUserProfile({
            desc: '获取用户昵称、头像',
            success: (res) => {
                this.setState({
                    userInfo: res.userInfo,
                })
            },
            fail: () => {
                console.error("您拒绝了请求");
                return;
            }
        })
    }

    handleClick(item: any) {
        console.log(item)
    }

    render() {
        const list: listDTO[] = [
            {
                key: 'share',
                isArrow: true,
                arrow: 'right',
                title: '分享小程序'
            },
            {
                key: 'about',
                isArrow: true,
                arrow: 'right',
                title: '关于我们'
            },
            {
                key: 'praise',
                isArrow: true,
                arrow: 'right',
                title: '赞赏支持'
            }
        ]

        const linkList: listDTO[] = [
            {
                key: 'github',
                isArrow: true,
                arrow: 'right',
                title: 'GitHub'
            },
            {
                key: 'blog',
                isArrow: true,
                arrow: 'right',
                title: '个人技术博客'
            },
            {
                key: 'csdn',
                isArrow: true,
                arrow: 'right',
                title: 'CSDN博客'
            },
            {
                key: 'design',
                isArrow: true,
                arrow: 'right',
                title: '设计作品集'
            }
        ]
        const { userInfo } = this.state
        return (
            <View className="my">
                <View className="avatar" onClick={this.getUserProfile.bind(this)}>
                    <AtAvatar size="large" circle image={userInfo.avatarUrl ?? 'https://jdc.jd.com/img/200'}></AtAvatar>
                    <Text className="name">{userInfo.nickName ?? '获取昵称'}</Text>
                </View>

                <List
                    list={list}
                    onClick={this.handleClick.bind(this)}
                />

                <List
                    list={linkList}
                    onClick={this.handleClick.bind(this)}
                />

                <TabBar currentIndex={2} />
            </View>
        )
    }
}
