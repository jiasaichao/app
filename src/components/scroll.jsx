
/**
 * Scroll 
 * 滚动
 */
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
 * 
 * 一、手指滚动
 * 1.跟随手指滚动。
 * 2.滚动到边界，越远滚动的距离越小
 * 二、惯性滚动
 * 手指松开后滚动
 * 1.滚动惯性
 * 2.滚动超出边界减速然后回弹
 * 3.在边界外松手直接回弹
 */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        /**高度 */
        this.height = 0;
        /**容器高度 */
        this.containerHeight = 0;
        this.startY = 0;
        /**初始化startY用 */
        //this.isOnStart = false;
        this.endOffsetY = 0;

        this.speed = 0;
        this.speedId = -1;
        this.speedStartTime = 0;
        this.speedEndTime = 0;


        this.state = {
            /**本次移动的偏移量 */
            offsetY: 0,
            /**是否在动画中 */
            isAnimate: false,
            /**目标偏移量，惯性移动的到位置 */
            targetOffsetY: 0,
            /**动画时间 */
            duration:1000,

        }
    }
    render() {
        let styles = {
            root: SL.create({ overflow: 'hidden' }).merge(this.props.style),
            // container: { transform: `translateY(${this._getOffsetY()}px)` }
        }
        let offsetY = 0;
        if (this.state.isAnimate) {
            offsetY = this.state.targetOffsetY;
            //console.log('要移动到' + offsetY);
        }
        else {
            offsetY = this._getOffsetY();
        }

        let c;
        c = <Animate.Bezier
            duration={this.state.duration}
            defaultStyle={{ x2: this._getOffsetY() }}
            style={{ x2: offsetY }}
            stop={!this.state.isAnimate}
            ref='body32'
            onEnd={this._onAnimateEnd}
            >
            {
                v => (
                    <div ref='body' style={{ transform: `translateY(${v.x2}px)` }} >
                        {(() => {
                            if (this.state.isAnimate) {
                                //console.log(v.x2);
                                this.endOffsetY = v.x2
                            }

                        })() }
                        {this.props.children}
                    </div>
                )
            }
        </Animate.Bezier>;


        return (
            <div ref='container' style={styles.root.o} onTouchStart={this._onStart} onTouchMove={this._onMove} onTouchEnd={this._onEnd}>
                {c}
            </div>
        );
    }
    componentDidMount() {
        this.height = this.refs['body32'].refs['body'].clientHeight;
        this.containerHeight = this.refs['container'].clientHeight;
        console.log(this.height);
        console.log(this.containerHeight);
    }

    _getOffsetY = () => {
        return this.state.offsetY + this.endOffsetY;
    }
    _onStart = (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        //this.isOnStart = true;


        this.startY = e.touches[0].clientY;
        this._calculationSpeed();
        this.setState({ isAnimate: false, offsetY: 0, targetOffsetY: 0 });
        this.speedStartTime = new Date().getTime();
        //console.log(this._getOffsetY())
    }
    _onMove = (e) => {
        //console.log(1);
        e.preventDefault();
        e.stopPropagation();
        // if (this.isOnStart) {
        //     this.startY = e.touches[0].clientY;
        //     this.isOnStart = false;

        //     this.speedTime = new Date().getTime();
        //     this.speedStart = 0;
        // }
        let offsetY = e.touches[0].clientY - this.startY;
        //console.log(offsetY,this._getOffsetY());
        // if (new Date().getTime() - this.speedTime > 100) {
        //     this.speed = offsetY - this.speedStart;
        //     this.speedTime = new Date().getTime();
        //     this.speedStart = offsetY;
        // }
        //超出边界
        if (this._getOffsetY() > 0) {
this.setState({ offsetY: offsetY-this._getOffsetY()/1.2 });

        } else
            //超出边界
            if (this._getOffsetY() < -this.height + this.containerHeight) {
                this.setState({ offsetY: offsetY+((-this.height + this.containerHeight)-this._getOffsetY())/1.2 });
            }
            else {
                this.setState({ offsetY: offsetY });
            }
    }
    _onEnd = () => {
        this.endOffsetY = this._getOffsetY();

        this.speedEndTime = new Date().getTime();
        if (Math.abs(this.speedEndTime - this.speedStartTime) < 200) {
            this.speed = this.state.offsetY / (this.speedEndTime - this.speedStartTime) * 200
        }
        //console.info('结束为止', this._getOffsetY());
        // console.log('速度', this.speed);
        // console.log('移动的距离', this.endOffsetY);

        //超出边界
        if (this.endOffsetY > 0) {
            this.setState({ isAnimate: true, targetOffsetY: 0,duration:300 });

        } else
            //超出边界
            if (this.endOffsetY < -this.height + this.containerHeight) {
                this.setState({ isAnimate: true, targetOffsetY: -this.height + this.containerHeight ,duration:300});
            }
            else {
                let targetOffsetY = this.endOffsetY + (this.speed * 3);
                if (targetOffsetY > 50) {
                    targetOffsetY = 50;
                }
                if (targetOffsetY < -this.height + this.containerHeight - 50) {
                    targetOffsetY = -this.height + this.containerHeight - 50;
                }
                this.setState({ isAnimate: true, targetOffsetY: targetOffsetY ,duration:1000});
            }


        this._clearCalculationSpeed();
    }
    _onAnimateEnd = () => {
        let targetOffsetY = 0;
        if (this.endOffsetY > 0) {
            this.setState({ isAnimate: true, targetOffsetY: targetOffsetY,duration:300 });
        }
        if (this.endOffsetY < -this.height + this.containerHeight) {
            targetOffsetY = -this.height + this.containerHeight;
            this.setState({ isAnimate: true, targetOffsetY: targetOffsetY,duration:300 });
        }
    }
    /**
     * 计算速度
     */
    _calculationSpeed = () => {
        let speedStart = this.state.offsetY;
        this.speedId = window.setInterval(() => {
            this.speed = this.state.offsetY - speedStart;

            speedStart = this.state.offsetY;
        }, 200);
    }
    /**
     * 取消计算速度
     */
    _clearCalculationSpeed = () => {
        window.clearInterval(this.speedId);
        this.speed = 0;
    }
}
Root.defaultProps = {
}