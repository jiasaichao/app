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

export class Mobile extends React.Component {
    constructor(...args) {
        super(...args);
    }
    componentDidMount() {
        document.querySelector('iframe').parentNode.parentNode.style.display = 'flex';
        document.querySelector('iframe').parentNode.parentNode.style.justifyContent = 'center';
        document.querySelector('iframe').parentNode.style.width = '375px';
        //console.log('获取x',document.getElementById('root-container').parentNode.nextSibling)
    }
    render() {
        return (
            <div style={styles.notesPanel}>
                <select name="" id="" defaultValue='iphone6' onChange={this.setMobile} ref={(v) => this.type = v}>
                    <option value="custom">自定义</option>
                    <option value="pc">pc</option>
                    <option value="iphone5">iphone 5</option>
                    <option value="iphone6">iphone 6</option>
                    <option value="iphone6p">iphone 6p</option>
                </select>
                <label>宽度</label>
                <input id='mobile-width' disabled type="text" defaultValue='375px' ref={(v) => this.width = v} onChange={this.setLayout} />
                <label>高度</label>
                <input id='mobile-height' disabled type="text" defaultValue='100%' ref={(v) => this.height = v} onChange={this.setLayout} />
            </div>
        );
    }
    setLayout = () => {
        document.querySelector('iframe').parentNode.style.width = this.width.value;
        document.querySelector('iframe').parentNode.style.height = this.height.value;
    }
    setMobile = (e) => {
        console.log('fffffff', this.type.value);
        switch (this.type.value) {
            case 'custom':
                //document.getElementById('mobile-width').dis
                document.getElementById('mobile-width').disabled=false;
                document.getElementById('mobile-height').disabled=false;
                break;
            case 'pc':
                this.width.value = '100%'                
                document.getElementById('mobile-width').disabled=true;
                document.getElementById('mobile-height').disabled=true;
                break;
            case 'iphone5':
                this.width.value = '320px'
                document.getElementById('mobile-width').disabled=true;
                document.getElementById('mobile-height').disabled=true;
                //document.querySelector("html").setAttribute("style", "font-size:" + document.body.clientWidth / 7.5 + "px");
                break;
            case 'iphone6':
                this.width.value = '375px'
                document.getElementById('mobile-width').disabled=true;
                document.getElementById('mobile-height').disabled=true;
                break;
            case 'iphone6p':
                this.width.value = '414px'
                document.getElementById('mobile-width').disabled=true;
                document.getElementById('mobile-height').disabled=true;
                break;
        }
        this.setLayout();
    }
}

Mobile.propTypes = {
    channel: React.PropTypes.object,
    api: React.PropTypes.object,
};

// Register the addon with a unique name.
addons.register('jsc/mobile', (api) => {
    // Also need to set a unique name to the panel.
    addons.addPanel('jsc/mobile/panel', {
        title: '手机模式',
        render: () => (
            <Mobile channel={addons.getChannel()} api={api} />
        ),
    });
});