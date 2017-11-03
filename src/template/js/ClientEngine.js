/**
 * 防止重复发请求公共方法
 * 
 */
function HashMap() {
	this.arrKey = new Array();
	this.arrValue = new Array();
	this.exists = function(strKey) {
		strKey = "" + strKey;
		strKey = strKey.toLowerCase();
		for ( var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				return true;
			}
		}
		return false;
	};
	this.length = function() {
		return this.arrKey.length;
	};
	this.put = function(strKey, objValue) {
		strKey = "" + strKey;
		for ( var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey.toLowerCase()) {
				this.arrValue[i] = objValue;
				return
			}
		}
		this.arrKey[this.arrKey.length] = strKey;
		this.arrValue[this.arrValue.length] = objValue;
	};
	this.get = function(strKey) {
		strKey = "" + strKey;
		strKey = strKey.toLowerCase();
		for ( var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				return this.arrValue[i];
			}
		}
		return null;
	};
	this.remove = function(strKey) {
		strKey = "" + strKey;
		strKey = strKey.toLowerCase();
		for ( var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				this.arrKey.splice(i, 1);
				var value = this.arrValue[i];
				this.arrValue.splice(i, 1);
				return value;
			}
		}
		return null;
	};
	this.removeAll=function(){
		this.arrKey = new Array();
		this.arrValue = new Array();
	};
	this.getKeys = function() {
		return this.arrKey;
	};
	this.getValues = function() {
		return this.arrValue;
	};
}
var raiseTransMap = new HashMap();//记录请求map

var splitCode = "#@!";


function Return()
{
	this.nCode=0;
	this.getCode=function()
	{
		return this.nCode;
	};
	this.setCode=function(nCode)
	{
		this.nCode=nCode;
	};
	this.strText="";
	this.getText=function()
	{
		return this.strText;
	};
	this.setText=function(strText)
	{
		this.strText=strText;
	};
	this.strInfo="";
	this.getInfo=function()
	{
		return this.strInfo;
	};
	this.setInfo=function(strInfo)
	{
		this.strInfo=strInfo;
	};
}


var isDebug = false; //是否Debug;true=启动debug模式；false=走引擎模式

/**
 * 打开新窗口
 * @author chenhongan
 * @date 2015-07-29
 * strURI<打开htmL地址>
 * strTitle<显示标题，暂时没有用>
 * strAttachedData<打开html后面跟的参数值>
 * nOpenMode<打开html方式：0-在本页面再新开一个页面、1-关闭当前页面，打开新页面；2-除自己页面外，其他页面全部干掉>
 * strClearURI<从哪个页面开始干掉>
 * strAnimation<动画打开方向：打开一个新窗口，默认不传；返回的时候，传1；相反方向动画>
 */
var openWindow=function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation)
{
	if(isDebug){
		//Debug模式
		strAttachedData=encodeURI(strAttachedData);
		window.location.href = "/" + strURI + "?" + strAttachedData ;
	}else{
		try
		{
			clientEngine.openWindow(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation);
		}
		catch(e)
		{
			info("系统错误：001000");
			if(typeof(_shade_layer) == "object") {
				_shade_layer.hide();
			}
		}
	}
};




/**
 * 延迟开启窗口
 * @author chenhongan
 * @date 2015-07-29
 * @param strURI<打开htmL地址>
 * @param strTitle<显示标题，暂时没有用>
 * @param strAttachedData<打开html后面跟的参数值>
 * @param nOpenMode<打开html方式：>	
 * @deprecated Android：	0-在原有页面上正常打开新页面;1-在原有页面上正常打开新页面;2-除自己页面外，其他页面全部干掉
 * @deprecated IOS：	0-干掉当前页面后打开新页面;1-关闭当前页面，再打开新页面;2-除自己页面外，其他页面全部干掉						
 * @param strClearURI<从哪个页面开始干掉>
 * @param strAnimation<动画打开方向：打开一个新窗口，默认不传；返回的时候，传1；相反方向动画>
 * @ModifyDate 2016-01-14 
 * @author chenhongane
 * @deprecated 去掉try 和本地打开等
 */

var openDelayWindow=function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation)
{
	if(isDebug){
		strAttachedData=encodeURI(strAttachedData);
		window.location.href = "" + strURI + "?" + strAttachedData;
	}else{
		setTimeout(function() {
			clientEngine.openWindow(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation);
		}, 300);
	}
};


/**
 * 调用手机引擎,发起http请求。
 * @author chenhongan
 * @date 2015-07-31
 * @method raiseTrans
 * @param  cdoRequest 请求发起cdo对象
 * @param  strCallbackFunctionName 请求发起回调js方法名
 * @remark 回调的JS函数的格式：callbackFunction(cdoRequest,cdoResponse,ret)，strResponse为从服务器端收到的应答文本
 */

var raiseTrans=function(cdoRequest,strCallbackFunctionName)
{
	if(cdoRequest != null && cdoRequest != undefined){
		//获取手机设备号
		if(isDebug == false){
			cdoRequest.setStringValue("strOlcDeviceLocalCode",getDeviceCode());
		}
	}
	if(isDebug){//当isDebu = true 走debug模式，本地开发调试
		var httpClient=new HttpClient("http://dfq.dafy.com/handleTrans.cdo");
		cdoRequest.setStringValue("fcName",strCallbackFunctionName);
		var strToken = localStorage.getItem("strToken");
		if(strToken){
			cdoRequest.setStringValue("strToken",strToken);
		}
		httpClient.raiseTrans(cdoRequest,new CDO(),eval("callbackPCFuc"));
	}else{
		try
		{
			var strTName = cdoRequest.getStringValue("strTransName");
			if(!raiseTransMap.exists(strTName)){
				raiseTransMap.put(cdoRequest.getStringValue("strTransName"), 1);
			} else if(raiseTransMap.get(strTName) > 0){
				info("请勿重复发起相同请求！");
				return;
			}
			strRequest=cdoRequest.toXML();//请求参数转化为XML格式
			clientEngine.raiseTrans(strRequest,"callbackFunction",strCallbackFunctionName,null);
		}
		catch(e)
		{
			info("网络不给力,请稍候重试.");
			if(typeof(_shade_layer) == "object") {
				_shade_layer.hide();
			}
		}
	}
};



/**
 * 20150731注释add
 * 方法说明：手机引擎发起调用后回调方法
 * @method callbackFunction
 * @param  strRequest        请求cdo
 * @param  strResponse       相应cdo
 * @param  strCallbackData   回调数据
 * @return  
 * @remark serial_brk_queue 定义串行队列，使用队列调用并发
 */
//定义串行队列，使用队列调用并发
var serial_brk_queue = [];
function callbackFunction(strRequest,strResponse,strCallbackData)
{
	try{
		if(isStringNull(strResponse)){
			raiseTransMap = new HashMap();
			info("系统错误：001022");
			eval(strCallbackData+"(null,null,null)");
			return;
		}
		
		var cdoRequest = new CDO();
	    cdoRequest.fromXMLText(strRequest);
		raiseTransMap.put(cdoRequest.getStringValue("strTransName"), 0);
		
		var member = {};
		member.strRequest = strRequest;
		member.strResponse = strResponse;
		member.strCallbackData = strCallbackData;
		serial_brk_queue.push(member);
		setTimeout("procInThreadCallback()",100);
	}
	catch(e)
	{
		clientEngine.info("系统错误：001002");
		if(typeof(_shade_layer) == "object") {
			_shade_layer.hide();
		}
	}
}

