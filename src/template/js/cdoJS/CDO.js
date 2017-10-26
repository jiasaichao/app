//----------------------------------------------------------------------------
//HashMap
function HashMap() {
	this.arrKey = new Array();
	this.arrValue = new Array();

	//检查Key是否存在
	this.exists = function (strKey) {
		strKey=""+strKey;
		strKey = strKey.toLowerCase();
		for (var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				return true;
			}
		}
		return false;
	};
	this.length = function () {
		return this.arrKey.length;
	};

	//设置Key和Value
	this.put = function (strKey, objValue) {
		strKey=""+strKey;
		for (var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey.toLowerCase()) {
				this.arrValue[i] = objValue;
				return;
			}
		}
		this.arrKey[this.arrKey.length] = strKey;
		this.arrValue[this.arrValue.length] = objValue;
	};

	//获取指定Key的Value，如果Key不存在，返回null
	this.get = function (strKey) {
		strKey=""+strKey;
		strKey = strKey.toLowerCase();
		for (var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				return this.arrValue[i];
			}
		}
		return null;
	};

	//删除一个Key
	this.remove = function (strKey) {
		strKey=""+strKey;
		strKey = strKey.toLowerCase();
		for (var i = 0; i < this.arrKey.length; i++) {
			if (this.arrKey[i].toLowerCase() == strKey) {
				this.arrKey.splice(i, 1);
				var value=this.arrValue[i];
				this.arrValue.splice(i, 1);
				return value;
			}
		}
		
		return null;
	};

	//获取所有的Key数组
	this.getKeys = function () {
		return this.arrKey;
	};

	//获取所有的Value数组
	this.getValues = function () {
		return this.arrValue;
	};
}

//-------------------------------------------------------------
//CDO
function FieldId()
{
	this.nType=0;//0-简单类型，1-多级类型，2-数组元素
	
	this.strMainFieldId="";
	this.strFieldId="";
	this.strIndexFieldId="";
};

//0-简单类型，1-多级，2-数组元素
//如果FieldId错误，则返回null
function parseFieldId(strFieldId)
{
	var nLength=strFieldId.length;;
	
	var fieldId=null;
	if(strFieldId.charAt(nLength-1)==']')
	{//数组元素
		var nMatchIndex=findMatchedChar(nLength-1,strFieldId);
		if(nMatchIndex<1)
		{
			return null;
		}
		
		fieldId=new FieldId();
		fieldId.nType=2;
		fieldId.strMainFieldId=strFieldId.substring(0,nMatchIndex);
		if(fieldId.strMainFieldId.length==0)
		{
			return null;
		}
		fieldId.strIndexFieldId=strFieldId.substring(nMatchIndex+1,nLength-1);
		if(fieldId.strIndexFieldId.length==0)
		{
			return null;
		}
		
		return fieldId;
	}
	
	for(var i=nLength-1;i>=0;i--)
	{
		var ch=strFieldId.charAt(i);
		if(ch=='.')
		{//多级
			fieldId=new FieldId();
			fieldId.nType=1;
			fieldId.strMainFieldId=strFieldId.substring(0,i);
			if(fieldId.strMainFieldId.length==0)
			{
				return null;
			}
			fieldId.strFieldId=strFieldId.substring(i+1);
			if(fieldId.strFieldId.length==0)
			{
				return null;
			}

			return fieldId;
		}
	}
	
	//简单FieldId
	fieldId=new FieldId();
	fieldId.nType=0;
	fieldId.strFieldId=strFieldId;
	
	return fieldId;
}

//----------------------------------------------------------------------------
//定义基本数据类型
function BooleanField(strName, bValue) {
	this.strType = "BooleanField";	
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (bValue == null) {
		bValue = false;
	}
	this.bValue = bValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.bValue;
	};
	this.setValue = function (bValue) {
		this.bValue = bValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<BF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.bValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent= function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<BF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.bValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.bValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.bValue;
		return str_JSON;
	};
}

