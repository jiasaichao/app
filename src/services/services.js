// function apiSend(serviceName, transName, params) {
//     let cdoRequest = new window.CDO();
//     cdoRequest.setStringValue("strServiceName", serviceName);
//     cdoRequest.setStringValue("strTransName", transName);
// }
window.raiseTransCallBack = {
    maxId: 0
};
function raiseTrans(cdoRequest, callBack, defaultData) {
    window.raiseTransCallBack.maxId++
    let callBackName = 'raiseTransCallBack_v' + window.raiseTransCallBack.maxId;
    window[callBackName] = (cdoRequest, cdoResponse, cdoReturn) => {
        if (cdoReturn == null || typeof cdoReturn == "undefined") {
            alert("网络异常");
            return;
        }
        if (cdoReturn.nCode == 0) {
            var data = {};
            data.data = JSON.parse(cdoResponse.toJSON().replace(',,', ','));
            callBack(data);
        }
    }
    window.raiseTrans(cdoRequest, callBackName);
}
export function queryDfqAdByGprs7(callBack, strProvinceCode, strCityCode, strCityName, nPositionCode) {
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
    raiseTrans(cdoRequest, callBack);
    //window.raiseTrans(cdoRequest, 'queryDfqAdByGprs7');
}