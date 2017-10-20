import React from 'react';
import { Flex, Abs, Text } from './layout';
import { Icon } from './icon';
import { TouchableFlex } from './touchable';
export class Page1 extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', overflowX: 'hidden', overflowY: 'scroll', WebkitOverflowScrolling: 'touch', willChange: 'scroll-position', position: 'absolute', bottom: '.98rem', top: 0 }}>
                {this.props.children}
            </div>
        );
    }
}
export function Page({ title, backName, headBg = '#108ee9', headColor = '#fff', bg = '', style, children/*, hideHead*/ }) {
    let styles = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden', ...style }
    if (bg) {
        styles.background = bg;
    }
    /**
     * 内容距离顶部距离
     */
    let top = 0;
    let head = null;

    if (title) {
        top = '.9rem';
        head = (
            <Flex HW style={{ height: '.9rem', background: headBg, position: 'relative' }}>
                <Text label={title} fontSize='.36rem' color={headColor} />
                <TouchableFlex vertical style={{ height: '100%', position: 'absolute', left: 0, padding: '0 .3rem' }}>
                    <Icon name='arrowBack' color={headColor} width='.44rem' height='.44rem' /> <Text fontSize='.32rem' color={headColor} label={backName} />
                </TouchableFlex>
                <Flex vertical style={{ height: '100%', position: 'absolute', right: '.3rem' }}></Flex>
            </Flex>
        );
    }
    /**#endregion "This is the code to be collapsed" */
    return (
        <div style={styles}>
            <div>
                <div id='code' style={{
                    position: 'absolute',
                    color: 'red',
                    fontSize: '.4rem',
                    zIndex: 9999,
                    userSelect: 'all',
                    width: '100%',
                    wordBreak: 'break-all',
                    top: 0,
                    bottom: '1rem',
                    overflowY: 'auto',
                    display: 'none'
                }}></div>
                <Flex style={{ zIndex: 9999, position: 'absolute', bottom: 0, left: 0 }} other={{ id: 'xianshijiekou' }}>
                    <TouchableFlex onTap={() => {
                        if (document.getElementById('code').style.display == 'none') {
                            document.getElementById('code').style.display = 'block'
                            document.getElementById('code').innerHTML=JSON.stringify(window.raiseTransCallBack.DEV_DataList)
                        } else {
                            document.getElementById('code').style.display = 'none'
                        }
                    }}>显示接口</TouchableFlex>
                    <TouchableFlex onTap={() => {
                        if (document.getElementById('xianshijiekou').style.left == '0px') {
                            document.getElementById('xianshijiekou').style.left = 'auto'
                            document.getElementById('xianshijiekou').style.right = '0px'
                        } else {
                            document.getElementById('xianshijiekou').style.left = '0px'
                            document.getElementById('xianshijiekou').style.right = 'auto'
                        }
                    }} style={{ marginLeft: '.2rem' }}>动</TouchableFlex>
                </Flex>
            </div>
            {head}
            <div style={{ width: '100%', overflowX: 'hidden', overflowY: 'scroll', WebkitOverflowScrolling: 'touch', willChange: 'scroll-position', position: 'absolute', bottom: 0, top }}>
                {children}
            </div>
        </div>

    )
}