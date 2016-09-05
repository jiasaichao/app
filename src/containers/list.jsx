import {NavBar,List,Container} from "../components/index";
import * as React from 'react';
let ListPage = React.createClass({
    render: function () {
        return (
            <Container.Page>
            <NavBar title="列表"></NavBar>
<List.Link lable='列表3'></List.Link>
<List.Link lable='列表4' rightLable='rightLable'></List.Link>
<List.Link lable='列表5' rightLable='状态展示'></List.Link>
            </Container.Page>
            )
    }
})
export default ListPage;