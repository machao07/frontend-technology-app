import { Component } from 'react'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

type listDTO = {
    key: string,
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
    url?: string
    thumb?: string
}

interface Props {
    list: listDTO[]
    onClick: (item: any) => any
}

export default class TabBar extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <AtList className="list">
                {
                    this.props.list.map((item) => {
                        return <AtListItem
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