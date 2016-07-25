/// <reference path="../typings/browser.d.ts" />
window.onresize = function () {
    document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
};
document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");

import appRootComponent from "./routers";
ReactDOM.render(appRootComponent, document.getElementById('app'));


//interface IAppProps extends React.Props<App1> {
//}
//class App1 extends React.Component<IAppProps, {}>{
//    render() {
//        return (<div style={{ height: '100%' }}>{this.props.children}</div>);
//    }

//}
//ReactDOM.render(<App1></App1>, document.getElementById('app'));