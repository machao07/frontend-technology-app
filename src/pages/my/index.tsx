import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/tarBar'
import List from '../../components/list'
import { AtAvatar, AtModal } from 'taro-ui'
import Taro from '@tarojs/taro'
import Clipboard from 'clipboard'

interface listDTO {
    key: string
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
    url?: string
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
        switch (item.key) {
            case 'share':
                break;
            case 'about':

                break;
            case 'praise':
                Taro.previewImage({
                    urls: [
                        'https://github.com/machao07/image-store/blob/master/mini-app/praise.png?raw=true'
                    ]
                })
                break;
            case 'github':
            case 'blog':
            case 'csdn':
            case 'design':
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
                success() {
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
                title: 'GitHub',
                url: 'https://github.com/machao07'
            },
            {
                key: 'blog',
                isArrow: true,
                arrow: 'right',
                title: '个人技术博客',
                url: 'https://machao07.github.io'
            },
            {
                key: 'csdn',
                isArrow: true,
                arrow: 'right',
                title: 'CSDN博客',
                url: 'https://blog.csdn.net/weixin_43924228'
            },
            {
                key: 'design',
                isArrow: true,
                arrow: 'right',
                title: '设计作品集',
                url: 'https://machao07.zcool.com.cn'
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
                    className="copy"
                    list={list}
                    onClick={this.handleClick.bind(this)}
                />

                <List
                    className="copy"
                    list={linkList}
                    onClick={this.handleClick.bind(this)}
                />

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
