
/**手势gesture*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Button } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import React from 'react';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**
 * 触摸高亮有onTap事件
 * style
 * onTap
 * onSwipeLeft
 * onSwipeRight
 * onSwipeUp
 * onSwipeDown
 * className
 * classBase:'Tappable'
 * tapLength:20
 * swiperLength:40
 * 
 * 
 * onPinch:({scale[缩放比例],distance[距离]})=>{}
 * onPinchEnd
 * 
 * preventDefault
 * stopPropagation
 * */
export class Touchable extends React.Component {
    constructor(props) {
        super(props)
        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;

        this.previousPinchScale=0;
        
        this.events = new Set();
        this.state = {
            tapActive: false
        }
    }
    /** 勾股定理计算距离*/
    _getDistance(xLen, yLen) {
        return Math.sqrt(xLen * xLen + yLen * yLen);
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
        if (this.props.classBase && this.state.tapActive) {
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
        this._emitEvent("onTouchStart",e);
        if (e.touches.length > 1) {
            let point1 = e.touches[0];
            let point2 = e.touches[1];
            let xLen = Math.abs(point2.pageX - point1.pageX);
            let yLen = Math.abs(point2.pageY - point1.pageY);
            this.touchDistance = this._getDistance(xLen, yLen);

            this.events.clear();
            this.setState({ tapActive: false });

            this.events.add('onPinchEnd');
        } else {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;

            this.events.add('onTap');
            this.setState({ tapActive: true });
        }
    }
    _touchMove = (e) => {
        this._emitEvent("onTouchMove",e);
        if (this.props.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.touches.length > 1) {
            let xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
            let yLen = Math.abs(e.touches[1].pageY - e.touches[1].pageY);
            let touchDistance = this._getDistance(xLen, yLen);
            if (this.touchDistance) {
                let pinchScale = touchDistance / this.touchDistance;
                this._emitEvent('onPinch', { scale: pinchScale+this.previousPinchScale, distance: touchDistance } /**{ scale: pinchScale - this.previousPinchScale } */);
                this.previousPinchScale = pinchScale;
            }
        } else {
            this.clientX = e.touches[0].clientX;
            this.clientY = e.touches[0].clientY;
            if (Math.abs(this._offsetX()) > this.props.tapLength || Math.abs(this._offsetY()) > this.props.tapLength) {
                this.events.delete('onTap');
                this.setState({ tapActive: false });
            }
            // if (this.events.has('onTap')) {
            //     e.preventDefault();
            //      e.stopPropagation();
            // }
            if (this._offsetX() > this.props.swiperLength) {
                this.events.add('onSwipeRight');
            }
            else {
                this.events.delete('onSwipeRight');
            }
            if (this._offsetX() < -this.props.swiperLength) {
                this.events.add('onSwipeLeft');
            }
            else {
                this.events.delete('onSwipeLeft');
            }
            if (this._offsetY() < - this.props.swiperLength) {
                this.events.add('onSwipeUp');
            }
            else {
                this.events.delete('onSwipeUp');
            }
            if (this._offsetY() > this.props.swiperLength) {
                this.events.add('onSwipeDown');
            }
            else {
                this.events.delete('onSwipeDown');
            }
        }

    }
    _touchEnd = (e) => {
        this._emitEvent("onTouchEnd",e);
        this.events.forEach((v) => {
            this._emitEvent(v, e)
        });
        this.events.clear();
        this.setState({ tapActive: false });
    }
}
Touchable.defaultProps = {
    classBase: 'Tappable',
    tapLength: 20,
    swiperLength: 40
}