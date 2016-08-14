/// <reference path="../../typings/browser.d.ts" />

/**列表*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import * as Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
namespace List {
    let SL = Global.styles;
    let CN = Global.className;
    interface LinkProps extends React.Props<Link> {
        /**样式 */
        style?: CSSProperties;
        /**标题*/
        lable?: string;
        /**右侧内容 */
        rightLable?:string;
        /**点击事件 */
        onTap?:()=>void;
        /**跳转地址，此值若有则不会执行onTap */
        href?:string;
    }
    /**链接 */
    export class Link extends React.Component<LinkProps, {}>{
        constructor(props: LinkProps) {
            super(props)
        }
        render() {
            let styles = {
                root: SL.create({}).merge(this.props.style),
                container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', marginLeft: '.2rem', fontSize: '.26rem' },
                right:{marginRight:'.2rem'}
            }
            return (
                <Tappable style={styles.root.o} component='div' onTap={this.handleClick}>
                    <div className={CN.czjz} style={styles.container}>
                        <div>{this.props.lable}</div>
                        <Placeholder.Full/>
                        <div style={styles.right}><span>{this.props.rightLable}</span> <Icon.Normal iconName='chevron-right'></Icon.Normal></div>
                    </div>
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
export {List}