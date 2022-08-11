import { View, Text, ScrollView } from '@tarojs/components'
import { Component } from 'react'
import TabBar from '../../components/tarBar'
import { AtTabs, AtTabsPane } from 'taro-ui'
// @ts-ignore
import * as echarts from "../../ec-canvas/echarts";
import './index.scss'
import Taro from '@tarojs/taro';
import { lineOptions, barOptions, pieOptions } from './options'

function getLineChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);

    var option = lineOptions;
    chart.setOption(option);
    return chart;
}

function getPieChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);

    var option = pieOptions;
    chart.setOption(option);
    return chart;
}

function getBarChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);

    var option = barOptions;
    chart.setOption(option);
    return chart;
}

interface States {
    current: number
    ecLine: any
    ecBar: any
    ecPie: any
}
export default class Statistics extends Component<any, States> {
    constructor(props: any) {
        super(props)
        this.state = {
            current: 0,
            ecLine: {
                onInit: getLineChart
            },
            ecPie: {
                onInit: getPieChart
            },
            ecBar: {
                onInit: getBarChart
            }
        }
    }

    handleClick(value) {
        this.setState({
            current: value
        })
    }

    render() {
        const { ecLine, ecBar, ecPie } = this.state
        const { windowHeight } = Taro.getSystemInfoSync()
        const scrollHeight = (windowHeight * windowHeight / 750 - 140)
        const scrollStyle = {
            height: scrollHeight + 'px',
        }
        return (
            <View className="statistics">
                <AtTabs
                    current={this.state.current}
                    tabList={[
                        { title: '前端框架' },
                        { title: '前端生态圈' }
                    ]}
                    onClick={this.handleClick.bind(this)}>
                    <View className="main">
                        <AtTabsPane current={this.state.current} index={0}>
                            <ScrollView
                                scrollY
                                enhanced={true}
                                show-scrollbar={false}
                                scrollWithAnimation={true}
                                enable-back-to-top={true}
                                style={scrollStyle}
                            >
                                <Text className="eChartTitle">前端框架NPM下载量/月（2022）</Text>
                                <View className="canvas bar" style={{ margin: '30px 0' }}>
                                    <ec-canvas id="mychart-dom-line" canvas-id="mychart-line" ec={ecLine}></ec-canvas>
                                </View>

                                <Text className="eChartTitle">框架权重比较（%）</Text>
                                <View className="canvas pie">
                                    <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" ec={ecPie}></ec-canvas>
                                </View>
                            </ScrollView>
                        </AtTabsPane>

                        <AtTabsPane current={this.state.current} index={1}>
                            <Text className="eChartTitle">服务端框架NPM下载量/月（2022）</Text>
                            <View className="canvas bar" style={{ margin: '30px 0' }}>
                                <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec={ecBar}></ec-canvas>
                            </View>
                        </AtTabsPane>
                    </View>
                </AtTabs>
                <TabBar currentIndex={1} />
            </View>
        )
    }
}