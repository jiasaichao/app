
/**FullPage,全屏滚动*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Button, Animate, Gesture} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import {Motion, spring} from 'react-motion';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**
 * 滚动
 * children:Item,Rest
 */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        this.itemNumber = this.props.children.filter((item) => { return item.type.name === 'Item' }).length;
        this.state = {
            /**当前索引 */
            idx: 1,
            /**方向:up,down,'' */
            direction: '',
            /**rest变化 */
            rest: 1
        }
    }
    render() {
        let bodyHeight = document.body.clientHeight;
        let childrenItem = this.props.children.filter((item) => {return item.type.name === 'Item'});
        childrenItem.forEach((item,index) => {
            if (item.props.children instanceof Array) {
                item.props.children.forEach((item1, index1) => {

                   // console.log(item1.type.name+"------"+this.state.rest+"-----"+(index+1));
                    if (item1.type.name === 'Rest' && (index + 1) !== this.state.rest) {
                        //console.log(index1);
                        console.log(item.props.children);
                        item.props.children.splice(index1, 1);
                        console.log(item.props.children);
                    }
                });
            }
        });
        
      
        /**偏移量 */
        let offsetX = -(this.state.idx - 1) * bodyHeight;

        let styles = {
            container: { transform: `translate3d(${offsetX}px,0,0)`, height: (childrenItem.length * bodyHeight) + 'px' },
        };
        let start = offsetX;
        switch (this.state.direction) {
            case 'up':
                start = offsetX - bodyHeight;
                break;
            case 'down':
                start = offsetX + bodyHeight;
                break;
        }
        return (
            <Gesture.Touchable classBase='' onSwipeDown={this._down} onSwipeUp={this._up} style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
                <Motion
                    defaultStyle={{ x: start }}
                    style={{ x: spring(offsetX) }}
                    onRest={() => { this.setState({ rest: this.state.idx }) } }>
                    {
                        v => (
                            <div style={{ transform: `translateY(${v.x + 'px'})`, height: (childrenItem.length * bodyHeight) + 'px' }}>
                                {childrenItem}
                            </div>
                        )
                    }
                </Motion>
                <Animate.Loop styles={[['op', 1, 0.5], ['x', 0, 20]]}>
                    {value => {
                        return (<div  style={{ height: '30px', width: '30px', bottom: '30px', marginLeft: '50%', transform: 'translateX(-50%)', position: 'absolute', opacity: value.op }}>
                            <Icon.Normal style={{ width: '30px', height: '30px', position: 'absolute', top: value.x + 'px' }} iconName='#chevron-up'/>
                        </div>)
                    } }
                </Animate.Loop>
            </Gesture.Touchable>
        );
    }
    _up = () => {
        if (this.state.idx !== this.itemNumber) {
            this.setState({ idx: this.state.idx + 1, direction: 'up' })
        }

    }
    _down = () => {
        if (this.state.idx !== 1) {
            this.setState({ idx: this.state.idx - 1, direction: 'down' })
        }
    }

}
Root.defaultProps = {
}
/**
 * 项目
 * style
 */
export class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        //let childrenItem = this.props.children.filter((item) => { return item.type.name === 'Rest' });
        let styles = {
            root: SL.create({ overflow: 'hidden', width: '100%', position: 'relative', height: document.body.clientHeight + 'px' }).merge(this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
    componentWillMount() {

    }
    componentDidMount() {
        //this.setState({ optionWidth: this.refs.option.clientWidth });
    }
}
/**
 * Item中的元素，此元素内容在item滚动完成后显示。
 */
export class Rest extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}