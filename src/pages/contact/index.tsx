import { View, Image, Text } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'

type imgsDTO = {
    name: string
    src: string
}

const Contact: FC = () => {
    const imgList: imgsDTO[] = [
        {
            name: '微信号',
            src: require('../../assets/weChat.jpg')
        },
        {
            name: '公众号',
            src: require('../../assets/gzh.jpg')
        }
    ]

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
                        如有商业合作可以添加以下联系方式，扫描或长按识别下方微信二维码。
                    </View>

                    <View className='at-article__p'>
                        有兴趣的朋友也可以关注公众号，扫描或长按识别下方公众号二维码，查看前端相关技术栈文章。
                    </View>

                    {/* <AtButton className='copyBtn' circle={true} type='primary' onClick={handleCopy}>一键复制微信号</AtButton> */}

                    {
                        imgList.map((item: imgsDTO) => {
                            return (
                                <>
                                    <View className='at-article__p'>
                                        <Text className="title">{item.name}</Text>
                                    </View>

                                    <Image
                                        showMenuByLongpress={true}
                                        className='at-article__img'
                                        src={item.src}
                                        mode='widthFix' />
                                </>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default Contact