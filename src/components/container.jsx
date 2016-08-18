
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import * as Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
 let SL = Global.styles;
    let CN = Global.className;
    /**容器 */
 class Container extends React.Component{
        constructor(props) {
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