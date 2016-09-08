/**按钮*/
import {Common, Global} from "../utils/common";
import Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
import * as Icon from "./icon"
 let SL = Global.styles;
    let CN = Global.className;
    /**基本按钮
     * lable:按钮名称
     * leftIcon:左icon
     * rightIcon：右icon
     * style最外层style
     * leftStyle
     * rightStyle
     * href:链接地址
     * onTap:点击函数
     */
export class Base extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            let leftIcon, rightIcon;
            let styles = {
                root: SL.create({ padding: '.15rem' }).merge(SL.czspjz),
                leftStyle:SL.create({width:'.25rem',height:'.3rem'}).merge(this.props.leftStyle),
                rightStyle:SL.create({width:'.25rem',height:'.3rem'}).merge(this.props.rightStyle),
            }
            if (this.props.style) {
                styles.root.merge(this.props.style);
            }
            if (this.props.leftIcon) {
                leftIcon =<Icon.Normal iconName={this.props.leftIcon} style={styles.leftStyle.o} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.leftIcon}></span>;
            }
            if (this.props.rightIcon) {
                rightIcon = <Icon.Normal iconName={this.props.rightIcon} style={styles.rightStyle.o} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.rightIcon}></span>;
            }
            return (
                <Tappable style={styles.root.o} component='div' onTap={this.handleClick.bind(this)}>
                    {leftIcon}
                    <span style={{ fontSize: '.28rem' }}>{this.props.lable}</span>
                    {rightIcon}
                </Tappable>
            );
        }
        handleClick(){
            if (this.props.href) {
                hashHistory.push(this.props.href);
            }
            else
            if(this.props.onTap)
            {
                this.props.onTap();
            }
        }

    }

    /**提交按钮
     * lable:按钮名称
     * href:链接地址
     * onTap:点击函数
     * style
     */
    export class Submit extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            let leftIcon, rightIcon;
            let styles = {
                root: SL.create({ width: '6.9rem',height:'.8rem',fontSize:'.32rem',background:'#39b54a',borderRadius:'.1rem',color:'#fff' }).merge(SL.czspjz)
            }
            if (this.props.style) {
                styles.root.merge(this.props.style);
            }
            // if (this.props.leftIcon) {
            //     leftIcon =<Icon.Normal iconName={this.props.leftIcon} style={{width:'.25rem',height:'.3rem'}} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.leftIcon}></span>;
            // }
            // if (this.props.rightIcon) {
            //     rightIcon = <Icon.Normal iconName={this.props.rightIcon} style={{width:'.25rem',height:'.3rem'}} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.rightIcon}></span>;
            // }
            return (
                <div className={CN.spjz}>
                <Tappable style={styles.root.o} classBase='Tappable-bg' component='div' onTap={this._handleClick}>
                    {this.props.lable}
                </Tappable>
                </div>
                
            );
        }
        _handleClick=()=>{
            if (this.props.href) {
                hashHistory.push(this.props.href);
            }
            else
            if(this.props.onTap)
            {
                this.props.onTap();
            }
        }

    }
export {Base}
export {Submit}