/// <reference path="../../typings/browser.d.ts" />

/**按钮*/
import {Common, Global} from "../utils/common";
import * as Tappable from 'react-tappable';
namespace List {
    let SL = Global.styles;
    interface LinkProps extends React.Props<Link> {
        /**样式 */
        amStyle?: CSSProperties;
        /**标题*/
        lable?: string;
        /**左图标 */
        leftIcon?: string;
        /**右图标 */
        rightIcon?: string;
    }
    export class Link extends React.Component<LinkProps, {}>{
        constructor(props: LinkProps) {
            super(props)
        }
        render(){
            let styles = {
                root: SL.create({ padding: '.15rem' }).merge(SL.czspjz)
            }
            return(
                <Tappable style={styles.root.o} component='div'>
                   <div>
                   <div>功能1</div>
                   <div></div>
                   </div>
                </Tappable>
            );
        }
    }
}
export {List}