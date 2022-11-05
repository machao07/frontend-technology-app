// redux 用法
const react03 = `
### 创建store

- reducer
- appStore 创建store
- dispatch 更新


\`\`\`js
// 引入
import { createStore, Reducer, combineReducers } from 'redux'

export interface AppState {
    todoCount?: number
    toPayCount?: number
}

type AppStateAction = {
    type: "refresh",
    todoCount?: number
    toPayCount?: number
}

const reducer: Reducer<AppState, AppStateAction> = function (state: AppState | undefined, action: AppStateAction) {
    switch (action.type) {
        case 'refresh':
            return {
                todoCount: action.todoCount ?? state?.todoCount,
                toPayCount: action.toPayCount ?? state?.toPayCount
            }
        default:
            return state ?? {};
    }
};

export const appStore = createStore(combineReducers({ appStatus: reducer }))


export class AppActions {
    static refreshTodoNumber() {
        api.bank.processQueryTodoNum(autoToken({}), { businessCheck: false, showLoading: false }).then((res, {isOk}) => {
            if (isOk) {
                appStore.dispatch({
                    type: 'refresh',
                    todoCount: res?.data?.toApprove,
                    toPayCount: res.data?.toPay
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    static todoApproved(todo?: ApproveVo) {
        this.refreshTodoNumber();
    }

    static todoRejected(todo?: ApproveVo) {
        this.refreshTodoNumber();
    }
}
\`\`\`


### 其他文件使用store

\`\`\`js
import { connect } from 'react-redux'

// 更新action 
// 触发action更新reducer，进而更新state
const mapDispatchToProps = (dispatch: Function) => {

    return {
        postRefresh: () => {
            AppActions.refreshTodoNumber();
        }
    }
}

// 更新props，返回一个对象
// key为对应的字段，value为state对应的值
const mapStateToProps = (state: any) => {
    return {
        todoCount: state.appStatus?.todoCount,
        toPayCount: state.appStatus?.toPayCount
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
\`\`\`

### Provider

- 使App的所有子组件都可以获取到 state
- 引入之前导出的 \`appStore\`

\`\`\`js
import { Provider } from 'react-redux'
import { appStore } from '@mds/app-core'
<Provider store={appStore}>
    <App />
</Provider>
\`\`\`

[官方参考文档](https://www.redux.org.cn/docs/basics/UsageWithReact.html)
`

export default react03