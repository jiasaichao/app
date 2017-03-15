
/**列表List*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder,Gesture} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**
 * 链接
 * href
 * onTap
 */
export class Link extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style),
            container: { height: '.88rem', borderBottom: '1px solid #e6e6e6', marginLeft: '.2rem', fontSize: '.26rem' },
            right: { marginRight: '.2rem' }
        }
        return (
            <Gesture.Touchable style={styles.root.o} classBase='Tappable-bg'  onTap={this.handleClick.bind(this) }>
                <div className={CN.czjz} style={styles.container}>
                    <div>{this.props.label}</div>
                    <Placeholder.Full/>
                    <div style={styles.right}><span>{this.props.rightLabel}</span> <Icon iconName={icons.Chevron_Right} style={{ fill: '#675e5e', height: '.3rem', width: '.3rem' }}></Icon></div>
                </div>
            </Gesture.Touchable>
        );
    }
    handleClick() {
        if (this.props.href) {
            //console.log('执行了list点击');
            hashHistory.push(this.props.href);
        }
        else if (this.props.onTap) {
            this.props.onTap();
        }
    }
}
/**可移动操作 */
export class Swipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startX: 0,
            clientX: 0,
            optionWidth: 0,
            transition: false,
            show: false
            //offsetX:0
        }
    }
    render() {
        let offsetX = this.state.clientX - this.state.startX;
        if (offsetX > 0) {
            offsetX = 0;
        }
        let styles = {
            root: SL.create({ height: '.88rem', borderBottom: '1px solid #e6e6e6', position: 'relative', overflow: 'hidden' }).merge(this.props.style),
            /**移动 */
            container: SL.create({ marginLeft: '.2rem', fontSize: '.26rem', background: '#fff', zIndex: 10, position: 'absolute', width: '100%', height: '100%', transform: `translate3d(${offsetX}px,0,0)` }),
            right: { marginRight: '.2rem' },
            option: { height: '100%', fontSize: '.32rem', overflow: 'hidden' },
            optionLabel: SL.create({ height: '100%', padding: '0 .3rem' })
        }
        if (this.state.transition) {
            styles.container.merge({ transition: '0.3s ease-out' });
        }
        return (
            <div className={CN.flex} style={styles.root.o}>
                <div className={CN.czjz + 'user-select-none'} style={styles.container.o}
                    onTouchStart={(e) => {
                        if (this.state.show) {
                            this.setState({ transition: true });
                            window.setTimeout(() => {
                                this.setState({ startX: this.state.clientX });
                                this.setState({ show: false });
                            }, 100)
                        } else {
                            this.setState({ transition: false, startX: e.touches[0].clientX, clientX: e.touches[0].clientX })
                        }

                    } }
                    onTouchMove={(e) => { this.setState({ clientX: e.touches[0].clientX }) } }
                    onTouchEnd={(e) => {
                        this.setState({ transition: true }); window.setTimeout(() => {
                            if (-offsetX > (this.state.optionWidth / 3)) {
                                this.setState({ startX: this.state.clientX + this.state.optionWidth });
                                this.setState({ show: true });
                            } else {
                                this.setState({ startX: this.state.clientX });
                                this.setState({ show: false });
                            }

                        }, 100)
                    } }
                    >
                    <div>{this.props.label}</div>
                    <Placeholder.Full/>
                    <div style={styles.right}><span>{this.props.rightLabel}</span></div>
                </div>
                <Placeholder.Full/>
                <div className={CN.czjz} ref='option' style={styles.option}>
                    <span className={CN.czjz} style={{...styles.optionLabel.o, background: '#8a8282'}}>标为一读</span>
                <span className={CN.czjz} style={{...styles.optionLabel.o, background: 'red'}}>删除</span>
                </div >
            </div >
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.setState({ optionWidth: this.refs.option.clientWidth });
    }
    handleClick() {
        if (this.props.href) {
            //console.log('执行了list点击');
            hashHistory.push(this.props.href);
        }
        else if (this.props.onTap) {
            this.props.onTap();
        }
    }
}

/**
 * 小标题
 * 一般做一个页面两个模块之间的分割
 * label
 * style
 * background:
 * color
 */
export class SmallTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({
                height: '.5rem',
                fontSize: '.26rem',
                background: '#e0e0e0',
                paddingLeft: '.2rem'
            }).merge(this.props.style)
        }
        if (this.props.background) {
            styles.root.merge({ background: this.props.background });
        }
        if (this.props.color) {
            styles.root.merge({ color: this.props.color });
        }
        return (
            <div className={CN.czjz} style={styles.root.o}>
                {this.props.label}
            </div>
        );
    }
}
// SmallTitle.defaultProps = {
//     background: null,
//     color: null
// }