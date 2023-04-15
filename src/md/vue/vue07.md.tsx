// vue3.0 的性能提升体现
const vue07 = `
## 一、编译阶段
#### 1、diff算法优化

vue3在diff算法中相比vue2增加了\`静态标记\`

静态标记，是为了会发生变化的地方添加一个 \`flag\`标记，下次发生变化的时候直接找该地方进行比较

> 静态类型枚举
> - 1 << 2 表示 1*2的2次方
> - 1 << 3 表示 1*2的3次方

\`\`\`js
export const enum PatchFlags {
    TEXT = 1,// 动态的文本节点
    CLASS = 1 << 1,  // 2 动态的 class
    STYLE = 1 << 2,  // 4 动态的 style
    PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
    FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
    HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
    STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
    KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
    UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
    NEED_PATCH = 1 << 9,   // 512
    DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
    HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
    BAIL = -2 // 一个特殊的标志，指代差异算法
}
\`\`\`

#### 2、静态提升

Vue3中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用

免去了重复的创建节点，优化了运行时候的内存占用

> 没做静态提升之前

\`\`\`js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock(_Fragment, null, [
        _createVNode("span", null, "你好"),
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
    ], 64 /* STABLE_FRAGMENT */))
}
\`\`\`

> 做静态提升后

\`\`\`js
const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "你好", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock(_Fragment, null, [
        _hoisted_1,
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
    ], 64 /* STABLE_FRAGMENT */))
}
\`\`\`

- 静态内容 \`_hoisted_1\` 被放置在render 函数外，每次渲染的时候只要取 \`_hoisted_1\` 即可

- 同时 \`_hoisted_1\` 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用于 Diff


#### 3、事件监听缓存

- 默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化
- 开启了缓存后，没有了静态标记。也就是说下次diff算法的时候直接使用

> 没开启事件监听器缓存
\`\`\`js
export const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock("div", null, [
        _createVNode("button", { onClick: _ctx.onClick }, "点我", 8 /* PROPS */, ["onClick"])   // PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
    ]))
})
\`\`\`

> 开启事件监听器缓存
\`\`\`js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock("div", null, [
        _createVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
        }, "点我")
    ]))
}
\`\`\`

#### SSR优化

当静态内容大到一定量级时候，会用 \`createStaticVNode\`方法在客户端去生成一个static node，这些静态 \`node\`，会被直接 \`innerHtml\`，就不需要创建对象，然后根据对象渲染

## 二、源码体积

相比Vue2，Vue3整体体积变小了，除了移出一些不常用的API，再重要的是Tree shanking

## 三、响应式系统

\`vue2\`中采用 \`defineProperty\`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 \`getter\`和 \`setter\`，实现响应式

\`vue3\`采用 \`proxy\`重写了响应式系统，因为 \`proxy\`可以对整个对象进行监听，所以不需要深度遍历

`
export default vue07