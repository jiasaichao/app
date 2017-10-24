import React from 'react';
import { Page, Icon, Flex, Placeholder, Image, Text, TouchableFlex } from '../../src/components';
import { unreadCount, queryIdentity, getAccountBalance, getGrant, getQueryCredit } from '../../src/services/services';
import { User } from '../utils/user';
export class Home extends React.Component {
    constructor(props) {
        super(props)
        //region 头像
        let avatarPath = window.getStringValue(strLoginId);
        let strLoginId = window.getStringValue("strLoginId");
        var strLastLoginEquip = window.getStringValue("strLastLoginEquip");
        if (strLastLoginEquip == "iphone") {
            avatarPath = window.getAvatarPath(strLoginId);
        }
        if (!avatarPath) {
            avatarPath = require('../../build/prod/img/DefaultAvatar.png');
        }
        //endregion
        this.state = {
            GrantState: {
                isLoad: false,
                //授信状态 0-未授信,1-已过期, 2-使用中, 3-已终止
                nGrantState: 0,
                //信审状态 0-未审核,1-待信审，2-信审中,3-信审通过,4-信审退回,5-信审拒绝,6变更待提交
                nCreditState: 0,
                //当前授信方式,0未选择1线上2线下
                nCreditWay: 0,
                //申请授信方式,0未选择1线上2线下
                nRegCreditWay: 0
            },
            //未读消息
            nMineUnreadCount: 0,
            //实名认证状态 10:等待认证,20认证中；30:认证失败,50锁定(预留);90:部分认证成功,100:全部认证成功
            //90或者100表示认证成功
            nIdentityState: 10,
            //用户姓名
            strName: '',
            //手机号
            strLoginId,
            //头像
            avatarPath,
            /**账户余额 */
            lAvailablebalance1: 0,
            //授信额度
            nGrantQuota: 0,
            /**可用额度 */
            lCreditAvailable: 0,
            /**是否登录 */
            isLOgin: User.isLogin()
        }
    }
    render() {

        //region 未读消息
        let 未读消息Icon = null;
        if (this.state.nMineUnreadCount > 0) {
            未读消息Icon = <Flex style={{ borderRadius: '.12rem', height: '.12rem', width: '.12rem', background: '#F2472F', position: 'absolute', top: 0, left: 0 }}></Flex>;
        }
        let 姓名 = this.state.strName;
        if (!this.state.strName) {
            姓名 = this.state.strLoginId;
        }
        //endregion

        //region 认证状态
        let 认证状态 = null;
        if (this.state.nGrantState == '2') {
            认证状态 = <TouchableFlex onTap={this.handleMyLimit} vertical style={{ height: '.8rem', padding: '0 .32rem', overflow: 'hidden', borderTopLeftRadius: '.4rem', borderBottomLeftRadius: '.4rem', background: '#FF7E00' }}>
                <Text label='额度已激活' color='#fff' fontSize='.26rem' style={{ marginRight: '.16rem' }} />
                <Icon name='arrowRight' color='#FFF' width='.24rem' height='.24rem' />
            </TouchableFlex>
        } else {
            认证状态 = <TouchableFlex vertical style={{ height: '.8rem', padding: '0 .32rem', overflow: 'hidden', borderTopLeftRadius: '.4rem', borderBottomLeftRadius: '.4rem', background: '#FF7E00' }}>
                <Text label='去申请额度' color='#fff' fontSize='.26rem' style={{ marginRight: '.16rem' }} />
                <Icon name='arrowRight' color='#FFF' width='.24rem' height='.24rem' />
            </TouchableFlex>
        }
        if (this.state.nIdentityState != '90' && this.state.nIdentityState != '100') {
            认证状态 = <TouchableFlex onTap={() => { window.EngineClass.openWindow('myCenter/securityCenter/accountIdCard.htm', '实名认证', 'backURL=myCenter/myIndex.htm&nIdentityState=' + this.state.nIdentityState, 0, ''); }} vertical style={{ height: '.8rem', padding: '0 .32rem', overflow: 'hidden', borderTopLeftRadius: '.4rem', borderBottomLeftRadius: '.4rem', background: '#FF7E00' }}>
                <Text label='去实名认证' color='#fff' fontSize='.26rem' style={{ marginRight: '.16rem' }} />
                <Icon name='arrowRight' color='#FFF' width='.24rem' height='.24rem' />
            </TouchableFlex>
        }
        //endregion

        //region 个人资料
        let 个人资料 = null;
        if (this.state.isLOgin) {
            个人资料 = (
                <Flex vertical style={{ position: 'relative', background: '#fff' }}>
                    <TouchableFlex onTap={this.handleAccountCenter}>
                        <Image src={this.state.avatarPath} height='1.2rem' width='1.2rem' style={{ borderRadius: '1.2rem', marginLeft: '.3rem', marginTop: '.2rem', marginBottom: '.4rem' }} />
                        <Flex column style={{ marginLeft: '.2rem', marginTop: '.34rem' }}>
                            <Text label={姓名} color='#222' fontSize='.4rem' lineHeight='.56rem' />
                            <Text label='查看并编辑个人资料' color='#999' lineHeight='.37rem' fontSize='.26rem' />
                        </Flex>
                    </TouchableFlex>
                    <Placeholder />
                    {认证状态}
                    <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: 0, right: 0 }}></Flex>
                </Flex>
            )
        }
        else {
            个人资料 = (
                <Flex vertical style={{ position: 'relative', background: '#fff' }}>
                    <TouchableFlex onTap={this.handleAccountCenter} style={{height:'1.8rem'}} vertical>
                        <Image src={this.state.avatarPath} height='1.2rem' width='1.2rem' style={{ borderRadius: '1.2rem', marginLeft: '.3rem' }} />
                        <Flex column style={{ marginLeft: '.2rem' }}>
                            <Text label="立即登录" color='#222' fontSize='.4rem' lineHeight='.56rem' />
                        </Flex>
                    </TouchableFlex>
                    <Placeholder />
                    <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: 0, right: 0 }}></Flex>
                </Flex>
            )
        }
        //endregion
        return (
            <Page>
                {
                    //region 头部


                    //endregion
                }
                <Flex vertical style={{ height: '.88rem', padding: '0 .3rem', background: '#fff' }}>
                    <Placeholder />
                    <TouchableFlex onTap={this.handleMessageCenter} style={{ position: 'relative' }}>
                        <Icon name='xiaoxi' color='#000' width='.42rem' height='.44rem' />
                        {未读消息Icon}
                    </TouchableFlex>
                </Flex>
                {个人资料}
                <Flex style={{ position: 'relative', background: '#fff' }}>
                    <TouchableFlex onTap={() => { window.openWindow('myCenter/recharge/recharge_nav.htm', '充值提现', 'backURL=my', 0, ''); }} flex1 style={{ marginLeft: '.3rem' }} column>
                        <Text label={this.state.lAvailablebalance1} fontSize='.4rem' lineHeight='.56rem' color={this.state.lAvailablebalance1 == 0 ? '#999' : '#000'} style={{ marginTop: '.39rem' }} />
                        <Text label='账户余额(元)' fontSize='.26rem' lineHeight='.39rem' color='#999' style={{ marginTop: '.1rem', marginBottom: '.38rem' }} />
                    </TouchableFlex>
                    <Flex style={{ width: 1, height: '1.2rem', background: '#d8d8d8', marginTop: '.3rem' }}></Flex>
                    <TouchableFlex onTap={this.handleMyLimit} flex1 style={{ marginLeft: '.3rem' }} column>
                        <Text label={this.state.lCreditAvailable} fontSize='.4rem' lineHeight='.56rem' color={this.state.lCreditAvailable == 0 ? '#999' : '#000'} style={{ marginTop: '.39rem' }} />
                        <Text label='可用额度(元)' fontSize='.26rem' lineHeight='.39rem' color='#999' style={{ marginTop: '.1rem', marginBottom: '.38rem' }} />
                    </TouchableFlex>
                    <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: 0, right: 0 }}></Flex>
                </Flex>
                <Flex style={{ background: '#fff', padding: '.3rem 0', marginTop: '.2rem' }}>
                    <TouchableFlex onTap={() => { this.handleOrderList(0) }} column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../' + 'build/prod/img/dfkicon.png')} />
                        <Text label='待付款' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </TouchableFlex>
                    <TouchableFlex onTap={() => { this.handleOrderList(2) }} column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/zfzicon.png')} />
                        <Text label='支付中' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </TouchableFlex>
                    <TouchableFlex onTap={() => { this.handleOrderList(2) }} column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/ywcicon.png')} />
                        <Text label='已完成' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </TouchableFlex>
                    <TouchableFlex onTap={() => { this.handleOrderList(1) }} column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/tkicon.png')} />
                        <Text label='退款' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </TouchableFlex>
                    <Flex style={{ width: 1, height: '.8rem', background: '#d8d8d8' }}></Flex>
                    <TouchableFlex onTap={() => { this.handleOrderList(2) }} column vertical style={{ width: '1.5rem' }}>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/qbddicon.png')} />
                        <Text label='全部订单' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </TouchableFlex>
                </Flex>
                <Flex column style={{ background: '#fff' }}>
                    <ListItem onTap={() => { window.openWindow('lineStage/scanPay/Mybill.htm', '我的账单', '', 0, '', 0) }} icon='myBill' iconColor='#4D85FE' label='我的账单' />
                    <ListItem onTap={() => {
                        window.setStringValue("commoditylId", "0000");
                        window.openWindow('lineStage/GroupPurchase/cardpackage.htm', '卡券列表', '', 0, '', 0)
                    }} icon='youhuiquan' iconColor='#FD3F43' label='我的卡卷' />
                    {/* <ListItem onTap={()=>{window.EngineClass.openWindow('myCenter/fundDetail/fundList.htm', '资金明细', '', 0, '');}} icon='jilu' iconColor='#FFBB11' label='交易记录' /> */}
                    <ListItem onTap={() => { window.openWindow('myCenter/more/myAbout.htm', '设置', '', 0, '', 0) }} icon='shezhi' iconColor='#00D4C5' label='设置' />
                </Flex>
                <Flex style={{ height: '.98rem', paddingTop: '.19rem', overflow: 'hidden', position: 'absolute', bottom: 0, width: '100%', background: '#FAFAFA' }}>
                    <TouchableFlex onTap={() => { window.openWindow('lineStage/merchant/baseIndex.htm', '首页', '', 0, '', 0) }} flex1 column vertical>
                        <Icon name='shouye' color='#ccc' width='.4rem' height='.4rem' />
                        <Text label='首页' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#ccc' />
                    </TouchableFlex>
                    <TouchableFlex onTap={() => {
                        window.userLoginStats("callBackUserLoginState");
                    }} flex1 column vertical>
                        <Icon name='saoyisao' color='#ccc' width='.4rem' height='.4rem' />
                        <Text label='扫一扫' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#ccc' />
                    </TouchableFlex>
                    <Flex flex1 column vertical>
                        <Icon name='wode' color='#222' width='.4rem' height='.4rem' />
                        <Text label='我的' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#222' />
                    </Flex>
                </Flex>
            </Page>
        )
    }
    componentDidMount() {
        //扫码
        window.callBackUserLoginState = (isLogin) => {
            //已经登录
            if (isLogin) {
                // _shade_layer.show("加载中,请稍候......");
                // verifyIdentity("toScanPay");
                window.openRichScan("scanBack");//扫码
            } else {
                window.openWindow('login/login.htm', '登录', '', 0);
            }
        }
        unreadCount((data) => {
            this.setState({ nMineUnreadCount: data.nMineUnreadCount });
        });
        queryIdentity((data) => {
            this.setState({ nIdentityState: data.nIdentityState, strName: data.strName });
        });
        getAccountBalance((data) => {
            this.setState({ lAvailablebalance1: data.cdoAccountAmount.lAvailablebalance1 });
        });
        getQueryCredit((data) => {
            this.setState({ lCreditAvailable: data.cdoCredit.lCreditAvailable });
        });
        getGrant((data) => {
            let GrantState = { isLoad: true };
            if (data.cdoGrant) {
                GrantState.nCreditState = data.cdoGrant.nCreditState
                GrantState.nGrantState = data.cdoGrant.nGrantState
            }
            if (data.cdoUser) {
                GrantState.nCreditWay = data.cdoUser.nCreditWay
                GrantState.nRegCreditWay = data.cdoUser.nRegCreditWay
            }
            this.setState({
                GrantState: GrantState
            });
        });
    }
    /**点击进入消息中心 */
    handleMessageCenter = () => {
        //引导页跳转登录标记v
        window.EngineClass.setStringValue("nPageFromForMessage", "2");//设置消息中心返回的类型
        window.setStringValue("user_from_page", "guidePage");
        window.setStringValue('nPageFromForMessage', '1');
        window.EngineClass.openWindow("noticeNew/messageCenter.htm", "消息中心", "", 0, "");
    }
    handleAccountCenter = () => {
        if(this.state.isLOgin){
            window.EngineClass.openWindow('myCenter/userInfo/personalInformation.htm', '帐户管理', '', 0, '');
        }else{
            window.EngineClass.openWindow('login/login.htm', '登录', '', 0, '');
        }
    }
    handleOrderList = (v) => {
        window.setStringValue("backwhere", "2");
        window.openWindow('lineStage/scanPay/stageOrderList.htm', '打开窗口', "tapType=" + v, 0, '');
    }
    /**我的额度 */
    handleMyLimit = () => {
        if (this.state.GrantState.isLoad) {
            //nCreditState 信审状态 0-未审核,1-待信审，2-信审中,3-信审通过,4-信审退回,5-信审拒绝,6变更待提交
            //nGrantState 授信状态 0-未授信,1-已过期, 2-使用中, 3-已终止
            // nCreditWay 当前授信方式,0未选择1线上2线下
            // nRegCreditWay 申请授信方式,0未选择1线上2线下
            if (this.state.GrantState.nGrantState == 2 && this.state.GrantState.nCreditState == 3) { // 审核通过使用中
                if (this.state.GrantState.nCreditWay == 1) { // 线上通过
                    window.openWindow('borrow/myLimit/myLimitOnlineSuccess.html', '我的额度', '', 0, '');
                } else { // 线下通过
                    window.openWindow('borrow/myLimit/myLimitOfflineSuccess.html', '我的额度', '', 0, '');
                }
            } else if (this.state.GrantState.nRegCreditWay == 2 && this.state.GrantState.nCreditWay == 1 && this.state.GrantState.nGrantState == 2 && (this.state.GrantState.nCreditState == 1 || this.state.GrantState.nCreditState == 2 || this.state.GrantState.nCreditState == 0)) { // 线上通过,线下审核中或未信审
                window.openWindow('borrow/myLimit/myLimitOnlineSuccessAndOfflineApplying.html', '我的额度', '', 0, '');
            } else if (this.state.GrantState.nGrantState == 2 && (this.state.GrantState.nCreditState == 1 || this.state.GrantState.nCreditState == 2 || this.state.GrantState.nCreditState == 3 || this.state.GrantState.nCreditState == 4 || this.state.GrantState.nCreditState == 5) && this.state.GrantState.nCreditWay == 2) { // 线下通过,并增额
                window.openWindow('borrow/myLimit/myLimitOfflineSuccess.html', '我的额度', '', 0, '');
            } else {
                window.openWindow('borrow/myLimit/myLimitNotOpen.html', '我的额度', '', 0, '');
            }
        }
    }
}
function ListItem({ label, onTap, icon, iconColor }) {
    return (
        <TouchableFlex onTap={onTap} flex1 vertical style={{ position: 'relative', height: '1.3rem', padding: '0 .3rem' }}>
            <Icon name={icon} color={iconColor} width='.26rem' height='.3rem' />
            <Text style={{ marginLeft: '.22rem' }} label={label} color='#222' fontSize='.32rem' />
            <Placeholder />
            <Icon name='arrowRight' color='#8e8e8e' width='.24rem' height='.24rem' />
            <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: '.8rem', right: 0 }}></Flex>
        </TouchableFlex>
    )
}
