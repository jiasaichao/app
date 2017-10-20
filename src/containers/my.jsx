import React from 'react';
import { Page, Icon, Flex, Placeholder, Image, Text, TouchableFlex } from '../../src/components';
import { unreadCount, queryIdentity, getAccountBalance, getGrant, getQueryCredit } from '../../src/services/services';
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
            lAvailablebalance1:0,
            //授信额度
            nGrantQuota: 0,
            //信审状态 0-未审核,1-待信审，2-信审中,3-信审通过,4-信审退回,5-信审拒绝,6变更待提交
            nCreditState: 0,
            //授信状态 0-未授信,1-已过期, 2-使用中, 3-已终止
            nGrantState: 0,
            /**可用额度 */
            lCreditAvailable:0
        }
    }
    render() {
        let 未读消息Icon = null;
        if (this.state.nMineUnreadCount > 0) {
            未读消息Icon = <Flex style={{ borderRadius: '.12rem', height: '.12rem', width: '.12rem', background: '#F2472F', position: 'absolute', top: 0, left: 0 }}></Flex>;
        }
        let 姓名=this.state.strName;
        if(!this.state.strName){
            姓名=this.state.strLoginId;
        }
        return (
            <Page>
                {
                    //region 头部


                    //endregion
                }
                <Flex vertical style={{ height: '.88rem', padding: '0 .3rem', background: '#fff' }}>
                    <Placeholder />
                    <TouchableFlex style={{ position: 'relative' }}>
                        <Icon name='xiaoxi' color='#000' width='.42rem' height='.44rem' />
                        {未读消息Icon}
                    </TouchableFlex>
                </Flex>
                <Flex vertical style={{ position: 'relative', background: '#fff' }}>
                    <TouchableFlex>
                        <Image src={this.state.avatarPath} height='1.2rem' width='1.2rem' style={{ borderRadius: '1.2rem', marginLeft: '.3rem', marginTop: '.2rem', marginBottom: '.4rem' }} />
                        <Flex column style={{ marginLeft: '.2rem', marginTop: '.34rem' }}>
                            <Text label={姓名} color='#222' fontSize='.4rem' lineHeight='.56rem' />
                            <Text label='查看并编辑个人资料' color='#999' lineHeight='.37rem' fontSize='.26rem' />
                        </Flex>
                    </TouchableFlex>
                    <Placeholder />
                    <Flex vertical style={{ height: '.8rem', padding: '0 .32rem', overflow: 'hidden', borderTopLeftRadius: '.4rem', borderBottomLeftRadius: '.4rem', background: '#FF7E00' }}>
                        <Text label='额度已激活' color='#fff' fontSize='.26rem' style={{ marginRight: '.16rem' }} />
                        <Icon name='arrowRight' color='#FFF' width='.24rem' height='.24rem' />
                    </Flex>
                    <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: 0, right: 0 }}></Flex>
                </Flex>
                <Flex style={{ position: 'relative', background: '#fff' }}>
                    <Flex flex1 style={{ marginLeft: '.3rem' }} column>
                        <Text label={this.state.lAvailablebalance1} fontSize='.4rem' lineHeight='.56rem' color='#000' style={{ marginTop: '.39rem' }} />
                        <Text label='账户余额(元)' fontSize='.26rem' lineHeight='.39rem' color='#999' style={{ marginTop: '.1rem', marginBottom: '.38rem' }} />
                    </Flex>
                    <Flex style={{ width: 1, height: '1.2rem', background: '#d8d8d8', marginTop: '.3rem' }}></Flex>
                    <Flex flex1 style={{ marginLeft: '.3rem' }} column>
                        <Text label={this.state.lCreditAvailable} fontSize='.4rem' lineHeight='.56rem' color='#000' style={{ marginTop: '.39rem' }} />
                        <Text label='可用额度(元)' fontSize='.26rem' lineHeight='.39rem' color='#999' style={{ marginTop: '.1rem', marginBottom: '.38rem' }} />
                    </Flex>
                    <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: 0, right: 0 }}></Flex>
                </Flex>
                <Flex style={{ background: '#fff', padding: '.3rem 0', marginTop: '.2rem' }}>
                    <Flex column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../'+'build/prod/img/dfkicon.png')} />
                        <Text label='待付款' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </Flex>
                    <Flex column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/zfzicon.png')} />
                        <Text label='支付中' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </Flex>
                    <Flex column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/ywcicon.png')} />
                        <Text label='已完成' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </Flex>
                    <Flex column vertical flex1>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/tkicon.png')} />
                        <Text label='退款' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </Flex>
                    <Flex style={{ width: 1, height: '.8rem', background: '#d8d8d8' }}></Flex>
                    <Flex column vertical style={{ width: '1.5rem' }}>
                        <Image height='.36rem' width='.32rem' src={require('../../build/prod/img/qbddicon.png')} />
                        <Text label='全部订单' style={{ marginTop: '.17rem' }} color='#222' fontSize='.24rem' lineHeight='.33rem' />
                    </Flex>
                </Flex>
                <Flex column style={{ background: '#fff' }}>
                    <Flex flex1 vertical style={{ position: 'relative', height: '1.3rem', padding: '0 .3rem' }}>
                        <Icon name='myBill' color='#4D85FE' width='.26rem' height='.3rem' />
                        <Text style={{ marginLeft: '.22rem' }} label='我的账单' color='#222' fontSize='.32rem' />
                        <Placeholder />
                        <Icon name='arrowRight' color='#8e8e8e' width='.24rem' height='.24rem' />
                        <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: '.8rem', right: 0 }}></Flex>
                    </Flex>
                    <Flex flex1 vertical style={{ position: 'relative', height: '1.3rem', padding: '0 .3rem' }}>
                        <Icon name='youhuiquan' color='#FD3F43' width='.26rem' height='.3rem' />
                        <Text style={{ marginLeft: '.22rem' }} label='我的卡卷' color='#222' fontSize='.32rem' />
                        <Placeholder />
                        <Icon name='arrowRight' color='#8e8e8e' width='.24rem' height='.24rem' />
                        <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: '.8rem', right: 0 }}></Flex>
                    </Flex>
                    <Flex flex1 vertical style={{ position: 'relative', height: '1.3rem', padding: '0 .3rem' }}>
                        <Icon name='myBill' color='#jilu' width='.26rem' height='.3rem' />
                        <Text style={{ marginLeft: '.22rem' }} label='交易记录' color='#222' fontSize='.32rem' />
                        <Placeholder />
                        <Icon name='arrowRight' color='#8e8e8e' width='.24rem' height='.24rem' />
                        <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: '.8rem', right: 0 }}></Flex>
                    </Flex>
                    <Flex flex1 vertical style={{ position: 'relative', height: '1.3rem', padding: '0 .3rem' }}>
                        <Icon name='shezhi' color='#00D4C5' width='.26rem' height='.3rem' />
                        <Text style={{ marginLeft: '.22rem' }} label='设置' color='#222' fontSize='.32rem' />
                        <Placeholder />
                        <Icon name='arrowRight' color='#8e8e8e' width='.24rem' height='.24rem' />
                        <Flex style={{ height: 1, background: '#e8e8e8', position: 'absolute', bottom: 0, left: '.8rem', right: 0 }}></Flex>
                    </Flex>
                </Flex>
                <Flex style={{ height: '.98rem', paddingTop: '.19rem', overflow: 'hidden', position: 'absolute', bottom: 0, width: '100%', background: '#FAFAFA' }}>
                    <Flex flex1 column vertical>
                        <Icon name='shouye' color='#ccc' width='.4rem' height='.4rem' />
                        <Text label='首页' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#ccc' />
                    </Flex>
                    <Flex flex1 column vertical>
                        <Icon name='saoyisao' color='#ccc' width='.4rem' height='.4rem' />
                        <Text label='扫一扫' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#ccc' />
                    </Flex>
                    <Flex flex1 column vertical>
                        <Icon name='wode' color='#222' width='.4rem' height='.4rem' />
                        <Text label='我的' style={{ marginTop: '.09rem' }} fontSize='.2rem' color='#222' />
                    </Flex>
                </Flex>
            </Page>
        )
    }
    componentDidMount() {
        unreadCount((data) => {
            this.setState({ nMineUnreadCount: data.nMineUnreadCount });
        });
        queryIdentity((data) => {
            this.setState({ nIdentityState: data.nIdentityState, strName: data.strName });
        });
        getAccountBalance((data)=>{
            this.setState({lAvailablebalance1:data.cdoAccountAmount.lAvailablebalance1});
        });
        getQueryCredit((data)=>{
            this.setState({lCreditAvailable:data.cdoCredit.lCreditAvailable});
        });
    }
}