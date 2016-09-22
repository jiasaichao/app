﻿
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from "./app";
import Index from "./containers/index";
import ListPage from "./containers/list";
import FormPage from "./containers/form";
import DialogPage from "./containers/dialog";
import ListSwipePage from "./containers/listswipe";
import SliderPage from "./containers/slider";
import NineGridPage from "./containers/ninegrid";
import NotFound from "./containers/notFound";
import FullPagePage from "./containers/fullpage";
import TestPage from "./containers/test";
import ScrollPage from "./containers/scroll";


//import Modeules from './controller/index';
//import {BaseStore} from './redux/store/BaseStore';
//import URL_CONFIG from './routersConfig';
//const store = BaseStore();
import {store} from './store';
//const history = syncHistoryWithStore(hashHistory, store);
//store.subscribe(()=>{console.log('改变了')})
let appRootComponent = (
    <Provider store = {store}>
         <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
           <Route path='/list'  component={ListPage}></Route>
           <Route path='/form'  component={FormPage}></Route>
           <Route path='/dialog'  component={DialogPage}></Route>
           <Route path='/listswipe'  component={ListSwipePage}></Route>
           <Route path='/slider'  component={SliderPage}></Route>
           <Route path='/ninegrid'  component={NineGridPage}></Route>
           <Route path='/fullpage'  component={FullPagePage}></Route>
           <Route path='/scroll'  component={ScrollPage}></Route>
           <Route path='/test'  component={TestPage}></Route>
            </Route>
            {/*404, <NotFoundRoute handler={CourseRouteNotFound} /> NotFoundRoute这个好像也行*/}
            <Route path="*" component={NotFound}></Route>
             </Router>
        </Provider>
)
export default appRootComponent;
