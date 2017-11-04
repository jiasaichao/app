import React from 'react';
/**
 * 所有页面的容器组件都必须继承此类
 */
export class Container extends React.Component {
    constructor(props) {
        super(props)
        window.refreshPage = () => {
            this.refreshPage();
        }
        window.openRefreshPage = () => {
            this.openRefreshPage();
        }
    }
    /**
     * back返回的回调
     */
    refreshPage(){

    }
    
    /**
     * 缓存页面openwindow的回调
     */
    openRefreshPage(){

    }

}