/**
 * 判断字符串是否为null
 * @param str
 * @returns {Boolean}
 */
function isStringNull(str){
	var isNull = false;
	
	if(typeof str == "undefined"){
		isNull = true;
	}
	
	if(""==str){
		isNull = true;
	}
	
	if(null == str){
		isNull = true;
	}
	
	return isNull;
}

/**
 * 解析请求回调数据方法
 */
function procInThreadCallback()
{
	var strTransName;
	try{
		//从队列里面取出
		var member = serial_brk_queue.pop();
		if(member == null || typeof member == "undefined"){
			info("系统错误：001027");
			eval(member.strCallbackData+"(null,null,null)");
			return;
		}
		var cdoRequest=new CDO();
	    cdoRequest.fromXMLText(member.strRequest);
	    
	    strTransName = cdoRequest.getStringValue("strTransName");
	    
	    var cdoResponse=new CDO();
	    //检测Response
	    if(isStringNull(member.strResponse)){
	    	info("系统错误：001022");
	    	eval(member.strCallbackData+"(null,null,null)");
	    	return;
		}
		
	    cdoResponse.fromXMLText(member.strResponse);
	    
	    //检测cdoReturn
	    if(!cdoResponse.exists("cdoReturn")){
	    	info("系统错误：001023");
	    	eval(member.strCallbackData+"(null,null,null)");
	    	return;
	    }
	    var cdoReturn=cdoResponse.getCDOValue("cdoReturn");
	    //检测cdoResponse
	    if(!cdoResponse.exists("cdoResponse")){
	    	//踢人控制
	    	//检测strText
		    if(!cdoReturn.exists("strText")){
		    	info("系统错误：001026");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
		    //检测nCode
		    if(!cdoReturn.exists("nCode")){
		    	info("系统错误：001025");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
		    var strText=cdoReturn.getStringValue("strText");
		    var nCode=cdoReturn.getIntegerValue("nCode");
		    if(strText != null && strText.indexOf("is not allowed") > 0 && nCode == -1){
		    	info("您的账号已在其他设备上登录,如果不是本人操作,请及时更换密码!");
		    	setTimeout(function() {
		    		try{
		    			//强退后，初始化手势密码组。
			    		var Gpwd = ["",1];
			    		setArrayValue("gesturePasswordArray" + Number(getStringValue("lUserId")),Gpwd);
		    		}catch (e) {
						info("系统错误：001005");
						eval(member.strCallbackData+"(null,null,null)");
					}
		    		openWindow("login.htm","登录页面","" ,2,"");
		    	}, 1500);
		    }
		    else if(nCode == -20 || nCode == -800 || nCode == -900)
		    {//判断cookie失效或验证cookie不合法，退出到登录界面
		    	info(strText);
		    	setTimeout(function() {
		    		openWindow("login.htm","登录页面","" ,2,"");
		    	}, 1500);
		    	return;
		    }
		    else{
		    	info("系统错误：001024");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
	    }
	    cdoResponse=cdoResponse.getCDOValue("cdoResponse");
	    
	    //设置strToken
	    if(cdoResponse.exists("strToken")){
	    	var strToken = cdoResponse.getStringValue("strToken");
	    	localStorage.setItem("strToken",strToken);
	    }
	    
	    //检测nCode
	    if(!cdoReturn.exists("nCode")){
	    	info("系统错误：001025");
	    	eval(member.strCallbackData+"(null,null,null)");
	    	return;
	    }
	    var nCode=cdoReturn.getIntegerValue("nCode");
	    //检测strText
	    if(!cdoReturn.exists("strText")){
	    	info("系统错误：001026");
	    	eval(member.strCallbackData+"(null,null,null)");
	    	return;
	    }
	    var strText=cdoReturn.getStringValue("strText");
	    //判断cookie失效或验证cookie不合法，退出到登录界面
	    if(nCode == -20 || nCode == -800 || nCode == -900)
	    {
	    	info(strText);
	    	setTimeout(function() {
	    		openWindow("login.htm","登录页面","" ,2,"");
	    	}, 1500);
	    	return;
	    }
	    
	    var ret=new Return();
	    ret.setCode(nCode);
	    ret.setText(strText);
	    if(strText != null && strText.indexOf("is not allowed") > 0 && nCode == -1){
	    	info("系统错误："+strText);
	    	setTimeout(function() {
	    		try{
	    			//强退后，初始化手势密码组。
		    		var Gpwd = ["",1];
		    		setArrayValue("gesturePasswordArray" + Number(getStringValue("lUserId")),Gpwd);
	    		}catch (e) {
					info("系统错误：001005");
					eval(member.strCallbackData+"(null,null,null)");
				}
	    		openWindow("login.htm","登录页面","" ,2,"");
	    	}, 1500);
	    }else{
	    	eval(member.strCallbackData+"(cdoRequest,cdoResponse,ret)");
	    }
	}catch(e){
		//eval(procInThreadCallback.strCallbackData+"(null,null,null)");
		//返回事件    ,调用不到返回页的方法报错。 lhh2015-07-21
		console.log(e);
		if(typeof(_shade_layer) == "object") {
			_shade_layer.hide();
		}
		
		if(e.name == "ReferenceError"){
			return
		}
		info("系统解析数据错误"+e);
	} finally {
		 if(raiseTransMap.get(strTransName) == 1) {
			 raiseTransMap.put(strTransName, 0);
		 } 
	}
   
}


/**
 * 20150731注释add
 * 扫一扫
 * 调用手机引擎,弹出扫一扫窗体
 * @param  strCallbackFunctionName 请求发起回调js方法名
 * @return  
 * @remark
 */
var openRichScan = function(strCallbackFunctionName){
	try{
		if(isDebug){
					
		}else{
			clientEngine.richScan(strCallbackFunctionName);
		}
	}
	catch(e)
	{
		info("系统错误：002003");
	}
};
/**
 * 20160525注释add
 * 扫一扫
 * 判断手机号是否在当前通讯录中
 * @param  phonenumber 输入手机号码
 * @return  0为存在，1为不存在,2无法获取权限,3为异常
 * @remark
 */
var checkPhoneNumInAddressBook = function(phonenumber){
	try{
		var exist = clientEngine.checkPhoneNumInAddressBook(phonenumber);
		if(exist!="undefined" && typeof(exist)!="undefined"){
			return exist;
		}else{
			return 4;
		}
	}
	catch(e)
	{
		//info("系统错误：002088");
		info("请到AppStore下载安装最新的达飞云贷APP.");
		return 4;
	}
};

/**
 * 20150731注释add
 * 扫一扫功能得到参数后，进行回掉js方法
 * @method 扫一扫回调
 * @param  val 扫到的参数值
 * @param  strCallbackFunctionName   回调js方法名
 * @return  
 * @remark
 */
var callbackRichScan = function(val,strCallbackFunctionName){
	if(isDebug){
		
	}else{
		eval(strCallbackFunctionName+"('"+val+"')");
	}
};

/**
 * 20150908
 * 方法说明：cookie栏数值增加，导致数值越界，引导用户退出，重新登录。
 * @method capturecookie
 * @author 穆小宇
 * @param  vCookie 服务器request.vCookie == -800
 * @return  
 * @remark 
 */
var capturecookie=function(vCookie) {
	info("版本升级，您的cookie已失效（错误编号：" + vCookie + "），请您重新登录！");
	setTimeout(function() {
		openWindow("login.htm","登录页面","" ,2,"");
	}, 1500);
};


/**
 * 20150731注释add
 * 显示一个文本消息和确定按钮的模态对话框
 * @param  strMessage     弹出的消息内容
 * @return  
 * @remark 
 */
var info=function(strMessage) {
	if(isDebug == true){
		alert(strMessage);
	}else{
		clientEngine.info(strMessage);
	}
};


/**
 * 
 * 原生提示框：显示一个文本消息和是|否按钮的模态对话框
 * @author chenhongan
 * @date 2015-07-31
 * @param   strMessage <弹出的消息内容>
 * @return  
 * @remark  如果选择是，则返回1，否则返回0
 */
var yesno=function(strMessage)
{
	try
	{
		return clientEngine.yesno(strMessage);
	}
	catch(e)
	{
		info("系统错误：002001");
	}
};

/**
 * 
 * 原生：显示一个文本消息和确定|取消按钮的模态对话框
 * @author Administrator
 * @date 2015-07-31
 * @method  okcancel
 * @param   strMessage<弹出的消息内容>
 * @return  
 * @remark  如果选择确定，则返回0，否则返回-1
 */
var okcancel=function(strMessage)
{
	try
	{
		return clientEngine.okcancel(strMessage);
	}
	catch(e)
	{
		info("系统错误：002005");
	}
};



/**
 * 
 * 键盘收起，手机端调用事件
 * @author 李海涵
 * @date 2015-07-28
 * @param   val<手机端用，目前暂时不用>        
 * @return  
 * @remark 
 */
var reductionStyle = function(val) {
    $("#container").css("-webkit-transform","translate3d(0px, 0px, 0px)");
};


/**
 * 
 * 分享 （调用手机引擎，弹出分享功能模块）
 * @author 李海涵
 * @date 2015-07-31
 * @param   strTitle      标题  
 * @param   strContent    内容    
 * @param   type          1-红包类型 
 * @param   strUrl        分享的链接
 * @return  
 */
var shareInfo = function(strTitle,strContent,type,strUrl)
{
	try
	{
		return clientEngine.shareInfo(strTitle,strContent,type,strUrl);
	}
	catch(e)
	{
		info("系统错误：002004");
	}
};


/**
 * 安卓手机返回（等同于点击系统的回退按键）
 * @author chenhongan
 * @date 2015-07-31
 * @return  
 */
var back=function()
{
	try
	{
		if(isDebug){
			history.go(-1);			
		}else{
			clientEngine.back();
		}
	}
	catch(e)
	{
		info("系统错误：002006");
	}
};

/**
 * 延迟返回：如果有输入框，拉起键盘时，样式出问题，用该方法
 * @author 穆小宇
 * @date 2015-09-15
 * @return  
 * @remark 
 */
var delayBack=function()
{
	try
	{
		setTimeout(function() {
			if(isDebug){
				history.go(-1);
			}else{
				clientEngine.back();
			}
    	}, 300);
	}
	catch(e)
	{
		info("系统错误：002006");
	}
};

/**
 * 返回时，设置URL 控制手机返回按钮，返回指定要打开页面
 * @author 李海涵
 * @date 2015-07-31
 * @param   strURI            返回地址  
 * @param   strTitle          标题    
 * @param   strAttachedData   打开html后面跟的参数值
 * @param   nOpenMode         打开html方式：0、1正常打开；2-除自己页面外，其他页面全部干掉>
 * @param   strClearURI       从哪个页面开始干掉
 * @param   strAnimation      页面动画打开方向：打开一个新窗口，默认不传或0；   返回的时候，传1；相反方向动画
 * @return  
 */
var setBackURL = function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI) {
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.setBackURL(strURI,strTitle,strAttachedData,nOpenMode,strClearURI);
		}
	}
	catch(e)
	{
		info("系统错误：002007");
	}
};


