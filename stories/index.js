import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import { List } from '../src/components';
import { WithNotes } from '@kadira/storybook-addon-notes';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <WithNotes notes={'试试Here we use some emoji as the Button text. Isn\'t it look nice?'}>
      <Button onClick={action('clicked')}>1111😀 😎 👍 💯</Button>
    </WithNotes>
  )).addWithInfo(
    'simple usage',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (
      <div>
        <Button label="The Button" onClick={action('onClick')}/>
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