function ByteField(strName, byValue) {
	this.strType = "ByteField";	
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (byValue == null) {
		byValue = 0;
	}
	this.byValue = byValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.byValue;
	};
	this.setValue = function (byValue) {
		this.byValue = byValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<BYF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.byValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent= function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<BYF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.byValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.byValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.byValue;
		return str_JSON;
	};
}
function ShortField(strName, shValue) {
	this.strType = "ShortField";//ShortField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (shValue == null) {
		shValue = 0;
	}
	this.shValue = shValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.shValue;
	};
	this.setValue = function (shValue) {
		this.shValue = shValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML = "<SF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.shValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<SF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.shValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.shValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.shValue;
		return str_JSON;
	};	
}
function IntegerField(strName, nValue) {
	this.strType = "IntegerField";//IntegerField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (nValue == null) {
		nValue = 0;
	}
	this.nValue = nValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.nValue;
	};
	this.setValue = function (nValue) {
		this.nValue = nValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML = "<NF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.nValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<NF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.nValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.nValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.nValue;
		return str_JSON;
	};	
}
function LongField(strName, lValue) {
	this.strType = "LongField";//LongField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (lValue == null) {
		lValue = 0;
	}
	this.lValue = lValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.lValue;
	};
	this.setValue = function (lValue) {
		this.lValue = lValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<LF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.lValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<LF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.lValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.lValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.lValue;
		return str_JSON;
	};	
}
function FloatField(strName, fValue) {
	this.strType = "FloatField";//FloatField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (fValue == null) {
		fValue = 0;
	}
	this.fValue = fValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.fValue;
	};
	this.setValue = function (fValue) {
		this.fValue = fValue;
	};
	this.toXML = function (nIndentSize) {
		
		var strXML ="<FF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.fValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<FF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.fValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.fValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.fValue;
		return str_JSON;
	};	
}
function DoubleField(strName, dblValue) {
	this.strType = "DoubleField";//DoubleField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (dblValue == null) {
		dblValue = 0;
	}
	this.dblValue = dblValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.dblValue;
	};
	this.setValue = function (dblValue) {
		this.dblValue = dblValue;
	};
	this.toXML = function (nIndentSize) {		
		var strXML ="<DBLF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.dblValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DBLF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.dblValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.dblValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.dblValue;
		return str_JSON;
	};	
}
function StringField(strName, strValue) {
	this.strType = "StringField";//StringField
	this.getType = function () {
		return this.strType;
	};
	this.strName = strName;
	if (strValue == null) {
		strValue = "";
	}
	this.strValue = strValue;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.strValue;
	};
	this.setValue = function (strValue) {
		this.strValue = strValue;
	};
	this.toXML = function (nIndentSize) {

		var strXML ="<STRF N=\"" + this.strName + "\"";
		strXML += " V=\"" + encodeToXMLText(this.strValue) + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<STRF N=\"" + this.strName + "\"";
		strXML += " V=\"" + encodeToXMLText(this.strValue) + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":\\\""+this.strValue+"\\\"";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":\""+this.strValue+"\"";
		return str_JSON;
	};	
}
function DateField(strName, strValue) {
	this.strType = "DateField";//DateField
	this.getType = function () {
		return this.strType;
	};
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.strValue;
	};
	this.setValue = function (strValue) {
		if (strValue.length > 0 && strValue.length != 10) {
			throw "Invalid date format: " + strValue;
		}
		if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null) {
			throw "Invalid date format: " + strValue;
		}
		this.strValue = strValue;
	};
	this.strName = strName;
	if (strValue == null) {
		strValue = 0;
	}
	this.setValue(strValue);
	this.toXML = function (nIndentSize) {
		
		var strXML ="<DF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.strValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.strValue;
		return str_JSON;
	};	
}
function TimeField(strName, strValue) {
	this.strType = "TimeField";//TimeField
	this.getType = function () {
		return this.strType;
	};
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.strValue;
	};
	this.setValue = function (strValue) {
		if (strValue.length > 0 && strValue.length != 8) {
			throw "Invalid time format: " + strValue;
		}
		if (strValue.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
			throw "Invalid time format: " + strValue;
		}
		this.strValue = strValue;
	};
	this.strName = strName;
	if (strValue == null) {
		strValue = 0;
	}
	this.setValue(strValue);
	this.toXML = function (nIndentSize) {
		
		var strXML = "<TF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<TF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.strValue;
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.strValue;
		return str_JSON;
	};	
}
function DateTimeField(strName, strValue) {
	this.strType = "DateTimeField";//DateTimeField
	this.getType = function () {
		return this.strType;
	};
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.strValue;
	};
	this.setValue = function (strValue) {
		if (strValue.length == 0) {
			this.strValue = strValue;
			return;
		}
		if (strValue.length != 19) {
			throw "Invalid datetime format: " + strValue;
		}
		if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
			throw "Invalid datetime format: " + strValue;
		}
		this.strValue = strValue;
	};
	this.strName = strName;
	if (strValue == null) {
		strValue = 0;
	}
	this.setValue(strValue);
	this.toXML = function (nIndentSize) {
		var strXML ="<DTF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DTF N=\"" + this.strName + "\"";
		strXML += " V=\"" + this.strValue + "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":\""+this.strValue+"\"";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":\""+this.strValue+"\"";
		return str_JSON;
	};	
}
//----------------------------------------------------------------------------
//定义基本数据类型数组
function ByteArrayField() {
	this.strType = "ByteArrayField";//ByteArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.bysValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return bysValue.length;
	};
	this.getValue = function () {
		return this.bysValue;
	};
	this.setValue = function (byValue) {
		this.bysValue = byValue;
	};
	this.getValueAt = function (nIndex) {
		return this.bysValue[nIndex];
	};
	this.setValueAt = function (nIndex, byValue) {
		this.bysValue[nIndex] = byValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML = "<BYAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.bysValue.length; i = i + 1) {
			if(i>0)
			{
				strXML +=",";
			}
			strXML+=this.bysValue[i];
		}
		strXML +="\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<BYAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.bysValue.length; i = i + 1) {
			if(i>0)
			{
				strXML +=",";
			}
			strXML+=this.bysValue[i];
		}
		strXML +="\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.bysValue.length;i = i+1)
		{
			var _sign=(i==this.bysValue.length-1)?"":",";
			str_JSON+=""+this.bysValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.bysValue.length;i = i+1)
		{
			var _sign=(i==this.bysValue.length-1)?"":",";
			str_JSON+=""+this.bysValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function ShortArrayField() {
	this.strType = "ShortArrayField";//ShortArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.shsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return shsValue.length;
	};
	this.getValue = function () {
		return this.shsValue;
	};
	this.setValue = function (shValue) {
		this.shsValue = shValue;
	};
	this.getValueAt = function (nIndex) {
		return this.shsValue[nIndex];
	};
	this.setValueAt = function (nIndex, shValue) {
		this.shsValue[nIndex] = shValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<SAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.shsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML +=",";
			}
			strXML += this.shsValue[i];
		}
		strXML +="\"/>";		
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<SAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.shsValue.length; i = i + 1) {			
			if(i>0)
			{
				strXML +=",";
			}
			strXML += this.shsValue[i];			
		}
		strXML +="\"/>\r\n";			
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.shsValue.length;i = i+1)
		{
			var _sign=(i==this.shsValue.length-1)?"":",";
			str_JSON+=""+this.shsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.shsValue.length;i = i+1)
		{
			var _sign=(i==this.shsValue.length-1)?"":",";
			str_JSON+=""+this.shsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function IntegerArrayField() {
	this.strType = "IntegerArrayField";//IntegerArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.nsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return nsValue.length;
	};
	this.getValue = function () {
		return this.nsValue;
	};
	this.setValue = function (nsValue) {
		this.nsValue = nsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.nsValue[nIndex];
	};
	this.setValueAt = function (nIndex, nValue) {
		this.nsValue[nIndex] = nValue;
	};
	
	this.toXML = function (nIndentSize) {
		
		var strXML ="<NAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.nsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML += ",";	
			}			
			strXML+= this.nsValue[i];
		}
		strXML +="\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}		
		var strXML =strIndent+"<NAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.nsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML += ",";	
			}			
			strXML+= this.nsValue[i];
		}
		strXML +="\"/>\r\n";
		return strXML;		
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.nsValue.length;i = i+1)
		{
			var _sign=(i==this.nsValue.length-1)?"":",";
			str_JSON+=""+this.nsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.nsValue.length;i = i+1)
		{
			var _sign=(i==this.nsValue.length-1)?"":",";
			str_JSON+=""+this.nsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function LongArrayField() {
	this.strType = "LongArrayField";//LongArayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.lsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return lsValue.length;
	};
	this.getValue = function () {
		return this.lsValue;
	};
	this.setValue = function (lsValue) {
		this.lsValue = lsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.lsValue[nIndex];
	};
	this.setValueAt = function (nIndex, lValue) {
		this.lsValue[nIndex] = lValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<LAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.lsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.lsValue[i];
		}
		strXML +="\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<LAF N=\"" + this.strName + "\"";
		strXML+= " V=\"";
		for (var i = 0; i < this.lsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.lsValue[i];
		}
		strXML +="\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.lsValue.length;i = i+1)
		{
			var _sign=(i==this.lsValue.length-1)?"":",";
			str_JSON+=""+this.lsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.lsValue.length;i = i+1)
		{
			var _sign=(i==this.lsValue.length-1)?"":",";
			str_JSON+=""+this.lsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function FloatArrayField() {
	this.strType = "FloatArrayField";//FloatArayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.fsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return fsValue.length;
	};
	this.getValue = function () {
		return this.fsValue;
	};
	this.setValue = function (fsValue) {
		this.fsValue = fsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.fsValue[nIndex];
	};
	this.setValueAt = function (nIndex, fValue) {
		this.fsValue[nIndex] = fValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<FAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.fsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML +=  this.fsValue[i];
		}
		strXML += "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<FAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.fsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML +=  this.fsValue[i];
		}
		strXML += "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.fsValue.length;i = i+1)
		{
			var _sign=(i==this.fsValue.length-1)?"":",";
			str_JSON+=""+this.fsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.fsValue.length;i = i+1)
		{
			var _sign=(i==this.fsValue.length-1)?"":",";
			str_JSON+=""+this.fsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function DoubleArrayField() {
	this.strType = "DoubleArrayField";//DoubleArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.dblsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return dblsValue.length;
	};
	this.getValue = function () {
		return this.dblsValue;
	};
	this.setValue = function (dblsValue) {
		this.dblsValue = dblsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.dblsValue[nIndex];
	};
	this.setValueAt = function (nIndex, lValue) {
		this.dblsValue[nIndex] = dblValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<DBLAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.dblsValue.length; i = i + 1){
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.dblsValue[i];
		}
		strXML += "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DBLAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.dblsValue.length; i = i + 1){
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.dblsValue[i];
		}
		strXML += "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.dblsValue.length;i = i+1)
		{
			var _sign=(i==this.dblsValue.length-1)?"":",";
			str_JSON+=""+this.dblsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.dblsValue.length;i = i+1)
		{
			var _sign=(i==this.dblsValue.length-1)?"":",";
			str_JSON+=""+this.dblsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function StringArrayField() {
	this.strType = "StringArrayField";//StringArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.strsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return strsValue.length;
	};
	this.getValue = function () {
		return this.strsValue;
	};
	this.setValue = function (strsValue) {
		this.strsValue = strsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.strsValue[nIndex];
	};
	this.setValueAt = function (nIndex, strValue) {
		this.strsValue[nIndex] = strValue;
	};
	this.toXML = function (nIndentSize){
		var strXML ="<STRAF N=\"" + this.strName + "\">";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			strXML += "<STR>" + encodeToXMLText(this.strsValue[i]) + "</STR>";
		}
		strXML +="</STRAF>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<STRAF N=\"" + this.strName + "\">\r\n";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			strXML += strIndent + "\t<STR>" + encodeToXMLText(this.strsValue[i]) + "</STR>\r\n";
		}
		strXML += strIndent + "</STRAF>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+="\""+this.strsValue[i]+"\""+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function DateArrayField() {
	this.strType = "DateArrayField";//DateArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.strsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return strsValue.length;
	};
	this.getValue = function () {
		return this.strsValue;
	};
	this.setValue = function (strsValue) {
		for (var i = 0; i < strsValue.length; i = i + 1) {
			if (strsValue[i].length == 0) {
				continue;
			}
			if (strsValue[i].length != 10) {
				throw "Invalid date format: " + strsValue[i];
			}
			if (strsValue[i].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null) {
				throw "Invalid date format: " + strsValue[i];
			}
		}
		this.strsValue = strsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.strsValue[nIndex];
	};
	this.setValueAt = function (nIndex, strValue) {
		if (strValue.length > 0 && strValue.length != 10) {
			throw "Invalid date format: " + strValue;
		} else {
			if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null) {
				throw "Invalid date format: " + strValue;
			}
		}
		this.strsValue[nIndex] = strValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<DAF N=\"" + this.strName + "\"";
		strXML +=" V=\""; 
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.strsValue[i];
		}
		strXML += "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DAF N=\"" + this.strName + "\"";
		strXML +=" V=\""; 
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.strsValue[i];
		}
		strXML += "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function TimeArrayField() {
	this.strType = "TimeArrayField";//TimeArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.strsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return strsValue.length;
	};
	this.getValue = function () {
		return this.strsValue;
	};
	this.setValue = function (strsValue) {
		for (var i = 0; i < strsValue.length; i = i + 1) {
			if (strsValue[i].length == 0) {
				continue;
			}
			if (strsValue[i].length != 8) {
				throw "Invalid time format: " + strsValue[i];
			}
			if (strsValue[i].match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
				throw "Invalid time format: " + strsValue[i];
			}
		}
		this.strsValue = strsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.strsValue[nIndex];
	};
	this.setValueAt = function (nIndex, strValue) {
		if (strValue.length > 0 && strValue.length != 8) {
			throw "Invalid time format: " + strValue;
		} else {
			if (strValue.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
				throw "Invalid time format: " + strValue;
			}
		}
		this.strsValue[nIndex] = strValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML = "<TAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.strsValue[i];
		}
		strXML += "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<TAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML += this.strsValue[i];
		}
		strXML += "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}
