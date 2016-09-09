
/**FullPage,全屏滚动*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Button} from "./index";
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**滑块 */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startX: 0,
            clientX: 0,
            //offsetX:0,
            /**当前索引 */
            idx: 1,
            /**是否在触摸状态下 */
            touch: false,
            setIntervalId: null,
            /**页面数量，如果loop循环为真，则数量多两个 */
            pageNumber: 0
        }
        this.setIntervalId = null;
    }
    render() {
        let bodywidth = document.body.clientWidth;
        /**移动偏移量 */
        let offsetX = -(this.state.idx - 1) * bodywidth + this.state.clientX - this.state.startX;
        /**元素数量 */
        let number = this.state.pageNumber;// React.Children.count(this.props.children);
        /**真实数量 */
        let actualNumber = number;
        if (this.props.loop) {
            actualNumber = actualNumber - 2;
        }

        let styles = {
            container: { transform: `translate3d(${offsetX}px,0,0)`, width: (number * bodywidth) + 'px' },
            /**指示标 */
            indicators: SL.create(SL.absolute(null, 0, '.2rem', 0)),
            indicatorsItem: SL.create({
                width: '.1rem',
                height: '.1rem',
                /* background: red; */
                borderRadius: '.1rem',
                border: '1px solid #fff',
                marginLeft: '.1rem'
            }),
            leftIcon: {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '.2rem',
                height: '1rem',
                width: '.2rem'
            },
            rightIcon: {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '.2rem',
                height: '1rem',
                width: '.2rem'
            }

        }
        if (!this.state.touch) {
            styles.container.transition = '0.3s ease-out';
            if (this.props.autoPlay) {
                this._autoPlay();
            }

        }
        else {
            if (this.props.autoPlay) {
                this._clearAutoPlay();
            }
        }
        let childrenItem = this.props.children.filter((item) => { return item.type.name === 'Item' });
        /**内容 */
        let content = [];
        childrenItem.forEach((item, index) => {
            if (this.props.loop) {
                if (index === 0) {
                    content.push(<div key={'a' + index} style={{ overflow: 'hidden', width: bodywidth, height: '3rem' }}>{childrenItem[childrenItem.length - 1]}</div>)
                }
            }
            content.push(<div key={index} style={{ overflow: 'hidden', width: bodywidth, height: '3rem' }}>{item}</div>)
            if (this.props.loop) {
                if (index === childrenItem.length - 1) {
                    content.push(<div key={'a' + index} style={{ overflow: 'hidden', width: bodywidth, height: '3rem' }}>{childrenItem[0]}</div>)
                }
            }
        });
        /**指示当前第几页的小白点 */
        let indicatorsitem = [];
        for (var i = 1; i <= actualNumber; i++) {
            if (this.props.loop && (this.state.idx - 1) == i) {
                indicatorsitem.push(<span key={i} style={styles.indicatorsItem.notmerge({ background: '#fff' }) }></span >)
            }
            else {
                indicatorsitem.push(<span key={i} style={styles.indicatorsItem.o}></span>)
            }
        }
        /**指示标志 */
        let indicators
        if (this.props.isIndicators) {
            indicators = <div className={CN.spjz} style={styles.indicators.o}>
                {indicatorsitem}
            </div>;
        }
        let leftRightButton = [];
        if (this.props.isLeftRight) {
            leftRightButton = [<Button.Base key='left' leftIcon={icons.Chevron_Left} onTap={() => { this._goIndex(this.state.idx - 1); this._resetAutoPlay() } } style={styles.leftIcon}/>,
                <Button.Base key='right' leftIcon={icons.Chevron_Right} onTap={() => { this._goIndex(this.state.idx + 1); this._resetAutoPlay() } } style={styles.rightIcon} />];
        }
        //console.log('render:' + offsetX);

        return (
            <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
                <div ref="container" className={CN.flex} style={styles.container} onTouchStart={this._handleTouchStart} onTouchMove={this._handleTouchMove} onTouchEnd={this._handleTouchEnd}>
                    {content}
                    {/**
                    <div style={{ overflow: 'hidden', width: bodywidth, height: '3rem', background: '#FEFABE' }}></div>
                    <div style={{ overflow: 'hidden', width: bodywidth, height: '3rem', background: '#BEFEC1' }}></div>
                    <div style={{ overflow: 'hidden', width: bodywidth, height: '3rem', background: '#BEE0FE' }}></div>
                    <div style={{ overflow: 'hidden', width: bodywidth, height: '3rem', background: '#EEBEFE' }}></div>   
                     */}
                </div>
                {indicators}
                {
                    leftRightButton
                }

            </div>
        );
    }
    componentWillMount() {
        let pageNumber = this.props.children.filter((item) => { return item.type.name === 'Item' }).length;
        console.log(pageNumber);
        if (this.props.loop) {
            pageNumber = pageNumber + 2
            this.setState({ pageNumber: pageNumber, idx: 2 });
        }
        this.setState({ pageNumber: pageNumber });

    }
    componentDidMount() {
        /**轮播如果存在循环播放，播放到最后一张，或者第一张都会切换到对应的页面上 */
        if (this.props.loop) {
            this.refs.container.addEventListener('webkitTransitionEnd', () => {
                if (this.state.idx === 1) {
                    this.setState({ touch: true, idx: this.state.pageNumber - 1 });
                }
                if (this.state.idx === this.state.pageNumber) {
                    this.setState({ touch: true, idx: 2 });
                }
                window.setTimeout(() => {
                    this.setState({ touch: false });
                }, 100);
            });
        }

        if (this.props.autoPlay) {
            this._autoPlay();
        }

        //this.setState({ optionWidth: this.refs.option.clientWidth });
    }
    componentWillUnmount() {
        this._clearAutoPlay();
    }
    _autoPlay = () => {
        if (this.setIntervalId == null) {
            this.setIntervalId = window.setInterval(() => {
                this._goIndex(this.state.idx + 1);
            }, this.props.autoPlayInterval);
        }

    }
    _clearAutoPlay = () => {
        clearInterval(this.setIntervalId);
        this.setIntervalId = null;
    }
    /**重置自动播放 */
    _resetAutoPlay = () => {
        if (this.props.autoPlay && this.setIntervalId !== null) {
            this._clearAutoPlay();
            this._autoPlay();
        }
    }
    _handleTouchStart = (e) => {
        this.setState({ touch: true, startX: e.touches[0].clientX, clientX: e.touches[0].clientX })
    }
    _handleTouchMove = (e) => {
        //console.log('TouchMove:' + e.touches[0].clientX);
        this.setState({ clientX: e.touches[0].clientX })
    }
    _handleTouchEnd = (e) => {
        /** */
        if ((this.state.clientX - this.state.startX) > document.body.clientWidth / 8) {
            this._goIndex(this.state.idx - 1)
            //window.setTimeout(()=>{this.setState({idx:this.state.ide-1});},100);
        } else
            if ((this.state.clientX - this.state.startX) < -document.body.clientWidth / 8) {
                this._goIndex(this.state.idx + 1)
            }
            else {
                this.setState({ touch: false, startX: 0, clientX: 0 });
            }
        //this.setState({offsetX: this.state.clientX - this.state.startX})
        // this.setState({ transition: true }); window.setTimeout(() => {
        //     if (-offsetX > (this.state.optionWidth / 3)) {
        //         this.setState({ startX: this.state.clientX + this.state.optionWidth });
        //         this.setState({ show: true });
        //     } else {
        //         this.setState({ startX: this.state.clientX });
        //         this.setState({ show: false });
        //     }

        // }, 100)
    }
    _goIndex = (page) => {
        if (page < 1) {
            page = 1
        } else if (page > this.state.pageNumber) {
            page = this.state.pageNumber
        }

        this.setState({ touch: false, idx: page, startX: 0, clientX: 0 });
    }
}
Root.defaultProps = {
    /**速度毫秒 */
    speed: 300,
    /**自动播放 */
    autoPlay: false,
    /**自动播放间隔 */
    autoPlayInterval: 3000,
    /**循环 */
    loop: false,
    /**是否有左右按钮 */
    isLeftRight: false,
    /**是否存在指示标志 */
    isIndicators: false
}
export class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    static defaultProps = {
        /**速度毫秒 */
        speed: 300,
        /**自动播放 */
        autoPlay: false,
        /**自动播放间隔 */
        autoPlayInterval: 3000,
        /**循环 */
        loop: false
    }
    render() {
        // let styles = {
        //     root: SL.create({ height: '.88rem', borderBottom: '1px solid #e6e6e6', position: 'relative', overflow: 'hidden' }).merge(this.props.style),
        //     /**移动 */
        //     container: SL.create({ marginLeft: '.2rem', fontSize: '.26rem', background: '#fff', zIndex: 10, position: 'absolute', width: '100%', height: '100%', transform: `translate3d(${offsetX}px,0,0)` }),
        //     right: { marginRight: '.2rem' },
        //     option: { height: '100%', fontSize: '.32rem', overflow: 'hidden' },
        //     optionLable: SL.create({ height: '100%', padding: '0 .3rem' })
        // }
        return (
            <div>
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