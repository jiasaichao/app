export const User = {
    /**用户是否登录 */
    isLogin() {
        var loginFlag = false;
        var lUserId = window.getStringValue("lUserId");
        if (lUserId) {
            var channelType = window.getChannelType();
            //IOS
            if (channelType == 2 || channelType == "2") {
                try {
                    loginFlag = window.getUserDataCache("user_login_flag" + lUserId);

                } catch (e) {
                    //出现异常不做处理
                }
                //安卓
            } else {
                loginFlag = window.getCacheData("user_login_flag" + lUserId);
            }
        }
        return loginFlag;
    }
}