/**
 * 20150731注释add
 * 方法说明：重新加载页面  和setBackURL配合，用于手机端调用
 * @method  reloadPage
 */
var reloadPage = function(){
	window.location.reload();
};


/**
 * 20150731注释add
 * 方法说明：获取指定cookie的值，没有则返回null
 * @method  getCookie
 */
var getCookie=function(strName)
{
	try
	{
		if(isDebug){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;		
		}else{
			return clientEngine.getCookie(strName);
		}
	}
	catch(e)
	{
		info("系统错误：002008");
	}
};

/**
 * 20150731注释add
 * 方法说明：设置cookie及其有效期，单位为秒
 * @method  setCookie
 * @param   strName             名
 * @param   strValue            值
 * @param   nLifeTime           生命周期
 * @return  
 * @remark 
 */
var setCookie=function(strName,strValue,nLifeTime)
{
	try
	{
		if(isDebug){
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = strName + "="+ strValue (value) + ";expires=" + exp.toGMTString();			
		}else{
			clientEngine.setCookie(strName,strValue,nLifeTime);
		}
	}
	catch(e)
	{
		info("系统错误：002009");
	}
};

/**
 * 20150731注释add
 * 方法说明：通过url参数键值名称获取参数的值
 * @method  getQueryString
 * @param   name            要获取的参数键值
 * @return  
 * @remark 
 */
var getQueryString=function(name){
	try
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
	catch(e)
	{
		info("系统错误：001004");
	}
};

/**
 * 原生：显示退出对话框
 * @date 2015-07-31
 * @author 穆小宇
 */
var showExitDialog=function()
{
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.showExitDialog();
		}
	}
	catch(e)
	{
		info("系统错误：002010");
	}
};

/**
 * 销毁内存对象中保存的配置数据及其它数据，释放内存 一般系统退出时调用
 * @date 2015-07-31
 * @author 穆小宇
 */
var destroy=function()
{
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.destroy();
		}
	}
	catch(e)
	{
		info("系统错误：002011");
	}
};

/**
 * 页面电话号码触发-拨打电话
 * @author 穆小宇
 * @date 2015-07-31
 */
var call=function(strPhoneNumber)
{
	try
	{
		clientEngine.call(strPhoneNumber);
	}
	catch(e)
	{
		info("系统错误：002012");
	}
};

/**
 * 
 * 备份用户手机隐私信息(用户ID)注：IOS只能获取通讯录，其他不能！
 * @param strBackupURL	{String} 	上传地址
 * @param strPhone		{String} 	手机号码
 * @param strCusId		{String} 	用户ID
 * @param nType			{int} 		类型
 * @date 2015-07-31
 * @author 穆小宇
 */
var backupData=function(strBackupURL,strPhone,strCusId,nType)
{
	try
	{
		if(isDebug){
			
		}else{
			strCusId = String(strCusId);
			if(nType == 1){
				//备份所有信息 
				clientEngine.startBackupAll(strPhone,strCusId);
			}else if(nType == 2){
				//备份通话资料到云端
				clientEngine.backupCallData(strPhone,strCusId);
			}else if(nType == 3){
				//备份短信资料到云端
				clientEngine.backupSms(strPhone,strCusId);
			}else if(nType == 4){
				//备份通讯录到云端
				clientEngine.backupContactData(strPhone,strCusId);
			}
		}
	}
	catch(e)
	{
		info("系统错误：002013");
	}
};

