/**按钮*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Gesture } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import * as React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**基本按钮
 * label:按钮名称
 * leftIcon:左icon
 * rightIcon：右icon
 * style最外层style
 * leftStyle
 * rightStyle
 * href:链接地址
 * onTap:点击函数
 */
export class Base extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let leftIcon, rightIcon;
        let styles = {
            root: SL.create({ padding: '.15rem' }).merge(SL.czspjz),
            leftStyle: SL.create({ width: '.25rem', height: '.3rem' }).merge(this.props.leftStyle),
            rightStyle: SL.create({ width: '.25rem', height: '.3rem' }).merge(this.props.rightStyle),
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        if (this.props.leftIcon) {
            leftIcon = <Icon iconName={this.props.leftIcon} style={styles.leftStyle.o} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.leftIcon}></span>;
        }
        if (this.props.rightIcon) {
            rightIcon = <Icon iconName={this.props.rightIcon} style={styles.rightStyle.o} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.rightIcon}></span>;
        }
        return (
            <Gesture.Touchable style={styles.root.o} onTap={this.handleClick.bind(this)}>
                {leftIcon}
                <span style={{ fontSize: '.28rem' }}>{this.props.label}</span>
                {rightIcon}
            </Gesture.Touchable>
        );
    }
    handleClick() {
        if (this.props.href) {
            hashHistory.push(this.props.href);
        }
        else
            if (this.props.onTap) {
                this.props.onTap();
            }
    }

}

/**提交按钮
 * label:按钮名称
 * href:链接地址
 * onTap:点击函数
 * style
 */
export class Submit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let leftIcon, rightIcon;
        let styles = {
            root: SL.create({ width: '6.9rem', height: '.8rem', fontSize: '.32rem', background: '#39b54a', borderRadius: '.1rem', color: '#fff' }).merge(SL.czspjz)
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        // if (this.props.leftIcon) {
        //     leftIcon =<Icon.Normal iconName={this.props.leftIcon} style={{width:'.25rem',height:'.3rem'}} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.leftIcon}></span>;
        // }
        // if (this.props.rightIcon) {
        //     rightIcon = <Icon.Normal iconName={this.props.rightIcon} style={{width:'.25rem',height:'.3rem'}} /> //<span style={{ fontSize: ".32rem", color: "#fff" }} className={'icon-' + this.props.rightIcon}></span>;
        // }
        return (
            <div className={CN.spjz}>
                <Gesture.Touchable style={styles.root.o} classBase='Tappable-bg' onTap={this._handleClick}>
                    {this.props.label}
                </Gesture.Touchable>
            </div>

        );
    }
    _handleClick = () => {
        if (this.props.href) {
            hashHistory.push(this.props.href);
        }
        else
            if (this.props.onTap) {
                this.props.onTap();
            }
    }

}

Submit.displayName = 'Button.Submit';
Submit.propTypes = {
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    onTap: React.PropTypes.func,
    style: React.PropTypes.object,
};
Submit.propInfo = {
    label: '显示文字',
    href: '链接地址',
    onTap: '触摸时间',
    style: '样式',
}
Submit.defaultProps = {
}