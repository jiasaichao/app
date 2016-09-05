import {NavBar, List, Container, Slider, NineGrid} from "../components/index";
import * as React from 'react';
import * as icons from "../utils/icons";
let ListPage = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <NavBar title="九宫格"></NavBar>
                <Container.Content style={{top:'.9rem'}}>
                    <List.SmallTitle lable="column默认3" />
                    <NineGrid.Root iconStyle={{fill:'#d80e40'}}>
                        <NineGrid.Item iconName={icons.Email} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Printer} lable='标题2'/>
                        <NineGrid.Item iconName={icons.User} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chat} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Refresh} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Shopping} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Right} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Chevron_Up} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                    </NineGrid.Root>
                    <List.SmallTitle lable="每行4个" />
                    <NineGrid.Root column='4' style={{borderBottom: '1px solid #ccc'}}>
                        <NineGrid.Item iconName={icons.Email} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Printer} lable='标题2'/>
                        <NineGrid.Item iconName={icons.User} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chat} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Refresh} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Shopping} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Right} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Chevron_Up} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                    </NineGrid.Root>
                    <List.SmallTitle lable="每行5个" />
                    <NineGrid.Root column='5' iconStyle={{fill:'#81d40b'}} style={{borderBottom: '1px solid #ccc'}}>
                        <NineGrid.Item iconName={icons.Email} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Printer} lable='标题2'/>
                        <NineGrid.Item iconName={icons.User} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chat} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Refresh} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Shopping} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Right} lable='标题1'/>
                        <NineGrid.Item iconName={icons.Chevron_Up} lable='标题2'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                        <NineGrid.Item iconName={icons.Chevron_Down} lable='标题3'/>
                    </NineGrid.Root>
                </Container.Content>
            </Container.Page>
        )
    }
})
export default ListPage;