import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import { List, Button, Container } from '../src/components';
import { WithNotes } from '@kadira/storybook-addon-notes';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
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
    <Container.ContentGroup>
      <Button.Submit lable='按钮222' />
      <Button.Submit lable='按钮232' />
    </Container.ContentGroup>
  ));

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


storiesOf('List', module).add('link', () => (
  <List.Link lable='列表3'></List.Link>
));
