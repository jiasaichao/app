import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import * as React from 'react';
import * as icons from '../utils/icons'
let Index = React.createClass({
    render: function () {
        return (
            <Container>
            <NavBar title="标题"></NavBar>
<List.Link lable='列表' href='/list'></List.Link>
<List.Link lable='表单' href='/form'></List.Link>
<List.Link lable='列表2'></List.Link>
            </Container>
            )
    }
})
export default Index;