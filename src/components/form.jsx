
/**表单*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import * as Tappable from 'react-tappable';
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import * as icons from "../utils/icons";
let SL = Global.styles;
let CN = Global.className;
/**链接 */
/**leftIcon:左边icon图标；placeholder:展位字符 */
export class Input extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style),
            container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', fontSize: '.26rem',flex:1 },
            left:{width:'.7rem'},
            input:{height:'100%',width:'100%',fontSize:'.32rem',border:'none',outline:'none'}
        }
        let left;
        if (this.props.leftImg) {

        } else if (this.props.leftIcon) {
            left = <Icon.Normal style={{fill:'#000',width:'.4rem',height:'.4rem'}} iconName={this.props.leftIcon} />
        }
        return (
            <div className={CN.czjz} style={styles.root.o}>
                <div className={CN.spjz} style={styles.left}>{left}</div>
                <div className={CN.czjz} style={styles.container}>
                    <input style={styles.input} type="text" placeholder={this.props.placeholder} />
                </div>
            </div>
        );
    }
}
export {Input}