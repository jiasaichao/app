
/**手势gesture*/
import {Common, Global} from "../utils/common";
import {Icon, Placeholder, Button} from "./index";
import Tappable from 'react-tappable';
import {hashHistory, browserHistory} from 'react-router';
import React from 'react';
import * as icons from "../utils/icons";

let SL = Global.styles;
let CN = Global.className;
/**
 * 手势 
 * style
 * onTap
 * className
 * classBase:'Tappable'
 * */
export class Root extends React.Component {
    constructor(props) {
        super(props)
        this.startX=null;
        this.startY=null;
        this.clientX=null;
        this.clientY=null;
        this.state={
            
        }
    }
    _offsetX=()=>{
        return this.clientX-this.startX;
    }
    _offsety=()=>{
        return this.clientY-this.startY;
    }
    render() {
        
        return (
            <div style={this.props.style}>
           {this.props.children}
            </div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    _touchStart = (e) => {
        this.startX=e.touches[0].clientX;
        this.startY=e.touches[0].clientY;
    }
    _touchMove = (e) => {
        this.clientX=e.touches[0].clientX;
        this.clientY=e.touches[0].clientY;
    }
    _handleTouchEnd = (e) => {
      
    }
}
Root.defaultProps = {
}