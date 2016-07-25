/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import {Button} from "./button";
import * as Tappable from 'react-tappable';
import {Placeholder} from "./public";
import * as ReactCSSTransitionGroup  from "react-addons-css-transition-group";
let SL = Global.styles;
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
            root: SL.create({ height: '0.9rem', background: '#0cbaa0', color: '#fff', fontSize: '.34rem', boxSizing: 'border-box', position: 'relative' }).merge(SL.czjz),
            h1: SL.create(SL.czspjz).merge({width:'100%'}),
            left: SL.create({ height: '100%', position: 'absolute' }).merge(SL.czjz)
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        //console.log(Tappable);
        let items=[1,2,3,4].map(function(v){
            return (<div key={v}>{v}</div>);
        });
        return (
            <div>
                <Placeholder.Statusbar />
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {items}
      </ReactCSSTransitionGroup>
                <div style={styles.root.o}>
                    <div style={styles.left.o}> <Button.Base lable='返回' leftIcon='chevron-left'></Button.Base></div>
                    <h1 style={styles.h1.o} >{this.props.title}</h1>
                </div>
            </div>
        );
    }

}