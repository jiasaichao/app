/**对话框Dialog*/
import { Common, Global } from "../src/utils/common";
import { hashHistory, browserHistory } from 'react-router';
import * as React from 'react';
import { Common as CON, Gesture ,Container,Button} from "../src/components";
import { connect } from "react-redux";
import { Cancel, BaseAlert} from '../src/actions/common';
let SL = Global.styles;
let CN = Global.className;

class Alert1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Button.Submit onTap={this.props.onTap} lable='按钮222' />
                <Button.Submit lable='按钮232' />
            </div>
        );
    }

}
function modalMapDispatchToProps(dispatch) {
    return {
        onTap() {
            console.log(2222);
            dispatch(BaseAlert('标题','内容'))
        }
    }
}
function modalMapStateToProps(state) {
    return { Common: state.common };
}
export const Alert = connect(modalMapStateToProps, modalMapDispatchToProps)(Alert1);
