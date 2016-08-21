import {combineReducers} from 'redux';
/**
 * 将路由跳转注定到全局
 */
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import sidebar from './sidebarReducer';
// import router from './routerReducer';
import {ConfigReducer} from './configReducer';
import {CommonReducer} from './commonReducer';
/**
 * 合并reducers
 */
const index = combineReducers({
  //sidebar,
  // router,
  // routing: routerReducer
  common:CommonReducer,
  config:ConfigReducer
})

export default index;