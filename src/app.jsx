import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
    Switch
} from 'react-router-dom'
export default class Index extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <div>hello210 word1
                    </div>
                    <App />
                </div>
            </Router>
        );
    }
}
const App = withRouter(({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/'
    const timeout = { enter: 5000, exit: 5000 }

    return (
        <div>
            <TransitionGroup component="main" className="page-main">
                <CSSTransition key={currentKey} timeout={timeout} classNames="fade" appear>
                    <section className="page-main-inner">
                        <Switch location={location}>
                            <Route path="/" exact component={App1} />
                            <Route path="/about" component={App2} />
                            <Route component={App3} />
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
})
function App1(){
    return <div>11111111111111111111111</div>
}
function App2(){
    return <div>2222222222222222222222</div>
}
function App3(){
    return <div>333333333333333333333</div>
}