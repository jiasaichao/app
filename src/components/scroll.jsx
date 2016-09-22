
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
 */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        this.startY = 0;
        /**初始化startY用 */
        //this.isOnStart = false;
        this.endOffsetY = 0;


        this.speedStart = 0;
        this.speed = 0;
        this.speedTime = 0;

        this.state = {
            offsetY: 0,
            move: false
        }
    }
    render() {
        let styles = {
            root: SL.create({ overflow: 'hidden' }).merge(this.props.style),
            // container: { transform: `translateY(${this._getOffsetY()}px)` }
        }
        //console.log(this._getOffsetY());
console.log(this._getOffsetY());
        let c;
        c = <Animate.Bezier
            duration={1000}
            defaultStyle={{ x2: this._getOffsetY() }}
            style={{ x2: this._getOffsetY() }}
            stop={!this.state.move}
            >
            {
                v => (
                    <div style={{ transform: `translateY(${v.x2}px)` }} >
                        {(() => {
                            //console.log(v.x2);
                            if (this.state.move) {
                                //this.endOffsetY=v.x
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
        this.isOnStart = false;
        this.speed = 0;
        this.speedTime = new Date().getTime();
        this.speedStart = 0;
        this.setState({move:false});
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
        if (new Date().getTime() - this.speedTime > 100) {
            this.speed = offsetY - this.speedStart;
            this.speedTime = new Date().getTime();
            this.speedStart = offsetY;
        }

        this.setState({ offsetY: offsetY });
    }
    _onEnd = () => {
        this.endOffsetY = this._getOffsetY();
        console.info(this._getOffsetY());
        this.setState({ move: true, offsetY:500 });
    }
}
Root.defaultProps = {
}