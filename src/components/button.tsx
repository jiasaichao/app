/// <reference path="../../typings/browser.d.ts" />

/**按钮*/
import {Common, Global} from "../utils/common";
import * as Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
namespace Button {
    let SL = Global.styles;
    interface IS {
    }
    interface IP extends React.Props<Base> {
        /**样式 */
        amStyle?: CSSProperties;
        /**标题*/
        lable?: string;
        /**左图标 */
        leftIcon?: string;
        /**右图标 */
        rightIcon?: string;
        /**点击事件 */
        onTap?:()=>void;
        /**跳转地址，此值若有则不会执行onTap */
        href?:string;
    }
    /**
     * 基础按钮
     */
    export class Base extends React.Component<IP, IS> {
        constructor(props: IP) {
            super(props);
        }
        render() {
            let leftIcon, rightIcon;
            let styles = {
                root: SL.create({ padding: '.15rem' }).merge(SL.czspjz)
            }
            if (this.props.amStyle) {
                styles.root.merge(this.props.amStyle);
            }
            if (this.props.leftIcon) {
                leftIcon = <span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.leftIcon}></span>;
            }
            if (this.props.rightIcon) {
                rightIcon = <span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.rightIcon}></span>;
            }
            return (
                <Tappable style={styles.root.o} component='div' onTap={this.handleClick}>
                    {leftIcon}
                    <span style={{ fontSize: '.28rem' }}>{this.props.lable}</span>
                    {rightIcon}
                </Tappable>
            );
        }
        handleClick=()=>{
            if (this.props.href) {
                hashHistory.push(this.props.href);
            }
            else{
                this.props.onTap();
            }
        }

    }
}
export {Button}