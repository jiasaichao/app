/// <reference path="../../typings/browser.d.ts" />

/**列表*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import * as Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
namespace Form {
    let SL = Global.styles;
    let CN = Global.className;
    interface InputProps extends React.Props<Input> {
        /**样式 */
        style?: CSSProperties;
        /**名称*/
        lable?: string;
        /**占位名称 */
        placeholder?:string;
        /**左侧图标 */
        leftIcon?:string;
        /**左侧图片 */
        leftImg?:string;
        /**点击事件 */
        onTap?:()=>void;
        /**跳转地址，此值若有则不会执行onTap */
        href?:string;
    }
    /**链接 */
    export class Input extends React.Component<InputProps, {}>{
        constructor(props: InputProps) {
            super(props)
        }
        render() {
            let styles = {
                root: SL.create({}).merge(this.props.style),
                container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', marginLeft: '.2rem', fontSize: '.26rem' },
                right:{marginRight:'.2rem'}
            }
            return (
                <div style={styles.root.o}>
                    <div className={CN.czjz} style={styles.container}>
                        <div>{this.props.lable}</div>
                        <Placeholder.Full/>
                        <div style={styles.right}><span>{}</span> <Icon.Normal iconName='chevron-right'></Icon.Normal></div>
                    </div>
                </div>
            );
        }
        handleClick=()=>{
            if (this.props.href) {
                console.log('执行了list点击');
                hashHistory.push(this.props.href);
            }
            else if(this.props.onTap){
                this.props.onTap();
            }
        }
    }
}
export {Form}