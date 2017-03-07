/**对话框Dialog*/
import { Common, Global } from "../utils/common";
import { hashHistory, browserHistory } from 'react-router';
import * as React from 'react';
import * as Icon from "./icon";
import { Common as CON, Gesture } from "./index";
import { connect } from "react-redux";
import { Cancel } from '../actions/common';
let SL = Global.styles;
let CN = Global.className;
/**模态窗口
 * show:是否显示
 * title：标题
 * content：内容
 * onCancel：取消事件
 * onOk：确定事件
 */
class Modal1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {BaseAlert,BaseAlertTitle,BaseAlertContent} = this.props.Common
        let styles = {
            root: SL.create({
                width: '5.19rem',
                background: '#fff',
                borderRadius: '.12rem',
                zIndex: 1001,
                position: 'absolute',
                marginLeft: '1.15rem',
                marginTop: '50%',
                transform: 'translateY(-50%)'
            }),
            top: {},
            h1: {
                fontSize: '.32rem',
                display: 'flex',
                marginTop: '.29rem',
                justifyContent: 'center'
            },
            text: {
                fontSize: '.28rem',
                margin: '.1rem .5rem .5rem .5rem'
            },
            bottom: {
                display: 'flex',
                fontSize: '.32rem',
                height: '.8rem',
                borderTop: '1px solid #9e9a9a',
            },
            left: {
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRight: '1px solid #9e9a9a',
                color: '#559bec'

            },
            right: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                color: '#559bec'
            }
        }
        if (!BaseAlert) {
            styles.root.merge({ display: 'none' });
        }
        return (
            <div>
                <CON.Mask show={BaseAlert} />
                <div style={styles.root.o}>
                    <div style={styles.top}>
                        <h1 style={styles.h1}>{BaseAlertTitle}</h1>
                        <span className={CN.spjz} style={styles.text}>{BaseAlertContent}</span>
                    </div>
                    <div style={styles.bottom}>
                        <Gesture.Touchable style={styles.left} onTap={Cancel}>取消</Gesture.Touchable>
                        <Gesture.Touchable style={styles.right} onTap={this.props.onOk}>确定</Gesture.Touchable>
                    </div>
                </div>
            </div>
        );
    }

}
function modalMapDispatchToProps(dispatch) {
    return {
    }
}
function modalMapStateToProps(state) {
    return { Common: state.common };
}
export const Modal = connect(modalMapStateToProps, modalMapDispatchToProps)(Modal1);
/**覆盖整个窗口，从下往上弹出 
 * show是否显示
 * style:根元素的样式，如background等
*/
export class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({ zIndex: '1001', background: '#fff' }),
        }
        let className = '';
        styles.root.merge(this.props.style);
        if (this.props.show === false) {
            className = " overlay-hide"
        }
        else {
            className = " overlay-show"
        }
        return (
            <div>
                <CON.Mask show={this.props.show} />
                <div className={"overlay" + className} style={styles.root.o}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
/**下往上弹出
 * show是否显示
 * style:根元素的样式，如background等
 * onMask:遮罩层点击
*/
export class PopupDown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(null, 0, 0, 0)).merge({ zIndex: '1001', background: '#fff' }),
        }
        let className = '';
        styles.root.merge(this.props.style);
        if (this.props.show === false) {
            className = " overlay-hide"
        }
        else {
            className = " overlay-show"
        }
        return (
            <div>
                <CON.Mask show={this.props.show} onTap={this._handleMask} />
                <div className={"overlay" + className} style={styles.root.o}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    _handleMask = () => {
        if (this.props.onMask) {
            this.props.onMask();
        }
    }

}
