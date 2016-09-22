/**
 * 动画
 * 
 * */
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Gesture} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import {Motion, spring} from 'react-motion';
import {Tween} from '../utils/tween';
let SL = Global.styles;
let CN = Global.className;
/**循环动画
 * styles:[['width','【start】','【end】'],['height','【start】','【end】']] //[{width:{start:0,end:100}},{height:{start:0,end:100}}]
 * 
 * 实例
 *  <Animate.Loop styles={[['op',1,0.5],['x',0,20]]}>
                    {value => {
                        return (<div  style={{ height: '30px', position: 'relative', opacity: value.op }}>
                            <Icon.Normal style={{ width: '30px', height: '30px', position: 'absolute', top: value.x + 'px' }} iconName='#chevron-up'/>
                        </div>)
                    } }
                </Animate.Loop>
 */
export class Loop extends React.Component {
    constructor(props) {
        super(props);
        this.defaultStyle = {};
        this.style = {};
        this.props.styles.forEach((value) => {
            this.defaultStyle[value[0]] = value[1];
            this.style[value[0]] = spring(value[2]);
        });
    }
    render() {
        return (
            <Motion
                onRest={this._onRest }
                defaultStyle={this.defaultStyle}
                style={this.style}>
                {this.props.children}
            </Motion>)
    }
    _onRest = () => {
        window.setTimeout(() => {
            this.props.styles.forEach((value) => {
                if (this.defaultStyle[value[0]] == value[1]) {
                    this.defaultStyle[value[0]] = value[2];
                    this.style[value[0]] = spring(value[1]);
                }
                else {
                    this.defaultStyle[value[0]] = value[1];
                    this.style[value[0]] = spring(value[2]);
                }
            });
            this.forceUpdate();
        }, 0);
    }

}

/**
 * defaultTween:QuadeaseOut
 * defaultStyle:{x:2}
 * style:{x:30}
 * 持续时间
 * duration:1000 ms
 * stop:false
 */
export class Bezier extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.defaultStyle);
        this.state = {
            currentStyle: this.props.defaultStyle
        }
    }
    componentDidMount() {
        this._motion(this.props.defaultStyle,this.props.style);
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        if (nextProps.stop) {
            //console.log(nextProps.style);
            this.setState({ currentStyle: nextProps.style });
        }
        else {
            //console.log(nextProps);
            console.log(nextProps.style);
            this._motion(this.state.currentStyle,nextProps.style);
        }

        //
    }
    _motion = (startStyle,endStyle) => {
        
        let startt = new Date().getTime();
        let _run = () => {
            //  * t: current time（当前时间）
            //  * b: beginning value（初始值）
            //  * c: change in value（变化量）
            //  * d: duration（持续时间）
            let t = new Date().getTime() - startt;
            let d = this.props.duration;

            let currentStyle = {};
            for (let a in endStyle) {
                let b = startStyle[a];
                let c = endStyle[a];
                if (b !== c) {
                    currentStyle[a] = Tween.Quad.easeOut(t, b, c, d);
                }
                else {
                    currentStyle[a] = b;
                }
            }
            this.setState({
                currentStyle: currentStyle
            });
           
            if (t < d && !this.props.stop) {
                window.requestAnimationFrame(_run);
            }
        }
        _run();
    }
    render() {

        const renderedChildren = this.props.children(this.state.currentStyle);
        return renderedChildren;
    }

}

Bezier.defaultProps = {
    stop: false
}