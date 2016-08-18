import {Common, Global} from "../utils/common";
import {Icon, Placeholder,Button} from "./index";
import * as Tappable from 'react-tappable';
import * as ReactCSSTransitionGroup  from "react-addons-css-transition-group";
 import {hashHistory,browserHistory} from 'react-router';
    import * as React from 'react';
    import * as Icons from '../utils/icons';
let SL = Global.styles;
let CN=Global.className;
/**
 * 导航条组件。
 */
export class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        let styles = {
            root: SL.create({ height: '0.9rem', background: '#0cbaa0', color: '#fff', fontSize: '.34rem', boxSizing: 'border-box', position: 'relative' }),
            h1: {width:'100%'},
            left: SL.create({ height: '100%', position: 'absolute' })
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        return (
            <div>
                <Placeholder.Statusbar />
                <div className={CN.czjz} style={styles.root.o}>
                    <div className={CN.czjz} style={styles.left.o}> <Button.Base lable='返回' onTap={()=>{hashHistory.goBack();}} leftIcon={Icons.Chevron_Left}></Button.Base></div>
                    <h1 className={CN.spczjz} style={styles.h1} >{this.props.title}</h1>
                </div>
            </div>
        );
    }

}