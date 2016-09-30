import {NavBar, List, Container, Dialog, Button, Gesture, Scroll, Placeholder} from "../components/index";
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
            popupDown: false
        }
    }
    render() {
        let styles = {
            popupDown: {},
            select: SL.create({
                background: '#fff',
                height: '1.6rem',
                position: 'absolute',
                opacity: .6,
                left: 0,
                right: 0,
                boxSizing: 'border-box'
            })

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
                        <div style={{ width: '100%', borderTop: '1px solid #e9e9e9', borderBottom: '1px solid #e9e9e9' }}>
                            <textarea
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    fontSize: '.32rem',
                                    height: '2rem',
                                    outline: 'none',
                                    padding: '.05rem',
                                    border: 'none'
                                }}
                                placeholder="Er,评论.."></textarea>
                        </div>
                    </div>
                </Dialog.Overlay>
                <Dialog.PopupDown show={this.state.popupDown} onMask={() => { this.setState({ popupDown: false }) } }>
                    <div style={{ fontSize: '.32rem' }}>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{ height: '.8rem', borderBottom: '1px solid #e9e9e9' }} onTap={() => { this.setState({ popupDown: false }) } }>
                            第二
                        </Gesture.Touchable>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{ height: '.8rem', borderBottom: '1px solid #e9e9e9' }} onTap={() => { this.setState({ popupDown: false }) } }>
                            第二
                        </Gesture.Touchable>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{ height: '.8rem', borderBottom: '1px solid #e9e9e9' }} onTap={() => { this.setState({ popupDown: false }) } }>
                            第三
                        </Gesture.Touchable>
                        <div style={{ height: '.1rem', background: '#e9e9e9' }}></div>
                        <Gesture.Touchable  classBase='Tappable-bg' className={CN.spczjz} style={{ height: '.8rem', borderBottom: '1px solid #e9e9e9' }} onTap={() => { this.setState({ popupDown: false }) } }>
                            取消
                        </Gesture.Touchable>
                    </div>
                </Dialog.PopupDown>
                <Dialog.PopupDown show={true} >
                    <div className={CN.czjz} style={{
                        background: '#e0dede',
                        fontSize: '.32rem',
                        height: '.8rem',
                        padding: '0 .2rem',
                        boxSizing: 'border-box',
                        borderBottom: '1px solid #bdbdbd'
                    }}><span>取消</span><Placeholder.Full/><span>确认</span></div>
                    <Scroll.Root itemHeight={(document.body.clientWidth / 7.5) * .8} maskElement={[
                        <div key='s1' style={styles.select.notmerge({ top: 0, zIndex: 1 }) }></div>,
                        <div key='s3' style={styles.select.notmerge({
                            top: '1.6rem', height: '.8rem', opacity: 1,
                            borderBottom: '1px solid #bdbdbd',
                            borderTop: '1px solid #bdbdbd', background: '#e9e9e9'
                        }) }></div>,
                        <div key='s2' style={styles.select.notmerge({ bottom: 0, zIndex: 1 }) }></div>
                    ]} style={{ height: '4rem', position: 'relative' }}>
                        <div style={{ fontSize: '.32rem', paddingTop: '1.6rem', paddingBottom: '1.6rem' }}>

                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第一
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第二
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第三
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第四
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第五
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第六
                            </div>
                            <div className={CN.spczjz} style={{ height: '.8rem' }} onTap={() => { this.setState({ popupDown: false }) } }>
                                第7
                            </div>
                        </div>
                    </Scroll.Root>

                </Dialog.PopupDown>
                <NavBar title="列表" />
                <Button.Submit style={{ marginTop: '.1rem' }} lable='确认Confirm' onTap={this._handleModal}/>
                <Button.Submit style={{ marginTop: '.1rem' }} lable='整页弹出Overlay' onTap={() => { this.setState({ overlay: true }) } }/>
                <Button.Submit style={{ marginTop: '.1rem' }} lable='下弹出PopupDown' onTap={() => { this.setState({ popupDown: true }) } }/>
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