
import { Toast } from 'antd-mobile';
// function apiSend(serviceName, transName, params) {
//     let cdoRequest = new window.CDO();
//     cdoRequest.setStringValue("strServiceName", serviceName);
//     cdoRequest.setStringValue("strTransName", transName);
// }
window.raiseTransCallBack = {
    maxId: 0,
    loadList: new Set()
};
function raiseTrans(cdoRequest, callBack, load, defaultData) {
    window.raiseTransCallBack.maxId++
    let callBackName = 'raiseTransCallBack_v' + window.raiseTransCallBack.maxId;
    window[callBackName] = (cdoRequest, cdoResponse, cdoReturn) => {
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
            data.data = JSON.parse(cdoResponse.toJSON().replace(',,', ','));
            callBack(data);
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