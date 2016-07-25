import {combineReducers} from 'redux';
/**
 * 将路由跳转注定到全局
 */
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import sidebar from './sidebarReducer';
import router from './routerReducer';
/**
 * 合并reducers
 */
const index = combineReducers({
  sidebar,
  router,
  routing: routerReducer
})

export default index;