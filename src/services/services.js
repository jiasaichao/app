import Toast from 'antd-mobile/lib/toast';
// function apiSend(serviceName, transName, params) {
//     let cdoRequest = new window.CDO();
//     cdoRequest.setStringValue("strServiceName", serviceName);
//     cdoRequest.setStringValue("strTransName", transName);
// }

window.raiseTransCallBack = {
    maxId: 0,
    loadList: new Set(),
    DEV_DataList: {}
};
if (DEVELOPMENT) {
    //window.mockList = { "CreditService_queryCredit": { "cdoCredit": { "lCreditBalance0": 100000000, "lCreditBalance1": 0, "lCreditUsed": 70466962, "lCreditAvailable": 29533038, "lCreditBalance": 100000000 } }, "NoticeMsgConsumerService_getMineMsgCount": {}, "AccountUserBIQueryService_getAccountAmount": { "cdoAccountAmount": { "lAccountBalance0": 390931, "lAccountFrozen0": 0, "lAvailablebalance0": 390931, "lAccountBalance1": 6637571, "lAccountFrozen1": 13526, "lAvailablebalance1": 6624045, "lAccountBalance2": 0, "lAccountFrozen2": 0, "lAvailablebalance2": 0, "lAccountBalance3": 0, "lAccountFrozen3": 0, "lAvailablebalance3": 0, "lAccountBalance4": 0, "lAccountFrozen4": 0, "lAvailablebalance4": 0, "lAccountBalance5": 0, "lAccountFrozen5": 0, "lAvailablebalance5": 0, "lAccountBalance6": 0, "lAccountFrozen6": 0, "lAvailablebalance6": 0, "lAccountBalance7": 0, "lAccountFrozen7": 0, "lAvailablebalance7": 0, "lAccountBalance8": 0, "lAccountFrozen8": 0, "lAvailablebalance8": 0, "lAccountBalance9": 2000000, "lAccountFrozen9": 0, "lAvailablebalance9": 2000000 } }, "UserService_queryIdentity": { "cdoState": { "nIdentityState": 100, "strName": "刘依依", "nProtocolState": 100, "nProtocolProductionState": 0, "strIdentity": "110101198701010134", "strBankcardNo": "6225880112364569", "strReserveMobile": "13096961233", "strProtocolCode": "dkxy_1491015569118", "nBankcardState3": 0, "nVerifyIsReplace": 0, "strIdVerifyRes": "实名认证成功", "strThirdResultDesc": "", "nBankcardState": 100 }, "nProtocolState": 100, "nProtocolProductionState": 0, "strProtocolCode": "dkxy_1491015569118", "strName": "刘依依", "strIdVerifyRes": "实名认证成功", "nIdentityState": 100, "nBankcardState": 100, "nBankcardState3": 0 } }
    //window.mockList = { "CreditService_queryCredit": { "cdoCredit": { "lCreditBalance0": 100000000, "lCreditBalance1": 0, "lCreditUsed": 70690176, "lCreditBalance2": 0, "lCreditUsed2": 0, "lCreditBalance3": 0, "lCreditUsed3": 0, "lCreditBalance4": 0, "lCreditUsed4": 0, "lCreditBalance5": 0, "lCreditUsed5": 0, "lCreditBalance6": 0, "lCreditUsed6": 0, "lCreditBalance7": 0, "lCreditUsed7": 0, "lCreditAvailable": 29309824, "lCreditBalance": 100000000 } }, "BorrowerService_getGrant": { "cdoGrant": { "dtGrantTimeBegin": "2017-09-18 16:41:16", "dtGrantTimeEnd": "2018-09-18 16:41:16", "nAppointRepayDate": 2, "nGrantState": 2, "nCreditState": 3, "nGrantQuota": 50000000, "nInnerSecCode": 4 }, "cdoUser": { "lUserId": 4000014, "nMobileState": 1, "strMobile": "4LIFCfHof/0rdW+e712x1A==", "strSalesmanName": "客户经理", "strSalesmanMobile": "ZFo3avT0lzMwuOgUVYCRIQ==", "dtCreateTime": "2017-03-31 16:23:19", "nMaskCredit": 0, "nCreditWay": 0, "nRegCreditWay": 0 }, "nGrant": 1 }, "AccountUserBIQueryService_getAccountAmount": { "cdoAccountAmount": { "lAccountBalance0": 390931, "lAccountFrozen0": 0, "lAvailablebalance0": 390931, "lAccountBalance1": 6593920, "lAccountFrozen1": 13526, "lAvailablebalance1": 6580394, "lAccountBalance2": 0, "lAccountFrozen2": 0, "lAvailablebalance2": 0, "lAccountBalance3": 0, "lAccountFrozen3": 0, "lAvailablebalance3": 0, "lAccountBalance4": 0, "lAccountFrozen4": 0, "lAvailablebalance4": 0, "lAccountBalance5": 0, "lAccountFrozen5": 0, "lAvailablebalance5": 0, "lAccountBalance6": 0, "lAccountFrozen6": 0, "lAvailablebalance6": 0, "lAccountBalance7": 0, "lAccountFrozen7": 0, "lAvailablebalance7": 0, "lAccountBalance8": 0, "lAccountFrozen8": 0, "lAvailablebalance8": 0, "lAccountBalance9": 2000000, "lAccountFrozen9": 0, "lAvailablebalance9": 2000000 } }, "NoticeMsgConsumerService_getMineMsgCount": {}, "UserService_queryIdentity": { "cdoState": { "nIdentityState": 100, "strName": "刘依依", "nProtocolState": 100, "nProtocolProductionState": 0, "strIdentity": "110101198701010134", "strBankcardNo": "6225880112364569", "strReserveMobile": "13096961233", "strProtocolCode": "dkxy_1491015569118", "nBankcardState3": 0, "nVerifyIsReplace": 0, "strIdVerifyRes": "实名认证成功", "strThirdResultDesc": "", "nBankcardState": 100 }, "nProtocolState": 100, "nProtocolProductionState": 0, "strProtocolCode": "dkxy_1491015569118", "strName": "刘依依", "strIdVerifyRes": "实名认证成功", "nIdentityState": 100, "nBankcardState": 100, "nBankcardState3": 0 } }
    //window.mockList = { "BorrowerService_getGrant": { "cdoGrant": { "dtGrantTimeBegin": "2017-09-18 16:41:16", "dtGrantTimeEnd": "2018-09-18 16:41:16", "nAppointRepayDate": 2, "nGrantState": 2, "nCreditState": 3, "nGrantQuota": 50000000, "nInnerSecCode": 4 }, "cdoUser": { "lUserId": 4000014, "nMobileState": 1, "strMobile": "4LIFCfHof/0rdW+e712x1A==", "strSalesmanName": "客户经理", "strSalesmanMobile": "ZFo3avT0lzMwuOgUVYCRIQ==", "dtCreateTime": "2017-03-31 16:23:19", "nMaskCredit": 0, "nCreditWay": 0, "nRegCreditWay": 0 }, "nGrant": 1 }, "CreditService_queryCredit": { "cdoCredit": { "lCreditBalance0": 100000000, "lCreditBalance1": 0, "lCreditUsed": 70690288, "lCreditBalance2": 0, "lCreditUsed2": 0, "lCreditBalance3": 0, "lCreditUsed3": 0, "lCreditBalance4": 0, "lCreditUsed4": 0, "lCreditBalance5": 0, "lCreditUsed5": 0, "lCreditBalance6": 0, "lCreditUsed6": 0, "lCreditBalance7": 0, "lCreditUsed7": 0, "lCreditAvailable": 29309712, "lCreditBalance": 100000000 } }, "AccountUserBIQueryService_getAccountAmount": { "cdoAccountAmount": { "lAccountBalance0": 390931, "lAccountFrozen0": 0, "lAvailablebalance0": 390931, "lAccountBalance1": 6591550, "lAccountFrozen1": 13526, "lAvailablebalance1": 6578024, "lAccountBalance2": 0, "lAccountFrozen2": 0, "lAvailablebalance2": 0, "lAccountBalance3": 0, "lAccountFrozen3": 0, "lAvailablebalance3": 0, "lAccountBalance4": 0, "lAccountFrozen4": 0, "lAvailablebalance4": 0, "lAccountBalance5": 0, "lAccountFrozen5": 0, "lAvailablebalance5": 0, "lAccountBalance6": 0, "lAccountFrozen6": 0, "lAvailablebalance6": 0, "lAccountBalance7": 0, "lAccountFrozen7": 0, "lAvailablebalance7": 0, "lAccountBalance8": 0, "lAccountFrozen8": 0, "lAvailablebalance8": 0, "lAccountBalance9": 2000000, "lAccountFrozen9": 0, "lAvailablebalance9": 2000000 } }, "UserService_queryIdentity": { "cdoState": { "nIdentityState": 100, "strName": "刘依依", "nProtocolState": 100, "nProtocolProductionState": 0, "strIdentity": "110101198701010134", "strBankcardNo": "6225880112364569", "strReserveMobile": "13096961233", "strProtocolCode": "dkxy_1491015569118", "nBankcardState3": 0, "nVerifyIsReplace": 0, "strIdVerifyRes": "实名认证成功", "strThirdResultDesc": "", "nBankcardState": 100 }, "nProtocolState": 100, "nProtocolProductionState": 0, "strProtocolCode": "dkxy_1491015569118", "strName": "刘依依", "strIdVerifyRes": "实名认证成功", "nIdentityState": 100, "nBankcardState": 100, "nBankcardState3": 0 }, "NoticeMsgConsumerService_getMineMsgCount": { "dtnow": "2017-10-27 15:58:28", "nMineUnreadCount": 64 } }
    window.mockList = { "NoticeMsgConsumerService_getMineMsgCount": { "dtnow": "2017-11-07 10:47:03", "nMineUnreadCount": 1 }, "UserService_queryIdentity": { "cdoState": { "nIdentityState": 100, "strName": "安立国", "nProtocolState": 10, "nProtocolProductionState": 0, "strIdentity": "152801198301017318", "strBankcardNo": "6222020200008126480", "strReserveMobile": "18010073603", "strProtocolCode": "", "nBankcardState3": 0, "nVerifyIsReplace": 0, "strIdVerifyRes": "实名认证成功", "strThirdResultDesc": "", "nBankcardState": 100 }, "nProtocolState": 10, "nProtocolProductionState": 0, "strProtocolCode": "", "strName": "安立国", "strIdVerifyRes": "实名认证成功", "nIdentityState": 100, "nBankcardState": 100, "nBankcardState3": 0 }, "CreditService_queryCredit": { "cdoCredit": { "lCreditBalance0": 0, "lCreditBalance1": 0, "lCreditUsed": 0, "lCreditBalance2": 0, "lCreditUsed2": 0, "lCreditBalance3": 0, "lCreditUsed3": 0, "lCreditBalance4": 0, "lCreditUsed4": 0, "lCreditBalance5": 0, "lCreditUsed5": 0, "lCreditBalance6": 0, "lCreditUsed6": 0, "lCreditBalance7": 0, "lCreditUsed7": 0, "lCreditAvailable": 0, "lCreditBalance": 0 } }, "StageOrderService_getToPayCount": { "nCount": { "nCount": 0 } }, "BorrowerService_getGrant": { "cdoUser": { "lUserId": 4158036, "nMobileState": 1, "strMobile": "5na+Ab7hvNih/y7vv/pKPw==", "strSalesmanName": "客服经理", "strSalesmanMobile": "qHDBhG4s9ItsH12mjD0dVQ==", "dtCreateTime": "2017-03-29 10:44:40", "nMaskCredit": 1, "nCreditWay": 0, "nRegCreditWay": 2 }, "nGrant": 0 }, "AccountUserBIQueryService_getAccountAmount": { "cdoAccountAmount": { "lAccountBalance0": 0, "lAccountFrozen0": 0, "lAvailablebalance0": 0, "lAccountBalance1": 0, "lAccountFrozen1": 0, "lAvailablebalance1": 0, "lAccountBalance2": 0, "lAccountFrozen2": 0, "lAvailablebalance2": 0, "lAccountBalance3": 0, "lAccountFrozen3": 0, "lAvailablebalance3": 0, "lAccountBalance4": 0, "lAccountFrozen4": 0, "lAvailablebalance4": 0, "lAccountBalance5": 0, "lAccountFrozen5": 0, "lAvailablebalance5": 0, "lAccountBalance6": 0, "lAccountFrozen6": 0, "lAvailablebalance6": 0, "lAccountBalance7": 0, "lAccountFrozen7": 0, "lAvailablebalance7": 0, "lAccountBalance8": 0, "lAccountFrozen8": 0, "lAvailablebalance8": 0, "lAccountBalance9": 0, "lAccountFrozen9": 0, "lAvailablebalance9": 0 } } }

}
function raiseTrans(cdoRequest, callBack, load, defaultData, nCode = false) {
    let { loadList } = window.raiseTransCallBack;
    //window.raiseTransCallBack.maxId++
    //let callBackName = 'raiseTransCallBack_v' + window.raiseTransCallBack.maxId;
    let callBackName = cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')
    if (loadList.has(callBackName)) {
        return;
    }
    if (DEVELOPMENT) {
        if (window.mockList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')]) {
            setTimeout(function () {
                callBack({ data: window.mockList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')] });
            }, 1000);
            return;
        }
    }
    window[callBackName] = (cdoRequest, cdoResponse, cdoReturn) => {
        if (DEVELOPMENTZIP || DEVELOPMENT) {
            window.raiseTransCallBack.DEV_DataList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')] = JSON.parse(cdoResponse.toJSON());
        }
        if (load) {
            window.raiseTransCallBack.loadList.delete(callBackName);
            if (window.raiseTransCallBack.loadList.size == 0) {
                Toast.hide();
            }
        }
        if (cdoReturn == null || typeof cdoReturn == "undefined") {
            Toast.info("网络异常");
            return;
        }
        if (nCode) {
            let data = {};
            // data.data = JSON.parse(cdoResponse.toJSON().replace(',,', ','));
            data.data = JSON.parse(cdoResponse.toJSON());
            data.data.__nCode = cdoReturn.nCode;
            if (DEVELOPMENTZIP || DEVELOPMENT) {
                window.raiseTransCallBack.DEV_DataList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')] = data;
            }
            callBack(data);
            return;
        }
        if (cdoReturn.nCode == 0) {
            let data = {};
            // data.data = JSON.parse(cdoResponse.toJSON().replace(',,', ','));
            data.data = JSON.parse(cdoResponse.toJSON());
            callBack(data);
        } else {
            Toast.info(cdoReturn.strText);
        }
    }
    if (load) {
        window.raiseTransCallBack.loadList.add(callBackName);
        Toast.loading('加载中', 0);
    }
    window.raiseTrans(cdoRequest, callBackName);
}
export function queryDfqAdByGprs7(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "IndexService");
    cdoRequest.setStringValue("strTransName", "queryDfqAdByGprs7");
    cdoRequest.setStringValue("strProvinceCode", "130000");//省code
    cdoRequest.setStringValue("strProvinceName", "");//省名
    cdoRequest.setStringValue("strCityCode", "130300");//市code
    cdoRequest.setStringValue("strCityName", "秦皇岛");//市名
    cdoRequest.setStringValue("strAreaCode", "");//区code
    cdoRequest.setStringValue("strAreaName", "");//区名
    cdoRequest.setStringValue("nPositionCode", "7");	//广告定位标识(达分期首页轮播)
    raiseTrans(cdoRequest, callBack, load);
    //window.raiseTrans(cdoRequest, 'queryDfqAdByGprs7');
}
export function queryDfqAdByGprs10(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "IndexService");
    cdoRequest.setStringValue("strTransName", "queryDfqAdByGprs10");
    cdoRequest.setStringValue("strProvinceCode", "130000");//省code
    cdoRequest.setStringValue("strProvinceName", "");//省名
    cdoRequest.setStringValue("strCityCode", "130300");//市code
    cdoRequest.setStringValue("strCityName", "秦皇岛");//市名
    cdoRequest.setStringValue("strAreaCode", "");//区code
    cdoRequest.setStringValue("strAreaName", "");//区名
    cdoRequest.setStringValue("nPositionCode", "10");	//广告定位标识(达分期首页轮播)
    raiseTrans(cdoRequest, callBack, load);
    //window.raiseTrans(cdoRequest, 'queryDfqAdByGprs7');
}
/**查询未读消息 */
export function unreadCount(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "NoticeMsgConsumerService");
    cdoRequest.setStringValue("strTransName", "getMineMsgCount");
    cdoRequest.setIntegerValue("nChannel", 6); //渠道 1:达飞云贷,2:口袋助手
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId")); //用户ID，向哪个用户发送
    raiseTrans(cdoRequest, callBack, load);
}
/**获取实名认证信息 */
export function queryIdentity(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "UserService");
    cdoRequest.setStringValue("strTransName", "queryIdentity");
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId")); //用户ID，向哪个用户发送
    raiseTrans(cdoRequest, callBack, load);
}
/**获取账户余额 */
export function getAccountBalance(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "AccountUserBIQueryService");
    cdoRequest.setStringValue("strTransName", "getAccountAmount");
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId")); //用户ID，向哪个用户发送
    raiseTrans(cdoRequest, callBack, load);
}
/**查询授信方式、状态及额度 */
export function getGrant(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "BorrowerService");
    cdoRequest.setStringValue("strTransName", "getGrant");
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId")); //用户ID，向哪个用户发送
    raiseTrans(cdoRequest, callBack, load);
}
/**查询可用授信额度 */
export function getQueryCredit(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "CreditService");
    cdoRequest.setStringValue("strTransName", "queryCredit");
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId")); //用户ID，向哪个用户发送
    raiseTrans(cdoRequest, callBack, load);
}

/**查询待支付订单数量 */
export function orderNotCount(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "StageOrderService");
    cdoRequest.setStringValue("strTransName", "getToPayCount");
    cdoRequest.setLongValue("lUserId", window.getStringValue("lUserId") || 1071);
    //0-待支付,1-支付中,2-支付成功,3-支付失败,4-订单关闭
    cdoRequest.setLongValue("nStatus", data.nStatus);
    raiseTrans(cdoRequest, callBack, load);
}
/**效验实名认证等相关处理 */
export function verifyIdentity(callBack, data, load = true) {
    let cdoRequest = new window.CDO();
    cdoRequest.setStringValue("strServiceName", "AppUserService");
    cdoRequest.setStringValue("strTransName", "verifyIdentity");
    raiseTrans(cdoRequest, callBack, load, {}, true);
}
