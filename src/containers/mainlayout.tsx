/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import {Header, Sidebar, NavigationBar, NavigationBarItem} from "../components/index";
import { Provider, connect} from 'react-redux';
//import { routerMiddleware, push } from 'react-router-redux'
import {hashHistory,browserHistory} from 'react-router';
import * as React from 'react';
interface IMainLayout extends React.Props<MainLayout> {
    sidebar: {
        active?:number;
        parent?:any[];
        child?:any[];
    };
    location?:any;
}
class MainLayout extends React.Component<IMainLayout & { open: (id: any) => void;active: (id: any,href:string) => void; }, any>{
    render() {
        //this.props.l
        //console.log(this);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <Header>
                    </Header>
                <div style= {{ display: "flex", flex: '1' }} >
                    <div style= {{ width: "235px", display: 'flex', flexDirection: 'column' }}>
                        <Sidebar {...this.props.sidebar} open={this.props.open} currentPath={this.props.location.pathname} handleOnClick={this.props.active}>
                            </Sidebar>
                        </div>
                    <div style={{ flex: "1" }}>
                        <header style={Global.styles.create(Global.styles.czjz).o}>
                        <NavigationBar>
                            <NavigationBarItem lable="首页"></NavigationBarItem>
                            </NavigationBar>
                            </header>
                            {this.props.children}
                        </div>
                    </div>
                </div>
        )
    }
}
const mapStateToProps = (state):IMainLayout => {
    return {
        sidebar:state.sidebar
    };
}
const mapDispatchToProps = (dispatch) => ({
    active: (id,href) => {
        dispatch({ type: 'sidebar-active',id });
        console.log("点击了子元素"+href);
        
        //dispatch({ type: 'router-open',path:href });
        hashHistory.push(href);
        //dispatch(push(href))
    },
    open: (id) => {
        console.log("点击open"+id);
        dispatch({ type: 'sidebar-open',id });
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);