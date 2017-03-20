/**按钮*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Gesture } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import * as React from 'react';
let SL = Global.styles;
let CN = Global.className;

/**
 * 弹簧
 */
export default class Spring extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {
            root: SL.create({ padding: '.15rem' }).merge(SL.czspjz),
            leftStyle: SL.create({ width: '.25rem', height: '.3rem' }).merge(this.props.leftStyle),
            rightStyle: SL.create({ width: '.25rem', height: '.3rem' }).merge(this.props.rightStyle),
        }
        return (
            <div>

            </div>
        );
    }

}

Spring.displayName = 'Spring';
Spring.propTypes = {
    stiffness: React.PropTypes.number,
    damping: React.PropTypes.number,
};
Spring.propInfo = {
    stiffness: '硬度',
    damping: '阻尼',
}
Spring.defaultProps = {
    stiffness: 0.03,
    damping: 0.85
}