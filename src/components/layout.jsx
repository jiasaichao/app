import React, { Component } from 'react';
import { Common } from '../utils/common';
/**
 * flex
 * 
 */
export function Flex(
    { children, className='', style, column, horizontal, vertical, HW, flex1 }:
    { 
        /***/className: string, 
        /***/style: any, 
        /**是否为垂直排列，加上这个属性为垂直排列*/column: boolean, 
        /**水平居中对齐*/horizontal: boolean, 
        /**垂直居中对齐*/vertical: boolean, 
        /**水平和垂直都居中对齐*/HW: boolean, 
        /**flex-grow为1，就是放大倍数为1*/flex1: boolean 
    }) {
    let classnames = '';
    if (column) classnames += ' flex-direction-column';
    if (horizontal) classnames += ' justify-content';
    if (vertical) classnames += ' align-items';
    if (HW) classnames += ' justify-content align-items';
    if (flex1) classnames += ' flex-grow';
    return (
        <div className={Common.classnames('display-flex', className, classnames)} style={style}>
            {children}
        </div>
    );
}
export function Placeholder(){
    return (
        <div className='flex-grow'>
        </div>
    );
}