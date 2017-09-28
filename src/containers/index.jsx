import React from 'react';
import { Touchable, TouchableFlex } from '../components/touchable'
import { Page } from '../components/page';
import { Flex, Placeholder } from '../components/layout';
import { Root as Slider, Item as SliderItem } from '../components/slider';
import { queryDfqAdByGprs7 } from '../services/services';
function IconItem({ title, img }) {
    return (
        <Flex flex1 column vertical>
            <img style={{ width: '.84rem', height: '.84rem' }} src={img} alt="" />
            <span style={{ fontSize: '.22rem', color: '#6D6D6D', marginTop: '.12px' }}>{title}</span>
        </Flex>
    )
}
export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lunbo: []
        }
    }
    render() {
        return (
            <div style={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
                <Page>
                    {this.state.lunbo.length > 0 ? <Slider loop={true} isIndicators={true}>
                        {this.state.lunbo.map((item) => (
                            <SliderItem key={item.strImgPath}><img src={item.strImgPath} style={{ width: '100%' }} /> </SliderItem>
                        ))}
                    </Slider> : null}

                    <div style={{ marginTop: '.2rem' }}>
                        <Slider loop={false} autoPlay={false} isIndicators={true}>
                            <SliderItem>
                                <Flex>
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                </Flex>
                                <Flex style={{ marginTop: ".3rem" }}>
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                </Flex>
                            </SliderItem>
                            <SliderItem>
                                <Flex>
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                </Flex>
                                <Flex style={{ marginTop: ".3rem" }}>
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                    <IconItem img='img/quane@2x.png' title='教育培训1' />
                                </Flex>
                            </SliderItem>
                        </Slider>
                    </div>
                    <div>
                        <img src="img/image.png" style={{ width: '100%' }} />
                    </div>
                    <Flex vertical style={{ height: '1.12rem', padding: "0 .3rem" }}>
                        <span style={{ color: '#222', fontSize: '.32rem', fontWeight: 'bold' }}>热门推荐</span>
                        <Placeholder />
                        <span style={{ color: '#8e8e8e', fontSize: '.24rem' }}>更多</span>
                    </Flex>

                    <Flex style={{ marginLeft: '.3rem', width: '100%', overflowY: 'hidden', overflowX: 'scroll' }}>
                        <TouchableFlex column style={{ height: '3.16rem', width: '3rem', marginRight: '.3rem', flexShrink: 0 }}>
                            <img src='http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg' width="100%" style={{ height: '2rem' }} />
                            <span style={{ fontSize: '.30rem', lineHeight: '.3rem', color: '#222', marginTop: '.25rem' }}>爱在齐心</span>
                            <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#8e8e8e', marginTop: '.15rem' }}>士大夫士大夫<span style={{ color: '#FC8833' }}>享8.5折</span></span>
                        </TouchableFlex>

                        <Flex column style={{ height: '3.16rem', width: '3rem', marginRight: '.3rem', flexShrink: 0 }}>
                            <img src='http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg' width="100%" style={{ height: '2rem' }} />
                            <span style={{ fontSize: '.30rem', lineHeight: '.3rem', color: '#222', marginTop: '.25rem' }}>爱在齐心</span>
                            <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#8e8e8e', marginTop: '.15rem' }}>士大夫士大夫<span style={{ color: '#FC8833' }}>享8.5折</span></span>
                        </Flex>
                        <Flex column style={{ height: '3.16rem', width: '3rem', marginRight: '.3rem', flexShrink: 0 }}>
                            <img src='http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg' width="100%" style={{ height: '2rem' }} />
                            <span style={{ fontSize: '.30rem', lineHeight: '.3rem', color: '#222', marginTop: '.25rem' }}>爱在齐心</span>
                            <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#8e8e8e', marginTop: '.15rem' }}>士大夫士大夫<span style={{ color: '#FC8833' }}>享8.5折</span></span>
                        </Flex>
                    </Flex>
                    <Flex column style={{ padding: "0 .3rem" }}>
                        <Flex column style={{ height: '3.16rem', width: '100%' }}>
                            <img src='http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg' width="100%" style={{ height: '2rem' }} />
                            <span style={{ fontSize: '.30rem', lineHeight: '.3rem', color: '#222', marginTop: '.23rem' }}>爱在齐心</span>
                            <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#8e8e8e', marginTop: '.13rem' }}>士大夫士大夫</span>
                        </Flex>
                        <Flex column style={{ height: '3.16rem', width: '100%' }}>
                            <img src='http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg' width="100%" style={{ height: '2rem' }} />
                            <span style={{ fontSize: '.30rem', lineHeight: '.3rem', color: '#222', marginTop: '.23rem' }}>爱在齐心</span>
                            <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#8e8e8e', marginTop: '.13rem' }}>士大夫士大夫</span>
                        </Flex>
                    </Flex>
                    <div>
                        <Flex vertical style={{ height: '1.12rem', padding: "0 .3rem" }}>
                            <span style={{ color: '#222', fontSize: '.32rem', fontWeight: 'bold' }}>推荐商家</span>
                            <Placeholder />
                            <span style={{ color: '#8e8e8e', fontSize: '.24rem' }}>更多</span>
                        </Flex>
                        <Flex style={{ margin: '.4rem .3rem' }}>
                            <Flex>
                                <img src="http://cn.bing.com/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg" style={{ width: '2.2rem', height: '1.76rem' }} alt="" />
                            </Flex>
                            <Flex column flex1 style={{ marginLeft: '.3rem' }}>
                                <span style={{ fontSize: '.32rem', lineHeight: '.32rem', color: '#222' }}>芝麻街英语</span>
                                <span style={{ fontSize: '.24rem', lineHeight: '.24rem', color: '#f33335', marginTop: '.28rem' }}>均价</span>
                                <Flex vertical style={{ marginTop: '.46rem' }}>
                                    <span style={{ background: '#ffefef', fontSize: '.22rem', color: '#f33335', lineHeight: '.36rem', padding: '0 .14rem' }}>教育培训</span>
                                    <Placeholder />
                                    <span style={{ fontSize: '.2rem', color: '#8e8e8e' }}>朝阳区   12.3km</span>
                                </Flex>
                                <Flex column style={{ marginTop: '.4rem' }}>
                                    <Flex>
                                        <Flex HW style={{ width: '.32rem', height: '.32rem', borderRadius: '.12rem', background: '#f90', fontSize: '.2rem', color: '#fff' }}>卡</Flex>
                                        <span style={{ fontSize: '.24rem', color: '#6d6d6d', marginLeft: '.18rem' }}>满5000赠送80课时</span>
                                    </Flex>
                                    <Flex style={{ marginTop: '.24rem' }}>
                                        <Flex HW style={{ width: '.32rem', height: '.32rem', borderRadius: '.12rem', background: '#f90', fontSize: '.2rem', color: '#fff' }}>卡</Flex>
                                        <span style={{ fontSize: '.24rem', color: '#6d6d6d', marginLeft: '.18rem' }}>满5000赠送80课时</span>
                                    </Flex>
                                    <Flex style={{ marginTop: '.24rem' }}>
                                        <Flex HW style={{ width: '.32rem', height: '.32rem', borderRadius: '.12rem', background: '#f90', fontSize: '.2rem', color: '#fff' }}>卡</Flex>
                                        <span style={{ fontSize: '.24rem', color: '#6d6d6d', marginLeft: '.18rem' }}>满5000赠送80课时</span>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </Page>
                <Flex style={{ position: 'absolute', bottom: 0, width: '100%', height: '.98rem', background: '#fff' }}>
                    <Flex flex1 column vertical style={{ margin: '.16rem 0 .1rem 0' }}>
                        <img style={{ width: '0.42rem', height: '0.42rem' }} src="img/quane@2x.png" alt="" />
                        <span style={{ fontSize: '.2rem', color: '#6D6D6D', marginTop: '.1rem' }}>教育培训</span>
                    </Flex>
                    <Flex flex1 column vertical style={{ margin: '.16rem 0 .1rem 0' }}>
                        <img style={{ width: '0.42rem', height: '0.42rem' }} src="img/quane@2x.png" alt="" />
                        <span style={{ fontSize: '.2rem', color: '#6D6D6D', marginTop: '.1rem' }}>教育培训</span>
                    </Flex>
                    <Flex flex1 column vertical style={{ margin: '.16rem 0 .1rem 0' }}>
                        <img style={{ width: '0.42rem', height: '0.42rem' }} src="img/quane@2x.png" alt="" />
                        <span style={{ fontSize: '.2rem', color: '#6D6D6D', marginTop: '.1rem' }}>教育培训</span>
                    </Flex>
                </Flex>
            </div>
        )
    }
    componentDidMount() {
        queryDfqAdByGprs7((data) => {
            this.setState({ lunbo: data.data.cdosRecord });
        })
    }
}