
/**手势gesture*/
import React, { Component } from 'react';
import { Common, Global } from "../utils/common";
import { Flex } from './layout'
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
 * pinch:{
 * maxScale:[number],minScale:[number]
 * }
 * 
 * preventDefault
 * stopPropagation
 * */
export class TouchableBase extends Component {
    constructor(props) {
        super(props)
        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;

        this.previousPinchScale = 1;

        this.events = new Set();
        this.state = {
            //选中状态，如果classBase为"none"则不动
            tapActive: false
        }
    }
    /** 勾股定理计算距离*/
    _getDistance(xLen: number, yLen: number) {
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
        let props = {
            onTouchStart: this.touchStart,
            onMouseDown: this.mouseDown,
            onMouseUp: this.mouseUp,
            onMouseMove: this.mouseMove,
            onTouchMove: this.touchMove,
            onTouchEnd: this.touchEnd
        }
        if (this.props.flex) {
            return (
                <Flex className={className} column={this.props.column} flex1={this.props.flex1} horizontal={this.props.horizontal}
                    HW={this.props.HW} style={this.props.style} vertical={this.props.vertical} other={props}>
                    {this.props.children}
                </Flex>
            )
        } else {
            return (
                <div style={styles.root.o} className={className} {...props}>
                    {this.props.children}
                </div>
            );
        }

    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    /**
     * 执行系统事件，有的时候需要加入系统的非自定义的事件
     * 有这个事件则执行没有则忽略
     */
    _emitEvent(eventType, e) {
        let eventHandler = this.props[eventType];
        if (!eventHandler) return;
        eventHandler(e);
    }
    mouseDown = (e) => {
        if (Global.Device.IsMobile) return;
        this.start(e);
    }
    mouseMove = (e) => {
        if (Global.Device.IsMobile) return;
        this.move(e);
    }
    mouseUp = (e) => {
        if (Global.Device.IsMobile) return;
        this.end(e);
    }
    touchStart = (e) => {
        if (!Global.Device.IsMobile) return;
        this.start(e);
    }
    touchMove = (e) => {
        if (!Global.Device.IsMobile) return;
        this.move(e);
    }
    touchEnd = (e) => {
        if (!Global.Device.IsMobile) return;
        this.end(e);
    }
    start = (e) => {
        this._emitEvent("onTouchStart", e);
        if (e.touches && e.touches.length > 1) {
            let point1 = e.touches[0];
            let point2 = e.touches[1];
            let xLen = Math.abs(point2.pageX - point1.pageX);
            let yLen = Math.abs(point2.pageY - point1.pageY);
            this.touchDistance = this._getDistance(xLen, yLen);


            this.events.clear();
            this.setState({ tapActive: false });

            this.events.add('onPinchEnd');
        } else {
            if (e.touches) {
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
            }
            else {
                this.startX = e.clientX;
                this.startY = e.clientY;
            }


            this.events.add('onTap');
            this.showTapActive();
        }
    }
    showTapActive = () => {
        if (this.props.classBase !== 'none') {
            this.setState({ tapActive: true });
        }
    }
    move = (e) => {
        this._emitEvent("onTouchMove", e);
        if (this.props.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.touches && e.touches.length > 1) {
            let xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
            let yLen = Math.abs(e.touches[1].pageY - e.touches[1].pageY);
            let touchDistance = this._getDistance(xLen, yLen);
            if (this.touchDistance) {
                let pinchScale = touchDistance / this.touchDistance;
                //this.scale = pinchScale + this.previousPinchScale - 1;
                this.scale = pinchScale * this.previousPinchScale;
                if (this.props.pinch.maxScale < this.scale) {
                    this._emitEvent('onPinch', { scale: this.props.pinch.maxScale, distance: touchDistance });
                }
                if (this.props.pinch.minScale > this.scale) {
                    this._emitEvent('onPinch', { scale: this.props.pinch.minScale, distance: touchDistance });
                }
                if (this.props.pinch.maxScale > this.scale && this.scale > this.props.pinch.minScale) {
                    this._emitEvent('onPinch', { scale: this.scale, distance: touchDistance });
                }

                //this.previousPinchScale = pinchScale;
            }
        } else {
            if (e.touches) {
                this.clientX = e.touches[0].clientX;
                this.clientY = e.touches[0].clientY;
            }
            else {
                this.clientX = e.clientX;
                this.clientY = e.clientY;
            }
            if ((Math.abs(this._offsetX()) > this.props.tapLength || Math.abs(this._offsetY()) > this.props.tapLength) && this.state.tapActive) {
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
    end = (e) => {
        this._emitEvent("onTouchEnd", e);
        this.events.forEach((v) => {
            this._emitEvent(v, e)
        });
        this.events.clear();

        if (this.scale) {
            if (this.props.pinch.maxScale > this.scale && this.scale > this.props.pinch.minScale) {
                this.previousPinchScale = this.scale;
            }
        }


        this.setState({ tapActive: false });
    }
}
TouchableBase.defaultProps = {
    classBase: 'Tappable',
    tapLength: 20,
    swiperLength: 40,
    pinch: {
        maxScale: 10000,
        minScale: 0.001
    }
}

export function Touchable({ style, className, classBase, children, push }) {
    let props = {};
    if (style) {
        props.style = style;
    }
    if (className) {
        props.className = className;
    }
    if (classBase) {
        props.classBase = classBase;
    }
    if (push) {
        props.push = push;
    }
    return (
        <TouchableBase {...props} >
            {children}
        </TouchableBase>
    );
}
export function TouchableFlex({ children, className = '', style, column, horizontal, vertical, HW, flex1, other, onTap, classBase, push }:
    {
/***/className: string,
/***/style: React.CSSProperties,
/**是否为垂直排列，加上这个属性为垂直排列*/column: boolean,
/**水平居中对齐*/horizontal: boolean,
/**垂直居中对齐*/vertical: boolean,
/**水平和垂直都居中对齐*/HW: boolean,
/**flex-grow为1，就是放大倍数为1*/flex1: boolean,
        onTap: () => {},
        classBase: string,
        push: string
    }) {
    let props = {};
    if (onTap) {
        props.onTap = onTap;
    }
    if (style) {
        props.style = style;
    }
    if (className) {
        props.className = className;
    }
    if (classBase) {
        props.classBase = classBase;
    }
    if (push) {
        props.push = push;
    }
    if (classBase) {
        props.classBase = classBase;
    }
    if (column) {
        props.column = column;
    }
    if (horizontal) {
        props.horizontal = horizontal;
    }
    if (vertical) {
        props.vertical = vertical;
    }
    if (HW) {
        props.HW = HW;
    }
    if (flex1) {
        props.flex1 = flex1;
    }
    return (
        <TouchableBase {...props} flex>
            {children}
        </TouchableBase>
    );
}