function DateTimeArrayField() {
	this.strType = "DateTimeArrayField";//DateTimeArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.strsValue = new Array();
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return strsValue.length;
	};
	this.getValue = function () {
		return this.strsValue;
	};
	this.setValue = function (strsValue) {
		for (var i = 0; i < strsValue.length; i = i + 1) {
			if (strsValue[i].length == 0) {
				continue;
			}
			if (strsValue[i].length != 19) {
				throw "Invalid datetime format: " + strsValue[i];
			}
			if (strsValue[i].match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
				throw "Invalid datetime format: " + strsValue[i];
			}
		}
		this.strsValue = strsValue;
	};
	this.getValueAt = function (nIndex) {
		return this.strsValue[nIndex];
	};
	this.setValueAt = function (nIndex, strValue) {
		if (strValue.length > 0 && strValue.length != 19) {
			throw "Invalid datetime format: " + strValue;
		} else {
			if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null) {
				throw "Invalid datetime format: " + strValue;
			}
		}
		this.strsValue[nIndex] = strValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<DTAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML+= this.strsValue[i];
		}
		strXML += "\"/>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<DTAF N=\"" + this.strName + "\"";
		strXML+=" V=\"";
		for (var i = 0; i < this.strsValue.length; i = i + 1) {
			if(i>0)
			{
				strXML+=",";
			}
			strXML+= this.strsValue[i];
		}
		strXML += "\"/>\r\n";
		return strXML;
	};
	
	this.toJSONString= function (){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};

	this.toJSON= function (){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i=0;i < this.strsValue.length;i = i+1)
		{
			var _sign=(i==this.strsValue.length-1)?"":",";
			str_JSON+=""+this.strsValue[i]+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};	
}

