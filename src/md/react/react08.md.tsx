// React Hooks 主要解决了什么
const react08 = `
### 1、‌状态逻辑复用困难

在Hooks出现之前，React组件间的状态逻辑复用主要依赖\`高阶组件（HOC）\`和 \`render props\`。
\`Hooks\` 通过允许创建自定义Hook，使得状态逻辑的复用变得简单而直接‌

> 缺点

- HOC 可能导致 props 命名冲突
- render props 则可能导致组件树嵌套过深，使得代码难以阅读和维护


> **HOC 以组件作为参数并返回一个新组件的函数**
\`\`\`js
// 高阶组件
import React from 'react';

const withExtraProp = (WrappedComponent) => {
    const HOC = (props) => <WrappedComponent {...props} extraProp="extraValue" />;
    return HOC;
};

// 使用高阶组件
const MyComponent = (props) => (
<div>
    <p>My Component</p>
    <p>{props.extraProp}</p>
</div>
);

export default withExtraProp(MyComponent);
\`\`\`

### 2、复杂组件难以理解

类组件中，特别是当组件包含多个生命周期方法时，代码逻辑可能会分散在各个生命周期方法中，导致同一块功能的代码被拆分到了不同的地方

### 3、‌副作用的管理‌

- 在类组件中，副作用（如数据获取、订阅事件等）通常需要在生命周期方法中进行管理

- Hooks 提供了 \`useEffect\` 等API

### 4、性能优化

- 类组件中，为了避免不必要的渲染，需要使用\`shouldComponentUpdate\` 或 \`PureComponent\`
- Hooks中，memo 来优化函数组件的渲染性能，避免不必要的重新渲染。


### 拓展

hooks 本质是闭包

Hooks 也保证了它们的 \`状态\`能在多次渲染中保持不变。每次组件函数调用时，React 都会为 Hooks 创建一个新的闭包环境来实现的。
`

export default react08