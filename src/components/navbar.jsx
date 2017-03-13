import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Button} from "./index";
import * as ReactCSSTransitionGroup  from "react-addons-css-transition-group";
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import * as Icons from '../utils/icons';
let SL = Global.styles;
let CN = Global.className;
/**
 * 导航条组件。
 * label
 * back:bool,default:true
 * backName:default'返回'
 * 
 */
export class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = {
            root: SL.create({ height: '0.9rem', background: '#0cbaa0', color: '#fff', fontSize: '.34rem', boxSizing: 'border-box', position: 'relative' }).merge(this.props.style),
            h1: { width: '100%' },
            left: SL.create({ height: '100%', position: 'absolute' })
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        let back
        if(this.props.back)
        {
            back=<Button.Base label={this.props.backName} onTap={() => { hashHistory.goBack(); } } leftIcon={Icons.Chevron_Left} />;
        }
        return (
            <div>
            {/** <Placeholder.Statusbar /> */}
                <div className={CN.czjz} style={styles.root.o}>
                    <div className={CN.czjz} style={styles.left.o}> {back}</div>
                    <h1 className={CN.spczjz} style={styles.h1} >{this.props.label}</h1>
                </div>
            </div>
        );
    }
}
NavBar.propTypes = {
    label: React.PropTypes.string,
    backName:React.PropTypes.string,
    back:React.PropTypes.bool,
    style:React.PropTypes.object
};
NavBar.propInfo = {
    label: '显示文字',
    backName: '返回按钮名称',
    back: '是否显示返回按钮',
    style: '样式',
}
NavBar.defaultProps = {
    back:true,
    backName:'返回'
}