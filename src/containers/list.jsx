import { NavBar, List, Container } from "../components/index";
import * as React from 'react';
let ListPage = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <NavBar title="列表"></NavBar>
                <List.Link label='列表3'></List.Link>
                <List.Link label='列表4' rightLabel='rightLabel'></List.Link>
                <List.Link label='列表6' rightLabel='状态展示'></List.Link>
            </Container.Page>
        )
    }
})
export default ListPage;