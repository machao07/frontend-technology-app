import { FC, useEffect, useState } from 'react'
import { View, WebView } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'

const MyWebView: FC = () => {
    const [hrefURL, setHrefURL] = useState<string>('')

    useEffect(() => {
        const { params } = getCurrentInstance().router ?? {}
        setHrefURL(decodeURIComponent(params?.webUrl ?? ''))
    }, [])

    return (
        <View className='webview' >
            <WebView src={hrefURL} />
        </View>
    )

}
export default MyWebView