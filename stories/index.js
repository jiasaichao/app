import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import ButtonReadme from './button.md';
import welcomedoc from '../docs/welcome.md';
import withReadme from 'storybook-readme/with-readme';

import Page from '../src/components/page'
import Touchable from '../src/components/touchable'

import Button from './Button';
import Welcome from './Welcome';
document.getElementById('')
import css from '../build/dev/css/global.css';

//引入样式
//start====================================================================
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


storiesOf('欢迎使用', module)
.add('运行', withReadme(welcomedoc,() =><Page> <Touchable>aaaa</Touchable> </Page>))
.add('结构', withReadme(welcomedoc,() =><Page><p>布局在一个100%宽和高，且溢出隐藏的body里，为了方便与统一布局</p></Page>));

storiesOf('List(列表)', module).addDecorator(withKnobs)
  .add('Base',withReadme(ButtonReadme,() => <Button onClick={action('clicked')}>Hello Button {text('Label', 'Hello Button')}</Button>))
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Button', module).addDecorator(withKnobs)
  .add('with text',withReadme(ButtonReadme,() => <Button onClick={action('clicked')}>Hello Button {text('Label', 'Hello Button')}</Button>))
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
