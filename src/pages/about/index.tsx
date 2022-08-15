import { View, Image } from '@tarojs/components'
import { FC } from 'react'
import { AtTimeline } from 'taro-ui'
import './index.scss'

const AboutUs: FC = () => {

    const article = [
        'You got a dream, you gotta protect it. -- Will Smith',
        '你瞧这些白云，聚了又散，散了又聚，人生离合，亦复如斯。',
        "I'm not perfect, but you should have waited.I was worth it!",
        '很惭愧，只做了一点微小的工作。'
    ]
    return (
        <View className='at-article'>
            <View className='at-article__h1'>
                关于我们
            </View>
            <View className='at-article__info'>
                2022-08-06&nbsp;&nbsp;&nbsp;马超
            </View>
            <View className='at-article__content'>
                <View className='at-article__section'>
                    <View className='at-article__h2'>路漫漫其修远兮，吾将上下而求索！</View>

                    <AtTimeline
                        className='timeLine'
                        items={[
                            { title: '技术栈、项目经验、生活分享，商业项目合作' },
                            { title: '涉及领域：微信公众号、微信小程序、运营管理系统、官方网站等' },
                            { title: '涉猎技术栈：Vue、React、Taro、ES6+、TS、Element、AntD、Vant、ECharts等' },
                        ]}
                    />

                    {
                        article.map((item) => {
                            return <View className='at-article__p'>{item}</View>
                        })
                    }

                    <Image
                        showMenuByLongpress={true}
                        className='at-article__img'
                        src={require('../../assets/sky.jpg')}
                        mode='widthFix' />

                </View>
            </View>
        </View>
    )
}

export default AboutUs