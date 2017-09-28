import React, { Component, PureComponent } from 'react';
import { Common } from '../utils/common';

export function Flex(
    { children, className = '', style, column, horizontal, vertical, HW, flex1, other }:
        {
        /***/className: string,
        /***/style: React.CSSProperties,
        /**是否为垂直排列，加上这个属性为垂直排列*/column: boolean,
        /**水平居中对齐*/horizontal: boolean,
        /**垂直居中对齐*/vertical: boolean,
        /**水平和垂直都居中对齐*/HW: boolean,
        /**flex1为1，就是放大倍数为1*/flex1: boolean,
            other: Object
        }) {
    let classnames = '';
    if (column) classnames += ' flex-direction-column';
    if (horizontal) classnames += ' justify-content';
    if (vertical) classnames += ' align-items';
    if (HW) classnames += ' justify-content align-items';
    if (flex1) classnames += ' flex1';
    return (
        <div className={Common.classnames('display-flex', className, classnames)} style={style} {...other}>
            {children}
        </div>
    );
}
// class FLexBase extends PureComponent {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         let { column, horizontal, vertical, children, className, style, HW, flex1, other } = this.props;
//         let classnames = '';
//         if (column) classnames += ' flex-direction-column';
//         if (horizontal) classnames += ' justify-content';
//         if (vertical) classnames += ' align-items';
//         if (HW) classnames += ' justify-content align-items';
//         if (flex1) classnames += ' flex1';
//         return (
//             <div className={Common.classnames('display-flex', className, classnames)} style={style} {...other}>
//                 {children}
//             </div>
//         );
//     }
// }
export function Placeholder() {
    return (
        <div className='flex1'>
        </div>
    );
}
//加入inline-block 是为了解决高度和fontSize不一致问题
export function Text({ label, color, fontSize, style, bold, className }) {
    let addStyle = {};
    if (fontSize) {
        addStyle.lineHeight = fontSize;
    }
    if (bold) {
        addStyle.fontWeight = '600';
    }
    let styles = Common.prepareStyles().merge({ color, fontSize, display: 'inline-block' }, style, addStyle).o;
    return (
        <span className={className} style={styles}>{label}</span>
    );
}
export function Abs(
    { children, className = '', style }:
        {
        /***/className: string,
        /***/style: any
        }) {
    let classnames = '';
    let defaultStyles = { position: 'absolute' };
    let styles = { ...defaultStyles, ...style };
    return (
        <div className={Common.classnames(className, classnames)} style={styles}>
            {children}
        </div>
    );
}
