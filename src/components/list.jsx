import React, { Component } from 'react';
import Touchable from './touchable'

export class List extends Component {
    render() {
        let {width, height, iconName, color} = this.props;
        let styles = {
            style: Global.styles.create({ fill: color, width, height }).merge(this.props.style)
        };
        return (
            <Touchable style={styles.style.o} onTap={this.click}>
                {this.props.children}
            </Touchable>
        );
    }
    handleClick=()=>{
        if (this.props.href) {
            //console.log('执行了list点击');
            //hashHistory.push(this.props.href);
        }
        else if (this.props.onTap) {
            this.props.onTap();
        }
    }
}

class ListBase extends Component {
    render() {
        let {width, height, iconName, color} = this.props;
        let styles = {
            style: Global.styles.create({ fill: color, width, height }).merge(this.props.style)
        };
        return (
            <Touchable style={styles.style.o} onTap={this.click}>
                {this.props.children}
            </Touchable>
        );
    }
    click=()=>{
        if (this.props.href) {
            //console.log('执行了list点击');
            //hashHistory.push(this.props.href);
        }
        else if (this.props.onTap) {
            this.props.onTap();
        }
    }
}