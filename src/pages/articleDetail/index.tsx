import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'

const Article: FC = () => {
    const [markdown, setMarkdown] = useState<string>('')

    useEffect(() => {
        const { md, title } = getCurrentInstance().router?.params ?? {}
        setMarkdown(decodeURIComponent(md ?? ''))
        Taro.setNavigationBarTitle({
            title: decodeURIComponent(title ?? '前端进阶技术栈')
        })
    }, [])

    return (
        <View className='article'>
            <wemark md={markdown} link={true} highlight={true} type='wemark' />
        </View>
    )
}

export default Article