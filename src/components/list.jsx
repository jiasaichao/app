
/**列表*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder} from "./index";
import Tappable from 'react-tappable';
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
import * as icons from "../utils/icons";

    let SL = Global.styles;
    let CN = Global.className;
/**链接 */
    export class Link extends React.Component{
        constructor(props) {
            super(props)
        }
        render() {
            let styles = {
                root: SL.create({}).merge(this.props.style),
                container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', marginLeft: '.2rem', fontSize: '.26rem' },
                right:{marginRight:'.2rem'}
            }
            return (
                <Tappable style={styles.root.o} component='div' classBase='Tappable-bg'  onTap={this.handleClick.bind(this)}>
                    <div className={CN.czjz} style={styles.container}>
                        <div>{this.props.lable}</div>
                        <Placeholder.Full/>
                        <div style={styles.right}><span>{this.props.rightLable}</span> <Icon.Normal iconName={icons.Chevron_Right} style={{fill:'#675e5e',height:'.3rem',width:'.3rem'}}></Icon.Normal></div>
                    </div>
                </Tappable>
            );
        }
        handleClick(){
            if (this.props.href) {
                //console.log('执行了list点击');
                hashHistory.push(this.props.href);
            }
            else if(this.props.onTap){
                this.props.onTap();
            }
        }
    }
export {Link}