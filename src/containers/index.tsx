import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List} from "../components/index";
import * as React from 'react';
let Index = React.createClass({
    render: function () {
        return (
            <div>
            <NavBar title="标题"></NavBar>
<List.Link lable='列表' href='list'></List.Link>
<List.Link lable='列表1'></List.Link>
<List.Link lable='列表2'></List.Link>
            </div>
            )
    }
})
export default Index;