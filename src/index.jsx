import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}
window.onresize = function () {
    document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
};
document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
window.alert('加载0000')
if(GetQueryString('preload')!="1"){
    window.alert('非预加载')
    ReactDOM.render(<App/>, document.getElementById('app'))
}else{
    window.onloadViewData=function(data){
    window.alert('预加载')
    //import appRootComponent from "./routers";
    ReactDOM.render(<App/>, document.getElementById('app'))
    }
}
