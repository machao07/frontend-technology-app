// ReactHooks中useEffect使用
const react04 = `
### useEffect

- 第一个参数 回调函数
- 第二个参数 可选（不传，一个或多个，空数组）
- 如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起

#### 1、不传递参数
- 反复执行

\`\`\`js
useEffect(() => {
    // ...
})
\`\`\`

#### 2、传一个参数

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
        api.sceneOrgWhiteShow(currentCode).then((res: ResultSceneOrgWhiteVo, { isOk }) => {
            if (isOk) {
                const data = res.data
                setLogo(data?.logo ?? '')
                setName(data?.name ?? '')
                setData(data?.orgList)
                setSelectData(data?.selectedOrgList ?? [])
                setInitSelect(data?.selectedOrgList)
            }
        }).finally(() => {
            setInitLoading(false)
        })
    }
}, [currentDate])
\`\`\`

#### 3、传空数组

- 挂载和卸载的时候执行

\`\`\`js
useEffect(() => {
    // ...
}, [])
\`\`\`
`

export default react04