//----------------------------------------------------------------------------
//定义复杂数据类型
function CDOField() {
	this.strType = "CDOField";//CDOField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.cdoValue = null;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getValue = function () {
		return this.cdoValue;
	};
	this.setValue = function (cdoValue) {
		this.cdoValue = cdoValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<CDOF N=\"" + this.strName + "\">";
		strXML += this.cdoValue.toXML(nIndentSize + 1);
		strXML +="</CDOF>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<CDOF N=\"" + this.strName + "\">\r\n";
		strXML += this.cdoValue.toXMLWithIndent(nIndentSize + 1);
		strXML += strIndent + "</CDOF>\r\n";
		return strXML;
	};
	
	this.toJSON = function (){
		var str_JSON="\""+this.getName()+"\""+":"+this.cdoValue.toJSON();
		return str_JSON;
	};

	this.toJSONString = function(){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+this.cdoValue.toJSON();
		return str_JSON;
	};	
}
function CDOArrayField() {
	this.strType = "CDOArrayField";//CDOArrayField
	this.getType = function () {
		return this.strType;
	};
	this.strName = "";
	this.cdosValue = null;
	this.getName = function () {
		return this.strName;
	};
	this.setName = function (strName) {
		this.strName = strName;
	};
	this.getLength = function () {
		return cdosValue.length;
	};
	this.getValue = function () {
		return this.cdosValue;
	};
	this.setValue = function (cdosValue) {
		this.cdosValue = cdosValue;
	};
	this.toXML = function (nIndentSize) {
		var strXML ="<CDOAF N=\"" + this.strName + "\">";
		for (var i = 0; i < this.cdosValue.length; i = i + 1) {
			strXML += this.cdosValue[i].toXML(nIndentSize + 1);
		}
		strXML += "</CDOAF>";
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<CDOAF N=\"" + this.strName + "\">\r\n";
		for (var i = 0; i < this.cdosValue.length; i = i + 1) {
			strXML += this.cdosValue[i].toXMLWithIndent(nIndentSize + 1);
		}
		strXML += strIndent + "</CDOAF>\r\n";
		return strXML;
	};
	
	this.toJSONString = function(){
		var str_JSON="\\\""+this.getName()+"\\\""+":"+"[";
		for(var i = 0; i < this.cdosValue.length; i = i + 1)
		{
			var _sign=(i==this.cdosValue.length-1)?"":",";
			str_JSON+=""+this.cdosValue[i].toJSON()+_sign;
		}
		str_JSON+="]";
		return str_JSON.toString();
	};

	this.toJSON = function(){
		var str_JSON="\""+this.getName()+"\""+":"+"[";
		for(var i = 0; i < this.cdosValue.length; i = i + 1)
		{
			var _sign=(i==this.cdosValue.length-1)?"":",";
			str_JSON+=""+this.cdosValue[i].toJSON()+_sign;
		}
		str_JSON+="]";
		return str_JSON;
	};
		
}

