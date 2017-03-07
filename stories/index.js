import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import { Root } from '../src/components/root';
import { List, Button, Container, NavBar } from '../src/components';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { BaseAlert } from '../src/actions/common';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Root>
      <Welcome showApp={linkTo('Button')} />
    </Root>
  ));

storiesOf('Container', module)
  .addWithInfo('页面容器', '', () => (
    <Container.Page>
      <Button.Submit lable='按钮222' />
      <Button.Submit lable='按钮232' />
    </Container.Page>
  ))
  .addWithInfo('内容容器', '', () => (
    <Container.Content>
      <Button.Submit lable='按钮222' />
      <Button.Submit lable='按钮232' />
    </Container.Content>
  ))
  .addWithInfo('内容分组容器', '', () => (
    <Container.Page style={{ background: '#F2F2F2' }}>
      <NavBar />
      <Container.ContentGroup>
        <List.Link lable='列表1'></List.Link>
        <List.Link lable='列表2'></List.Link>
        <List.Link lable='列表3'></List.Link>
      </Container.ContentGroup>
      <Container.ContentGroup>
        <List.Link lable='列表4'></List.Link>
        <List.Link lable='列表5'></List.Link>
        <List.Link lable='列表6'></List.Link>
      </Container.ContentGroup>
    </Container.Page>
  ));

storiesOf('NavBar', module)
  .addWithInfo('头部导航', '', () => (
    <Container.Page>
      <NavBar />
    </Container.Page>
  ))

storiesOf('Button', module)
  .addWithInfo('提交按钮', '如果存在href则不回执行onTap', () => (
    <div>
      <Button.Submit lable='按钮222' />
      <Button.Submit lable='按钮232' />
    </div>
  ))
  .add('with some emoji', () => (
    <WithNotes notes={'试试Here we use some emoji as the Button text. Isn\'t it look nice?'}>
      <div>22</div>
    </WithNotes>
  ));


storiesOf('List', module).addWithInfo('link', '', () => (
  <Container.Page>
    <NavBar />
    <List.Link lable='列表1'></List.Link>
    <List.Link lable='列表2'></List.Link>
    <List.Link lable='列表3'></List.Link>
    <List.Link lable='列表4'></List.Link>
  </Container.Page>
));
storiesOf('Alert', module).addWithInfo('BaseAlert', '', () => (
  <Root>
    <NavBar />
    <Button.Submit onTap={()=>{
BaseAlert('标题','内容');
      }} lable='按钮222' />
    <Button.Submit lable='按钮232' />
  </Root>
));
