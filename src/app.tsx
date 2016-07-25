/// <reference path="../typings/browser.d.ts" />
import {bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
//import { AppFooter} from './components/index';
import {hashHistory} from 'react-router';
//import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }
    render() {
        const {children} = this.props;
        return (
            <div style={{ height: '100%' }}>{this.props.children}</div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
        
    }
}

export default connect(mapStateToProps)(App);




