import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List} from "../components/index";
import * as React from 'react';
let ListPage = React.createClass({
    render: function () {
        return (
            <div>
            <NavBar title="标题"></NavBar>
<List.Link lable='列表'></List.Link>
<List.Link lable='列表1' rightLable='rightLable'></List.Link>
<List.Link lable='列表2' rightLable='状态展示'></List.Link>
            </div>
            )
    }
})
export default ListPage;