/**
 * 获取用户的位置信息
 * @date 2015-07-31
 * @author 穆小宇
 */
var getLoaction=function()
{
	try
	{
		if(isDebug){
			
		}else{
			return clientEngine.getLoaction();
		}
	}
	catch(e)
	{
		info("系统错误：002014");
	}
};

/**
 * 获取设备的一些信息
 * @date 2015-07-31
 * @author 穆小宇
 */
var getDeviceMessage=function()
{
	try
	{
		if(isDebug){
			
		}else{
			return clientEngine.getDeviceMessage();
		}
	}
	catch(e)
	{
		info("系统错误：002015");
	}
};

/**
 * 编辑短信 但是不发送
 * @param strPhoneNumber	{String} 	手机号
 * @param strMsgContent		{String} 	短信内容
 * @date 2015-07-31
 * @author 穆小宇
 */
var editMsg=function(strPhoneNumber,strMsgContent){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.editMsg(strPhoneNumber,strMsgContent);
		}
	}
	catch(e)
	{
		info("系统错误：002016");
	}
};

/**
 * 持久化储存字符串键、值到硬盘
 * @param key		{String} 	键
 * @param value		{String} 	值
 * @return 			{boolean}
 * @date 2015-07-31
 * @author 穆小宇
 */
var setStringValue = function(key,value){
	try{
		if(isDebug == true){
			console.log("key="+key+",val="+value);
			localStorage.removeItem(key);
			localStorage.setItem(key,value);
		}else{
			return clientEngine.setStringValue(key,value+"");
		}
	}catch(e){
		info("系统错误：001015");
		return false;
	}
};

/**
 * 持久化储存数组键、值到硬盘
 * @param key		{String} 	键
 * @param value		{array} 	值
 * @return			{boolean}
 * @date 2015-07-31
 * @author 穆小宇
 */
var setArrayValue = function(key,value){
	try{
		if(isDebug){
			localStorage.removeItem(key);
			localStorage.setItem(key,value);
		}else{
			var strValue = "";
			if(value != null){
				for(var i = 0;i < value.length;i++){ 
					if(i != 0){
						strValue += splitCode + value[i];
					}else{
						strValue += value[i];
					}
				} 
			}
			return clientEngine.setStringValue(key,strValue);
		}
	}catch(e){
		info("系统错误：001016");
		return false;
	}
};

/**
 * 获取持久化字符串键、值到硬盘
 * @param key		{String} 	键
 * @return value    {String}	值
 * @date 2015-07-31
 * @author 穆小宇
 */
var getStringValue = function(key){
	try{
		if(isDebug == true){
			return localStorage.getItem(key);
		}else{
			var value = clientEngine.getStringValue(key);
			if(value == null || value == undefined || value == ""){
				return null;
			}
			return value;
		}
	}catch(e){
		info("系统错误：001017");
		return null;
	}
};

/**
 * 获取持久化数组键、值到硬盘
 * @param key		{String} 	键
 * @return value    {array}	值
 * @date 2015-07-31
 * @author 穆小宇
 */
var getArrayValue = function(key){
	try{
		if(isDebug){
			return localStorage.getItem(key);
		}else{
			var value = clientEngine.getStringValue(key);
			if(value == null || value == undefined || value == ""){
				return null;
			}
			return value.split(splitCode);
		}
	}catch(e){
		info("系统错误：001018");
		return null;
	}
};

/**
 * 删除指定持续化储存的数据
 * @param key		{array} 	键
 * @date 2015-07-31
 * @author 穆小宇
 */
var clearArray=function(array){
	try
	{
		if(isDebug){
			localStorage.removeItem(array);
		}else{
			return clientEngine.clearArray(array);
		}
	}
	catch(e)
	{
		info("系统错误：001019");
	}
};

/**
 * 删除所有持续化数据
 * @return 			{booelan} 
 * @date 2015-07-31
 * @author 穆小宇
 */
var clearAll=function(){
	try
	{
		if(isDebug){
			localStorage.clear();
		}else{
			return clientEngine.clearAll();
		}
	}
	catch(e)
	{
		info("系统错误：001019");
	}
};

/**
 * 打开通讯录
 * @param strCallbackFunctionName {String}	回调函数名
 * @date 2015-07-31
 * @author 穆小宇
 */
var openContacts = function(strCallbackFunctionName){
	try
	{
		if(isDebug){
			callbackFunctionContacts("13701165987","北京","移动");
		}else{
			clientEngine.openContacts(strCallbackFunctionName);
		}
	}
	catch(e)
	{
		info("打开通讯录失败!");
	}
};

/**
 * 打开通讯录
 * @param strCallbackFunctionName {String}	回调函数名
 * @param	tag		0:不需要  strProvince和strCatName(归属地和运行商)
 * 					1:需要	strProvince和strCatName(归属地和运行商)
 * @author liuxueyong
 * @date 2015-12-25
 */
var openContacts = function(strCallbackFunctionName,tag){
	try
	{
		if(isDebug){
			callbackFunctionContacts("13701165987","北京","移动");	
		}else{
			clientEngine.openContacts(strCallbackFunctionName,tag);
		}
	}
	catch(e)
	{
		info("添加紧急联系人时打开通讯录失败!");
	}
};

/**
 * 选择通讯录手机号回调
 * @param 	strPhoneNumber  {String}	手机号    为空  说明手机号不是正规手机号
 * @param	strProvince     {String}	地区      为空  说明没有拿到归属地
 * @param	strCatName      {String}	运营商    为空  说明没有拿到运营商
 * @param	strPhoneName    {String}	手机号对应的姓名
 * @date 2015-07-31
 * @author 穆小宇
 */
var callbackFunctionContacts = function(strPhoneNumber,strProvince,strCatName){
	if(strPhoneNumber != null && strPhoneNumber != "null"){
		$("#strPhoneNumber").val(strPhoneNumber);
		checkPayBut();
	}else{
		if(checkSubmitMobilFW(strPhoneNumber)){
			error("通讯录读取权限未开放");
		}else{
			error("手机号格式不正确");
		}
	}
};

/**
 * 检测运营商
 * @param 	strPhoneNumber  {String}	手机号   
 * @date 2015-07-31
 * @author 穆小宇
 */
var checkOperator = function(strPhoneNumber){
	try
	{
		if(isDebug){
			callbackFunctionCheckOperator("北京","移动");
		}else{
			clientEngine.checkOperator(strPhoneNumber+"");
		}
	}
	catch(e)
	{
		info("系统错误：002018");
	}
};

/**
 * 检测运营商回调<话费充值>
 * @param 	strProvince  {String}	省  
 * @param 	strCatName   {String}	运营商名称   
 * @date 2015-07-31
 * @author 穆小宇
 */
var callbackFunctionCheckOperator = function(strProvince,strCatName){
	getMobieRechargeProductInfo(strProvince,strCatName);
};

/**
 * 请求打开手势密码验证
 * @param 	strGesturePassword  {String}	手势密码  
 * @date 2015-07-31
 * @author 穆小宇
 */
var verifyGesturePassword = function(strGesturePassword){
	try
	{
		if(isDebug){
			procVerifyGesInThread("4");
		}else{
			clientEngine.verifyGesturePassword(strGesturePassword);
		}
	}
	catch(e)
	{
		info("系统错误：002019");
	}
};

