
/**手势gesture*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Button} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**
 * 触摸高亮有onTap事件
 * style
 * onTap
 * className
 * classBase:'Tappable'
 * */
export class Touchable extends React.Component {
    constructor(props) {
        super(props)
        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;
        this.state = {
            events: new Set()
        }
    }
    _offsetX = () => {
        return this.clientX - this.startX;
    }
    _offsetY = () => {
        return this.clientY - this.startY;
    }
    render() {
         let styles = {
            root: SL.create(SL.noSelect)
        }
        styles.root.merge(this.props.style);
        var className = this.props.className || '';
        if (this.props.classBase && this.state.events.has('onTap')) {
            className += ' ' + this.props.classBase + '-active';
        } else {
            className += ' ' + this.props.classBase + '-inactive';
        }
        return (
            <div style={styles.root.o} className={className} onTouchStart={this._touchStart} onTouchMove={this._touchMove} onTouchEnd={this._touchEnd}>
                {this.props.children}
            </div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    _emitEvent(eventType, e) {
        let eventHandler = this.props[eventType];
        if (!eventHandler) return;
        eventHandler(e);
    }
    _touchStart = (e) => {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.state.events.add('onTap');
        this.setState({ events: this.state.events });
    }
    _touchMove = (e) => {
        this.clientX = e.touches[0].clientX;
        this.clientY = e.touches[0].clientY;
        console.log(this.clientX);
        if (Math.abs(this._offsetX()) > 20 || Math.abs(this._offsetY() > 20)) {
            this.state.events.delete('onTap');
            this.setState({ events: this.state.events });
        }
    }
    _touchEnd = (e) => {
        this.state.events.forEach((v) => {
            this._emitEvent(v, e)
        });
        this.state.events.delete('onTap');
        this.setState({ events: this.state.events });
    }
}
Touchable.defaultProps = {
    classBase: 'Tappable'
}