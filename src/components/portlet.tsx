/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import * as React from 'react';
let SL = Global.styles;
interface IS {
}
interface IP extends React.Props<Portlet> {
    title: string;
}
/**
 * 窗口组件，每个区域都应该用这个组件分割开来
 */
class Portlet extends React.Component<IP, IS> {
    constructor(props: IP) {
        super(props);
    }
    render() {
        return (
            <div style={{ padding: '20px', background: '#F1F3FA' }}>
                <div style={{
                    border: '1px solid #e7ecf1', padding: '12px 20px 15px', backgroundColor: '#fff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', marginBottom: '10px', minHeight: '41px' }}>
                        {this.props.title}
                    </div>
                    <div>{this.props.children}</div>
                </div>
                </div>
        );
    }
    handleClose = () => {
        this.setState({ show: false });
    }

}

export {/**
 * 窗口组件，每个区域都应该用这个组件分割开来
 */Portlet}