/**
 * 手势密码验证回调
 * @param 	strState  {String}	状态
 * @date 2015-07-31
 * @author 穆小宇
 */
var callBackVerifyGesturePassword = function(strState){
	setTimeout('procVerifyGesInThread('+strState+')',150);	
};

/**
 * 手势密码验证回调处理逻辑
 * @param 	strState  {String}	状态 <1成功> <2失败> <3忘记手势密码> <4更换登录方式> <5关闭手势密码成功>
 * @date 2015-07-31
 * @author 穆小宇
 */
function procVerifyGesInThread(strState){
	if(strState == "1"){
		//手势密码输入成功
		//验证设备
		checkVersionByGesture();
		return;
	}else if(strState == "2"){
		//手势密码输入失败
		var lUserId = getStringValue("lUserId");
		lUserId = new Number(lUserId);
		setArrayValue("gesturePasswordArray" + lUserId,null);
		openWindow("login.htm","登录页面","skip=open" ,2,"");
		return;
	}else if(strState == "3"){
		//忘记手势密码
		var lUserId = getStringValue("lUserId");
		lUserId = new Number(lUserId);
		setArrayValue("gesturePasswordArray" + lUserId,null);
		openWindow("login.htm","登录页面","skip=open" ,2,"");
		return;
	}else if(strState == "4"){
		//切换登录方式、临时关闭手势密码
		openWindow("login.htm","登录页面","skip=close" ,2,"");
		return;
	}else if(strState == "5"){
		//关闭手势密码成功
		var lUserId = getStringValue("lUserId");
		lUserId = new Number(lUserId);
		nIsOpenGesturePassword = 2;
		var arrayGesturePassword = ["",nIsOpenGesturePassword];
		arrayGesturePassword = getArrayValue("gesturePasswordArray" + lUserId);
		arrayGesturePassword[1] = nIsOpenGesturePassword;
		setArrayValue("gesturePasswordArray" + lUserId,arrayGesturePassword);
	}
}

/**
 * 关闭手势密码验证
 * @param 	strGesturePassword  {String}	手势密码
 * @param 	lUserId  			{String}	用户id
 * @date 2015-07-31
 * @author 穆小宇
 */
var verifyGesturePasswordClose = function(strGesturePassword,lUserId){
	try
	{
		if(isDebug){
			callBackVerifyGesturePasswordClose();			
		}else{
			clientEngine.verifyGesturePasswordClose(strGesturePassword,lUserId);
		}
	}
	catch(e)
	{
		info("系统错误：002020");
	}
};

/**
 * 关闭手势密码验证回调<成功回调>
 * @date 2015-07-31
 * @author 穆小宇
 */
var callBackVerifyGesturePasswordClose = function(){
	var lUserIdClose = getStringValue("lUserId");
	lUserIdClose = new Number(lUserIdClose);
	nIsOpenGesturePassword = 2;
	var arrayGesturePassword = ["",nIsOpenGesturePassword];
	arrayGesturePassword = getArrayValue("gesturePasswordArray" + lUserIdClose);
	arrayGesturePassword[1] = nIsOpenGesturePassword;
	setArrayValue("gesturePasswordArray" + lUserIdClose,arrayGesturePassword);
	ss_pwd.className = "z_ssCcpws";
	ss_pwd.childNodes[1].className="z_leftrid";
};

/**
 * 请求设置手势密码
 * @date 2015-07-31
 * @author 穆小宇
 */
var setStringGesturePassword = function(){
	try
	{
		if(isDebug){
			callBackSetGesturePassword("");
		}else{
			clientEngine.setStringGesturePassword();
		}
	}
	catch(e)
	{
		info("系统错误：002021");
	}
};

/**
 * 设置手势密码回调<设置手势密码成功>
 * @param 	strGesturePassword  {String}	手势密码
 * @date 2015-07-31
 * @author 穆小宇
 */
var callBackSetGesturePassword = function(strGesturePassword){
	var lUserId = getStringValue("lUserId");
	lUserId = new Number(lUserId);
	var gesturePasswordArray = new Array();
	gesturePasswordArray[0] = strGesturePassword;
	gesturePasswordArray[1] = 1;
	setArrayValue("gesturePasswordArray" + lUserId,gesturePasswordArray);
	openWindow("index.htm","首页","",2,"");
};
/**
 * 根据是否有极光推送消息
 * @date 2016-06-20
 * @author cxg
 */
function goToPageByIsPush() {
	try{
		//判断要去的页面
		var objNotification = getStringValue("notification");
		//移除该消息体,以便正常登陆不受影响
		EngineClass.clearArray(["notification"]);
		
		if(((typeof objNotification) == undefined) || objNotification == ""
			|| objNotification == null || objNotification.length<=0){
			openWindow("index.htm", "首页", "", 2, "");	
		}else{//否则是消息推送过来的数据,需要进入具体的业务页面
			objNotification = JSON.parse(objNotification);
			var lUserId = getStringValue("lUserId");
			//如果推送给的用户和当前登录的用户不一致则直接到首页
			if( (objNotification.lUserId+"") != lUserId){
				openWindow("index.htm", "首页", "", 2, "");
				return;
			}
			var strURIM = objNotification.strURI;
			var strTitleM = objNotification.strTitle;
			var strAttachedDataM = objNotification.strAttachedData;
			//添加是激光推送的标识
			if(strAttachedDataM == "" ){
				strAttachedDataM = "nIsNotice=1";
			}else{
				strAttachedDataM = strAttachedDataM+"&nIsNotice=1";
			}
			var nOpenModeM = objNotification.nOpenMode;
			openWindow(strURIM, strTitleM, strAttachedDataM, 2, "");
		}
	}catch(e){
		//移除该消息体,以便正常登陆不受影响
		EngineClass.clearArray(["notification"]);
		openWindow("index.htm", "首页", "", 2, "");
	}
}

/**
 * 获取手机系统
 * @return  {int}	<1安卓> <2IOS>
 * @date 2015-07-31
 * @author 穆小宇
 */
var getChannelType = function(){
	try
	{
		if(isDebug){
			return 1;
		}else{
			return clientEngine.getChannelType();
		}
	}
	catch(e)
	{
		info("系统错误：002022");
		return null;
	}
};

/**
 * 调用支付引擎窗口
 * @param 	title       	{Stirng}	标题
 * @param 	money       	{Long}		交易金额
 * @param 	realPayMoney   	{Stirng}	实付金额
 * @param 	realPayPoint   	{Stirng}	实付积分
 * @param 	isEncode    	{boolean}	是否加密
 * @param 	strCallbackData {Stirng}	回调函数名
 * @return  {boolean}
 * @date 2015-07-31
 * @author 穆小宇
 */
var openPayWindow = function(strTitle,lMoney,strRealPayMoney,strRealPayPoint,isEncode,strCallbackData){
	try
	{
		if(isDebug){
			callbackFunctionOpenPayWindow("111111","strCallbackData",1);
		}else{
			return clientEngine.openPayWindow(strTitle,lMoney,strRealPayMoney,strRealPayPoint,isEncode,strCallbackData);
		}
	}
	catch(e)
	{
		info("系统错误：002023");
		return null;
	}
};

/**
 * 调用支付引擎窗口<简易版本>
 * @param 	title       	{Stirng}	标题
 * @param 	isEncode    	{boolean}	是否加密
 * @param 	strCallbackData {Stirng}	回调函数名
 * @return  {boolean}
 * @date 2015-07-31
 * @author 穆小宇
 */
