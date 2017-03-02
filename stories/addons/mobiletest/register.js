import React from 'react';
import addons from '@kadira/storybook-addons';

const styles = {
  notesPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  },
};

export class Notes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { text: '' };
    this.onAddNotes = this.onAddNotes.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the notes and render it.
    channel.on('kadira/notes/add_notes1', this.onAddNotes);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes('');
    });
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener('kadira/notes/add_notes1', this.onAddNotes);
  }

  onAddNotes(text) {
    this.setState({ text });
  }

  render() {
    const { text } = this.state;
    const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : '';

    return (
      <div style={styles.notesPanel}>
        <div dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
      </div>
    );
  }
}

Notes.propTypes = {
  channel: React.PropTypes.object,
  api: React.PropTypes.object,
};

// Register the addon with a unique name.
addons.register('kadira/notes1', (api) => {
  // Also need to set a unique name to the panel.
  addons.addPanel('kadira/notes/panel1', {
    title: 'Notes1',
    render: () => (
      <Notes channel={addons.getChannel()} api={api} />
    ),
  });
});