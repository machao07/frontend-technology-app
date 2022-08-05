import { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtNoticebar, AtGrid } from 'taro-ui'
import BannerImg from '../../assets/miniapp_banner.png'
import './index.scss'
import TabBar from '../../components/tarBar'
import Taro from '@tarojs/taro'

export default class Index extends Component<any, any> {
    handleGridClick(item: any) {
        let hrefURL: string = '';
        switch (item.id) {
            case 'js':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1418057341026811906#wechat_redirect'
                break;
            case 'vue':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2477533825317715969#wechat_redirect'
                break;
            case 'react':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2081821604870750209#wechat_redirect'
                break;
            case 'node':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2192118046125850625#wechat_redirect'
                break;
            case 'frontEnd':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1418057341026811906#wechat_redirect'
                break;
            case 'myStory':
                hrefURL = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=1562397975996399618#wechat_redirect'
                break;
            default:
                break;
        }
        return Taro.navigateTo({ url: hrefURL })
    }

    render() {
        const gridData = [
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: 'Js基础',
                id: 'js'
            },
            {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: 'Vue',
                id: 'vue'
            },
            {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: 'React',
                id: 'react'
            },
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: 'Node',
                id: 'node'
            },
            {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '前端进阶',
                id: 'frontEnd'
            },
            {
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '我的故事',
                id: 'myStory'
            }
        ]
        return (
            <View className="home">
                <View>
                    <Swiper
                        className='swiper'
                        indicatorColor='#aaa'
                        indicatorActiveColor='#fff'
                        circular
                        indicatorDots
                        autoplay
                    >
                        <SwiperItem>
                            <View className='swiperItem'>
                                <Image className="swiperImage" src={BannerImg} />
                            </View>                            
                        </SwiperItem>                      
                    </Swiper>
                    <AtNoticebar marquee speed={80} icon='volume-plus'>
                        GitHub 正在更新整理前端技术栈面试知识点（持续更新中🏃）
                    </AtNoticebar>
                </View>

                <AtGrid className='grid' data={gridData} onClick={this.handleGridClick.bind(this)} />
                <TabBar currentIndex={0} />
            </View>
        )
    }
}
