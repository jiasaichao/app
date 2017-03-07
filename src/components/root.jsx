import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, NavBar,Dialog } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import React, { Component } from 'react';
let SL = Global.styles;
let CN = Global.className;
import { store } from '../../src/store';


/**
 * 应用程序的根
 * style
 * 
 * */
export class Root extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({ background: '#fff' }).merge(this.props.style)
        }
        console.log(store);
        return (
            <Provider store={store}>
               <div style={styles.root.o}>
                    <Dialog.Modal/>
                    {this.props.children}
                </div>
            </Provider>

        );
    }
}
Root.displayName = 'Root';
Root.propTypes = {
    style: React.PropTypes.object,
};
Root.propInfo = {
    style: '样式',
}
/**
 * 使用场景描述
 */
Root.scene = '页面容器，此组件设置了绝对定位0,0,0,0和背景色#FFF'
Root.defaultProps = {
}