var openNewPayWindow = function(title, isEncode, strCallbackData){
	try
	{
		return clientEngine.openNewPayWindow(title,isEncode,strCallbackData);
	}
	catch(e)
	{
		info("系统错误：002024");
		return null;
	}
};

/**
 * 回调支付密码
 * @param 	val       			{Stirng}	密码
 * @param 	strCallbackData    	{boolean}	回调方法名
 * @param 	okOrCanel 			{Stirng}	1是 其他：否
 * @date 2015-07-31
 * @author 穆小宇
 */
var callbackFunctionOpenPayWindow = function(val,strCallbackData,okOrCanel){
	setTimeout(function(){
		eval(strCallbackData+"('" + val + "','" + okOrCanel + "')");
	},200);
};

/**
 * 修改手势密码
 * @param strGesturePassword	{String}	手势密码值
 * @param lUserId				{String}	用户id
 * @date 2015-07-31
 * @author 穆小宇
 */
var editGesturePassword = function(strGesturePassword,lUserId){
	try
	{
		if(isDebug){
			callBackEditGesturePassword("",1);
		}else{
			clientEngine.editGesturePassword(strGesturePassword,lUserId);
		}
	}
	catch(e)
	{
		info("系统错误：002025");
	}
};

/**
 * 修改手势密码
 * @param strGesturePassword	{String}	手势密码值
 * @param strState				{String}	状态 1：成功    2：失败（输入超过N次后）
 * @date 2015-07-31
 * @author 穆小宇
 */
var callBackEditGesturePassword = function(strGesturePassword,strState){
	var lUserId = getStringValue("lUserId");
	lUserId = new Number(lUserId);
	if(strState == "1"){
		//修改成功
		var gesturePasswordArray = new Array();
		gesturePasswordArray[0] = strGesturePassword;
		gesturePasswordArray[1] = 1;
		setArrayValue("gesturePasswordArray" + lUserId,gesturePasswordArray);
		ss_pwd.className = "z_pws_tap"; 
		ss_pwd.childNodes[1].className="z_rightrid";
		//开启
		nIsOpenGesturePassword = 1;
		info("修改手势密码成功！");
	}else if(strState == "2"){
		//修改失败
		setArrayValue("gesturePasswordArray" + lUserId,"");
		info("修改手势密码失败，请用登录密码登录！");
		openWindow("login.htm","登录页","skip=open" ,2,"");
	}
};



/**
 * 选择头像来源
 * @param strCallbackData		{String}	回调地址
 * @param strPhotoId			{String}	头像id
 * @date 2015-07-31
 * @author 穆小宇
 */
var selectAvatarSource = function(strCallbackData,strPhotoId){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.selectAvatarSource(strCallbackData,strPhotoId);
		}
	}
	catch(e)
	{
		info("系统错误：002026");
	}
};

/**
 * 合同商户
 */
var cooperationMerchant = function(){
	try
	{
		clientEngine.cooperationMerchant();
	}
	catch(e)
	{
		info("系统错误：002027");
	}
};


/**
 * 获取手机信息<登录>
 * @date 2015-08-06
 * @author 穆小宇
 * @see 回调 callbackFunctionGetMobileBasicInfo 方法,该方法在login.js里，去登录
 */
function getMobileBasicInfo(){
	try{
		if(isDebug){
			callbackFunctionGetMobileBasicInfo("","","",0,0,"","");			
		}else{
			clientEngine.getMobileBasicInfo();
		}
	}catch(e){
		_shade_layer.hide();
		info("系统错误：002028");
		return;
	}
}
/**
 * 添加红包回调
 * @date 2015-07-31
 * @author 穆小宇
 */
function callBackAddUserMoney(cdoRequest,cdoResponse,ret){
	_shade_layer.hide();
	openWindow("index.htm","首页","",2,"");
}

/**
 * 获取签章的协议
 * @author liuxueyong
 * agreementId<协议编号>
 */
function getCreditorRightsAgreement(agreementId,nIsNewAgreement,modelType){
	var parm = "";
	var xyUrl = "http://main.boss.dafy.com/protocolmanager/view/main.htm?strProtocolId=";
	if(typeof(modelType)=='undefined'){
		parm = "xieyi="+xyUrl+agreementId+"&modelType=7";
		openWindow("common/model/open_xieyi.htm","产品详情",parm,0,"");
	}else{
		parm = "xieyi="+xyUrl+agreementId+"&modelType="+modelType+"&nIsNewAgreement="+nIsNewAgreement;
		openWindow("common/model/open_xieyi.htm","产品详情",parm,0,"");
	}
}

/**
 * 显示签章之前的协议
 * @param {} para
 */
function showSignatureBeforeXieyi(xieyiCode,strTitle){
	var xyURL = "http://main.boss.dafy.com/protocolmanager/view/show/main.htm?code="+xieyiCode;
	strTitle = escape(strTitle);
	para = "xyURL="+xyURL+"&strTitle="+strTitle;
	openWindow("common/model/open_xieyi_before.htm","签章之前协议",para,0,"");
}

/**
 * 打开静态协议模版
 * @param {} strProtocolName  协议名称
 * @param {} strTitle         协议标题
 * lhh  2016-09-13 添加备注
 */
function openStaticXieyi(strProtocolName,strTitle){
	var xyURL = "http://mobile.dafy.com/model/"+strProtocolName;
	var strTitle = escape(strTitle);
	var para = "xyURL="+xyURL+"&strTitle="+strTitle;
	openWindow("common/model/open_xieyi_before.htm","签章之前协议",para,0,"");
}

/**
 * Http请求<不走MobileWalletCenter>
 * @param cdoRequest		
 * @param strCallbackFunctionName		{String}	回调函数名
 * @param strHttpClient					{String}	请求地址
 * @date 2015-07-31
 * @author 穆小宇
 */
var raiseTranshHttp=function(cdoRequest,strCallbackFunctionName,strHttpClient)
{
	try
	{
		if(isDebug){
			var httpClient=new HttpClient("http://dfq.dafy.com/handleTrans.cdo");
			cdoRequest.setStringValue("fcName",strCallbackFunctionName);
			cdoRequest.setStringValue("strRoutePath",strHttpClient);
			httpClient.raiseTrans(cdoRequest,new CDO(),eval("callbackPCFuc"));			
		}else{
			strRequest=cdoRequest.toXML();
			clientEngine.raiseTrans(strRequest,"callbackFunction",strCallbackFunctionName,strHttpClient);
		}
	}
	catch(e)
	{
		info("网络不给力,请稍候重试.");
		if(typeof(_shade_layer) == "object") {
			_shade_layer.hide();
		}
		if(typeof(_loading) == "object") {
			_loading.hide();
		}
	}
};


/**
 * PC端调用的时候模拟手机端的回调 
 * @param {} request
 * @param {} response
 * @param {} ret
 */
function callbackPCFuc(request,response,ret){
	try{
		var fcName = request.getStringValue("fcName");
		var newRes = new CDO();
		newRes.setCDOValue("cdoResponse",response);
		
		var retCDO = new CDO();
		retCDO.setIntegerValue("nCode",ret.nCode);
		retCDO.setStringValue("strText",ret.strText);
		newRes.setCDOValue("cdoReturn",retCDO);
		
		callbackFunction(request.toXML(),newRes.toXML(),fcName);
	}catch(e){
		_plus.tryInfo(e);
	}
}


