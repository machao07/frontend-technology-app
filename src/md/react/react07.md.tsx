// React 中的 Hooks 
const react07 = `
#### 问题
#### 一、useEffect

\`在渲染后执行\`

调用 useEffect 时就是在告诉 React 在完成对 \`DOM 的更改后运行你的“副作用”函数\`

- 第一个参数 回调函数
- 第二个参数 可选（不传，一个或多个，空数组）
- 如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起

##### 1、不传递参数
- 反复执行

\`\`\`js
useEffect(() => {
    // ...
})
\`\`\`

##### 2、传一个参数

- 监听当前参数更新时执行

\`\`\`js
useEffect(() => {
    // ...
}, [currentDate])
\`\`\`

> 场景问题：
- 当不是路由跳转新页面，而是modal弹框类
- 传 \`id或[]\` 只会在加载当前路由时执行一次，触发modal时不执行

> 解决办法：
- 将当前触发modal \`时间戳\`作为 \`useEffect\`第二个参数


\`\`\`js
const handleEdit = (record: any) => {
    setCurrentDate(new Date().getTime())
    setCurrentCode(record.code)
    setVisible(true)
}
\`\`\`

\`\`\`js
useEffect(() => {
    setInitLoading(true)
    if (currentCode) {
        api.sceneOrgWhiteShow(currentCode)
            .then((res: ResultSceneOrgWhiteVo, { isOk }) => {
                if (isOk) {
                    const data = res.data
                    setSelectData(data?.selectedOrgList ?? [])
                }
            }).finally(() => {
                setInitLoading(false)
            })
    }
}, [currentDate])
\`\`\`

##### 3、传空数组

- 挂载和卸载的时候执行

\`\`\`js
useEffect(() => {
    // ...
}, [])
\`\`\`


#### 二、useMemo

\`在渲染期间执行\`

把“创建”函数和依赖项数组作为参数传入 useMemo，避免不必要的执行渲染，以达到优化性能的目的

- 缓存计算结果的值
- 计算结果是 return 的值

\`\`\`js
import { useMemo } from "react";

const showName = (name) => {
    console.log("Son render");
    return "my name is " + name;
};
return (
    <>
        <div>
            {useMemo(() => {
                console.log("memo");
                showName(props.name);
            }, [props.name])}
        </div>
        <div>{showName(props.name)}</div>
    </>
);
\`\`\`


> - 不用 useMemo，函数会被执行两次 "Son render"
> - 使用后，职位执行一次 "memo"

![image](https://user-images.githubusercontent.com/39411010/221486861-6fddde95-7cda-49ed-a6d1-e565695bac3e.png)


#### 三、useCallback

- 缓存函数
- 任一 \`state\`变化会导致整个组件刷新，一些不需要刷新的函数缓存，减少资源浪费

> 小结:

- \`useMemo\`与 \`useCallback\`都是依赖数据 发生变化, 才会重新计算结果，起到缓存作用
- \`useMemo\` 缓存计算结果的值 \`useCallback\`缓存函数

#### 四、memo

react 中父组件中状态的改变会让所有的子组件重新渲染

memo 缓存子组件，避免不必要的渲染

不是每个组件都需要缓存，缓存需要成本 

\`\`\`js
const [list, setList] = useState([1, 2, 3, 4, 5]);

setList(list.push(1)); 
// 改变的是堆中的数据，存在与栈中的地址不会改变。不能返回新数组，memo是检测不到

setList([...list, 1]); 
// 相当于返回了一个新的数组，栈中的地址就会改变，memo就可以检测到并触发更新
\`\`\`

#### 五、useRef

用于函数组件访问DOM元素或函数组件访问之前渲染变量

***

[Hooks 官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)
`

export default react07