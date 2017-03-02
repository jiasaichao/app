import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import { List, Button } from '../src/components';
import { WithNotes } from '@kadira/storybook-addon-notes';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
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
  )).addWithInfo(
  'simple usage',
  `
      This is the basic usage with the button with providing a label to show the text.
    `,
  () => (
    <div>

      <br />
      <p>
        Click the "?" mark at top-right to view the info.
        </p>
    </div>
  ),
);

storiesOf('List', module).add('link', () => (
  <List.Link lable='列表3'></List.Link>
));
