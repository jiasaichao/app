
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * 页面容器 
 * style
 * */
export class Page extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({background:'#fff'}).merge(this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
}
Page.displayName = 'Container.Page';
Page.propTypes = {
    style: React.PropTypes.object,
};
Page.propInfo = {
    style: '样式',
}
/**
 * 使用场景描述
 */
Page.scene='页面容器，此组件设置了，绝对定位0,0,0,0和背景色#FFF'
Page.defaultProps = {
}


/**
 * 内容容器
 * 
 */
export class Content extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({overflowY:'auto',WebkitOverflowScrolling:'touch'},this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
}
Content.displayName = 'Container.Content';
Content.propTypes = {
    style: React.PropTypes.object,
};
Content.propInfo = {
    style: '样式',
}
/**
 * 使用场景描述
 */
Content.scene='此组件设置了，绝对定位0,0,0,0和y轴的滚动。'
Content.defaultProps = {
}