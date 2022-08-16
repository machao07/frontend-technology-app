import { FC, useEffect, useState } from 'react'
import { AtCard } from 'taro-ui'
import { getCurrentInstance } from '@tarojs/taro'
import { vueArticle, reactArticle } from './directory'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

type itemDTO = {
    name: string,
    time: string,
    md: string
}

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

    return (
        <>
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
        </>
    )
}

export default ArticleList