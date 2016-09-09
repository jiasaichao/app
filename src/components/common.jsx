/**按钮*/
import {Common, Global} from "../utils/common";
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import {Icon,Gesture} from "./index";
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
            <Gesture.Touchable style={styles.root.o} onTap={this._handleOnTap}></Gesture.Touchable>
        );
    }
    _handleOnTap = () => {
        if (this.props.onTap) {
            this.props.onTap();
        }
    }

}