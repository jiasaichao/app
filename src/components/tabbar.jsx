/**按钮*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Gesture, ImagePlaceholder } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import React, { Component } from 'react';
let SL = Global.styles;
let CN = Global.className;
function TabItem({onTap,label,icon}) {
    let styles = {
        root: SL.create({height:'100%', flex: 1, flexDirection: 'column' }).merge(SL.czspjz),
        label: {

        }
    }
    return (
        <Gesture.Touchable style={styles.root.o} onTap={onTap}>
            <div><Icon.Normal iconName='Email' /></div>
            <div style={styles.label}>{label}</div>
        </Gesture.Touchable>
    )
}
/**
 * label
 * img
 */
export class Item extends Component {
    constructor(props) {
        super(props);
    }
}

/**
 * style
 * background
 * selectedColor
 * color
 */
class TabBar extends Component {
    constructor(props) {
        super(props);
    }
    static Item = Item;
    render() {
        let styles = {
            root: SL.create({ height: '.98rem', fontSize: '.2rem', background: '#E5E5E6', color: '#898988' }).merge(SL.czspjz)
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        return (
            <div>
                <div className={CN.spjz} style={styles.root.o}>
                    {React.Children.map(this.props.children,(item)=><TabItem label={item.props.label} />)}
                    {/*{this.props.children}*/}
                </div>
            </div>

        );
    }

}

TabBar.displayName = 'TabBar';
TabBar.propTypes = {
    selectedColor: React.PropTypes.string,
    background: React.PropTypes.string,
    color: React.PropTypes.string,
    style: React.PropTypes.object,
};
TabBar.propInfo = {
    selectedColor: '选中项文字颜色',
    background: '背景色',
    color: '文字颜色',
    style: '样式',
};
TabBar.defaultProps = {
};
export default TabBar;