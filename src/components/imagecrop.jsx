import { Common, Global } from '../utils/common';
import { Icon, Placeholder, Gesture } from './index';
import * as React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * 页面容器
 * show
 * onCancel
 * src
 * onOk(blob)可以用URL.createObjectURL(blob)生成地址
 */
export class ImageCrop extends React.Component {
    constructor(props) {
        super(props)
        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;
        this.targetX = null;
        this.targetY = null;
        this.state = {
            isLoad: true
        };
    }
    load = () => {
        let img = new Image()
        img.onload = () => {
            this.setState({ isLoad: false });
            this.width = img.width;
            this.height = img.height;

            let state = {};
            //w<h宽小于高,以宽为基准
            if (this.width < this.height) {
                state.width = document.body.clientWidth;
                state.height = this.height * (document.body.clientWidth / this.width);
                state.top = document.body.clientHeight / 2 - state.height / 2
                state.left = 0;
            } else {
                state.height = document.body.clientWidth;
                state.width = this.width * (document.body.clientWidth / this.height);
                state.top = (document.body.clientHeight - document.body.clientWidth) / 2;
                state.left = -(state.width - document.body.clientWidth) / 2;
            }
            this.setState(state);
        }
        img.src = this.props.src;
    }
    _minLeft = (nextWidth = this.state.width) => {
        return -(nextWidth - document.body.clientWidth);
    }
    _maxLeft = () => {
        return 0;
    }
    _minTop = (nextHeight = this.state.height) => {
        return -(nextHeight - (document.body.clientHeight - document.body.clientWidth) / 2 - document.body.clientWidth);
    }
    _maxTop = () => {
        return (document.body.clientHeight - document.body.clientWidth) / 2;
    }
    _offsetX = () => {
        return this.clientX - this.startX + this.targetX;
    }
    _offsetY = () => {
        return this.clientY - this.startY + this.targetY;
    }
    _touchStart = (e) => {
        if (e.touches.length == 1) {
            this.isMove = true;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.targetX = this.state.left;
            this.targetY = this.state.top;
        }
        else {
            this.isMove = false;
        }
    }
    _touchMove = (e) => {
        if (this.props.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.isMove) {
            this.clientX = e.touches[0].clientX;
            this.clientY = e.touches[0].clientY;
            let setState = {};
            if (this._offsetX() > this._minLeft() && this._offsetX() < this._maxLeft()) {
                setState.left = this._offsetX()
            }
            if (this._offsetY() > this._minTop() && this._offsetY() < this._maxTop()) {
                setState.top = this._offsetY()
            }
            this.setState(setState);
        }

    }
    _touchEnd = (e) => {
    }
    _onPinch = (pinch) => {
        let setState = {};
        setState.width = this.width * pinch.scale;
        setState.height = this.height * pinch.scale;

        let addLeft = (setState.width - this.state.width) / 2;
        setState.left = this.state.left - addLeft;
        if (setState.left > this._maxLeft()) {
            setState.left = this._maxLeft();
        }
        if (setState.left < this._minLeft(setState.width)) {
            setState.left = this._minLeft(setState.width);
        }

        let addTop = (setState.height - this.state.height) / 2;
        setState.top = this.state.left - addTop;
        if (setState.top > this._maxTop()) {
            setState.top = this._maxTop();
        }
        if (setState.top < this._minTop(setState.height)) {
            setState.top = this._minTop(setState.height);
        }
        this.setState(setState);
    }
    ddd = () => {
        let img = document.getElementById("img");
        let crop_canvas;

        crop_canvas = document.createElement('canvas');
        let scale = this.width / this.state.width;
        crop_canvas.width = document.body.clientWidth * scale;
        crop_canvas.height = document.body.clientWidth * scale;
        //alert('1:'+(-this.state.left * scale)+',2:'+ ((-this.state.top + (document.body.clientHeight - document.body.clientWidth) / 2) * scale)+',3:'+ document.body.clientWidth * scale, document.body.clientWidth * scale+',4:'+  0+',5:'+ 0+',6:'+  document.body.clientWidth * scale, document.body.clientWidth * scale)
        //console.log('left:', -this.state.left, 'top:', this.state.top-(document.body.clientHeight - document.body.clientWidth) / 2, '3', document.body.clientWidth, '5', this.state.width, '6', this.state.height);
        //console.log(img, -this.state.left * scale, (this.state.top - (document.body.clientHeight - document.body.clientWidth) / 2) * scale, document.body.clientWidth * scale, document.body.clientWidth * scale, 0, 0, document.body.clientWidth * scale, document.body.clientWidth * scale);
        crop_canvas.getContext('2d').drawImage(img, -this.state.left * scale, (-this.state.top + (document.body.clientHeight - document.body.clientWidth) / 2) * scale, document.body.clientWidth * scale, document.body.clientWidth * scale, 0, 0, document.body.clientWidth * scale, document.body.clientWidth * scale);
        //手机端不支持
        // crop_canvas.toBlob((blob) => {
        //     this.props.onOk(blob);
        // });
        //alert(crop_canvas.toDataURL("image/png"));
        this.props.onOk(crop_canvas.toDataURL("image/png"));
        //window.open(crop_canvas.toDataURL("image/png"));
    }
    render() {
        if (this.state.isLoad) {
            return null;
        }
        let styles = {
            root: SL.create({ background: '#000', top: 0, bottom: 0, width: '100%', position: 'absolute', zIndex: 9999 }).merge(this.props.style),
            container: {},
            mask: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flexDirection: 'column',
                display: 'flex',
                zIndex: '5'
            },
            maskTop: {
                flex: '1',
                background: '#000',
                opacity: 0.4
            },
            maskCenter: {
                height: '7.5rem',
                background: '#000',
                opacity: 0
            },
            imgContainer: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center'
            }
        }
        let pinch = {};
        if (this.width < this.height) {
            pinch.minScale = document.body.clientWidth / this.width;
            pinch.maxScale = this.width / document.body.clientWidth;
        } else {
            pinch.minScale = document.body.clientWidth / this.height;
            pinch.maxScale = this.height / document.body.clientWidth;
        }
        return (
            <div style={styles.root.o}>
                <div style={styles.mask} >
                    <div style={styles.maskTop}></div>
                    <div style={{ height: 1, background: '#fff', opacity: .5 }}></div>
                    <Gesture.Touchable preventDefault={true} pinch={pinch} onPinch={this._onPinch} style={styles.maskCenter} onTouchStart={this._touchStart} onTouchMove={this._touchMove} onTouchEnd={this._touchEnd}></Gesture.Touchable>
                    <div style={{ height: 1, background: '#fff', opacity: .5 }}></div>
                    <div style={styles.maskTop}></div>
                </div>
                <div style={styles.imgContainer}>
                    <img id='img' style={{ width: this.state.width, position: 'absolute', top: this.state.top, left: this.state.left, transform: `scale(${this.state.scale})` }} src={this.props.src} />
                </div>
                <div style={{ position: 'absolute', display: 'flex', bottom: '0', zIndex: 1000, color: '#fff' }}>
                    <Gesture.Touchable onTap={this.props.onCancel}>取消</Gesture.Touchable>
                    <Gesture.Touchable onTap={this.ddd}>完成1</Gesture.Touchable>
                </div>
            </div>)
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.load()
    }
}