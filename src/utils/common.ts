/// <reference path="../../typings/browser.d.ts" />

class Common {
    /**准备样式，方便合并样式*/
    static prepareStyles(s?: CSSProperties): Styles {
        return new Styles(s);
    }
}
class Styles {
    o = {};
    constructor(style: {}) {
        this.merge(style);
    }
    merge(...s: CSSProperties[]): Styles {
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
}
class Color_O implements IColorState {
    /**正常*/
    Normal: IColor_O;
    /**选中*/
    Active: IColor_O;
    /**鼠标移上去*/
    Mouse: IColor_O;
    /**背景色*/
    private bg: string;
    /**鼠标移上去背景色*/
    private bgMouse: string;
    /**选中状态态背景色*/
    private bgActive: string;
    /**字体颜色*/
    private font: string;
    /**鼠标移上去字体颜色*/
    private fontMouse: string;
    /**选中状态字体颜色*/
    private fontActive: string;
    /**
      * 初始化颜色对象
      * @param thebg 背景色
      * @param thefont 字体颜色
      * @param thebgMouse 鼠标移上去背景色
      * @param thefontMouse 鼠标移上去字体颜色
      * @param thebgActive 选中状态背景色
      * @param thefontActive 选中状态字体颜色
      */
    constructor(thebg: string, thefont: string, thebgMouse: string = null, thefontMouse: string = null, thebgActive: string = null, thefontActive: string = null) {
        this.bg = thebg;
        this.bgMouse = thebgMouse || this.bg;
        this.bgActive = thebgActive || this.bg;
        this.font = thefont;
        this.fontMouse = thefontMouse || this.font;
        this.fontActive = thefontActive || this.font;

        this.Normal = { background: this.bg, color: this.font };
        this.Mouse = { background: this.bgMouse, color: this.fontMouse };
        this.Active = { background: this.bgActive, color: this.fontActive };
    }
}

//颜色组
class Colors {
    /**主要色调,蓝绿色，激活状态颜色，深色，显示重要的颜色，提交按钮颜色 */
    static mainActive="#36c6d3";
    /**深一个颜色 */
    static mainActive_deep1="#26a1ab";
    /**主要色调，背景色，深的颜色，滑动菜单背景色，比头部背景色要浅 */
    static mainBackground="#364150";
    /**头部背景色 */
    static bgHeader = '#2b3643';
    /**头部鼠标移上背景色 */
    static bgHeaderMouse = '#3F4F62';
    /**头部当前背景色 */
    static bgHeaderActive = Colors.mainActive;
    /**头部字体色 */
    static fontHeader = '#c6cfda';
    /**头部鼠标移上字体色 */
    static fontHeaderMouse = '#d5dce4';
    /**头部当前字体色 */
    static fontHeaderActive = '#fff';
    /**深色1，分页选中，和字体都是这个色*/
    static colorshen1 = '#337AB7';
    /**鼠标移到分页按钮上的颜色，也是很多移到上边需要变浅色的颜色*/
    static colorMouse = '#EEEEEE';
    static bgSidebar = Colors.mainBackground;
    static bgSidebarMouse = Colors.bgHeader;
    static bgSidebarActive = Colors.mainActive;
    static fontSidebar = '#b4bcc8';
    static fontSidebarMouse = Colors.fontHeader;
    static fontSidebarActive = Colors.fontHeaderActive;
    static header = new Color_O(Colors.bgHeader, Colors.fontHeader, Colors.bgHeaderMouse
        , Colors.fontHeaderMouse, Colors.bgHeaderActive, Colors.bgHeaderActive);
    static sidebar = new Color_O(Colors.bgSidebar, Colors.fontSidebar, Colors.bgSidebarMouse
        , Colors.fontSidebarMouse, Colors.bgSidebarActive, '#fff');
    static sidebaritem = new Color_O(Colors.bgSidebar, Colors.fontSidebar, '#3E4B5C', '#fff', '#3E4B5C', '#fff');
    /**提交按钮颜色组*/
    static butonSubmit = new Color_O(Colors.mainActive, Colors.fontHeaderActive, Colors.mainActive_deep1
        , Colors.fontSidebarMouse, Colors.bgSidebarActive, Colors.bgSidebarActive);
    /**分页按钮颜色组*/
    static butonPage = new Color_O('#fff', Colors.colorshen1, Colors.colorMouse
        , Colors.colorshen1, Colors.colorshen1, '#fff');
}

class Global {
    static padding = 20;
    static colors = Colors;
    static styles = {
        czjz: { display: "flex", alignItems: "center" },
        czspjz: { display: "flex", alignItems: "center", justifyContent: "center" },
        spjz: { display: "flex", justifyContent: "center" },
        /**水平居中，排列方向是垂直排列，父元素如果是flex并且高度是100%的情况，如果直接spjz则会高度会充满*/
        spjzcolumn: { display: "flex", alignItems: "center", flexDirection: 'column' },
        /**绝对定位，不设置的项填写null*/
        absolute:
        /**
         * 绝对定位
        * @param t top值
        */
        (t?: string, r?: string, b?: string, l?: string) => {

            console.log(t !== null);
            let ret = Common.prepareStyles({ position: 'absolute' });
            if (t !== null) { ret.merge({ top: t }) };
            if (r !== null) { ret.merge({ right: r }) };
            if (b !== null) { ret.merge({ bottom: b }) };
            if (l !== null) { ret.merge({ left: l }) };
            return ret.o;
        },
        create:  Common.prepareStyles
    };
}



export {Common};
export {Global};
export {Colors}