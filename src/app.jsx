import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    withRouter,
    Switch
} from 'react-router-dom';

Number.prototype.map = function (fn) {
    let arr1 = [];
    for (let i = 0; i < this; i++) {
        arr1.push(i)
    }
    return arr1.map(fn);
}
import Toast from 'antd-mobile/lib/toast';
window.info = Toast.info;
//import { Home } from './containers/index';
import { Home } from './containers/my';
export default class Index extends React.Component {
    render() {
        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <Route path="/my" exact component={Home} />
                    <Route path="/about" component={App2} />
                    <Route component={Home} />
                </div>
            </Router>
        );
    }
}
function App2() {
    return <div>2222222222222222222222</div>
}
function App3() {
    return <div>333333333333333333333</div>
}