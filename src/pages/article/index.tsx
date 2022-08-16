import { FC, useEffect, useState } from 'react'
import { AtButton, AtCard, AtFab } from 'taro-ui'
import { getCurrentInstance } from '@tarojs/taro'
import { vueArticle, reactArticle } from './directory'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

type itemDTO = {
    name: string,
    time: string,
    md: string
}

const vueUrl = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2477533825317715969#wechat_redirect'

const reactUrl = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNzE3ODI3Ng==&action=getalbum&album_id=2081821604870750209#wechat_redirect'

const ArticleList: FC = () => {
    const { type } = getCurrentInstance().router?.params ?? {}
    const [dataList, setDataList] = useState<itemDTO[]>([])

    useEffect(() => {
        switch (type) {
            case 'vue':
                setDataList(vueArticle)
                break;
            case 'react':
                setDataList(reactArticle)
                break;
            default:
                break;
        }
    }, [])

    const handleDetail = (item: itemDTO) => {
        Taro.navigateTo({ url: `/pages/articleDetail/index?title=${encodeURIComponent(item.name)}&md=${encodeURIComponent(item.md)}` })
    }

    const handleCopy = () => {
        const url = type === 'vue' ? vueUrl : type === 'react' ? reactUrl : ''
        Taro.setClipboardData({
            data: url,
            success: () => {
                Taro.atMessage({
                    message: '内容已复制',
                    type: 'success'
                })
            }
        })
    }

    return (
        <>
            <View className='main'>
                {
                    dataList.map((item: itemDTO) => {
                        return (
                            <View className='card'>
                                <AtCard
                                    onClick={() => handleDetail(item)}
                                    note={item.time}
                                    title='前端进阶技术栈'
                                    thumb={require('../../assets/logo.png')}
                                >
                                    {item.name}
                                </AtCard>
                            </View>
                        )
                    })
                }
            </View>
            <AtButton className='copyBtn' circle={true} type='primary' onClick={handleCopy}>更多</AtButton>

            <View className='tip'>
                <Text className='text'>更多文章点击右侧按钮复制链接查看</Text>
            </View>
        </>
    )
}

export default ArticleList