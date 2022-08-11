import { FC, useEffect, useState } from 'react'
import { AtCard } from 'taro-ui'
import { getCurrentInstance } from '@tarojs/taro'
import { vueArticle } from './directory/vue'
import { View } from '@tarojs/components'
import './index.scss'

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

    return (
        <>
            {
                dataList.map((item) => {
                    return (
                        <View className='card'>
                            <AtCard
                                note={item.time}
                                title='前端进阶技术栈'
                                thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
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