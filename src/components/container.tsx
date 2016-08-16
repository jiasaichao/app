/// <reference path="../../typings/browser.d.ts" />

/**列表*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import * as Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
 let SL = Global.styles;
    let CN = Global.className;
    interface ContainerProps extends React.Props<Container> {
        /**样式 */
        style?: CSSProperties;
    }
    /**容器 */
 class Container extends React.Component<ContainerProps, {}>{
        constructor(props: ContainerProps) {
            super(props)
        }
        render() {
            let styles = {
                root: SL.create(SL.absolute(0,0,0,0)).merge(this.props.style)
            }
            return (
                <div style={styles.root.o}>
                {this.props.children}
                </div>
            );
        }
    }
export {Container}