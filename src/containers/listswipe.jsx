import {NavBar, List, Container} from "../components/index";
import * as React from 'react';
let ListSwipePage = React.createClass({
    render: function () {
        return (
            <Container>
                <NavBar title="可移动操作列表"></NavBar>
                <List.Swipe lable='可移动操作列表3'/>
                <List.Swipe lable='可移动操作列表4'/>
                <List.Swipe lable='可移动操作列表5'/>
                <List.Swipe lable='可移动操作列表3'/>
                <List.Swipe lable='可移动操作列表4'/>
                <List.Swipe lable='可移动操作列表5'/>
            </Container>
        )
    }
})
export default ListSwipePage;