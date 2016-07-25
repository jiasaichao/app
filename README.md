# 说明
## Typescript的使用
1.没有使用typings直接去 https://github.com/DefinitelyTyped/DefinitelyTyped/find/master 下载。   
2.引用 `/// <reference path="../typings/browser.d.ts" />`。
## 文件
* components：组件文件，放置基本组件，也就是[redux](https://leecade.gitbooks.io/redux-in-chinese/content/docs/basics/UsageWithReact.html)中说的“笨拙组件”。   
 * 读取数据：从 props 获取数据。   
 * 修改数据：从 props 调用回调函数。    
 * 除基本的state甚至没有state，所有数据以及状态修改都是通过props，props是containes中的容器组件提供的。
* containers：容器组件，页面级组件，由多个基本组件或容器组件组成也就是[redux](https://leecade.gitbooks.io/redux-in-chinese/content/docs/basics/UsageWithReact.html)中说的“智能”。	
 * 读取数据：从 Redux 获取 state。   
 * 修改数据：向 Redux 发起 actions。
 * 通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux再传递给components。
* utils：帮助类
* typings：typescript的d.ts文件不是使用的typings命令添加的直接复制过来的，用命令的时候老出问题，应该是我家里的网络不好。
* .gitignore：git忽略文件。
* tsconfig.json：编译typescript的配置文件。
* webpack.config.js：webpack配置文件。    

## 架构概要（主要围绕Redux）
### 要点
应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。    
惟一改变 state 的办法是触发 action，一个描述发生什么的对象。   
为了描述 action 如何改变 state 树，你需要编写 reducers。    
### 三大原则
* 单一数据源：整个应用的 state 被储存在一棵 object tree 中，它只有一个单一的 store 。
* State 是只读的：惟一改变 state 的办法就是触发 action，action 是一个描述要发生什么的对象。
* 纯函数的形式来执行修改：为了描述 action 如何改变 state tree ，你需要编写 reducers。  
Reducer 只是一些纯函数，它接收之前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是普通函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来做一些通用任务，如分页器。

## Store
* 维持应用的 state。
* 提供 getState() 方法获取 state。
* 提供 dispatch(action) 方法更新 state。
* 通过 subscribe(listener) 注册监听器。 

## 拆分 Reducer
Redux 提供了 combineReducers() 工具类
每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。
## 状态维护
### 组件自己维护状态：
一些组件之间不交互,比如按钮的移上去变色。如果其他组件要改变组件自己维护的状态而不是redux维护的可以通过事件总线的形式交互。
### redux维护状态，也就是redux提倡的无状态组件：
内容数据，其他组件经常修改的状态。除了组件自己内部维护的状态。
## 插件/库
### lodash
资料：[中文api文档](http://lodash.think2011.net/)  
引用方式：   
`// 直接引用现代版本 var _ = require('lodash');`    
`// 或引用某分类下的所有方法 var array = require('lodash/array');`  
`// 或者引用具体方法 (很适合在 browserify/webpack 中做最小化打包) var chunk = require('lodash/array/chunk');`   
常用  
`_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });// → { 'a': 1, 'b': 2, 'c': 3 }`    
`_.map([1, 2, 3], function(n) { return n * 3; });// → [3, 6, 9]`    
## 路由react-router及react-router-redux
引入react-router后Route中component组件props中加入，location:key,pathname(路径)等、routeParams、params等。     
和路由相关的状态不要放到store里,直接从智能组件的props中读取  
资料[react-ruter-redux](https://github.com/reactjs/react-router-redux)看说明
### 通过事件跳转路由
    import { routerMiddleware, push } from 'react-router-redux'

    // 适用于store的中间件
    const middleware = routerMiddleware(browserHistory)
    const store = createStore(
    reducers,
    applyMiddleware(middleware)
    )

    // 任何地方都能调用
    store.dispatch(push('/foo'))
### 历史记录及其他看说明
## 参考网站
[Redux 官方文档中文翻译](https://leecade.gitbooks.io/redux-in-chinese/content/)     
[React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)    
[阮一峰React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)    
[谈谈 react-router](http://qiutc.me/post/%E8%B0%88%E8%B0%88-react-router.html)    
[react-router api文档](https://github.com/reactjs/react-router/blob/master/docs/API.md)
[使用Typescript编写Redux+Reactjs应用程序](https://github.com/xuanye/typescript-redux-sample)    
[React with TypeScript](http://blog.csdn.net/kinfey/article/details/50387534)   