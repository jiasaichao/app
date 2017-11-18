import React from 'react';
import { Container } from '../components/base';
import { Page, Icon, Flex, Placeholder, Image, Text, TouchableFlex } from '../../src/components';
import { unreadCount } from '../../src/services/services';
export class ZhangDan extends Container {

    //region 生命周期
    constructor(props) {
        super(props)
    }
    state = {
        unreadCount: 0
    }
    render() {
        let { unreadCount } = this.state;
        let elunreadCount=null;
        if(unreadCount>0){
            elunreadCount=<Text  label={unreadCount} />;
        }
        return (
            <Page >
                <Flex vertical style={{ height: '2rem', background: '#f0f' }}>
                    <Flex style={{ height: '.2rem', width: '.3rem', background: '#f00' }}>
                    {elunreadCount}
                        
                    </Flex>
                    <Placeholder />
                    <Flex style={{ height: '.3rem', width: '.3rem', background: '#0ff' }}>

                    </Flex>
                </Flex>
            </Page>
        )

    }
    componentDidMount() {
        //window.alert('渲染时间：' + (new Date().getTime() - window.starttime + '渲染时间2：' + (new Date().getTime() - window.starttime2)));
        this.loadAllData();
    }

    //region back返回的回调
    refreshPage() {
    }
    //endregion

    //region 缓存页面openwindow的回调 
    openRefreshPage() {
    }
    //endregion

    //endregion

    //region 加载所有数据
    loadAllData = () => {
        unreadCount((data) => {
            this.setState({unreadCount:data.data.nMineUnreadCount});
        });
    }
    //endregion

    //region 事件


    //endregion


}