import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC } from 'react'
import { AtButton } from 'taro-ui'
import './index.scss'

const Contact: FC = () => {

    const handleCopy = () => {
        Taro.setClipboardData({
            data: 'machao1927',
            success: (res) => {
                Taro.atMessage({
                    message: '内容已复制',
                    type: 'success'
                })
            }
        })
    }

    return (
        <View className='at-article'>
            <View className='at-article__h1'>
                联系我们
            </View>
            <View className='at-article__info'>
                2022-08-06&nbsp;&nbsp;&nbsp;马超
            </View>
            <View className='at-article__content'>
                <View className='at-article__section'>
                    <View className='at-article__h2'>白茶清欢无别事，我在等风也等你。</View>
                    <View className='at-article__p'>
                        如有商业合作可以添加以下联系方式（微信号：machao1927），或扫描下方二维码。
                    </View>

                    <AtButton  className='copyBtn' circle={true} type='primary' onClick={handleCopy}>一件复制微信号</AtButton>

                    <Image
                        className='at-article__img'
                        src={require('../../assets/weChat.png')}
                        mode='widthFix' />
                </View>
            </View>

        </View>
    )

}

export default Contact