function CDO() {
	this.hmItem = new HashMap();	//保存内部的Field，Key为FieldName

	//设置HashMap中的一个Field
	this.setField = function (strName, objField) {
		this.hmItem.put(strName, objField);
	};

	//查找{,[,(,),],}等字符的匹配字符的位置
	//nIndex为待匹配的字符的位置,返回匹配的字符的位置，如果没有，返回-1
	function findMatchedChar(nIndex, strText) {
		if (nIndex < 0) {
			return -1;
		}
		var chChar = strText.charAt(nIndex);
		var nCount = 0;
		var nStartIndex = -1;
		var nEndIndex = -1;
		var chFind = " ";
		switch (chChar) {
		  case "(":
			chFind = ")";
			break;
		  case "{":
			chFind = "}";
			break;
		  case "[":
			chFind = "]";
			break;
		  case ")":
			chFind = "(";
			break;
		  case "}":
			chFind = "{";
			break;
		  case "]":
			chFind = "[";
			break;
		  default:
			return -1;
		}
		var i = 0;
		var ch = null;
		switch (chChar) {
		  case "(":
		  case "{":
		  case "[":
			for (i = nIndex + 1; i < strText.length; i = i + 1) {
				ch = strText.charAt(i);
				if (ch == chChar) {
					nCount = nCount + 1;
				} else {
					if (ch == chFind) {
						if (nCount === 0) {
							nEndIndex = i;
							break;
						} else {
							nCount = nCount - 1;
						}
					}
				}
			}
			return nEndIndex;
		  case ")":
		  case "}":
		  case "]":
			for (i = nIndex - 1; i >= 0; i = i - 1) {
				ch = strText.charAt(i);
				if (ch == chChar) {
					nCount = nCount + 1;
				} else {
					if (ch == chFind) {
						if (nCount === 0) {
							nStartIndex = i;
							break;
						} else {
							nCount = nCount - 1;
						}
					}
				}
			}
			return nStartIndex;
		  default:
			return -1;
		}
	}

	this.fromXMLText=function(xml)
	{
		var nodeCDO=loadXML(xml);
		return this.fromXML(nodeCDO);
	}
	
	this.fromXML = function (nodeCDO) {
		var nodes = nodeCDO.childNodes;
		
		for (var i = 0; i < nodes.length; i = i + 1) {
			var node = nodes[i];
			if (node.nodeType != 1) {//不是Element
				continue;
			}
			
			//是Element
			var strTag = node.tagName;
			switch (strTag) {
			  case "BYF"://ByteField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new ByteField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "SF"://ShortField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new ShortField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "NF"://IntegerField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new IntegerField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "LF"://LongField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new LongField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "FF"://FloatField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new FloatField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "DBLF"://DoubleField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DoubleField(strName, eval(strValue));
				this.hmItem.put(strName, field);
				break;
			  case "STRF"://StringField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new StringField(strName, strValue);
				this.hmItem.put(strName, field);
				break;
			 case "BF"://StringField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new BooleanField(strName, strValue);
				this.hmItem.put(strName, field);
				break;
			  case "DF"://DateField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DateField(strName, strValue);
				this.hmItem.put(strName, field);
				break;
			  case "TF"://TimeField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new TimeField(strName, strValue);
				this.hmItem.put(strName, field);
				break;
			  case "DTF"://DateTimeField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DateTimeField(strName, strValue);
				this.hmItem.put(strName, field);
				break;
			  case "CDOF"://CDOField
				var strName = node.getAttribute("N");
				var cdoValue = new CDO();

				var firxFoxChildNodes = node.childNodes;
				var firxFoxChileNode;
				for(var ff = 0;ff < firxFoxChildNodes.length;ff = ff+1)
				{
					if(firxFoxChildNodes[ff])
					{
						if(firxFoxChildNodes[ff].nodeType==1)
						{//节点类型 ：Node.ELEMENT_NODE
							firxFoxChileNode=firxFoxChildNodes[ff];
							break;
						}
					}
				}
				cdoValue.fromXML(firxFoxChileNode);

				var field = new CDOField();
				field.setName(strName);
				field.setValue(cdoValue);
				this.hmItem.put(strName, field);
				break;
			  case "BYAF"://ByteArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");				
				var field = new ByteArrayField();
				var arrValue=strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "SAF"://ShortArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");					
				var field = new ShortArrayField();
				var arrValue=strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "NAF"://IntegerArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");	
				var field = new IntegerArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "LAF"://LongArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");	
				var field = new LongArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "FAF"://FloatArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new FloatArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "DBLAF"://DoubleArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DoubleArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "STRAF"://StringArrayField
				var strName = node.getAttribute("N");
				var field = new StringArrayField();
				var items = node.childNodes;
				var length = 0;

				var firxFoxChildNodes = new Array();
				var xx=0;
				for(var ff = 0; ff < items.length; ff = ff + 1){
					if(items[ff]){
						if(items[ff].nodeType==1){//节点类型 ：Node.ELEMENT_NODE
							firxFoxChildNodes[xx]=items[ff];
							xx = xx + 1;
						}
					}
				}
				length = xx;

				var arrValue = new Array(length);
				for (var j = 1; j <= length; j = j + 1)
				{
					if(firxFoxChildNodes[j - 1].text!=undefined)
					{//非IE10
						arrValue[j - 1] = firxFoxChildNodes[j - 1].text;
					}
					else
					{//IE10
						arrValue[j - 1] = firxFoxChildNodes[j - 1].textContent;
					}
				}
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "DAF"://DateArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DateArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "TAF"://TimeArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new TimeArrayField();
				var arrValue = strValue.split(",");
				
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "DTAF"://DateTimeArrayField
				var strName = node.getAttribute("N");
				var strValue = node.getAttribute("V");
				var field = new DateTimeArrayField();
				var arrValue = strValue.split(",");
								
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			  case "CDOAF"://CDOArrayField
				var strName = node.getAttribute("N");
				var field = new CDOArrayField();
				var items = node.childNodes;
				var length = 0;
				var firxFoxChildNodes = new Array();
				var xx=0;
				for(var ff = 0; ff < items.length; ff = ff + 1){
					if(items[ff]){
						if(items[ff].nodeType==1){//节点类型 ：Node.ELEMENT_NODE
							firxFoxChildNodes[xx]=items[ff];
							xx = xx + 1;
						}
					}
				}
				length = xx;

				var arrValue = new Array(length);
				for (var j = 1; j <= length; j = j + 1)
				{
					var cdoValue = new CDO();
					var childNode;
					childNode = firxFoxChildNodes[j - 1];
					cdoValue.fromXML(childNode);
					arrValue[j - 1] = cdoValue;
				}
				field.setName(strName);
				field.setValue(arrValue);
				this.hmItem.put(strName, field);
				break;
			}
		}
	};
	function getIndexValue(strIndex, cdoRoot) {
		var nIndex = 0;
		if (strIndex.charAt(0) >= "0" && strIndex.charAt(0) <= "9") {//下标是数字，直接使用
			eval("nIndex=" + strIndex);
		} else {//下标为字段Id，获取字段值当作索引
			return cdoRoot.getFieldValue(strIndex, cdoRoot);
		}
		return nIndex;
	}
	this.getFieldValue = function (strFieldId) {
		return getFieldValue(strFieldId, this);
	};
	this.getFieldValue = function (strFieldId, cdoRoot) {
		var nDotIndex = strFieldId.indexOf(".");
		if (nDotIndex < 0) {//目前为最底层一级
			var nArrayStartIndex = strFieldId.indexOf("[");
			var nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
			if (nArrayStartIndex < 0 && nArrayEndIndex < 0) {//不存在数组下标，直接查找FieldId
				if (this.hmItem.exists(strFieldId) == false) {
					return null;
				}
				return this.hmItem.get(strFieldId).getValue();
			} else {
				if (nArrayStartIndex >= 0 && nArrayEndIndex > 0 && nArrayEndIndex - nArrayStartIndex > 1) {//存在数组下标,首先确定数组下标的值，然后返回对应的FieldValue
					var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
					var nIndex = getIndexValue(strIndex, cdoRoot);

    			//获取值，输出
					return this.hmItem.get(strFieldId.substring(0, nArrayStartIndex)).getValue()[nIndex];
				} else {
					throw "Invalid FieldId " + strFieldId;
				}
			}
		}

    	//FieldId中带有.
		var nArrayStartIndex = strFieldId.indexOf("[");
		if (nArrayStartIndex < 0 || nDotIndex < nArrayStartIndex) {//没有数组或者.在[前面，直接查找并返回下级的值
			var objField = this.hmItem.get(strFieldId.substring(0, nDotIndex));
			if (objField == null) {
				return null;
			}
			var objFieldValue = objField.getValue();
			if (objFieldValue instanceof CDO == false) {
				throw "Invalid FieldId " + strFieldId;
			}
			return objFieldValue.getFieldValue(strFieldId.substring(nDotIndex + 1), cdoRoot);
		}

		//数组在前，首先确定数组下标的值，然后返回对应的值
		//查找[对应的]
		var nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
		if (nArrayEndIndex == -1) {//没有找到对应的]
			throw "Invalid FieldId " + strFieldId;
		}

		//找到]，获取数组下标
		var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
		var nIndex = getIndexValue(strIndex, cdoRoot);
		var cdoField = this.hmItem.get(strFieldId.substring(0, nArrayStartIndex));
		if (cdoField instanceof CDOArrayField) {
			return cdoField.getValue()[nIndex].getFieldValue(strFieldId.substring(nArrayEndIndex + 2), cdoRoot);
		} else {//获取值，输出
			return this.hmItem.get(strFieldId.substring(0, nArrayStartIndex)).getValue()[nIndex];
		}
	};

	//根据FieldId查找到对应的Field
	this.getField = function (strFieldId) {
		return this.getField(strFieldId, this);
	};

	//根据FieldId查找到对应的Field
	this.getField = function (strFieldId, cdoRoot) {
		//strFieldId不能为一个数组的Item
		if (strFieldId.lastIndexOf("]") == strFieldId.length - 1) {
			throw "Invalid FieldId " + strFieldId;
		}
		if (strFieldId.indexOf(".") < 0) {//目前为最底层一级
			var nArrayStartIndex = strFieldId.indexOf("[");
			var nArrayEndIndex = strFieldId.indexOf("]");
			if (nArrayStartIndex < 0 && nArrayEndIndex < 0) {//不存在数组下标，直接查找FieldId
				if (this.hmItem.exists(strFieldId) == false) {
					return null;
				}
				return this.hmItem.get(strFieldId);
			} else {
				if (nArrayStartIndex >= 0 && nArrayEndIndex > 0 && nArrayEndIndex - nArrayStartIndex > 1) {//存在数组下标
					throw "FieldId " + strFieldId + " is invalid";
				}
			}
		}

		//FieldId中带有.
		var nDotIndex = strFieldId.indexOf(".");
		var nArrayStartIndex = strFieldId.indexOf("[");
		if (nArrayStartIndex < 0 || nDotIndex < nArrayStartIndex) {//没有数组或者.在[前面，直接查找并返回下级
			var field = this.hmItem.get(strFieldId.substring(0, nDotIndex));
			if (field == null) {
				return null;
			} else {
				if ((field instanceof CDOField == false)) {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			return field.getValue().getField(strFieldId.substring(nDotIndex + 1), cdoRoot);
		}

		//数组在前，首先确定数组下标的值，然后返回对应的值
		//查找[对应的]
		var nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
		if (nArrayEndIndex == -1) {//没有找到对应的]
			throw "Invalid FieldId " + strFieldId;
		}
		
		//找到]，获取数组下标
		var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
		var nIndex = getIndexValue(strIndex, cdoRoot);
		
		//获取字段，输出
		var field = this.hmItem.get(strFieldId.substring(0, nArrayStartIndex));
		if (field instanceof CDOArrayField == false) {
			throw "Invalid FieldId " + strFieldId;
		}
		return field.getValue()[nIndex].getField(strFieldId.substring(nArrayEndIndex + 2), cdoRoot);
	};
	this.getByteValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this) & 255;
	};
	this.getShortValue = function (strFieldId) {
		return this.getFieldValue(strFieldId) & 65535;
	};
	this.getIntegerValue = function (strFieldId) {
		return this.getFieldValue(strFieldId) & 4294967295;
	};
	this.getLongValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getFloatValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getDoubleValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getStringValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getBooleanValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getDateValue = function (strFieldId) {
		var strDate = this.getFieldValue(strFieldId);
		if (strDate.length == 0 || strDate.length == 10) {
			var date = new DateField("", "");
			date.setValue(strDate);
			return strDate;
		} else {
			if (strDate.length == 19) {
				var dateTime = new DateTimeField("", "");
				dateTime.setValue(strDate);
				return strDate.substring(0, 10);
			} else {
				return null;
			}
		}
	};
	this.getTimeValue = function (strFieldId) {
		var strTime = this.getFieldValue(strFieldId);
		if (strTime.length == 0 || strTime.length == 8) {
			var time = new TimeField("", "");
			time.setValue(strTime);
			return strTime;
		} else {
			if (strTime.length == 19) {
				var dateTime = new DateTimeField("", "");
				dateTime.setValue(strTime);
				return strTime.substring(11, 19);
			} else {
				return null;
			}
		}
	};
	this.getDateTimeValue = function (strFieldId) {
		var strDateTime = this.getFieldValue(strFieldId);
		if (strDateTime.length == 0) {
			return strDateTime;
		} else {
			if (strDateTime.length == 19) {
				var dateTime = new DateTimeField("", "");
				dateTime.setValue(strDateTime);
				return strDateTime;
			} else {
				return null;
			}
		}
	};
	this.getCDOValue = function (strFieldId) {
		return this.getFieldValue(strFieldId);
	};
	this.getByteArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getShortArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getIntegerArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getLongArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getFloatArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getDoubleArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getStringArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getDateArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getTimeArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.getCDOArrayValue = function (strFieldId) {
		return this.getFieldValue(strFieldId, this);
	};
	this.setByteValue = function (strFieldId, byValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, byValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(byValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new ByteField(strFieldName, byValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setShortValue = function (strFieldId, shValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, shValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(shValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new ShortField(strFieldName, shValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setIntegerValue = function (strFieldId, nValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, nValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(nValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new IntegerField(strFieldName, nValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setLongValue = function (strFieldId, lValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, lValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(lValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new LongField(strFieldName, lValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setBooleanValue = function (strFieldId, bValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, bValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(bValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new BooleanField(strFieldName, bValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	
	this.setFloatValue = function (strFieldId, fValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, fValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(fValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new FloatField(strFieldName, fValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDoubleValue = function (strFieldId, dblValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, dblValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(dblValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DoubleField(strFieldName, dblValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setStringValue = function (strFieldId, strValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, strValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(strValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new StringField(strFieldName, strValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDateValue = function (strFieldId, dateValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, dateValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(dateValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DateField(strFieldName, dateValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setTimeValue = function (strFieldId, timeValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, timeValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(timeValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new TimeField(strFieldName, timeValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDateTimeValue = function (strFieldId, dtValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, dtValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(dtValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DateTimeField(strFieldName, dtValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setCDOValue = function (strFieldId, cdoValue) {
		if (strFieldId.charAt(strFieldId.length - 1) == "]") {//数组结尾，给数组项赋值
			var strIndex = "";
    		//查找]对应的[
			var nArrayEndIndex = strFieldId.length - 1;
			var nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
			if (nArrayStartIndex == -1) {//没有找到对应的]
				throw "Invalid FieldId " + strFieldId;
			}
			var field = getField(strFieldId.substring(0, nArrayStartIndex));
			strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
			var nIndex = getIndexValue(strIndex, this);
			field.setValueAt(nIndex, cdoValue);
			return;
		}

    	//不是数组项
		try {
			var field = this.getField(strFieldId);
			field.setValue(cdoValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new CDOField();
			field.setName(strFieldName);
			field.setValue(cdoValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setByteArrayValue = function (strFieldId, bysValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(bysValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new ByteArrayField();
			field.setName(strFieldName);
			field.setValue(bysValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setShortArrayValue = function (strFieldId, shsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(shsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new ShortArrayField();
			field.setName(strFieldName);
			field.setValue(shsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setIntegerArrayValue = function (strFieldId, nsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(nsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new IntegerArrayField();
			field.setName(strFieldName);
			field.setValue(nsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setLongArrayValue = function (strFieldId, lsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(lsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new LongArrayField();
			field.setName(strFieldName);
			field.setValue(lsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setFloatArrayValue = function (strFieldId, fsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(fsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new FloatArrayField();
			field.setName(strFieldName);
			field.setValue(fsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDoubleArrayValue = function (strFieldId, dblsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(dblsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DoubleArrayField();
			field.setName(strFieldName);
			field.setValue(dblsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setStringArrayValue = function (strFieldId, strsValue) {
		var strsXMLValue = new Array(strsValue.length);
		for (var i = 0; i < strsValue.length; i = i + 1) {
			strsXMLValue[i] = strsValue[i];
		}
		strsValue = strsXMLValue;
		try {
			var field = this.getField(strFieldId);
			field.setValue(strsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new StringArrayField();
			field.setName(strFieldName);
			field.setValue(strsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDateArrayValue = function (strFieldId, strsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(strsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DateArrayField();
			field.setName(strFieldName);
			field.setValue(strsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setTimeArrayValue = function (strFieldId, strsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(strsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new TimeArrayField();
			field.setName(strFieldName);
			field.setValue(strsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setDateTimeArrayValue = function (strFieldId, strsValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(strsValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new DateTimeArrayField();
			field.setName(strFieldName);
			field.setValue(strsValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.setCDOArrayValue = function (strFieldId, cdosValue) {
		try {
			var field = this.getField(strFieldId);
			field.setValue(cdosValue);
		}
		catch (e) {//Field不存在，添加之
    		//得到上级FieldValue
			var nDotIndex = -1;
			for (var i = strFieldId.length - 1; i >= 0; i = i - 1) {
				var ch = strFieldId.charAt(i);
				if (ch == ".") {
					nDotIndex = i;
					break;
				}
				if (ch == "]") {
					throw "Invalid FieldId " + strFieldId;
				}
			}
			var objParentValue = null;
			if (nDotIndex == -1) {
				objParentValue = this;
			} else {
				objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
				if (objParentValue instanceof CDO == false) {
					throw "Type mismatch";
				}
			}

    		//在上级的FieldValue内增加该Field
			var strFieldName = strFieldId.substring(nDotIndex + 1);
			var field = new CDOArrayField();
			field.setName(strFieldName);
			field.setValue(cdosValue);
			objParentValue.setField(strFieldName, field);
		}
	};
	this.getFieldIds = function () {
		var arrKeys = this.hmItem.getKeys();
		return arrKeys;
	};

	this.exists = function(strFieldId)
	{
		var field=this.getField(strFieldId);
		if(field==null)
		{
			return false;
		}

		return true;
	}

	this.removeField=function(strFieldId)
	{
    	var field=this.hmItem.remove(strFieldId);
    	if(field!=null)
    	{//直接子节点
    		return;
    	}
    	
		var fieldId=parseFieldId(strFieldId);
    	if(fieldId==null)
    	{//无效FieldId
			throw new RuntimeException("Invalid FieldId "+strFieldId);
    	}
    	
    	if(fieldId.nType==1)
    	{
    		var nDotIndex=strFieldId.lastIndexOf('.');
    		this.getCDOValue(strFieldId.substring(0,nDotIndex)).removeField(strFieldId.substring(nDotIndex+1));
    		return;
    	}
    	
    	//数组项
		var nIndex=getIndexValue(fieldId.strIndexFieldId,this);
		var fieldIdMain=parseFieldId(fieldId.strMainFieldId);
		field=this.getField(fieldIdMain.strFieldId,this);
		field.getValue().splice(nIndex,1);
	}

	this.toXML = function (nIndentSize) {
		var strXML = "<CDO>";
		var arrItems = this.hmItem.getValues();
		for (var i = 0; i < arrItems.length; i = i + 1) {			
			strXML += arrItems[i].toXML(nIndentSize + 1);
		}
		strXML+="</CDO>";		
		return strXML;
	};
	this.toXMLWithIndent = function (nIndentSize) {
		if (nIndentSize == null) {
			nIndentSize = 0;
		}
		var strIndent = "";
		for (var i = 0; i < nIndentSize; i = i + 1) {
			strIndent += "\t";
		}
		var strXML = strIndent + "<CDO>\r\n";
		var arrItems = this.hmItem.getValues();
		for (var i = 0; i < arrItems.length; i = i + 1) {
			strXML += arrItems[i].toXMLWithIndent(nIndentSize + 1);
		}
		strXML += strIndent + "</CDO>\r\n";
		return strXML;
	};
	
		/**
	 * 把CDO对象转换成JSON格式的字符串
	 * 
	 * @param cdo
	 * @return JSON格式的字符串
	 * 
	 */
	this.toJSON = function ()
	{
		var str_JSON="{";

		var arrItems = this.hmItem.getValues();
		for (var i = 0; i < arrItems.length; i = i + 1)
		{
			if(i>0)
			{
				str_JSON+=',';
			}
			str_JSON+=arrItems[i].toJSON();
		}

		// ugly 方法去掉最后一个","
		var _lastComma=str_JSON.lastIndexOf(",");
		var _length=str_JSON.length;
		if(_lastComma==_length-1)
		{
			str_JSON=str_JSON.substring(0,_lastComma);
		}

		str_JSON+="}";
		return str_JSON;
	};

	this.toJSONString = function()
	{
		var str_JSON="{";
		var arrItems = this.hmItem.getValues();
		
		for (var i = 0; i < arrItems.length; i = i + 1)
		{
			if(i>0)
			{
				str_JSON+=',';
			}
			str_JSON+=arrItems[i].toJSONString();
		}

		// ugly 方法去掉最后一个","
		var _lastComma=str_JSON.lastIndexOf(",");
		var _length=str_JSON.length;
		if(_lastComma==_length-1)
		{
			str_JSON=str_JSON.substring(0,_lastComma);
		}

		str_JSON+="}";
		return str_JSON;
	};
	
	this.toString = function()
	{
		return this.toJSONString();
	};
	
	this.fromCDO=function(cdoSource)
	{
		this.hmItem.arrKey=cdoSource.hmItem.arrKey;
		this.hmItem.arrValue=cdoSource.hmItem.arrValue;
	};
}

