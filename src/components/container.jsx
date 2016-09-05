
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import Tappable from 'react-tappable';
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
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({overflowY:'scroll',WebkitOverflowScrolling:'touch'},this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
}