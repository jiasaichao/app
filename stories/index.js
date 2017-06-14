import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import ButtonReadme from './button.md';
import withReadme from 'storybook-readme/with-readme';

import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module).addDecorator(withKnobs)
  .add('with text',withReadme(ButtonReadme,() => <Button onClick={action('clicked')}>Hello Button {text('Label', 'Hello Button')}</Button>))
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
