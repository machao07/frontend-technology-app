import { Component } from 'react'
import { View, Swiper, SwiperItem, Image, OfficialAccount, Text } from '@tarojs/components'
import { AtNoticebar, AtGrid, AtModal } from 'taro-ui'
import BannerImg from '../../assets/miniapp_banner.jpg'
import './index.scss'
import TabBar from '../../components/tarBar'
import Taro from '@tarojs/taro'

type itemDTO = {
    id: string
    value: string
    image: string
    url: string
}
interface States {
    isOpened: boolean
    currentItem: itemDTO | null
    date: Date
}
export default class Index extends Component<any, States> {
    constructor(props: any) {
        super(props)
        this.state = {
            isOpened: false,
            currentItem: null,
            date: new Date()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ date: new Date() })
        })
    }

    handleGridClick(item: itemDTO) {
        Taro.navigateTo({url: `/pages/article/index?type=${item.id}`})
        // if (item.id === 'vue') {
        //     Taro.navigateTo({ url: '/pages/article/index' })
        // } else {
        //     this.setState({ currentItem: item, isOpened: true });
        // }
        // Taro.navigateTo({ url: `/pages/webview/index?webUrl=${encodeURIComponent(item.url)}` })
    }


    handleConfirm = (item: itemDTO) => {
        this.setState({ isOpened: false }, () => {
            Taro.setClipboardData({
                data: item.url ?? '',
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
        const gridData = [
            {
                id: 'js',
                value: '前端基础',
                image: require('../../assets/base.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2520042407569113092#wechat_redirect'
            },
            {
                id: 'vue',
                value: 'Vue',
                image: require('../../assets/vue.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2477533825317715969#wechat_redirect'
            },
            {
                id: 'react',
                value: 'React',
                image: require('../../assets/react.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2081821604870750209#wechat_redirect'
            },
            {
                id: 'node',
                value: 'Node',
                image: require('../../assets/node.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2192118046125850625#wechat_redirect'
            },
            {
                id: 'frontEnd',
                value: '前端进阶',
                image: require('../../assets/advance.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1418057341026811906#wechat_redirect'
            },
            {
                id: 'myStory',
                value: '我的故事',
                image: require('../../assets/story.png'),
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1562397975996399618#wechat_redirect'
            }
        ]
        const { isOpened, currentItem, date } = this.state
        const currentDate = `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()}`
        return (
            <View className="home">
                <Swiper
                    className='swiper'
                    indicatorColor='#aaa'
                    indicatorActiveColor='#fff'
                    interval={3000}
                    circular
                    indicatorDots
                    autoplay>
                    <SwiperItem>
                        <View className='swiperItem'>
                            <Image className="swiperImage" src={BannerImg} />
                        </View>
                    </SwiperItem>
                </Swiper>
                <AtNoticebar icon='volume-plus'>
                    GitHub正在整理前端技术栈面试知识点（持续更新中🏃）
                </AtNoticebar>

                <OfficialAccount />

                <View className='checkIn'>
                    <View className='checkInBox'>
                        <Text>打 卡</Text>
                        <Text className='time'>{currentDate}</Text>
                    </View>
                    <Text className='tip'>千里之行始于足下，快来学习吧！</Text>
                </View>

                <AtGrid className='grid' data={gridData} onClick={this.handleGridClick.bind(this)} />
                <TabBar currentIndex={0} />

                <AtModal
                    className="modal"
                    isOpened={isOpened}
                    title={currentItem?.value}
                    confirmText='一键复制'
                    closeOnClickOverlay={false}
                    onConfirm={() => this.handleConfirm(currentItem as any)}
                    content="后续迭代敬请期待，目前复制链接浏览器打开或关注公众号查看"
                />
            </View>
        )
    }
}
