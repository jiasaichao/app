import { verifyIdentity } from '../services/services';
// import Modal from 'antd-mobile/lib/modal';
// const alert = Modal.alert;
// window._TTPopups.open2({
//     content: "请先设置支付密码。",
//     cancelBtn: "否",
//     submitBtn: "是",
//     closeCallBack: () => window.openWindow("myCenter/securityCenter/payPwdSet.htm", "设置支付密码", "", 0, "")
// });
export const User = {
    /**用户是否登录 */
    isLogin() {
        if (DEVELOPMENT) {
            return true
        }
        var flag = true;
        var lUserId = window.getStringValue("lUserId");//获取用户id
        var strLoginToken = window.getStringValue("strLoginToken");
        if (!lUserId || "null" == lUserId || !strLoginToken || "null" == strLoginToken) {
            flag = false;
        }
        return flag;
        // var loginFlag = false;
        // var lUserId = window.getStringValue("lUserId");
        // if (lUserId) {
        //     var channelType = window.getChannelType();
        //     //IOS
        //     if (channelType == 2 || channelType == "2") {
        //         try {
        //             loginFlag = window.getUserDataCache("user_login_flag" + lUserId);

        //         } catch (e) {
        //             //出现异常不做处理
        //         }
        //         //安卓
        //     } else {
        //         loginFlag = window.getCacheData("user_login_flag" + lUserId);
        //     }
        // }
        // alert('登录状态:'+loginFlag)
        // return loginFlag;
    },
    /**等效实名验证，如果没有实名验证各种提示，通过走回掉函数 */
    verifyIdentity(callBack) {
        verifyIdentity((data) => {
            let nCode = data.data.__nCode;
            if (nCode == 0) {//实名认证和支付密码都OK,回调各业务
                try {
                    callBack();
                } catch (error) {
                    //addMessage(error.message);
                }

            } else if (nCode == 1) {//用户未实名认证
                // alert('', '请先进行实名认证。', [
                //     { text: '否', onPress: () => { } },
                //     { text: '是', onPress: () => window.openWindow("myCenter/securityCenter/accountIdCard.htm", "实名认证", "nIdentityState=10", 0, "") },
                // ])
                window._TTPopups.open2({
                    content: "请先进行实名认证。",
                    cancelBtn: "否",
                    submitBtn: "是",
                    closeCallBack: function (val) {
                        if (val == 1) {
                            window.openWindow("myCenter/securityCenter/accountIdCard.htm", "实名认证", "nIdentityState=10", 0, "");
                        }
                    }
                });
            } else if (nCode == 2) {//未设置支付密码
                // alert('', '请先设置支付密码。', [
                //     { text: '否', onPress: () => { } },
                //     { text: '是', onPress: () => window.openWindow("myCenter/securityCenter/payPwdSet.htm", "设置支付密码", "", 0, "") },
                // ])
                window._TTPopups.open2({
                    content: "请先设置支付密码。",
                    cancelBtn: "否",
                    submitBtn: "是",
                    closeCallBack: function (val) {
                        if (val == 1) {
                            window.openWindow("myCenter/securityCenter/payPwdSet.htm", "设置支付密码", "", 0, "")
                        }
                    }
                });
            } else if (nCode == 3) {
                window.info("银行卡变更中，请稍候重试");
            } else if (nCode == 4) {
                window.info("银行卡变更失败，请联系客户经理");
            } else if (nCode == 5) {
                window.info("实名认证中，请耐心等待");
            } else if (nCode == 6) {//实名认证失败，进行提示用户是否重新认证
                // alert('', '实名认证失败，请重新认证。', [
                //     { text: '否', onPress: () => { } },
                //     { text: '是', onPress: () => window.openWindow("myCenter/securityCenter/accountIdCard.htm", "实名认证", "nIdentityState=30", 0, "") },
                // ])
                window._TTPopups.open2({
                    content: "实名认证失败，请重新认证。",
                    cancelBtn: "否",
                    submitBtn: "是",
                    closeCallBack: function (val) {
                        if (val == 1) {
                            window.openWindow("myCenter/securityCenter/accountIdCard.htm", "实名认证", "nIdentityState=30", 0, "")
                        }
                    }
                });
            } else {
                window.info('实名认证异常');
            }
        });
    }
}