/**
 * 获取版本号
 * @date 2015-07-31
 * @author 穆小宇
 */
function getVersionName(){
	try{
		if(isDebug){
			return "1.0";
		}else{
			return clientEngine.getVersionName();
		}
	}
	catch(e)
	{
		info("系统错误：002029");
		return "";
	}
	
}



//******************************************************************************************************************
//******************************************1.0---2.0---整合APP使用的引擎*********************************************
//******************************************************************************************************************

/**	
 * 给设备打上标签
 * @param 	tags	{array}		tags[10]、[20]、[10,20,30,40]... ...
 * @date 2015-07-31
 * @author 穆小宇
 */
var setTags=function(tags){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.setTags(tags);
		}
	}
	catch(e)
	{
		info("系统错误：002030");
	}
};

/**	
 * 给设备设置一个别名 
 * @param alias 	{String}	别名	字符类型用于存储如lUserId
 * @date 2015-07-31
 * @author 穆小宇
 */
var setAlias=function(alias){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.setAlias(alias);
		}
	}
	catch(e)
	{
		info("系统错误：002031");
	}
};

/**	
 * 打开App短信界面 <用于激活App2.0账号>
 * @param	strMobile	{String}	手机号
 * @param	strContent	{String}	短信内容	"#ZC#设备码#" 
 * @date 2015-07-31
 * @author 穆小宇
 */
var openMsgWindow=function(strMobile,strContent){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.openMsgWindow(strMobile,strContent);
		}
	}
	catch(e)
	{
		info("系统错误：002032");
	}
};

/**	
 * 打开1.0版本App找回登录密码界面
 * @param	strMobile	{String}	手机号
 * @param	strRetUrl	{String}	窗口关闭返回路径
 * @date 2015-07-31
 * @author 穆小宇
 */
var openRetrievePwdWindow=function(strMobile,strRetUrl){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.openRetrievePwdWindow(strMobile,strRetUrl);
		}
	}
	catch(e)
	{
		info("系统错误：002033");
	}
};

/**	
 * 1.0版本App登录
 * 回调 callBackOpenLoginWindow  lhh 备注2015-12-28
 * @param	_user	{Object}	User信息包含登录名、密码
 * @date 2015-07-31
 * @author 穆小宇
 */
var openLoginWindow=function(_user){
	try
	{
		if(isDebug){
			alert("暂不支持1.0");
		}else{
			clientEngine.openLoginWindow(_user.strLoginId,_user.strPassword);
		}
	}
	catch(e)
	{
		_shade_layer.hide();
		info("系统错误：002034");
	}
};

/**	
 * 通知1.0版本App进入主页
 * @date 2015-07-31
 * @author 穆小宇
 */
function openIndexWindow(){
	try
	{
		if(isDebug){
			alert("暂不支持1.0");			
		}else{
			clientEngine.openIndexWindow();
		}
	}
	catch(e)
	{
		info("系统错误：002035");
	}
}

/**	
 * 获取手机设备号
 * @return 	{String}	手机设备号<唯一标识>
 * @date 2015-07-31
 * @author 穆小宇
 */
function getDeviceCode(){
	try
	{
		if(isDebug){
			return "000055558888";			
		}else{
			return clientEngine.getDeviceCode();
		}
	}
	catch(e)
	{
		info("系统错误：002036");
		return null;
	}
}

/**	
 * 给设备设置一个别名、给设备打上标签
 * @param alias 	{String}	别名	字符类型用于存储如lUserId
 * @param tags		{array}		tags[10]、[20]、[10,20,30,40]... ...
 * @date 2015-07-31
 * @author 穆小宇
 */
function setNotices(alias,tags){
	try
	{
		if(isDebug){
			
		}else{
			clientEngine.setNotices(alias,tags);
		}
	}
	catch(e)
	{
		info("系统错误：002037");
	}
}

/**
 * 获取头像路径（IOS使用）
 * @param strLoginId			{String}		登录名
 * @date 2015-07-31
 * @author 穆小宇
 */
function getAvatarPath(strLoginId){
	try
	{
		if(isDebug){
			return "";			
		}else{
			return clientEngine.getAvatarPath(strLoginId);
		}
	}
	catch(e)
	{
		info("系统错误：002038");
		return null;
	}
}	

/**
 * 在线客服
 * @param url			{String}		在线客服的路径
 * @date 2015-08-26
 * @author lhh
 */
function onlineService(url){
	try
	{
		return clientEngine.onlineService(url);
	}
	catch(e)
	{
		info("系统错误：002039");
		return null;
	}
}

/**
 * 控制物理键开关
 * @param nStatus			{int}		状态	1：open、2：close.
 * @date 2015-09-09
 * @author 穆小宇
 */
function setControlAndroidBack(nStatus){
	try
	{
		if(isDebug){
						
		}else{
			return clientEngine.setControlAndroidBack(nStatus);
		}
	}
	catch(e)
	{
		info("系统错误：002040");
		return null;
	}
}

/**
 * 字符串加密<用于发送短信>
 * @param 待加密字符串			{String}		
 * @date 2015-09-10
 * @author 穆小宇
 */
function getStrEncryptDES(str){
	try
	{
		if(isDebug){
			alert("暂时没有实现H5版本的加密");
			return "";
		}else{
			return clientEngine.getStringEncryptDES(str);
		}
	}
	catch(e)
	{
		info("系统错误：002041");
		return null;
	}
}

/**
 * 字符串解密
 * @param 待解密字符串			{String}		
 * @date 2015-09-10
 * @author 穆小宇
 */
function getStrDecryptDES(str){
	try
	{
		if(isDebug){
			alert("暂时没有实现H5版本的解密");
			return "";
		}else{
			return clientEngine.getStrDecryptDES(str);
		}
	}
	catch(e)
	{
		info("系统错误：002042");
		return null;
	}
}


/**
 * 打开照相机扫描银行卡
 * @param strCallbackFunctionName 回调方法
 * @param strBanks 银行代码列表,用","分隔例如:[305,308,388,303]
 */
var openScanningBankcardPhoto = function(strCallbackFunctionName,strBanks){
	try{
		return clientEngine.openScanningBankcardPhoto(strCallbackFunctionName,strBanks);
	}catch(e){
		info("系统错误：打开失败!"+e);
		return null;
	}
};

/**
 * 验证银行卡
 * @param strCallbackFunctionName 回调方法
 * @param cardNumber 银行卡号
 */
var checkBankcard = function(strCallbackFunctionName,cardNumber){
	try{
		if(isDebug){
			eval(strCallbackFunctionName+"('308','招商银行','招商银行借记卡','"+cardNumber+"')");
		}else{
			return clientEngine.checkBankcard(strCallbackFunctionName,cardNumber);
		}
		
	}catch(e){
		info("验卡错误!"+e);
		return null;
	}	
};


/**
 * 连连支付交易发起调用
 * @param strCallbackFunctionName 回调方法
 * @param params              json数据
 */
var clientTollPay = function(strCallbackFunctionName,params) {
	try{
		clientEngine.clientTollPay(strCallbackFunctionName,params);
	} catch (e) {
		var llCode = "99991";
		var retCode = "1";
		var retText = "系统版本错误,请安装最新版本,客服电话 400-625-9898";
		raiseTransMap = new HashMap();//清空请求MAP
		eval(strCallbackFunctionName+"('"+llCode+"','"+retCode+"','"+retText+"')");
	}
};

