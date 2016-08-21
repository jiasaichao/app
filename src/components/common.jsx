/**按钮*/
import {Common, Global} from "../utils/common";
import Tappable from 'react-tappable';
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import * as Icon from "./icon"
let SL = Global.styles;
let CN = Global.className;
/**遮罩 z-index为1000,
 * show:是否显示
 * onTap
 *  */
export class Mask extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({ background: '#000', zIndex: 1000, opacity: '.7' }).merge(this.props.style)
        }
        if (this.props.show === false) {
            styles.root.merge({ display: 'none' });
        }
        return (
            <Tappable style={styles.root.o} onTap={this._handleOnTap}></Tappable>
        );
    }
    _handleOnTap = () => {
        if (this.props.onTap) {
            this.props.onTap();
        }
    }

}