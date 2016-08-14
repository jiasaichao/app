/// <reference path="../../typings/browser.d.ts" />
import {Header, Sidebar, NavigationBar, NavigationBarItem, Portlet, Alert, Table} from "../components/index";
import * as React from 'react';
export default React.createClass({
    render: function () {
        return (
            <Portlet title='表格实例'>
            <Table columns={[{ title: '列1', dataIndex: 'name' }, { title: '列2', dataIndex: 'name1' }]} dataSource={[{ name: '内容1', name1: '内容2' }, { name: '内容1', name1: '内容2' }, { name: '内容1', name1: '内容2' }]}></Table>
                </Portlet>
        )
    }
})