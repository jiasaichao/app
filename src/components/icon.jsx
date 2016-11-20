import {Common, Global} from "../utils/common";
import * as React from 'react';
import * as icons from '../utils/icons';
/**图标 */
 /**正常图标 
  * 可设置style的样式fill:颜色，width宽度，height高度等
  * iconName为icon名称
 */
    export class Normal extends React.Component{
        render() {

            let styles = {
                style: Global.styles.create({fill: "#fff" }).merge(this.props.style)
            };
            return (
                <svg style={styles.style.o}>
<use xlinkHref={this.props.iconName}></use>
</svg>
            );
        }
    }