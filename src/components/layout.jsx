import React, { Component } from 'react';
import { Common } from '../utils/common';

export function Flex({ className }: { className: string }) {
    return (
        <div className={Common.s('display-flex', className)}>
            {this.props.children}
        </div>
    );
}