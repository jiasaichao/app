import React, { Component } from 'react';
import { Flex, Abs, Text } from './layout';

export class Scroll extends Component {
    /**1滚动条状态，2touch接管状态 */
    topState = 1;
    startClientY = 0;
    prevMoveY = 0;
    /**刷新状态1正常，2松手刷新，3刷新中*/
    refresState = 1;
    //移动距离
    distance = 0;
    panel: Element = null;
    pull: Element = null;
    panelStyle = {
        overflowY: 'scroll',
        transform: 'translate3d(0,-60px,0)',
        transition: ''
    };

    constructor(props) {
        super(props)
        // this.state = {
        //     distance: 0,
        //     Animation: false
        // }
    }
    render() {
        // this.props.onRefresh
        let message = '';
        switch (this.refresState) {
            case 1:
                message = '下拉刷新'
                break;
            case 2:
                message = '松手刷新'
                break;
            case 3:
                message = '刷新中'
                break;
        }
        //console.log('render')
        // let overflowY = 'scroll';
        // if (this.topState === 2) {
        //     overflowY = 'hidden';
        // }
        let styles = { overflowX: 'hidden', WebkitOverflowScrolling: 'touch', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, ...this.panelStyle }
        // if (this.state.Animation) {
        //     styles.transition = 'transform .4s ease';
        // }
        //let { height } = this.props;
        return (
            <div ref={r => this.panel = r} onTouchEnd={this.handleTouchEnd} onTouchStart={this.handleTouchStart} onTouchMove={e => this.handleTouchMove(e)} onScroll={this.handleScroll} style={styles}>
                <Flex dom={e => { this.pull = e; }} HW style={{ height: 60, background: '#ff00ff' }}>
                    {message}
                </Flex>
                <Flex column>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                    <Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex><Flex>22222</Flex>
                </Flex>
                <Flex HW style={{ position: 'absolute', bottom: 0, right: 0 }}></Flex>
            </div>
        );
    }
    handleScroll = (e) => {
        //console.log(this.panel.scrollTop);
    }

    handleTouchStart = (e) => {
        let touch = e.targetTouches[0];
        this.startClientY = touch.clientY;
    }
    handleTouchMove = (e) => {
        if (this.refresState === 3) {
            return;
        }
        let touch = e.targetTouches[0];
        let clientY = touch.clientY;
        let distance = clientY - this.startClientY;
        //console.log(distance)
        if (this.topState == 1 && distance > 0 && this.panel.scrollTop <= 0) {
            e.preventDefault();
            this.topState = 2;
            this.startClientY = touch.clientY;
        }
        if (this.topState == 2) {
            let distancez = this.easing(distance);
            if (distancez > 0) {
                e.preventDefault();
            }
            else {
                distancez = 0;
            }
            if (distancez > 60) {
                this.refresState = 2
            } else {
                this.refresState = 1
            }
            this.distance = distancez;
            let style = {
                transition: '',
                transform: `translate3d(0,${this.distance - 60}px,0)`,
                overflowY: 'scroll'
            };

            if (this.topState === 2) {
                style.overflowY = 'hidden';
            }
            this.setStyle(this.panelStyle, style);
            this.setStyle(this.panel.style, style);
            //this.setState({ Animation: false, distance: distancez });
        }
    }
    setStyle = (obj, json) => {
        for (var i in json) {
            obj[i] = json[i];
        }

        let message = '';
        switch (this.refresState) {
            case 1:
                message = '下拉刷新'
                break;
            case 2:
                message = '松手刷新'
                break;
            case 3:
                message = '刷新中'
                break;
        }
        this.pull.innerText = message;
    }
    setSuccess = (sy) => {
        this.distance = 0;
        this.refresState = 1;
        let style = {
            transition: 'transform .4s ease',
            transform: `translate3d(0,${this.distance - 60}px,0)`,
            ...sy
        };
        this.setStyle(this.panelStyle, style);
        this.setStyle(this.panel.style, style);
    }
    setLoading = (sy) => {        
        this.distance = 60;
        this.refresState = 3;
        let style = {
            transition: 'transform .4s ease',
            transform: `translate3d(0,${this.distance - 60}px,0)`,
            ...sy
        };
        this.setStyle(this.panelStyle, style);
        this.setStyle(this.panel.style, style);
    }
    handleTouchEnd = (e) => {
        if (this.refresState === 3) {
            return;
        }
        this.topState = 1;
        if (this.distance > 60) {
            this.setLoading({ overflowY: 'scroll' });
            if (this.props.onRefresh) {
                this.props.onRefresh(this.setSuccess, this.setLoading);
            }
            //this.setState({ Animation: true, distance: 60 });
        } else {
            this.setSuccess({ overflowY: 'scroll' });
            //this.setState({ Animation: true, distance: 0 });
        }
    }
    setData() {


    }
    easing(distance) {
        // t: current time, b: begInnIng value, c: change In value, d: duration
        var t = distance;
        var b = 0;
        var d = screen.availHeight; // 允许拖拽的最大距离
        var c = d / 2.5; // 提示标签最大有效拖拽距离

        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
}