/**
 * 连连支付交易发起调用  回调
 * @param llCode   连连状态吗
 * @param retCode   成功0  失败1  处理中2
 * @param retText   失败描述
 */
var callBackClientTollPay = function(llCode , retCode ,retText , strCallbackFunctionName){
	eval(strCallbackFunctionName+"('"+llCode+"','"+retCode+"','"+retText+"')");
};

/**
 * @Title: ChangeLoginState 
 * @Description: TODO(修改登录状态) 
 * @param @param state    0：未登录；1：已登录
 * @return void    返回类型 
 * @throws
 */
var ChangeLoginState = function(state) {
	try{
		//info("ChangeLoginState........"+state);
		clientEngine.ChangeLoginState(state);
	} catch (e) {
		var retText = "新增消息推送功能,请您去AppStore安装最新版本";
		info(retText);
	}
};

/**
 * 拉起键盘
 * @param {} type			  键盘类型 1 金额键盘 2 tel键盘
 * @param {} strCallBackFunc  回调方法
 * 				|-- val  	  点击的数字
 * 				|-- nstate    状态：删除键-1;其他都是0
 * @param {} id				  input的id
 */
var saveUnitException = function(strContent) {
	try{
		var cdoRequest = new CDO();
		var lUserId = getStringValue("lUserId");
		var strLoginId = getStringValue("strLoginId");
		var strName = getStringValue("strName");
		var strMobile = getStringValue("strMobile");
		cdoRequest.setStringValue("strServiceName","UserService");
		cdoRequest.setStringValue("strTransName","createFeedback");
		cdoRequest.setStringValue("strMobile",strMobile);
		cdoRequest.setStringValue("strUserName",strName);
		cdoRequest.setStringValue("strContent",strContent);
		cdoRequest.setStringValue("lUserId",lUserId);
		raiseTrans(cdoRequest,"callBackForFeedback");
	} catch (e) {
		//info(retText);
	}
};

function callBackForFeedback(cdoRequest, cdoResponse, cdoReturn) {
	
}

/**
 * 打开地图
 * latitude 纬度
 * longitude 经度
 * strMerchantName 商户名称
 * strMerchantAddress	商户地址
 */
var openMapWithCoordinate2D = function(latitude,longitude,strMerchantName,strMerchantAddress){
	clientEngine.openMapWithCoordinate2D(latitude,longitude,strMerchantName,strMerchantAddress);
};

/**
 * 定位服务
 * strCallbackFunctionName   回调方法名
 * nTimeout   超时时间
 */
var getLocationMessage = function(strCallbackFunctionName,nTimeout){
	try{
		clientEngine.getLocationMessage(strCallbackFunctionName,nTimeout);
	}catch(e){
		info("定位错误!"+e);
	}	
};

/**
 * 新info带显示时间的
 * @param {} val	val值
 * @param {} time	显示时间
 */
var infoT = function(val,time){
	try{
		time = time || 4;
		clientEngine.infoWithDuration(val,time);
	}catch(e){
		info(val);		
	}
};

/**
 * 通过表单拉起外部页面，然后通过这个设置为我们的标题
 * @param {} strTitle		标题文字
 * @param {} strColor		标题颜色
 * @param {} strBackURL		返回的页面地址 demo/a.htm?a=1&name=111
 */
var setWebviewTitle = function(strTitle,strColor,strBackURL){
	try{
		if(isDebug == true){
			
		}else{
			clientEngine.setTitleViewVisible(strTitle,strColor,strBackURL);
		}
	}catch(e){
		var type = getChannelType();
		var retText = "";
		if(type == 1){ //安卓
			retText = "您的版本不支持,请去下载安装最新版本";
		}else{//IOS
			retText = "您的版本不支持,请去AppStore安装最新版本";
		}
		info(retText);	
	}
}

/**
 * 隐藏webView标题
 */
var hideTitleView = function(){
	try{
		if(isDebug == true){
			
		}else{
			clientEngine.hideTitleView();
		}
	}catch(e){
		var type = getChannelType();
		var retText = "";
		if(type == 1){ //安卓
			retText = "您的版本不支持,请去下载安装最新版本";
		}else{//IOS
			retText = "您的版本不支持,请去AppStore安装最新版本";
		}
		info(retText);	
	}
};

/**
 * 切出app后 回到页面激活
 * 需要使用的页面实现 resumePage 方法
 */
function callBackResumePage(){
	try{
		eval("resumePage()");
	} catch (e) {
	}
}
/**
 * back 返回触发手机调用方法
 * 需要使用的页面实现 refreshPage 方法
 * @data 2019-09-19
 */
function backRefreshPage(){
	try{
		eval("refreshPage()");
	} catch (e) {
	}
}

/**
 * 重构新增缓存，存储数据  2019-09-28 
 */

/** 
 * 保存数据到内存
 * @param key
 * @param value
 * @data 2019-09-28  lhh 添加备注
 */
var setDataToCache = function(key , value) {
	if(isDebug){
		sessionStorage.setItem(key,value);
	}else{
		clientEngine.setDataToCache(key , value);
	}
	
};

/** 
 * 从内存获取数据并移除
 * @param key
 * @return  无值返回null
 * @data 2019-09-28  lhh 添加备注
 */
var getAndRemoveCacheData = function(key) {
	if(isDebug){
		var val = sessionStorage.getItem(key);
		sessionStorage.removeItem(key);
		return val;
	}else{
		return clientEngine.getAndRemoveCacheData(key);
	}
};

/** 
 * 从内存中获取数据，不做移除
 * @param key
 * @return  无值返回null
 * @data 2019-09-28  lhh 添加备注
 */
var getCacheData = function(key) {
	if(isDebug){
		var val = sessionStorage.getItem(key);
		return val;
	}else{
		return clientEngine.getCacheData(key);
	}
};


/** 
 * 移除内存保存的对应数据
 * @param key
 * @data 2019-09-28  lhh 添加备注
 */
var removeCacheData = function(key) {
	if(isDebug){
		sessionStorage.removeItem(key);
	}else{
		clientEngine.removeCacheData(key);
	}
};

/** 
 * 清空内存中所有保存数据
 * @data 2019-09-28  lhh 添加备注
 */
var clearCacheData = function() {
	if(isDebug){
		sessionStorage.clear(); 
	}else{
		clientEngine.clearCacheData();
	}
};


/**
 * 获取用户登录状态 
 * @param  func  是否登录
 */
var userLoginStats=function(func){
	var loginFlag=false;
	var lUserId = getStringValue("lUserId");
	 if(lUserId){
		  var channelType=getChannelType();
		 //IOS
		 if(channelType == 2  || channelType == "2"){
			 try{
				  loginFlag=getUserDataCache("user_login_flag"+lUserId);
				
			 }catch(e){
				 //出现异常不做处理
			 }
	     //安卓
		 }else{
			      loginFlag=getCacheData("user_login_flag"+lUserId);
		    }
		 if( "isLogin" == loginFlag){
			 eval(func+"("+true+")");
		 }else{
			 eval(func+"("+true+")");
		 }
		 }else{
			 eval(func+"("+true+")");
			 
		 }
		
	     
};
var EngineClass = this;
