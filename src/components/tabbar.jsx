/**按钮*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Gesture, ImagePlaceholder } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import React, { Component } from 'react';
import * as icons from "../utils/icons"
let SL = Global.styles;
let CN = Global.className;
function TabItem({onTap, label, iconName, color}) {
    let styles = {
        root: SL.create({ height: '100%', flex: 1, flexDirection: 'column' }).merge(SL.czspjz),
        label: {
            color
        }
    }
    return (
        <Gesture.Touchable style={styles.root.o} onTap={onTap}>
            <div><Icon width='.46rem' height='.46rem' color={color} iconName={iconName} /></div>
            {label?<div style={styles.label}>{label}</div>:null}
        </Gesture.Touchable>
    )
}

export function Item({label,selected,onTap,iconName}){

}
Item.displayName = 'TabBar.Item';
Item.propTypes = {
    label: React.PropTypes.string,
    selected: React.PropTypes.bool,
    onTap: React.PropTypes.func,
    iconName: React.PropTypes.string,
};
Item.propInfo = {
    label: '名称',
    selected: '是否选中',
    onTap: 'onTap',
    iconName: 'icon名称',
};
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
        let {color, background, selectedColor} = this.props
        let styles = {
            root: SL.create({ position: 'absolute', left: 0, right: 0, bottom: 0, height: '.98rem', fontSize: '.2rem', background, color }).merge(SL.czspjz)
        }
        if (this.props.style) {
            styles.root.merge(this.props.style);
        }
        let content = null;
        let children = [];
        if (this.props.children.length) {
            children = this.props.children;
        } else {
            children.push(this.props.children);
        }
        content = children.find((c) => c.props.selected).props.children;
        return (
            <div>
                <div>
                    {content}
                </div>
                <div className={CN.spjz} style={styles.root.o}>
                    {
                        React.Children.map(this.props.children, (item) => {
                            let itemColor = color;
                            if (item.props.selected) {
                                itemColor = selectedColor;
                            }
                            return <TabItem label={item.props.label} color={itemColor} iconName={item.props.iconName} />
                        })
                    }
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
    background: '#E5E5E6',
    color: '#898988',
    selectedColor: '#0CBAA0'
};
export default TabBar;