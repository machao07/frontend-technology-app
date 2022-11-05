// vue中nextTick()原理
const vue05 = `

#### 1. 用nextTick()的原因：
##### [JS运行机制][1]（Event Loop）
**JS执行是单线程的，它是基于事件循环的**

1. 所有同步任务都在主线程上执行，形成一个执行栈。
2. 主线程之外，会存在一个任务队列，只要异步任务有了结果，就在任务队列中放置一个事件。
3. 当执行栈中的所有同步任务执行完后，就会读取任务队列。那些对应的异步任务，会结束等待状态，进入执行栈。
4. 主线程不断重复第三步。

> - 这里主线程的执行过程就是一个\`tick\`，而所有的异步结果都是通过任务队列来调度。
> - \`Event Loop\`分为宏任务和微任务，无论是执行宏任务还是微任务，完成后都会进入到一下\`tick\`，并在两个tick之间进行UI渲染。

##### Vue异步更新队列（数据驱动视图）

> - 由于Vue DOM更新是\`异步执行\`的，即修改数据时，视图不会立即更新，
>- 只要\`监听数据变化\`，Vue 将开启一个队列，并\`缓冲在同一事件循环中\`发生的所有数据变更，在缓冲时会去除重复数据，从而避免不必要的计算和DOM操作。
> - 然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
> - 等同一数据循环中的所有数据变化完成之后，再统一进行视图更新。
> - 为了确保得到更新后的DOM，所以设置了 \`Vue.nextTick()\`方法。

#### 2、什么是nextTick()

**在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。**

> - nextTick主要使用了\`宏任务\`和\`微任务\`
> - Vue 在内部对异步队列尝试使用原生的 \`Promise.then\`、\`MutationObserver\` 和 \`setImmediate\`，如果执行环境不支持，则会采用 \`setTimeout(fn, 0) \`代替。

#### 3、nextTick()用法

- **全局中：** \`Vue.nextTick\`
- **组件中：** \`this.$nextTick\`

\`\`\`html
<span>{{ message }}</span>
\`\`\`

\`\`\`js
data() {
    return {
        message: '未更新'
    }
},
methods: {
    updateMessage: function () {
        this.message = '已更新'
        console.log(this.$el.textContent)  // => '未更新'
        
        this.$nextTick(function () {
            console.log(this.$el.textContent)  // => '已更新'
        })
    }
}
\`\`\`
[1]:https://blog.csdn.net/weixin_43924228/article/details/103706973 "JS运行机制案例博客"

`
export default vue05