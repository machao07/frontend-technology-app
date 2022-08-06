import { Component } from 'react'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

type listDTO = {
    key: string,
    isArrow: boolean
    arrow: "right" | "up" | "down" | undefined
    title: string
    url?: string
}

interface Props {
    className?: string
    list: listDTO[]
    onClick: (item: any) => any
}

export default class TabBar extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <AtList className="list">
                {
                    this.props.list.map((item) => {
                        return <AtListItem
                            className={this.props.className}
                            key={item.key}
                            arrow={item.arrow}
                            title={item.title}
                            onClick={() => this.props.onClick(item)}
                        />
                    })
                }
            </AtList>
        )
    }
}