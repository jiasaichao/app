/**
 * 这是弹框插件
 * 	open1 打开有标题的弹框
 * 	 	_TTPopups.open1({
			title:'弹出层插件',		//title
			contentId:'content_id',	//请传入ID
			cancelBtn:"否",
			submitBtn:"是",
			closeCallBack:test11
		});
				
 *  open2 打开提示性弹框
 * 	  	_TTPopups.open2({
			content:"这是一个屌丝弹框",
			cancelBtn:"否",
			submitBtn:"是",
			closeCallBack:test11
	  });
 * @param {Object} window
 * @param {Object} undefined
 * 
 * 按钮的回调
 * 	 0：取消
 *   1：确定
 */
(function(window,undefined){
		var TTPopups=function()
			{
				this.index1 = 0;
				this.index2 = 0;
				this.zzId1 = "TTPopups_zz_div_id";
				this.zzId2 = "TTPopups_zz_div_id2";
			}
			TTPopups.prototype={
				open1:function(options){
					if(this.index1 == 0){
						this.opt=this.setOpt(options);
						this.layertype1();
						this.closePupus1();
					}else{
						this.showDiv1();
					}
					this.index1 = this.index1 + 1;
				},
				open2:function(options){
					this.opt2=this.setOpt(options);
					this.layertype2();
					this.closePupus2();
				},
				showDiv1:function(){
					var zzDiv = this.getId(this.zzId1);
					if(zzDiv){
						this.zzDiv.style.display="block";
				   		this.zDiv.style.display="block";
					}
				},
				layertype1:function(){
					//记住：这里需要判断 我们自己的div的Id，如果有则直接用，没有则创建div
					//1.创建遮罩层
					//2.创建div
					//3.给取消和确定按钮设置文字和绑定事件
					
					//内容
					var _zzDiv = this.append(this.zzId1,"black_adoverlayasd","","body"),
						_zDiv = this.append("TTPopups_z_div_id","api_Eject_k","","body"),				 
						_z2Div = this.append("","api_Payment_pwd","",_zDiv),
						_titleDiv = this.append("","app_poptitle font-size5 color2",this.opt.title,_z2Div); 				
						_zzDiv.style.display="block";										
					//
					var	_content_div = this.append("","",this.getHtml(this.opt.contentId),_z2Div);				
						//按钮
					var _btn_z_div = this.append("","api_rech_submit","",_z2Div),
						_btn_qx_div = this.append("","api_rech_Button api_rech_Cancel",this.opt.cancelBtn,_btn_z_div),
						_btn_qd_div = this.append("","api_rech_Button api_rech_Payment",this.opt.submitBtn,_btn_z_div);					
						_btn_qx_div.setAttribute("index","0");
						_btn_qd_div.setAttribute("index","1");	
					//	document.body.style.overflow = 'hidden';
						//给对象设置相关属性，将弹框的div存储在对象上
						this.cancelDom = _btn_qx_div;
						this.submitDom = _btn_qd_div;
					    this.zzDiv = _zzDiv;
					    this.zDiv = _zDiv;
					   	this.black_width();
					    this.bodyHeight();
					    document.ontouchmove = function(e){ e.preventDefault();}
				},
				showDiv2:function(){
					var zzDiv2 = this.getId(this.zzId2);
					if(zzDiv2){
						this.zzDiv2.style.display="block";
				   		this.zDiv2.style.display="block";
					}
				},
				layertype2:function(){
					//记住：这里需要判断 我们自己的div的Id，如果有则直接用，没有则创建div
					//1.创建遮罩层
					//2.创建div
					//3.给取消和确定按钮设置文字和绑定事件
					//内容
					var _zzDiv2 = this.append(this.zzId2,"black_adoverlayasd","","body"),
						_zDiv2 = this.append("TTPopups_z_div_id2","api_Eject_n","","body"),				 
						_z2Div = this.append("","api_Payment_pwd","",_zDiv2),
						_content = this.append("","app_poptitle font-size5 color2",this.opt2.content,_z2Div); 				
						_zzDiv2.style.display="block";
						
					//按钮					 
					var _btn_div = this.append("","api_rechsr_submit","",_z2Div),
					    _btn_submit_cancel = this.append("","api_rech_lefts_Button",this.opt2.cancelBtn,_btn_div),
						_btn_submit_confirm = this.append("","api_rech_rights_Button",this.opt2.submitBtn,_btn_div);
						
						_btn_submit_cancel.setAttribute("index","0");
						_btn_submit_confirm.setAttribute("index","1");
					//	document.body.style.overflow = 'hidden';
						this.cancelDom2 = _btn_submit_cancel;
						this.submitDom2 = _btn_submit_confirm;					
					    this.zzDiv2 = _zzDiv2;
					    this.zDiv2 = _zDiv2;
					    this.content2 = _content;
					    this.black_width();
					    this.bodyHeight();
					    document.ontouchmove = function(e){ e.preventDefault();}
				},
				winWidth:function(){
			  		if (window.innerWidth){
						winWidth = window.innerWidth; 
					}else if((document.body) && (document.body.clientWidth)){
						winWidth = document.body.clientWidth; 
					}
			  		return winWidth;
				},
				winHeight:function(){
					//获取窗口高度 
					if (window.innerHeight){
						winHeight = window.innerHeight; 
					}else if ((document.body) && (document.body.clientHeight)){
						winHeight = document.body.clientHeight;
					}
					return winHeight;
				},
				bodyHeight:function(){
					bodyHeight = document.body.scrollHeight;
					//alert(bodyHeight);
					return bodyHeight;
				},
				black_width:function(){
					if(this.bodyHeight()>this.winHeight()){
						var div_id =  document.getElementById('TTPopups_zz_div_id');
						var div_id2 = document.getElementById('TTPopups_zz_div_id2');
						if(div_id){
							div_id.style.width = this.winWidth()+"px";
							div_id.style.height = this.winHeight()+"px";
						}else if(div_id2){
							div_id2.style.width = this.winWidth()+"px";
							div_id2.style.height = this.winHeight()+"px";
						}else {
							return
						}
				    }else{
						var div_id =  document.getElementById('TTPopups_zz_div_id');
						var div_id2 = document.getElementById('TTPopups_zz_div_id2');
						if(div_id){
							div_id.style.width = this.winWidth()+"px";
							div_id.style.height = this.winHeight()+"px";
						}else if(div_id2){
							div_id2.style.width = this.winWidth()+"px";
							div_id2.style.height = this.winHeight()+"px";
						}else {
							return
						}
				    }
				},			
				closePupus1:function()	//绑定事件
				{
				   	this.addEvent(this.cancelDom,'click',this.bind(this,closefn));
				    this.addEvent(this.submitDom,'click',this.bind(this,closefn));
				   function closefn(e)
				   {	
				   		var dom = e.srcElement || e.target;
				   		var index = dom.getAttribute("index");
				   		var that=this;
				   		that.zzDiv.style.display="none";
				   		that.zDiv.style.display="none";	
				   	//	document.body.style.overflow = 'auto';
				   		document.ontouchmove = function(e){}
				   		//document.documentElement.style.overflow = 'auto';
				   		if(that.opt.closeCallBack){
							   var func = that.opt.closeCallBack;
							   func(index);
			   	 		 	//eval(func+"('"+index+"')");
				   		}
				   }
				},
				closePupus2:function()	//绑定事件
				{
				   this.resize(); //浏览器变化弹框背景高度和宽度自适应
				   this.addEvent(this.cancelDom2,'click',this.bind(this,closefn));
				   this.addEvent(this.submitDom2,'click',this.bind(this,closefn));
				   function closefn(e)
				   {	
				   		 var dom = e.srcElement || e.target;
				   		 var index = dom.getAttribute("index");
				   		 var that=this;
				   		 
				   		 var _zzDiv2 = that.zzDiv2;
				   		 var _zDiv2 = that.zDiv2;
				   		 _zzDiv2.parentNode.removeChild(_zzDiv2);
				   		 _zDiv2.parentNode.removeChild(_zDiv2);
				   	//	document.body.style.overflow = 'auto';
				   		document.ontouchmove = function(e){}
				   		 that.zzDiv2 = {};
				   		 that.zDiv2 = {};
				   		 
				   		 if(that.opt2.closeCallBack){
								var func = that.opt2.closeCallBack;
								func(index);
			   	 		 	// eval(func+"('"+index+"')");
				   		 }
				   		 
				   		 /*
			   	 		 if(that.opt2.closeCallBack && typeof that.opt2.closeCallBack==='function')
			   	 		 {
			   	 		 	 that.opt2.closeCallBack(index);
			   	 		 }*/
				   }
				},
				bind:function(o,fn)
				{
					return function(){
						return fn.apply(o,arguments)
					}
				},
				setOpt:function(o)
				{   
					var defaultOptions={
						title:'',			//title
						contentId:'',		//请传入ID，或DOM对象
						content:'',			//内容
						closeCallBack:null,	//关闭执行的回调函数
						cancelBtn:'取消',	//取消文字
						submitBtn:'确定'		//确定按钮的文字
					};					
					if(o && Object.prototype.toString.call(o)=='[object Object]')
					{
						for(var k in o)
						{
							defaultOptions[k]= typeof o[k]==='undefined' ? defaultOptions[k] : o[k];
						}
					}
					return defaultOptions;
				},
				getId:function(s)
				{
					return document.getElementById(s);
				},
				getHtml:function(t){
					return document.getElementById(t).innerHTML;				
				},
				tagname:function(n){
					return document.getElementsByTagName(n)[0];				
				},
				setHtml:function(m,data){
					m.innerHTML = '';
					m.innerHTML = data;
				},
				createDiv:function(id,cName,html){	
					id = id || "";
					cName = cName || "";
					html = html || "";
					var div = document.createElement('div');
					div.id = id;
					div.className = cName;
					div.innerHTML = html;		
					return div; 
				},
				append:function(id,cName,html,obj){
					if(obj == 'body'){
						obj = this.tagname(obj);
					}
					var div = this.createDiv(id,cName,html);
					obj.appendChild(div);
					return div; 
				},		
				resize:function(){
					// alert(this.getInner(111));
					var zzID_bk = document.getElementById(this.zzId2);
					
					this.addEvent(window, 'resize', function () {
					//	element.offsetLeft
						//that = this;
						var width = getInner().width;
						var height = getInner().height;
						zzID_bk.style.width = width+"px";
						zzID_bk.style.height = height+"px";
					//	alert(zzID.nodeName);
						function getInner(){
							if (typeof window.innerWidth != 'undefined') {
								return {
									width : window.innerWidth,
									height : window.innerHeight
								}
							} else {
								return {
									width : document.documentElement.clientWidth,
									height : document.documentElement.clientHeight
								}
							}							
						}

					})
				},
				addEvent: function(e, n, o){
					if(e.addEventListener){
					 	e.addEventListener(n, o,false);
					} else if(e.attachEvent){
						e.attachEvent('on' + n, o);
					}
				}
				
			}

			window.TTPopups=TTPopups;

	})(window,undefined);
	
var _TTPopups = new TTPopups();