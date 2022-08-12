import { FC, useEffect, useState } from 'react'
import { AtCard } from 'taro-ui'
import { getCurrentInstance } from '@tarojs/taro'
import { vueArticle } from './directory/vue'
import { View } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

type itemDTO = {
    name: string,
    time: string,
    md: string
}

const ArticleList: FC = () => {
    const { type } = getCurrentInstance().router?.params ?? {}
    const [dataList, setDataList] = useState<any>([])

    useEffect(() => {
        switch (type) {
            case 'js':

                break;
            case 'vue':
                setDataList(vueArticle)
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