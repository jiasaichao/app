
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from "./app";
import Index from "./containers/index";
import ListPage from "./containers/list";
import FormPage from "./containers/form";
import NotFound from "./containers/notFound";


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
            </Route>
            {/*404, <NotFoundRoute handler={CourseRouteNotFound} /> NotFoundRoute这个好像也行*/}
            <Route path="*" component={NotFound}></Route>
             </Router>
        </Provider>
)
export default appRootComponent;
