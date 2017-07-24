import React, { Component } from 'react';
import Touchable from './touchable';
import {Icon} from './icon';
import { Flex, Placeholder } from './layout';
import { Common, Global } from "../utils/common";
import * as icons from '../utils/icons';


export function List({ style, label, rightLabel }) {
    let styles = {
        root: Global.styles.create({}).merge(style),
        container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', marginLeft: '.2rem', fontSize: '.26rem' },
        right: { marginRight: '.2rem' }
    }
    return (
        <Touchable style={styles.root.o} classBase='Tappable-bg'>
            <Flex vertical style={styles.container}>
                <div>{label}</div>
                <Placeholder />
                <div style={styles.right}><span>{rightLabel}</span> <Icon iconName={icons.Chevron_Right} style={{ fill: '#675e5e', height: '.3rem', width: '.3rem' }}></Icon></div>
            </Flex>
        </Touchable>
    );
}

class ListBase extends Component {
    render() {
        let { width, height, iconName, color } = this.props;
        let styles = {
            style: Global.styles.create({ fill: color, width, height }).merge(this.props.style)
        };
        return (
            <Touchable style={styles.style.o} onTap={this.handleClick}>
                {this.props.children}
            </Touchable>
        );
    }
    handleClick = () => {
        if (this.props.href) {
            //console.log('执行了list点击');
            //hashHistory.push(this.props.href);
        }
        else if (this.props.onTap) {
            this.props.onTap();
        }
    }
}