/// <reference path="../../typings/browser.d.ts" />

import {Common, Global} from "../utils/common";
interface IHeaderProps extends React.Props<Header> {
    colorState?: IColorState;
}
class Header extends React.Component<IHeaderProps, {}> {
    render() {
        let hb = Common.prepareStyles;
        let styles = {
            wrapper: hb({
                height: '46px',
                width: '100%',
                background: Global.colors.bgHeader,
                display: "flex",
                alignItems: "center"
            }),
            left: {
                padding: `0 ${Global.padding}px`,
                display: "flex",
                alignItems: "center",
                width: "195px"
            },
            logo: {
                color: "#fff",
                fontSize: 14,
                textDecoration: "none"
            },
            right: {
                padding: `0 ${Global.padding}px`,
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                height:"100%"
            }
        }
        return <div style={styles.wrapper.o}>
                <div style={styles.left}>
                    <a style={styles.logo} href="#">首页</a>
                    <span style={{ flexGrow: 1 }}></span>
                    <span style={{ fontSize: "24px", color: "#fff" }} className="icon-menu"></span>
                </div>
                <div style={styles.right}>
                {this.props.children}
                </div>
            </div>
    }
}

export default Header