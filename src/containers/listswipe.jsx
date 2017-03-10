import {NavBar, List, Container} from "../components/index";
import * as React from 'react';
let ListSwipePage = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <NavBar title="可移动操作列表"></NavBar>
                <List.Swipe label='可移动操作列表3'/>
                <List.Swipe label='可移动操作列表4'/>
                <List.Swipe label='可移动操作列表5'/>
                <List.Swipe label='可移动操作列表3'/>
                <List.Swipe label='可移动操作列表4'/>
                <List.Swipe label='可移动操作列表5'/>
            </Container.Page>
        )
    }
})
export default ListSwipePage;