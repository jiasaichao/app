import { NavBar, List, Container, Button, Icon, Animate, Gesture } from "../components/index";
import React from 'react';
import { Motion, spring } from 'react-motion';
class TestPage extends React.Component {
    constructor(props) {
        super(props)

        this.width = 1920;
        this.height = 1080;

        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;
        this.targetX = null;
        this.targetY = null;
        this.state = {
        }
        //w<h宽小于高,以宽为基准
        if (this.width < this.height) {
            this.state.width = document.body.clientWidth;
            this.state.height = this.height * (document.body.clientWidth / this.width);
            this.state.top = document.body.clientHeight / 2 - this.state.height / 2
            this.state.left = 0;
        } else {
            this.state.height = document.body.clientWidth;
            this.state.width = this.width * (document.body.clientWidth / this.height);
            this.state.top = (document.body.clientHeight - document.body.clientWidth) / 2;
            this.state.left = -(this.state.width - document.body.clientWidth) / 2;
        }
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
        let scale=this.width/this.state.width;
        console.log(scale);
        crop_canvas.width = document.body.clientWidth*scale;
        crop_canvas.height = document.body.clientWidth*scale;
        //console.log('left:', -this.state.left, 'top:', this.state.top-(document.body.clientHeight - document.body.clientWidth) / 2, '3', document.body.clientWidth, '5', this.state.width, '6', this.state.height);
        console.log(img, -this.state.left*scale, (this.state.top-(document.body.clientHeight - document.body.clientWidth) / 2)*scale, document.body.clientWidth*scale, document.body.clientWidth*scale, 0, 0, document.body.clientWidth*scale, document.body.clientWidth*scale);
        crop_canvas.getContext('2d').drawImage(img, -this.state.left*scale, (this.state.top-(document.body.clientHeight - document.body.clientWidth) / 2)*scale, document.body.clientWidth*scale, document.body.clientWidth*scale, 0, 0, document.body.clientWidth*scale, document.body.clientWidth*scale);
     
        window.open(crop_canvas.toDataURL("image/png"));
    }
    render() {
        let pinch = {};
        if (this.width < this.height) {
            pinch.minScale = document.body.clientWidth / this.width;
            pinch.maxScale = this.width / document.body.clientWidth;
        } else {
            pinch.minScale = document.body.clientWidth / this.height;
            pinch.maxScale = this.height / document.body.clientWidth;
        }
        return (
            <div style={{ background: '#000', height: '100%', width: '100%', position: 'absolute',zIndex:9999 }}>
                <div style={styles.mask} >
                    <div style={styles.maskTop}></div>
                    <div style={{ height: 1, background: '#fff', opacity: .5 }}></div>
                    <Gesture.Touchable preventDefault={true} pinch={pinch} onPinch={this._onPinch} style={styles.maskCenter} onTouchStart={this._touchStart} onTouchMove={this._touchMove} onTouchEnd={this._touchEnd}></Gesture.Touchable>
                    <div style={{ height: 1, background: '#fff', opacity: .5 }}></div>
                    <div style={styles.maskTop}></div>
                </div>
                <div style={styles.imgContainer}>
                    <img id='img' style={{ width: this.state.width, position: 'absolute', top: this.state.top, left: this.state.left, transform: `scale(${this.state.scale})` }} src='/image/portrait.jpg' />
                </div>
                <div style={{ position: 'absolute', display: 'flex', bottom: '0', zIndex: 1000, color: '#fff' }}>
                    <Gesture.Touchable>取消</Gesture.Touchable>
                    <Gesture.Touchable onTap={this.ddd}>完成1</Gesture.Touchable>
                </div>
            </div>)
    }

    componentDidMount() {
        function drawBeauty(beauty) {
            var canvas = document.getElementById('myCanvas');
            canvas.width = document.body.clientWidth;
            //canvas.height = 400;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(beauty, 0, 0, 600, 400);
        }

        function load() {
            var beauty = new Image();
            beauty.src = "http://pic.4j4j.cn/upload/pic/20130815/31e652fe2d.jpg";
            if (beauty.complete) {
                drawBeauty(beauty);
            } else {
                beauty.onload = function () {
                    drawBeauty(beauty);
                };
                beauty.onerror = function () {
                    window.alert('美女加载失败，请重试');
                };
            }
        }
    }
}
const styles = {
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
export default TestPage;