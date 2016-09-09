import {NavBar, List, Container, Dialog, Button,Gesture} from "../components/index";
import * as React from 'react';
import { connect} from 'react-redux';
import {Common, Global} from "../utils/common";
let SL = Global.styles;
let CN = Global.className;
export class DialogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            overlay: false,
            popupDown:false
        }
    }
    render() {
        let styles={
            popupDown:{}
        }
        return (
            <Container.Page>
                <Dialog.Modal title="提示标题" content="提示内容" show={this.state.modal} onCancel={() => { this.setState({ modal: false }) } } onOk={() => { this.setState({ modal: false }) } } />
                <Dialog.Overlay show={this.state.overlay}>
                    <div>
                        <div style={{ display: 'flex', height: '.6rem', fontSize: '.32rem' }}>
                            <Button.Base lable="取消" onTap={() => { document.activeElement.blur(); this.setState({ overlay: false }) } }/>
                            <span style={{
                                'flex': 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>评论</span>
                            <Button.Base lable="发送" onTap={() => { this.setState({ overlay: false }) } }/>
                        </div>
                        <div style={{ width: '100%',borderTop:'1px solid #e9e9e9',borderBottom:'1px solid #e9e9e9' }}>
                            <textarea
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    fontSize: '.32rem',
                                    height: '2rem',
                                    outline: 'none',
                                    padding: '.05rem',
                                    border:'none'
                                }}
                                placeholder="Er,评论.."></textarea>
                        </div>
                    </div>
                </Dialog.Overlay>
                 <Dialog.PopupDown show={this.state.popupDown} onMask={()=>{this.setState({ popupDown: false })}}>
                    <div style={{fontSize:'.32rem'}}>
                       <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{height:'.8rem',borderBottom:'1px solid #e9e9e9'}} onTap={()=>{this.setState({ popupDown: false })}}>
                       第二
                       </Gesture.Touchable>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{height:'.8rem',borderBottom:'1px solid #e9e9e9'}} onTap={()=>{this.setState({ popupDown: false })}}>
                       第二
                       </Gesture.Touchable>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{height:'.8rem',borderBottom:'1px solid #e9e9e9'}} onTap={()=>{this.setState({ popupDown: false })}}>
                       第三
                       </Gesture.Touchable>
                       <div style={{height:'.1rem',background:'#e9e9e9'}}></div>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{height:'.8rem',borderBottom:'1px solid #e9e9e9'}} onTap={()=>{this.setState({ popupDown: false })}}>
                       取消
                       </Gesture.Touchable>
                    </div>
                </Dialog.PopupDown>
                <NavBar title="列表" />
                <Button.Submit style={{marginTop:'.1rem'}} lable='确认Confirm' onTap={this._handleModal}/>
                <Button.Submit style={{marginTop:'.1rem'}} lable='整页弹出Overlay' onTap={() => { this.setState({ overlay: true }) } }/>
                <Button.Submit style={{marginTop:'.1rem'}} lable='下弹出PopupDown' onTap={() => { this.setState({ popupDown: true }) } }/>
            </Container.Page>
        )
    }
    _handleModal = () => {
        this.setState({ modal: true });
    }
}
let mapStateToProps = (state) => {
    return {
        common: state.common
    }
}

export default connect(mapStateToProps)(DialogPage);