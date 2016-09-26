
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
 */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        this.startY = 0;
        /**初始化startY用 */
        //this.isOnStart = false;
        this.endOffsetY = 0;

        this.speed = 0;
        this.speedId = -1;

        this.state = {
            /**本次移动的偏移量 */
            offsetY: 0,
            /**是否在动画中 */
            isAnimate: false,
            /**目标偏移量，惯性移动的到位置 */
            targetOffsetY:0
        }
    }
    render() {
        let styles = {
            root: SL.create({ overflow: 'hidden' }).merge(this.props.style),
            // container: { transform: `translateY(${this._getOffsetY()}px)` }
        }
        let offsetY=0;
        if(this.state.isAnimate){
            offsetY=this.state.targetOffsetY;
            console.log('要移动到'+offsetY);
        }
        else{
offsetY=this._getOffsetY();
        }
        
        let c;
        c = <Animate.Bezier
            duration={1000}
            defaultStyle={{ x2: this._getOffsetY() }}
            style={{ x2: offsetY }}
            stop={!this.state.isAnimate}
            >
            {
                v => (
                    <div style={{ transform: `translateY(${v.x2}px)` }} >
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
            <div style={styles.root.o} onTouchStart={this._onStart} onTouchMove={this._onMove} onTouchEnd={this._onEnd}>
                {c}
            </div>
        );
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
        this.setState({ isAnimate: false,offsetY:0,targetOffsetY:0 });
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

        this.setState({ offsetY: offsetY });
    }
    _onEnd = () => {
        this.endOffsetY = this._getOffsetY();
        //console.info('结束为止', this._getOffsetY());
        console.log('速度',this.speed);
        console.log('移动的距离',this.endOffsetY);
        this.setState({ isAnimate: true, targetOffsetY: this.endOffsetY +(this.speed * 3) });
        this._clearCalculationSpeed();
        
    }
    /**
     * 计算速度
     */
    _calculationSpeed = () => {
        let speedStart = this.state.offsetY;
        this.speedId = window.setInterval(() => {
            this.speed = this.state.offsetY - speedStart;
            
            speedStart = this.state.offsetY;
        }, 100);
    }
    _clearCalculationSpeed = () => {
        window.clearInterval(this.speedId);
        this.speed=0;
    }
}
Root.defaultProps = {
}