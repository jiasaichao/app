import { Common, Global } from "../utils/common";
import  React from 'react';
import * as icons from '../utils/icons';
/**图标 */
/**正常图标 
 * 可设置style的样式fill:颜色，width宽度，height高度等
 * iconName为icon名称
 * color
 * width
 * height
*/
export class Icon1 extends React.Component {
    render() {
        let {width, height, iconName, color} = this.props;
        let styles = {
            style: Global.styles.create({ fill: color, width, height }).merge(this.props.style)
        };
        return (
            <svg style={styles.style.o}>
                <use xlinkHref={iconName}></use>
            </svg>
        );
    }
}
export function Icon({width, height, iconName, color,style}) {
    let styles = {
        style: Global.styles.create({ fill: color, width, height }).merge(style)
    };
    return (
        <svg style={styles.style.o}>
            <use xlinkHref={iconName}></use>
        </svg>
    );
}

Icon.defaultProps = {
    color: '#fff'
}
Icon.propTypes = {
    iconName: React.PropTypes.string.isRequired,
    width:React.PropTypes.string,
    height:React.PropTypes.string,
    color:React.PropTypes.string,
    style:React.PropTypes.object,
};
Icon.propInfo = {
    iconName: 'icon名称，通过import * as icons from "../src/utils/icons"引入',
    style: '样式',
}
Icon.displayName = 'Icon';