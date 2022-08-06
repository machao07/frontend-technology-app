import { Component } from 'react'
import { View, Swiper, SwiperItem, Image, OfficialAccount } from '@tarojs/components'
import { AtNoticebar, AtGrid, AtModal } from 'taro-ui'
import BannerImg from '../../assets/miniapp_banner.png'
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
}
export default class Index extends Component<any, States> {
    constructor(props: any) {
        super(props)
        this.state = {
            isOpened: false,
            currentItem: null
        }
    }

    handleGridClick(item: itemDTO) {
        this.setState({ currentItem: item, isOpened: true });
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
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2520042407569113092#wechat_redirect'
            },
            {
                id: 'vue',
                value: 'Vue',
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2477533825317715969#wechat_redirect'
            },
            {
                id: 'react',
                value: 'React',
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2081821604870750209#wechat_redirect'
            },
            {
                id: 'node',
                value: 'Node',
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2192118046125850625#wechat_redirect'
            },
            {
                id: 'frontEnd',
                value: '前端进阶',
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1418057341026811906#wechat_redirect'
            },
            {
                id: 'myStory',
                value: '我的故事',
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1562397975996399618#wechat_redirect'
            }
        ]
        const { isOpened, currentItem } = this.state

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
