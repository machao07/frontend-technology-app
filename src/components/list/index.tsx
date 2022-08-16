import { Component } from 'react'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

type listDTO = {
    key: string
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
    url?: string
    thumb?: string
    top?: number
}

interface Props {
    list: listDTO[]
    onClick: (item: listDTO) => void
}

export default class TabBar extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <AtList className="list">
                {
                    this.props.list.map((item: listDTO) => {
                        return <AtListItem
                            className={item.top ? 'itemMr' : 'item'}
                            key={item.key}
                            arrow={item.arrow}
                            title={item.title}
                            thumb={item.thumb}
                            onClick={() => this.props.onClick(item)}
                        />
                    })
                }
            </AtList>
        )
    }
}