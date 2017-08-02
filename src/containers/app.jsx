import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const App = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/'
    const timeout = { enter: 300, exit: 200 }

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
}
function App1(){
    return <div>11111111111111111111111</div>
}
function App2(){
    return <div>2222222222222222222222</div>
}
function App3(){
    return <div>333333333333333333333</div>
}
export default withRouter(App)