import {NavBar, List, Container, Button, Icon, Animate} from "../components/index";
import React from 'react';
import {Motion, spring} from 'react-motion';
class TestPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ background: 'red' }}>
                
                <Animate.Loop styles={[['op',1,0.5],['x',0,20]]}>
                    {value => {
                        return (<div  style={{ height: '30px', position: 'relative', opacity: value.op }}>
                            <Icon.Normal style={{ width: '30px', height: '30px', position: 'absolute', top: value.x + 'px' }} iconName='#chevron-up'/>
                        </div>)
                    } }
                </Animate.Loop>
            </div>)
    }
}
export default TestPage;