import { NavBar, List, Container, Button, Icon, Animate,Gesture } from "../components/index";
import React from 'react';
import { Motion, spring } from 'react-motion';
class TestPage extends React.Component {
    constructor(props) {
        super(props)

        this.startX = null;
        this.startY = null;
        this.clientX = null;
        this.clientY = null;
        this.targetX=null;
        this.targetY=null;
        this.state={
            width:document.body.clientWidth,
            top:document.body.clientHeight/2-210.94/2,
            left:0,
            scale:1,
        }
    }
    _offsetX = () => {
        return this.clientX - this.startX+this.targetX;
    }
    _offsetY = () => {

        return this.clientY - this.startY+this.targetY;
    }
    _touchStart = (e) => {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.targetX=this.state.left;
        this.targetY=this.state.top;
    }
    _touchMove = (e) => {
        if (this.props.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.clientX = e.touches[0].clientX;
        this.clientY = e.touches[0].clientY;
        this.setState({top:this._offsetY(),left:this._offsetX()});
    }
    _touchEnd = (e) => {
    }
    _onPinch=(pinch)=>{
        this.setState({scale:pinch.scale});
    }

    render() {
        return (
            <div style={{background:'#000',height:'100%',width:'100%',position:'absolute'}}>
                <div style={styles.mask} >
                    <div style={styles.maskTop}></div>
                    <div style={{height:1,background:'#fff',opacity:.5}}></div>
                    <Gesture.Touchable preventDefault={true} onPinch={this._onPinch}  style={styles.maskCenter} onTouchStart={this._touchStart} onTouchMove={this._touchMove} onTouchEnd={this._touchEnd}></Gesture.Touchable>
                    <div style={{height:1,background:'#fff',opacity:.5}}></div>
                    <div style={styles.maskTop}></div>
                </div>
                <div style={styles.imgContainer}>                
                <img style={{width:this.state.width,position:'absolute',top:this.state.top,left:this.state.left,transform:`scale(${this.state.scale})`}} src='http://pic.4j4j.cn/upload/pic/20130815/31e652fe2d.jpg' />
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
            zIndex:'5'
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
        imgContainer:{
             position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
alignItems:'center'
        }
    }
    export default TestPage;