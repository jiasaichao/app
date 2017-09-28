import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    withRouter,
    Switch
} from 'react-router-dom';
import { Home } from './containers/index';
export default class Index extends React.Component {
    render() {
        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={App2} />
                    <Route component={App3} />
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