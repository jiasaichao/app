/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import {Button} from "./button";
import * as Tappable from 'react-tappable';
import {Placeholder} from "./public";
import * as ReactCSSTransitionGroup  from "react-addons-css-transition-group";
let SL = Global.styles;
let CN=Global.className;
interface IS {
}
interface IP extends React.Props<NavBar> {
    style?: CSSProperties;
    title: string;
}
/**
 * 导航条组件。
 */
export class NavBar extends React.Component<IP, IS> {
    constructor(props: IP) {
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
                    <div className={CN.czjz} style={styles.left.o}> <Button.Base lable='返回' leftIcon='chevron-left'></Button.Base></div>
                    <h1 className={CN.spczjz} style={styles.h1} >{this.props.title}</h1>
                </div>
            </div>
        );
    }

}