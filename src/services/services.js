import { Toast } from 'antd-mobile';
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
if(DEVELOPMENT){
    window.mockList={
        "CreditService_queryCredit": {
            "cdoCredit": {
                "lCreditBalance0": 0,
                "lCreditBalance1": 0,
                "lCreditUsed": 0,
                "lCreditAvailable": 0,
                "lCreditBalance": 0
            }
        },
        "AccountUserBIQueryService_getAccountAmount": {
            "cdoAccountAmount": {
                "lAccountBalance0": 0,
                "lAccountFrozen0": 0,
                "lAvailablebalance0": 0,
                "lAccountBalance1": 0,
                "lAccountFrozen1": 0,
                "lAvailablebalance1": 0,
                "lAccountBalance2": 0,
                "lAccountFrozen2": 0,
                "lAvailablebalance2": 0,
                "lAccountBalance3": 0,
                "lAccountFrozen3": 0,
                "lAvailablebalance3": 0,
                "lAccountBalance4": 0,
                "lAccountFrozen4": 0,
                "lAvailablebalance4": 0,
                "lAccountBalance5": 0,
                "lAccountFrozen5": 0,
                "lAvailablebalance5": 0,
                "lAccountBalance6": 0,
                "lAccountFrozen6": 0,
                "lAvailablebalance6": 0,
                "lAccountBalance7": 0,
                "lAccountFrozen7": 0,
                "lAvailablebalance7": 0,
                "lAccountBalance8": 0,
                "lAccountFrozen8": 0,
                "lAvailablebalance8": 0,
                "lAccountBalance9": 0,
                "lAccountFrozen9": 0,
                "lAvailablebalance9": 0
            }
        },
        "UserService_queryIdentity": {
            "cdoState": {
                "nIdentityState": 20,
                "strName": "晶晶",
                "nProtocolState": 10,
                "nProtocolProductionState": 0,
                "strIdentity": "230101198001010333",
                "strBankcardNo": "456351620601716082",
                "strReserveMobile": "13624692333",
                "strProtocolCode": "",
                "nBankcardState3": 20,
                "nVerifyIsReplace": 0,
                "strIdVerifyRes": "OK",
                "strThirdResultDesc": "",
                "nBankcardState": 20
            },
            "nProtocolState": 10,
            "nProtocolProductionState": 0,
            "strProtocolCode": "",
            "strName": "晶晶",
            "strIdVerifyRes": "OK",
            "nIdentityState": 20,
            "nBankcardState": 20,
            "nBankcardState3": 20
        },
        "NoticeMsgConsumerService_getMineMsgCount": {
            "dtnow": "2017-10-20 11:52:16",
            "nMineUnreadCount": 0
        }
    }
}
function raiseTrans(cdoRequest, callBack, load, defaultData) {
    if (DEVELOPMENT) {
        if (window.mockList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')]) {
            callBack(window.mockList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')]);
            return;
        }
    }
    window.raiseTransCallBack.maxId++
    let callBackName = 'raiseTransCallBack_v' + window.raiseTransCallBack.maxId;
    window[callBackName] = (cdoRequest, cdoResponse, cdoReturn) => {
        //调试用
        window.raiseTransCallBack.DEV_DataList[cdoRequest.getStringValue('strServiceName') + '_' + cdoRequest.getStringValue('strTransName')] = JSON.parse(cdoResponse.toJSON());
        if (load) {
            window.raiseTransCallBack.loadList.delete(callBack);
            if (window.raiseTransCallBack.loadList.size == 0) {
                Toast.hide();
            }
        }
        if (cdoReturn == null || typeof cdoReturn == "undefined") {
            Toast.info("网络异常");
            return;
        }
        if (cdoReturn.nCode == 0) {
            var data = {};
            // data.data = JSON.parse(cdoResponse.toJSON().replace(',,', ','));
            data.data = JSON.parse(cdoResponse.toJSON());
            callBack(data);
        }else{
            Toast.info(cdoReturn.strText);
        }
    }
    if (load) {
        window.raiseTransCallBack.loadList.add(callBack);
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
    cdoRequest.setIntegerValue("nChannel", 1); //渠道 1:达飞云贷,2:口袋助手
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
