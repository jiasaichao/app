import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect} from 'react-redux';
import * as React from 'react';
import * as icons from '../utils/icons'
let Index = React.createClass({
    render: function () {
        return (
            <Container.Page>
            <NavBar title="首页" back={false}></NavBar>
<List.Link lable='列表' href='/list'></List.Link>
<List.Link lable='表单' href='/form'></List.Link>
<List.Link lable='对话框' href='/dialog'></List.Link>
<List.Link lable='轮播' href='/slider'></List.Link>
<List.Link lable='九宫格' href='/ninegrid'></List.Link>
<List.Link lable='全屏滚动' href='/fullpage'></List.Link>
<List.Link lable='可移动操作列表' href='/listswipe'></List.Link>
<List.Link lable='滚动' href='/scroll'></List.Link>
<List.Link lable='滑动选择' href='/select'></List.Link>
<List.Link lable='头像上传' href='/imagecrop'></List.Link>
<List.Link lable='测试244' href='/test'></List.Link>
            </Container.Page>
            )
    }
})
let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Index);