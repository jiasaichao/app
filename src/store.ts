/// <reference path="../typings/browser.d.ts" />
import {createStore,applyMiddleware } from "redux"
import { routerMiddleware, push } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk';
var defaultState = {
    sidebar: {
        active: 1,
        parent: [
            {
                id: 1, title: '用户界面功能', open: true
            },
            {
                id: 2, title: '首页2'
            },
            {
                id: 3, title: '首页3'
            }
        ],
        child: [
            {
                id: 1, pid: 1, title: '按钮', href: ''
            },
            {
                id: 2, pid: 1, title: '一般', href: '#/index/general'
            },
            {
                id: 3, pid: 1, title: '表格', href: '#/index/table'
            },
            {
                id: 4, pid: 2, title: '一般', href: '#/index/general'
            },
            {
                id: 5, pid: 2, title: '表格', href: '#/index/table'
            },
            {
                id: 6, pid: 2, title: '一般', href: '#/index/general'
            },
            {
                id: 7, pid: 3, title: '表格', href: '#/index/table'
            },
            {
                id: 8, pid: 3, title: '一般', href: '#/index/general'
            },
            {
                id: 9, pid: 3, title: '表格', href: '#/index/table'
            }
        ]
    }
};
const middleware = routerMiddleware(browserHistory)
//监听全局数据
import indexReducer from './reducers/index';
let store = createStore(
    (state, action) => {
        /*没有直接放indexReducer是因为这里可以增加其他需要执行的函数，增加扩展性 */
        let nextState=indexReducer(state,action);
        /*这里可以再次处理nextState*/
       return nextState;
    },
    applyMiddleware(thunkMiddleware,middleware));
export {store}