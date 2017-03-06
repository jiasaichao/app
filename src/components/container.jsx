
import { Common, Global } from "../utils/common";
import { Icon, Placeholder, NavBar } from "./index";
import { hashHistory, browserHistory } from 'react-router';
import React, { Component } from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * 页面容器 
 * style
 * 
 * */
export class Page extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge({ background: '#fff', overflowY: 'auto' }).merge(this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
}
Page.displayName = 'Container.Page';
Page.propTypes = {
    style: React.PropTypes.object,
};
Page.propInfo = {
    style: '样式',
}
/**
 * 使用场景描述
 */
Page.scene = '页面容器，此组件设置了绝对定位0,0,0,0和背景色#FFF'
Page.defaultProps = {
}


/**
 * 内容容器
 * 
 */
export class Content extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        //this.style是为了继承用的
        let styles = {
            root: SL.create(SL.absolute(0, 0, 0, 0)).merge(this.style).merge({ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style)
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
}
Content.displayName = 'Container.Content';
Content.propTypes = {
    style: React.PropTypes.object,
};
Content.propInfo = {
    style: '样式',
}
/**
 * 使用场景描述
 */
Content.scene = '此组件设置了，绝对定位0,0,0,0和y轴的滚动。'
Content.defaultProps = {
}

export class ContentGroup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({ marginTop: '.3rem',position:'relative' }).merge(this.props.style).merge({background:this.props.background})
        }
        return (
            <div style={styles.root.o}>
                {this.props.children}
                <div style={{position:'absolute',width:'100%',height:1,bottom:0,background:this.props.background}}></div>
            </div>
        );
    }
}
ContentGroup.displayName = 'Container.ContentGroup';
ContentGroup.propTypes = {
    style:React.PropTypes.object,
    background:React.PropTypes.string,
};
ContentGroup.propInfo = {
    style: '样式',
    background:'背景色'
}
ContentGroup.defaultProps = {
    background:'#fff',
}
ContentGroup.scene = '此组件marginTop值.3rem,父级元素必须为或者overfollY:auto,或者overfollY:hidden,否则第一个会有bug，解决marginTop问题，设置了底部一个线覆盖掉list的最后一条线颜色和背景色相同'