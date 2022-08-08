import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/tarBar'
import List from '../../components/list'
import { AtAvatar, AtModal } from 'taro-ui'
import Taro from '@tarojs/taro'

interface listDTO {
    key: string
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
    url?: string
    thumb?: string
}

interface States {
    userInfo: any
    listInfo: listDTO | null
    isOpened: boolean
}

export default class My extends Component<any, States> {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            listInfo: null,
            isOpened: false
        }
    }

    componentDidMount() {
        const userInfo = Taro.getStorageSync('userInfo')
        if (userInfo) {
            this.setState({ userInfo })
        }
    }

    getUserProfile() {
        Taro.getUserProfile({
            desc: '获取用户昵称、头像',
            success: (res) => {
                Taro.setStorageSync('userInfo', res.userInfo)
                this.setState({ userInfo: res.userInfo })
            },
            fail: () => {
                console.error("您拒绝了请求");
                return;
            }
        })
    }

    handleClick(item: listDTO) {
        switch (item.key) {
            case 'about':
                Taro.navigateTo({ url: '/pages/about/index' })
                break;
            case 'contact':
                Taro.navigateTo({ url: '/pages/contact/index' })
                break;
            case 'praise':
                Taro.previewImage({
                    urls: [
                        'https://gd-hbimg.huaban.com/d1369f08470ce7fbf320686b7768f6f63a6d4604e998-jNF8aU'
                    ]
                })
                break;
            case 'taroUi':
                Taro.navigateToMiniProgram({
                    appId: 'wx1c6850423c0ff174',
                })
                break;
            case 'github':
            case 'blog':
            case 'csdn':
            case 'design':
            case 'taro':
                this.setState({ listInfo: item, isOpened: true })
                break;
            default:
                break;
        }
    }

    handleConfirm = (listInfo: listDTO) => {
        this.setState({ isOpened: false }, () => {
            Taro.setClipboardData({
                data: listInfo.url ?? '',
                success: (res) => {
                    Taro.atMessage({
                        message: '内容已复制',
                        type: 'success'
                    })
                }
            })
        })
    }

    render() {
        const list: listDTO[] = [
            {
                key: 'praise',
                isArrow: true,
                arrow: 'right',
                title: '赞赏支持',
                thumb: require('../../assets/like.png')
            },
            {
                key: 'about',
                isArrow: true,
                arrow: 'right',
                title: '关于我们',
                thumb: require('../../assets/about.png')
            },
            {
                key: 'contact',
                isArrow: true,
                arrow: 'right',
                title: '联系我们',
                thumb: require('../../assets/contact.png')
            },
            {
                key: 'taroUi',
                isArrow: true,
                arrow: 'right',
                title: 'Taro UI',
                url: 'https://taro-ui.jd.com/#/docs/quickstart',
                thumb: require('../../assets/taro.png')
            }
        ]

        const mylinkList: listDTO[] = [
            {
                key: 'github',
                isArrow: true,
                arrow: 'right',
                title: 'GitHub',
                url: 'https://github.com/machao07',
                thumb: require('../../assets/github.png')
            },
            {
                key: 'blog',
                isArrow: true,
                arrow: 'right',
                title: '个人技术博客',
                url: 'https://machao07.github.io',
                thumb: require('../../assets/person.png')
            },
            {
                key: 'csdn',
                isArrow: true,
                arrow: 'right',
                title: 'CSDN博客',
                url: 'https://blog.csdn.net/weixin_43924228',
                thumb: require('../../assets/csdn.png')
            },
            {
                key: 'design',
                isArrow: true,
                arrow: 'right',
                title: '设计作品集',
                url: 'https://machao07.zcool.com.cn',
                thumb: require('../../assets/zhanku.png')
            }
        ]

        const { userInfo, listInfo, isOpened } = this.state
        return (
            <View className="my" >
                <View className="avatar" onClick={this.getUserProfile.bind(this)}>
                    <AtAvatar size="large" circle image={userInfo.avatarUrl ?? 'https://jdc.jd.com/img/200'}></AtAvatar>
                    <Text className="name">{userInfo.nickName ?? '获取昵称'}</Text>
                </View>

                <List
                    list={list}
                    onClick={this.handleClick.bind(this)}
                />

                <List
                    list={mylinkList}
                    onClick={this.handleClick.bind(this)}
                />

                <View className="copyright">
                    <Text className="text">Copyright © 2022 Created by Machao.</Text>
                </View>

                <TabBar currentIndex={2} />
                <AtModal
                    className="modal"
                    isOpened={isOpened}
                    title={listInfo?.title}
                    confirmText='一键复制'
                    closeOnClickOverlay={false}
                    onConfirm={() => this.handleConfirm(listInfo as any)}
                    content={listInfo?.url}
                />
            </View>
        )
    }
}
