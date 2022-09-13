// react项目封装省市区选择组件
const react05 = `
### 一、地址选择器组件封装
#### 1、引入antd的Select组件

\`\`\`js
import React, { Component } from "react";
import { Select } from "antd";
import { api } from '../api/modules/services/src/api';

const { Option } = Select;
\`\`\`

#### 2、定义组件Props & States

> - \`onSelectData\` 最后选中后的所有值
> - \`provinceList\` 省的数据
> - \`cityList\` 市的数据
> - \`areaList\` 区的数据

\`\`\`js
interface States {
    onSelectData: string
    provinceList: any[]
    cityList: any[]
    areaList: any[]
}

interface Props {
    range: 'province' | 'city' | 'area' // 地址选择的范围（市/区）
    onSelect: (value: any) => void //通过参数传给父组件选中地址值
}
\`\`\`

#### 3、创建class组件

> 封装思路：
> - 接口先后获取省市区列表数据 \`provinceList、cityList、areaList\`
> - 遍历对应的省市区列表获取对应的**option** \`provinceOptions、cityOptions、areaOptions\`
> - \`onChange事件\` 获取当前**Select组件**选中的地址\`code\`，获取相应的省市区数据，字符串拼接抛出给父组件


\`\`\`js
class AreaSelect extends Component<Props, States>{
    constructor(props: Props) {
        super(props);
        this.state = {
            onSelectData: '',
            provinceList: [],
            cityList: [],
            areaList: []
        }
    }
    componentDidMount() {
        this.getProvinceList()
    }

    /******* 省市区列表获取 start ****/
    getProvinceList() {
        api.codeGetProvinceList().then((res) => {
            this.setState({ provinceList: res.data || [] })
        })
    }

    getCityList(provinceCode: string) {
        api.codeGetCityList(provinceCode).then((res) => {
            this.setState({ cityList: res.data || [] })
        })
    }

    getAreaList(CityCode: string) {
        api.codeGetAreaList(CityCode).then((res) => {
            this.setState({ areaList: res.data || [] })
        })
    }
    /******* 省市区列表获取 end ****/

    /*******  省市区选中值 start *****/
    procinceChange(value: string) {
        this.getCityList(value)
        this.setState({ onSelectData: value })
    }

    cityChange(value: string) {
        const code = this.state.onSelectData + ',' + value;
        this.setState({ onSelectData: code })
        if (this.props.range === 'city') {
            this.props.onSelect(code)
        }
        if(this.props.range === 'area'){
            this.getAreaList(value)
        }
    }

    areaChange(value: string) {
        const code = this.state.onSelectData + ',' + value;
        this.setState({ onSelectData: code })
        this.props.onSelect(code)
    }
    /*******  省市区选中值 end *****/

    render() {
        const { range } = this.props;
        const { provinceList, cityList, areaList } = this.state;
        const provinceOptions = provinceList.map((v) => {
            return <Option key={v.provinceCode} value={v.provinceCode}>{v.provinceName}</Option>
        })

        const cityOptions = cityList.map((v) => {
            return <Option key={v.cityCode} value={v.cityCode}>{v.cityName}</Option>
        })        
        
        const areaOptions = areaList.map((v) => {
            return <Option key={v.areaCode} value={v.areaCode}>{v.areaName}</Option>
        })

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Select onChange={this.procinceChange.bind(this)} placeholder="请选择">
                    {provinceOptions}
                </Select>

                {
                    range === 'city' || range === 'area' ?
                        <Select onChange={this.cityChange.bind(this)} style={{ marginLeft: 5 }} placeholder="请选择">
                            {cityOptions}
                        </Select> : null
                }

                {
                    range === 'area' ?
                        <Select onChange={this.areaChange.bind(this)} style={{ marginLeft: 5 }} placeholder="请选择">
                            {areaOptions}
                        </Select> : null
                }
            </div>
        )
    }
}

export default AreaSelect;
\`\`\`

### 二、父组件使用

#### 1、引入封装的地址选择器组件

\`\`\`js
import AreaSelect from '../../../components/AreaSelect';
\`\`\`

#### 2、表单渲染
> - \`onSelect\` 获取子组件传入的参数
> - 传入地址选择范围 \`range\`
> - \`range\` 地址选择器范围 
> - \`city\`: 省市  \`area\`: 省市区

\`\`\`js
<Form.Item name="branchAddrCode" label="银行账户支行地址" rules={[{ required: true }]}>
    <AreaSelect onSelect={this.onSelect.bind(this)} range='city' />
</Form.Item>
\`\`\`

\`\`\`js
<Form.Item name="corporationAddr" label="企业地址" rules={[{ required: true }]}>
    <AreaSelect onSelect={this.onSelect.bind(this)} range='area' />
</Form.Item>
\`\`\`

#### 3、获取最后选择省市区的code
\`\`\`js
onSelect(value: any) {
    this.form.current.setFieldsValue({
        branchAddrCode: value
    })
    console.log('valueAre===', value); 
    // valueAre=== 32,320100,320115
}

const formValues = this.form.current.getFieldsValue();
const code = formValues.branchAddrCode.split(','); 
// code=== ['32', '320100', '320115']
\`\`\`

### 视图

> 省市

![在这里插入图片描述](https://img-blog.csdnimg.cn/ca9ce4721b8f4eedb33f329fc3a240f9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5oOF6Z2e5b6X5bey5bCP54y_54y_,size_20,color_FFFFFF,t_70,g_se,x_16)


> 省市区

![在这里插入图片描述](https://img-blog.csdnimg.cn/d525531792544f00b63704646a89388c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5oOF6Z2e5b6X5bey5bCP54y_54y_,size_20,color_FFFFFF,t_70,g_se,x_16)
`

export default react05