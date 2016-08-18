import {NavBar,List,Container,Form} from "../components/index";
import * as React from 'react';
import * as icons from "../utils/icons";
let FormPage = React.createClass({
    render: function () {
        return (
            <Container>
            <NavBar title="表单"></NavBar>
<Form.Input leftIcon={icons.User} placeholder="用户名"  />
<Form.Input leftIcon={icons.Email} placeholder="邮箱"  />
<Form.Input leftIcon={icons.Printer} placeholder="传真"  />
            </Container>
            )
    }
})
export default FormPage;