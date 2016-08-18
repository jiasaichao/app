import {Common, Global} from "../utils/common";
import * as React from 'react';
/**Placeholder占位符 */
export class Full extends React.Component {
        render() {
            return (
                <div style={{ display: 'flex', flex: 1 }}></div>
            );
        }
    }
/**占据状态栏位置*/
    export class Statusbar extends React.Component {
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