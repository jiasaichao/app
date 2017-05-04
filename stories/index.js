import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import { Root } from '../src/components/root';
import { List, Button, Container, NavBar, TabBar, Icon, NineGrid } from '../src/components';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { BaseAlert } from '../src/actions/common';
import * as icons from "../src/utils/icons";
import { withKnobs, text, boolean, number, select } from '@kadira/storybook-addon-knobs';
import Spring from '../src/components/spring';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Root>
      <Welcome showApp={linkTo('Button')} />
    </Root>
  ));

storiesOf('Container', module)
  .addWithInfo('页面容器', '', () => (
    <Container.Page>
      <Button.Submit label='按钮222' />
      <Button.Submit label='按钮232' />
    </Container.Page>
  ))
  .addWithInfo('内容容器', '', () => (
    <Container.Content>
      <Button.Submit label='按钮222' />
      <Button.Submit label='按钮232' />
    </Container.Content>
  ))
  .addWithInfo('内容分组容器', '', () => (
    <Container.Page style={{ background: '#F2F2F2' }}>
      <NavBar />
      <Container.ContentGroup>
        <List.Link label='列表1'></List.Link>
        <List.Link label='列表2'></List.Link>
        <List.Link label='列表3'></List.Link>
      </Container.ContentGroup>
      <Container.ContentGroup>
        <List.Link label='列表4'></List.Link>
        <List.Link label='列表5'></List.Link>
        <List.Link label='列表6'></List.Link>
      </Container.ContentGroup>
    </Container.Page>
  ));

storiesOf('NavBar', module)
  .addDecorator(withKnobs)
  .addWithInfo('头部导航', '', () => (
    <Container.Page>
      <NavBar label={text('label', '头部标题')} right={<Button label='筛选' onTap={() => { }} />} />
    </Container.Page>
  ))

storiesOf('Button', module)
  .addWithInfo('提交按钮', '如果存在href则不回执行onTap', () => (
    <div>
      <Button.Submit label='按钮222' />
      <Button.Submit label='按钮232' />
    </div>
  ))
  .add('with some emoji', () => (
    <WithNotes notes={'试试Here we use some emoji as the Button text. Isn\'t it look nice?'}>
      <div>22</div>
    </WithNotes>
  ));

storiesOf('Icon', module)
  .addWithInfo('图标', '', () => (
    <Container.Page>
      <Icon iconName={icons.Email} color='#f66' />
    </Container.Page>
  ));

storiesOf('List', module).addWithInfo('link', '', () => (
  <Container.Page>
    <NavBar label='头部标题' />
    <List.Link label='列表1'></List.Link>
    <List.Link label='列表2'></List.Link>
    <List.Link label='列表3'></List.Link>
    <List.Link label='列表4'></List.Link>
  </Container.Page>
));
storiesOf('Alert', module).addWithInfo('BaseAlert', '', () => (
  <Root>
    <NavBar />
    <Button.Submit onTap={() => {
      BaseAlert('标题', '内容');
    }} label='按钮222' />
    <Button.Submit label='按钮232' />
  </Root>
));
storiesOf('NineGrid', module).addWithInfo('NineGrid', '', () => (
  <Root>
    <NavBar />
    <NineGrid iconStyle={{ fill: '#d80e40' }}>
      <NineGrid.Item iconName={icons.Email} label='标题1' />
      <NineGrid.Item iconName={icons.Printer} label='标题2' />
      <NineGrid.Item iconName={icons.User} label='标题3' />
      <NineGrid.Item iconName={icons.Chat} label='标题1' />
      <NineGrid.Item iconName={icons.Refresh} label='标题2' />
      <NineGrid.Item iconName={icons.Shopping} label='标题3' />
      <NineGrid.Item iconName={icons.Chevron_Right} label='标题1' />
      <NineGrid.Item iconName={icons.Chevron_Up} label='标题2' />
      <NineGrid.Item iconName={icons.Chevron_Down} label='标题3' />
      <NineGrid.Item iconName={icons.Chevron_Down} label='标题3' />
    </NineGrid>
    <NineGrid column={5} iconStyle={{ fill: '#d80e40' }}>
      <NineGrid.Item iconName={icons.Email} label='标题1' />
      <NineGrid.Item iconName={icons.Printer} label='标题2' />
      <NineGrid.Item iconName={icons.User} label='标题3' />
      <NineGrid.Item iconName={icons.Chat} label='标题1' />
      <NineGrid.Item iconName={icons.Refresh} label='标题2' />
      <NineGrid.Item iconName={icons.Shopping} label='标题3' />
      <NineGrid.Item iconName={icons.Chevron_Right} label='标题1' />
      <NineGrid.Item iconName={icons.Chevron_Up} label='标题2' />
      <NineGrid.Item iconName={icons.Chevron_Down} label='标题3' />
      <NineGrid.Item iconName={icons.Chevron_Down} label='标题3' />
    </NineGrid>
  </Root>
));

const tabbarLabel = '选中项';
const tabbaroptions = {
  111: '左',
  222: '中',
  333: '右'
}
const tabdefaultValue = '222'

storiesOf('TabBar', module)
  .addDecorator(withKnobs)
  .addWithInfo('TabBar', '', () => (
    <Root>
      <NavBar label='头部标题' />
      <TabBar>
        <TabBar.Item label='aaaaa' iconName={icons.Email} selected={111 == select(tabbarLabel, tabbaroptions, tabdefaultValue)}>
          <div>111</div>
        </TabBar.Item>
        <TabBar.Item iconName={icons.Printer} selected={222 == select(tabbarLabel, tabbaroptions, tabdefaultValue)}>
          <div>2222</div>
        </TabBar.Item>
        <TabBar.Item label='bbbbb' iconName={icons.User} selected={333 == select(tabbarLabel, tabbaroptions, tabdefaultValue)}>
          <div>33333</div>
        </TabBar.Item>
      </TabBar>
    </Root>
  ));
storiesOf('惯性运动', module)
  .addWithInfo('惯性运动', '', () => (
    <div>
      <Spring />
    </div>
  ));