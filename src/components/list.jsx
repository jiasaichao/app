import React, { Component } from 'react';
import Touchable from './touchable';
import { Icon } from './icon';
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
                <div style={styles.right}><span>{rightLabel}</span>
                    <svg height='.3rem' width='.3rem' fill='#675e5e' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14.016 23.993" xmlSpace="preserve">
                        <g>
                            <g>
                                <path style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} d="M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0
                                    c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0
			l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"/>
	</g>
                        </g>
                    </svg>
                </div>
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