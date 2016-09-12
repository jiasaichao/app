/**
 * 动画
 * 
 * */
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Gesture} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import {Motion, spring} from 'react-motion';
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
