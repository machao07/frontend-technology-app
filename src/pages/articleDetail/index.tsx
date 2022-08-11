import { FC } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import md from '../../md/vue/vueAddts.md'

const Article: FC = () => {
    return (
        <View className='article'>
            <wemark md={md} link highlight={true} type='wemark' />
        </View>
    )
}

export default Article