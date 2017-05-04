
/**表单*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder,Gesture} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import * as icons from "../utils/icons";
let SL = Global.styles;
let CN = Global.className;
/**
 * 输入框 
 * leftIcon:左边icon图标；
 * placeholder:占位字符 
*/
export class Input extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style),
            container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', fontSize: '.26rem', flex: 1 },
            left: { width: '.7rem' },
            input: { height: '100%', width: '100%', fontSize: '.32rem', border: 'none', outline: 'none' }
        }
        let left;
        if (this.props.leftImg) {

        } else if (this.props.leftIcon) {
            left = <Icon style={{ fill: '#000', width: '.4rem', height: '.4rem' }} iconName={this.props.leftIcon} />
        }
        return (
            <div className={CN.czjz} style={styles.root.o}>
                <div className={CN.spjz} style={styles.left}>{left}</div>
                <div className={CN.czjz} style={styles.container}>
                    <input style={styles.input} type="text" placeholder={this.props.placeholder} />
                </div>
            </div>
        );
    }
}
/**
 * 开关
 * label
 * open:bool
 */
export class Switch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open | false
        }
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style),
            container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', fontSize: '.32rem', flex: 1 },
            left: { width: '.7rem' },
            switch: SL.create({
                border: '1px solid #ccc',
                height: '.5rem',
                width: '1rem',
                borderRadius: '.3rem',
                boxSizing: 'border-box',
                position: 'relative',
                WebkitTransition: 'border .4s,box-shadow .4s',
                transition: 'border .4s,box-shadow .4s',
            }),
            switchButton: SL.create({
                height: '.5rem',
                width: '.5rem',
                borderRadius: '.5rem',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                position: 'absolute',
                top: '-1px',
                WebkitTransition: 'left .2s',
                transition: 'left .2s',
                background: '#fff'
            })
        }
        if (this.state.open) {
            //styles.switch.merge({ background: '#5eb95e' });
            styles.switch.merge({ boxShadow: 'inset 0 0 0 16px #5eb95e' ,border: '1px solid #5eb95e'});
            
            styles.switchButton.merge({ left: '0.5rem' });
        }
        else {
            styles.switchButton.merge({ left: '-0.01rem' });
        }
        let left;
        if (this.props.leftImg) {

        } else if (this.props.leftIcon) {
            left = <Icon style={{ fill: '#000', width: '.4rem', height: '.4rem' }} iconName={this.props.leftIcon} />
        }
        return (
            <div className={CN.czjz} style={styles.root.o}>
                <div className={CN.spjz} style={styles.left}>{left}</div>
                <div className={CN.czjz} style={styles.container}>
                <span>{this.props.label}</span>
                <Placeholder.Full />
                    <Gesture.Touchable classBase='' swiperLength='20' onSwipeRight={() => { this.setState({ open: true }) } } onSwipeLeft={() => { this.setState({ open: false }) } } onTap={() => { this.setState({ open: !this.state.open }) } } style={styles.switch.o}>
                        <div style={styles.switchButton.o}></div>
                    </Gesture.Touchable>
                    <div style={{width:'.2rem'}}></div>
                </div>
            </div>
        );
    }
}