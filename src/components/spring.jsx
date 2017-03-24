/**按钮*/
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, Gesture } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import * as React from 'react';
let SL = Global.styles;
let CN = Global.className;

/**
 * 弹簧
 */
export default class Spring extends React.Component {
    constructor(props) {
        super(props);
        /**速度 */
        this.speed = 0;
        this.speeds = [0, 0, 0, 0, 0];
        //this.isMouseDown = false;
        //摩擦，模拟下一帧是上一帧的多少
        this.friction = 0.93;
        this.weizhi = 0;
        //鼠标或手指开始点击的位置
        this.startX = 0;
        //鼠标或手指现在的位置
        this.clientY = 0;
        //上一次移动到的位置，配合现在鼠标或手指移动的位置计算出目标位置
        this.oldMovePosition = 0;
        /**
         * 1为空
         * 2为跟随鼠标
         * 3为惯性运动中
         */
        this.motionState = 1;
        this.oldX = 0;

        this.trackVelocityOld = 0;
    }
    render() {
        let styles = {
            root: SL.create({ padding: '.15rem' }).merge(SL.czspjz),
        }
        return (
            <div ref={(el) => { this.el = el }} style={{fontSize:18, width: '100%', height: 10000, background: '#666' }} onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} onTouchMove={this.onMouseMove} onMouseMove={this.onMouseMove} onTouchCancel={this.onMouseUp} onTouchEnd={this.onMouseUp} onMouseUp={this.onMouseUp}>
                323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br /> 323232332
<br />
0000000000000000000
<br />99999999999999999999
<br />888888888888888
<br />1111111111111
<br />22222222222222
<br />323232332
<br />6666666666666666
<br />7777777777777777777
<br />
            </div>
        );
    }
    componentDidMount() {

    }
    onMouseDown = (e) => {
        let clientY;
        if (e.touches) {
            clientY = e.touches[0].clientY;
        }
        else {
            clientY = e.clientY;
        }
        this.motionState = 2;
        this.startX = clientY;
        this.clientY = clientY;
        //按下的时候调用
        this.iiii = 0;
        this.drawFrame();

    }
    onMouseMove = (e) => {
        e.preventDefault();
        let clientY;
        if (e.touches) {
            clientY = e.touches[0].clientY;
        }
        else {
            clientY = e.clientY;
        }
        if (this.motionState == 2) {
            this.clientY = clientY;
            let t = this.clientY - this.startX + this.oldMovePosition;
            this.el.style.transform = `translate3d(0,${t}px,0)`;
        }
    }
    onMouseUp = (e) => {
        this.oldMovePosition = this.clientY - this.startX + this.oldMovePosition;
        this.speed = Math.max.apply(Math, this.speeds);
        if (this.speed <= 0) {
            this.speed = Math.min.apply(Math, this.speeds);
        }
        this.motionState = 3;
        //this.el.innerHTML = this.speed;
        //console.log('速度：' + this.speed)
    }
    drawFrame = () => {
        switch (this.motionState) {
            case 1:
                return;
            case 2:
                requestAnimationFrame(this.drawFrame);
                this.trackVelocity();
                break;
            case 3:
                if (Math.abs(this.speed) > 0.02) {
                    requestAnimationFrame(this.drawFrame);
                    this.checkBoundaries();
                }

                break;
        }
    }
    /**
     * 拖拽速度检测
     */
    trackVelocity = () => {
        this.iiii++;
        this.speed = this.clientY - this.startX + this.oldMovePosition - this.trackVelocityOld;
        this.speeds.push(this.speed);
        this.speeds.shift();
        console.log(this.speeds);
        this.trackVelocityOld = this.clientY - this.startX + this.oldMovePosition;
    }
    checkBoundaries = () => {
        this.speed *= this.friction;
        // if (this.speed < 0) {
        //     this.speed += this.damping
        // } else {
        //     this.speed -= this.damping
        // }

        this.oldMovePosition += this.speed;
        this.el.style.transform = `translate3d(0,${this.oldMovePosition}px,0)`;
    }

}

Spring.displayName = 'Spring';
Spring.propTypes = {
    stiffness: React.PropTypes.number,
    damping: React.PropTypes.number,
};
Spring.propInfo = {
    stiffness: '硬度',
    damping: '阻尼',
}
Spring.defaultProps = {
    stiffness: 0.03,
    damping: 0.85
}