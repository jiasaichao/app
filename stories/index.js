import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import ButtonReadme from './button.md';
import welcomedoc from '../docs/welcome.md';
import withReadme from 'storybook-readme/with-readme';

import Button from './Button';
import Welcome from './Welcome';
document.getElementById('')
import css from '../build/dev/css/global.css';

//引入样式
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML=css.toString();
document.getElementsByTagName('HEAD').item(0).appendChild(style);
//end======================================================================
document.getElementById('root').style.height='100%';

window.onresize = function () {
    document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
};
document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");


storiesOf('Welcome', module).add('to Storybook', withReadme(welcomedoc,() => <Welcome showApp={linkTo('Button')} />));

storiesOf('Button', module).addDecorator(withKnobs)
  .add('with text',withReadme(ButtonReadme,() => <Button onClick={action('clicked')}>Hello Button {text('Label', 'Hello Button')}</Button>))
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
