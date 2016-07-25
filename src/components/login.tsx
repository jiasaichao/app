/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import {Alert} from "./alert";

let SL = Global.styles;
let CL = Global.colors;
class Login extends React.Component<{}, {}> {
    render() {
        let Acc= Alert.Base;
        let styles = {
            input:{ background: '#dde3ec', height: 43, color: '#8290a3', border: '1px solid #dde3ec',marginTop:10,width:'100%',paddingLeft:10 }
        }
        return (
            <div style={SL.create({
                height: '100%', background: Global.colors.mainBackground
            }).merge(SL.spjzcolumn).o}>
                <div style={SL.create({ marginTop: 100, background: '#fff', width: 400, padding: '10px 30px' }).merge(SL.spjzcolumn).o}>
                    <h2 style={{ color: CL.mainActive, fontSize: 28, margin: '20px 0 25p 0', lineHeight: '50px' }}>登录</h2>
                    <Alert.Close show={true} type='success'>警告111</Alert.Close>
                    <input placeholder='Username' style={styles.input} />
                    <input placeholder='Password' style={styles.input} />
                </div>
            </div>
        );
    }
    Submit() {
        window.location.href = "#index";
        //alert("提交成功")
    }
}

export {Login}