import React from 'react';
import ReactDOM from 'react-dom';
// 引入 react-hot-loader 提供的容器
import { AppContainer } from 'react-hot-loader';

import Index from './containers'

window.onresize = function () {
    document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
};
document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};
render(Index);

// 配置需要热模块替换的条件
if (module.hot && process.env.NODE_ENV !== 'production') {
    // 处理对特定依赖的更改
    module.hot.accept('./containers', (err) => {
        if (err) {
            console.log(err);
        }
        // 从DOM 中移除已经挂载的 React 组件 然后重装
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
        render(Index);
    });
}