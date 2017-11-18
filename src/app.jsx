import React from 'react';
// import {
//     HashRouter as Router,
//     Route,
//     Link,
//     withRouter,
//     Switch,
//     Redirect
// } from 'react-router-dom';

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
import { Page } from './components/page';
import { Container } from './components/base';
// export default class Index extends React.Component {
//     render() {
//         return (
//             <Router>
//                 <div style={{ height: '100%' }}>
//                     <Route path="/my" exact component={Home} />
//                     <Route path="/about" exact component={App2} />
//                     <Route path="/" exact component={Default} />
//                 </div>
//             </Router>
//         );
//     }
// }
export default class Index extends React.Component {
    render() {
        return <Home/>;
    }
}
function App2() {
    return <div>2222222222222222222222</div>
}
function App3() {
    return <div>333333333333333333333</div>
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}
function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "", value = "";
    url = url.split('#')[0]
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

class Default extends Container {
    constructor(props) {
        super(props);
        window.onloadViewData = (data) => {
            data=parseQueryString(data);
            this.props.history.push(data.path);
        }
    }
    componentDidMount() {
        if (GetQueryString('preload') != "1") {
            window.starttime = new Date().getTime();
            this.props.history.push(GetQueryString('path'));
        }
    }
    render() {
        return <Page>

        </Page>
    }
}