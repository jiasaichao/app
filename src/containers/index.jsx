import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect} from 'react-redux';
import * as React from 'react';
import * as icons from '../utils/icons'
let Index = React.createClass({
    render: function () {
        return (
            <Container>
            <NavBar title="标题"></NavBar>
<List.Link lable='列表' href='/list'></List.Link>
<List.Link lable='表单' href='/form'></List.Link>
<List.Link lable='对话框' href='/dialog'></List.Link>
<List.Link lable='轮播' href='/slider'></List.Link>
<List.Link lable='可移动操作列表' href='/listswipe'></List.Link>
            </Container>
            )
    }
})
let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Index);