import React from 'react';
import addons from '@kadira/storybook-addons';

export class WithNotes1 extends React.Component {
  render() {
    const { children, notes } = this.props;
    const channel = addons.getChannel();
console.log(children);
    // send the notes to the channel.
    channel.emit('kadira/notes/add_notes1', notes);
    // return children elements.
    return children;
  }
}