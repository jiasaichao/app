/// <reference path="../../typings/browser.d.ts" />
import {Common, Global,Colors} from "../utils/common";
import * as React from 'react';
interface IPSidebar extends React.Props<Sidebar> {
    active?:number;
    parent?:any[];
    child?:any[];
    open:(id)=>void;
    handleOnClick:(id,href:string)=>void;
    currentPath:string;
}
interface ISSidebar {
    /**选中项key*/
    //active?: number,
}
class Sidebar extends React.Component<IPSidebar, ISSidebar>{
    // static defaultProps = { maxId: 0 }
    maxId = 0;
    constructor(props: IPSidebar) {
        super(props);
        //this.state = { active: 0 };
    }
    render() {
        let self = this;
        //let active=this.props.active||this.props.items[0].id;
        let s = this.props.parent.map((value,index) => {
            let active=false;
            let si = _.filter(this.props.child,{pid:value.id}).map((items,itemsIndex) => {
                if (items.id===this.props.active) {
                    active=true;
                }
                //console.log(items.id+':'+this.props.active+':'+(items.id===this.props.active));
                return <SidebarItem lable={items.title} active={items.href===this.props.currentPath}  key={items.id}  handleOnClick={()=>{this.props.handleOnClick(items.id,items.href)}}></SidebarItem>;
            });
            //console.log(value.open);
            return <SidebarItems lable={value.title} active={active} open={value.open} key={value.id} handleOnClick={()=>this.props.open(value.id)}>{si}</SidebarItems>
        });
        // var children = this.props.children;
        // let childrenElements = React.Children.map(children, function (el: React.ReactElement<IPSidebarItems>, index) {
        //     if ((el.type as any).name === "SidebarItems") {
        //         let i = React.cloneElement(el, { key: el.key, lable: el.props.lable });
        //         return i;
        //     }
        // });
        return (<div style={{ height: "100%",flex:'1', background: Global.colors.bgSidebar, fontSize:'14px' }}>
                <ul>
                    {s}
                </ul>
            </div>);
    }
}

interface IPSidebarItems extends React.Props<SidebarItems> {
    /**显示的文字 */
    lable: string;
    /**是否展开,默认false*/
    open?:boolean;
    /**是否是选中项，默认false */
    active?:boolean;
    handleOnClick:()=>void;
}
interface ISSidebarItems {
    /**是否是选中项，默认false */
    active?:boolean;
}
class SidebarItems extends React.Component<IPSidebarItems, ISSidebarItems>{
    /**高度，默认值为-1，-1说明高度还没有计算出来。*/
    height = -1;
    constructor(props) {
        super(props);
        this.state = { 
            active:this.props.active||false
             };
    }
    render() {
        let open= this.props.open||false;
        let styles = {
            children: Common.prepareStyles({
                transition: "height .3s",
                display: "block",
                overflow:"hidden"
            }),
            showButton:Common.prepareStyles({ height: 41, paddingLeft: Global.padding, justifyContent: "space-between" })
        };
        if (this.state.active) {
        }
        else{
            if (open) {
            styles.showButton.merge({
                background:Colors.bgSidebarMouse,
                color:Colors.fontSidebarMouse
            });
            }
        }
        let chevronName: string;
        let self = this;
        if (open) {
            if (this.height !== -1) {
                styles.children.merge({ height: this.height });
            }
            //styles.children.merge({ height: (this.refs["aaaac"] as Element).clientHeight });
            chevronName = "icon-chevron-down";
        }
        else {
            
        //console.log(this.height);
            if (this.height !== -1) {
                styles.children.merge({ height: 0 });
            }
            chevronName = "icon-chevron-left";
        }
        /**子元素*/
        let i: JSX.Element;
        i = <ul style={styles.children.o} ref="aaaac">{this.props.children}</ul>;
        return <li style={{ borderBottom:"1px solid #3D4957" }}>
                   
                    {i}
                </li>
    }
    componentDidMount() {
        this.height = (this.refs["aaaac"] as Element).clientHeight;
        //重新渲染，因为计算高度需要在元素渲染后才能计算出来。
        this.forceUpdate();
    }
    // handleOnClick() {
    //     this.setState({ open: !this.state.open });
    // }
    // handleActive=()=>{
    //     this.setState({active:true});
    // }
}

interface ISidebarItem extends React.Props<SidebarItem> {
    lable: string;
    handleOnClick:()=>void;
    active:boolean; 
}
class SidebarItem extends React.Component<ISidebarItem, {}>{
    render() {
        //let href=this.props.href||'javascript:;';
        let styles = {
            style:Common.prepareStyles({ height: 31, paddingLeft: 43 })
        }
        //console.log('选中项'+this.props.active);
        if (this.props.active) {
            //console.log('选中项'+this.props.key);
            styles.style.merge(Global.colors.sidebaritem.Active);
        }
        return (
            <li>
            </li>
        );
    }
}

export {Sidebar}
// export {SidebarItems}
// export {SidebarItem}