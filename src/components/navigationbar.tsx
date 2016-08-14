/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import * as React from 'react';
/**当前状态*/
enum CurrentState {
    /**正常*/
    Normal = 1,
    /**选中*/
    Active,
    /**鼠标移上去*/
    Mouse
}
interface INavigationBarItemState {
    state: CurrentState;
}
interface IPNavigationBar extends React.Props<NavigationBar> {
}
class NavigationBar extends React.Component<IPNavigationBar, {}>{
    // static defaultProps = { maxId: 0 }
    maxId = 0;
    constructor(props: IPNavigationBar) {
        super(props);
    }
    render() {
        let self = this;
        var children = this.props.children;
        let childrenElements = React.Children.map(children, function (el:React.ReactElement<IPNavigationBarItem>, index) {
            if ((el.type as any).name === "NavigationBarItem") {
                let i = React.cloneElement(el, { lable: el.props.lable,icon:el.props.icon } as IPNavigationBarItem);
                return i;
            }
        });
        return (
            <ul style={Global.styles.create(Global.styles.czjz).merge({ height: "43px", padding: "0 " + Global.padding + "px", background: "#fff", border: "1px solid #e7ecf1" ,flex:1}).o}>
                {childrenElements}
            </ul>
        );
    }
}

interface IPNavigationBarItem extends React.Props<NavigationBarItem> {
    lable: string;
    /**是否存在图标 */
    icon?: boolean;
}
class NavigationBarItem extends React.Component<IPNavigationBarItem,INavigationBarItemState>{
    constructor(props: IPNavigationBarItem) {
        super(props);
        this.state = { state: CurrentState.Normal };
    }
    render() {
        let i;
        let styles = {
            Normal: { textDecoration: "none", fontSize: "14px", color: "#888" },
            Mouse: { textDecoration: "underline", fontSize: "14px", color: "#888" },
            a: {}
        }
        switch (this.state.state) {
            case CurrentState.Normal:
                styles.a = styles.Normal;
                break;
            case CurrentState.Mouse:
                styles.a = styles.Mouse;
                break;
        }
        if (this.props.icon == null || this.props.icon == true) {
            i = <i className="icon-chevron-right"></i>;
        }
        return (
            <li style={{ display: "flex", color: "#888" }}>
                <a onMouseOver={this._handleMouseOver.bind(this) }  onMouseOut={this._handleMouseOut.bind(this) } style={styles.a} href="#">{this.props.lable}</a>{i}
            </li>
        );
    }    
    _handleMouseOver() {
        this.setState({
            state: CurrentState.Mouse
        });
    }
    _handleMouseOut() {
        this.setState({
            state: CurrentState.Normal
        });
    }
    // props: {
    //     lable: string;
    //     /**是否存在图标 */
    //     icon?: boolean;
    // }
}

export {NavigationBar}
export {NavigationBarItem}