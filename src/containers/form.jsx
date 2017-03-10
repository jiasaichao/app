import { NavBar, List, Container, Form, Button } from "../components/index";
import * as React from 'react';
import * as icons from "../utils/icons";
let FormPage = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <NavBar title="表单"></NavBar>
                <Form.Input leftIcon={icons.User} placeholder="用户名" />
                <Form.Input leftIcon={icons.Email} placeholder="邮箱" />
                <Form.Input leftIcon={icons.Printer} placeholder="传真" />
                <Form.Switch leftIcon={icons.Refresh} label="刷新" />
                <Button.Submit label="确认" style={{ marginTop: '.2rem' }} />
            </Container.Page>
        )
    }
})
export default FormPage;