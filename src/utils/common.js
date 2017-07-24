

class Common {
    /**准备样式，方便合并样式*/
    static prepareStyles(s) {
        return new Styles(s);
    }
    /**
     * classname的helper函数，合并classname,现在只支持字符串。
     * @param {*} classname 
     * @returns 合并后的classname
     */
    static classnames(...name) {
        var refStr = '';
        //var classNameArray = [];
        name.forEach(function (value) {
            value.split(' ').forEach(function (classNameItem) {
                if (classNameItem !== '') {
                    refStr+=' '+classNameItem;
                }
            });
        });
        return refStr;
    }
}
class Styles {
    constructor(style) {
        this.o = {};
        this.merge(style);
    }
    /**合并 */
    merge(...s) {
        for (var i = 0; i < s.length; i++) {
            let properties = s[i];
            for (var p in properties) {
                if (typeof (properties[p]) != "function") {
                    this.o[p] = properties[p];
                }
            }
        }
        return this;
    }
    /**不合并，直接返回this和加入的对象，不改变this */
    notmerge(...s) {
        // let tmp = {};
        // s.push(this.o);
        // for (var i = 0; i < s.length; i++) {
        //     let properties = s[i];
        //     for (var p in properties) {
        //         if (typeof (properties[p]) != "function") {
        //             tmp[p] = properties[p];
        //         }
        //     }
        // }
        // return tmp;

        let tmp = {}
        for (var i = 0; i < s.length; i++) {
            let properties = s[i];
            for (var p in properties) {
                if (typeof (properties[p]) != "function") {
                    tmp[p] = properties[p];
                }
            }
        }
        return { ...this.o, ...tmp }
    }
}
/**处理class样式 */
class ClassName {
    constructor(...s) {
        this.o = '';
        s.forEach((value) => {
            this.merge(value);
        });
    }
    merge(...s) {
        s.forEach((value) => {
            this.o += ' ' + value;
        });
        return this;
    }
}

const styles = {
    czjz: { display: "flex", alignItems: "center" },
    czspjz: { display: "flex", alignItems: "center", justifyContent: "center" },
    spjz: { display: "flex", justifyContent: "center" },
    /**水平居中，排列方向是垂直排列，父元素如果是flex并且高度是100%的情况，如果直接spjz则会高度会充满*/
    spjzcolumn: { display: "flex", alignItems: "center", flexDirection: 'column' },
    /**绝对定位，不设置的项填写null*/
    absolute:
    /**
     * 绝对定位，不设置的项填写null
    * @param t top值
    */
    (t, r, b, l) => {
        //console.log(t !== null);
        let ret = Common.prepareStyles({ position: 'absolute' });
        if (t !== null) { ret.merge({ top: t }) }
        if (r !== null) { ret.merge({ right: r }) }
        if (b !== null) { ret.merge({ bottom: b }) }
        if (l !== null) { ret.merge({ left: l }) }
        return ret.o;
    },

    create: Common.prepareStyles,
    /**去掉手指长按出现选择文字*/
    noSelect: {
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        cursor: 'pointer'
    },
    /**平移方式居中*/
    spjz1: {
        marginLeft: '50%',
        WebkitTransform: 'translate(-50%,0)',
        MsTransform: 'translate(-50%,0)',
        transform: 'translate(-50%,0)'
    },
    /**平移方式居中*/
    czjz1: {
        marginTop: '50%',
        WebkitTransform: 'translate(0,-50%)',
        MsTransform: 'translate(0,-50%)',
        transform: 'translate(0,-50%)'
    }
}
const className = {
    /**display:flex兼容写法 */
    flex: ' display-flex ',
    justifyContent: ' justify-content ',
    alignItems: ' align-items ',
    flexDirection: ' flex-direction ',
    flexDirectionColumn: ' flex-direction-column ',
    flexGrow: ' flex-grow ',
    spjz: ' display-flex justify-content ',
    spczjz: ' display-flex justify-content align-items ',
    czjz: ' display-flex align-items ',
}
/**
 * 设备信息
 */
const Device = {
    /**系统名称:Android,IOS,Other*/
    OS: function () {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
            return 'Android';
        }
        else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return 'IOS';
        }
        else {
            return 'Other';
        }
    }(),
    IsMobile: function () {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            return true;
        }
        else {
            return false;
        }
    }()
};
const Global = { styles, className, Device };


export { Common };
export { Global };