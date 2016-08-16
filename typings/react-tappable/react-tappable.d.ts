//自己定义的react-tappable的d.ts文件，因为typings没有收录。
//项目https://github.com/JedWatson/react-tappable

/// <reference path="../react/react.d.ts" />
declare namespace ReactTappable {
    interface TappableProps {
        /**ms 延迟之前 -active 的类添加，默认值为 0  */
        activeDelay?: Number;
        /**元素名称，默认span */
        component?: string;
        /**应用于组件的样式 */
        style?: Object;
        preventDefault?: boolean;
        stopPropagation?: boolean;
        /**点击时加样式的名称默认Tappable， [classBase]-active*/
        classBase?:string; 
         onTap ?: (e) => void;
    }
    interface Tappable extends __React.ComponentClass<TappableProps> {}
}
declare module "react-tappable" {

    //var Tappable: ReactTappable.Tappable;
    // var TabList: ReactTabs.TabList;
    // var Tab: ReactTabs.Tab;
    // var TabPanel: ReactTabs.TabPanel;
 let module: ReactTappable.Tappable;
    export = module;
   //export default Tappable;

}