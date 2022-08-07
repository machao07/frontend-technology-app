import { View, Text } from '@tarojs/components'
import { Component } from 'react'
import TabBar from '../../components/tarBar'
import { AtTabs, AtTabsPane } from 'taro-ui'
// @ts-ignore
import * as echarts from "../../ec-canvas/echarts";
import './index.scss'

function getLineChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Vue', 'React', 'Angular']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jul 3', 'Jul 10', 'Jul 17', 'Jul 24', 'Jul 31',]
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                rotate: 30
            }
        },
        series: [
            {
                name: 'Vue',
                type: 'line',
                data: [3368044, 3345639, 2861325, 3314171, 3171489]
            },
            {
                name: 'React',
                type: 'line',
                data: [14523799, 15420684, 13444250, 15781657, 15102270]
            },
            {
                name: 'Angular',
                type: 'line',
                data: [509874, 522777, 466688, 515245, 516269]
            },
        ]
    }
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

    var option = {
        tooltip: {
            show: true
        },
        legend: {
            top: 'bottom'
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [35, 110],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 56.7, name: 'Vue' },
                    { value: 36.4, name: 'Angular' },
                    { value: 72.5, name: 'React' }
                ]
            }
        ]
    }
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

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Express', 'Koa', 'Mysql']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jul 3', 'Jul 10', 'Jul 17', 'Jul 24', 'Jul 31',]
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                rotate: 30
            }
        },
        series: [
            {
                name: 'Express',
                type: 'bar',
                data: [1164582, 23814867, 20821804, 24959497, 25038235]
            },
            {
                name: 'Koa',
                type: 'bar',
                data: [1209957, 1303051, 1156994, 1298462, 1370593]
            },
            {
                name: 'Mysql',
                type: 'bar',
                data: [895478, 852151, 722522, 859523, 854581]
            },
        ]
    }
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
        const {ecLine, ecBar, ecPie } = this.state
        return (
            <View className="statistics">
                <AtTabs
                    className="tabBox"
                    current={this.state.current}
                    tabList={[
                        { title: '前端框架' },
                        { title: '前端生态圈' }
                    ]}
                    onClick={this.handleClick.bind(this)}>
                    <View className="main">
                        <AtTabsPane current={this.state.current} index={0}>
                            <Text className="eChartTitle">前端框架NPM下载量/月（2022）</Text>
                            <View className="canvas bar" style={{ margin: '30px 0' }}>
                                <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec={ecLine}></ec-canvas>
                            </View>

                            <Text className="eChartTitle">框架权重比较（%）</Text>
                            <View className="canvas pie">
                                <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" ec={ecPie}></ec-canvas>
                            </View>
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