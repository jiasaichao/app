/// <reference path="../typings/browser.d.ts" />
import {bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
//import { AppFooter} from './components/index';
import {hashHistory} from 'react-router';
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as React from 'react';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }
    render() {
         const action = this.props.location.action;
        let transitionName = 'page';
        // REPLEASE
        if (action === 'PUSH') {
            transitionName = 'page-r2l';
        } else if (action === 'POP') {
            transitionName = 'page-l2r';
        }
        return (
            <ReactCSSTransitionGroup
                transitionName={transitionName}
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={2000}
            >
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </ReactCSSTransitionGroup>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        state
        
    }
}

export default connect(mapStateToProps)(App);




