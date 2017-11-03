import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Flex } from './layout'
export function confirm(title, message, actions = [{ text: '确定' }], platform = 'ios') {
    let div: Element = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    const footer = actions.map((button) => {
        const orginPress = button.onPress || function () { };
        button.onPress = () => {
            const res = orginPress();
            if (res && res.then) {
                res.then(() => {
                    close();
                });
            } else {
                close();
            }
        };
        return button;
    });
}
class Modal extends Component {
    state = {

    }
    render() {
        <Flex style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
            <Flex style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                
            </Flex>
        </Flex>
    }
}