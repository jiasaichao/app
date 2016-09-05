/**NinegGrid对话框九宫格*/
import {Common, Global} from "../utils/common";
import Tappable from 'react-tappable';
import {hashHistory, browserHistory} from 'react-router';
import * as React from 'react';
import {Common as CON, Icon} from "./index";
let SL = Global.styles;
let CN = Global.className;
/**九宫格
 * column:列数
 * iconStyle:如果item会覆盖这个style， fill: 'blue',width,height
 * borderColor:边框颜色
 */
export class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles={
            root:SL.create({}).merge(this.props.style)
        }
        let childrenItem = this.props.children.filter((item) => { return item.type.name === 'Item' });
        /**需要补齐的个数 */
        let completion = this.props.column - (childrenItem.length % this.props.column);
        let content = [];
        let list = [];
        childrenItem.forEach((item, index) => {
            //item.props.style={background:'red'}
            let style = { borderTop: '1px solid ' + this.props.borderColor, borderRight: '1px solid ' + this.props.borderColor };
            //最后一列
            if ((index + 1) % this.props.column === 0) {
                delete style.borderRight;
            }
            //首行
            if (index < this.props.column) {
                delete style.borderTop;
            }
            //加入
            let tItem = React.cloneElement(item, { style: style, key: index, iconStyle: this.props.iconStyle });
            list.push(tItem);
            //每行最后一列
            if ((index + 1) % this.props.column === 0) {
                content.push(<div key={index} style={{ display: 'flex' }}>{list}</div>)
                list = []
            }
            //最后一个格子，如果不是最后一列需要补齐
            if (index === (childrenItem.length - 1) && (index + 1) % this.props.column !== 0) {
                if (index < this.props.column) {
                    let tItem = <div key='a1' style={{ flex: completion }}></div>;
                    list.push(tItem);
                }
                else {
                    let tItem = <div key='a2' style={{ flex: completion, borderTop: '1px solid ' + this.props.borderColor }}></div>;
                    list.push(tItem);
                }
                content.push(<div key={index} style={{ display: 'flex' }}>{list}</div>)
                list = []
            }
        });
        return (
            <div className='user-select-none' style={styles.root.o}>
                {content}
            </div>
        );
    }

}
Root.defaultProps = {
    /**列数 */
    column: 3,
    borderColor: '#ccc'
}
/**
 * iconName
 * iconStyle
 * lable
 * style:fill: 'blue',width,height
 * 
 */
export class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let styles = {
            root: SL.create({
                display: 'flex',
                flex: 1,
                overflow: 'hidden',
                boxSizing: 'border-box'
            }),
            content: SL.create({
                height: '1.5rem',
                boxSizing: 'border-box',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }),
            iconStyle: SL.create({
                fill: 'blue',
                height: '.5rem',
                width: '1rem'
            })
        }
        styles.content.merge(this.props.style);
        styles.iconStyle.merge(this.props.iconStyle);
        return (
            <div style={styles.root.o}>
                <Tappable component='div' classBase='Tappable-bg'  style={styles.content.o}>
                    <Icon.Normal style={styles.iconStyle.o} iconName={this.props.iconName}/>
                    <span style={{ fontSize: '.32rem' }}>{this.props.lable}</span>
                </Tappable>

            </div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
        //this.setState({ optionWidth: this.refs.option.clientWidth });
    }
}