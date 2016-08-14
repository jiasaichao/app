/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import * as React from 'react';
namespace Alert {
    let SL = Global.styles;
    interface IS {
    }
    interface IP extends React.Props<Base> {
        style?: CSSProperties;
        /**类型，只能包含这四个，success，warning，info，error，*/
        type: string;
    }
    /**
     * 警告框
     */
    export class Base extends React.Component<IP, IS> {
        constructor(props: IP) {
            super(props);
        }
        render() {
            let styles = {
                root: SL.create({ padding: '15px 35px 15px 15px', position: 'relative' }),
                error: { background: '#fbe1e3', color: '#e73d4a' },
                success: { background: '#e0ebf9', color: '#327ad5' },
                warning: { background: '#f9e491', color: '#c29d0b' },
                info: { background: '#e0ebf9', color: '#327ad5' }
            }
            styles.root.merge(styles[this.props.type]);
            if (this.props.style) {
                styles.root.merge(this.props.style);
            }
            return (
                <div style={styles.root.o}>
                    <div>{this.props.children}</div>
                </div>
            );
        }

    }


    interface ISClose {
        show: boolean;
    }
    interface IPClose extends React.Props<Close> {
        show?: boolean;
        /**类型，只能包含这四个，success，warning，info，error，*/
        type: string;
    }
    /**
     * 带关闭按钮
     */
    export class Close extends React.Component<IPClose, ISClose> {
        constructor(props: IPClose) {
            super(props);
            let state = this.props.show || false;
            this.state = { show: state };
        }
        render() {
            let styles = {
                root: SL.create()
            }
            if (!this.state.show) {
                styles.root.merge({ display: 'none' });
            }
            return (
                <Base style={styles.root.o} type={this.props.type}>
                    {this.props.children}
                </Base>
            );
        }
        handleClose = () => {
            this.setState({ show: false });
        }

    }
    interface IPError extends React.Props<Close> {
    }
    export class Error extends React.Component<IPError, {}>{
        render() {
            return (
                <Base type='error'>{this.props.children}</Base>
                );
        }
    }
}
export {Alert}