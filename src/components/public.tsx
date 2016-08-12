/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
namespace Placeholder {
    /**占满剩余，多个则是等分 */
    export class Full extends React.Component<{}, {}> {
        render() {
            return (
                <div style={{ display: 'flex', flex: 1 }}></div>
            );
        }
    }
    interface IStatusbarProps {
        /**背景色 */
        background?: string;
        /**样式 */
        style?: CSSProperties;
    }
    /**占据状态栏位置*/
    export class Statusbar extends React.Component<IStatusbarProps, {}> {
        render() {
            let styles = {
                style: Global.styles.create({ display: 'flex', flex: 1, height: '.4rem', background: '#0cbaa0' }).merge(this.props.style)
            };
            if (this.props.background) {
                styles.style.merge({ background: this.props.background });
            }
            return (
                <div style={styles.style.o}></div>
            );
        }
    }
}
/**图标 */
namespace Icon {
    interface IconProps {
        /**样式 */
        style?: CSSProperties;
        iconName: string;
    }
    /**正常图标 */
    export class Normal extends React.Component<IconProps, {}>{
        render() {

            let styles = {
                style: Global.styles.create({ fontSize: ".24rem", color: "#fff" }).merge(this.props.style)
            };
            return (
                <span style={styles.style} className={'icon-' + this.props.iconName}></span>
            );
        }
    }
}
export {Placeholder}