import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
window.onresize = function () {
    document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
};
document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");

//import appRootComponent from "./routers";
ReactDOM.render(<App/>, document.getElementById('app'));