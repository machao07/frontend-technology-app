export const lineOptions = {
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

export const pieOptions = {
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

export const barOptions = {
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