import {NavBar, List, Container, Slider} from "../components/index";
import * as React from 'react';
let ListPage = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <NavBar title="轮播"></NavBar>
                <div>
                <Slider.Root loop={true} autoPlay={true} isLeftRight={true} isIndicators={true}>
                    <Slider.Item><img src="image/bing-1.jpg" style={{ width: '100%' }} /> </Slider.Item>
                    <Slider.Item><img src="image/bing-2.jpg" style={{ width: '100%' }} /></Slider.Item>
                    <Slider.Item><img src="image/bing-3.jpg" style={{ width: '100%' }} /></Slider.Item>
                </Slider.Root>
                
                <Slider.Root loop={true} autoPlay={true} isIndicators={true}>
                    <Slider.Item><img src="image/bing-1.jpg" style={{ width: '100%' }} /> </Slider.Item>
                    <Slider.Item><img src="image/bing-2.jpg" style={{ width: '100%' }} /></Slider.Item>
                    <Slider.Item><img src="image/bing-3.jpg" style={{ width: '100%' }} /></Slider.Item>
                </Slider.Root>
                <Slider.Root>
                    <Slider.Item><img src="image/bing-1.jpg" style={{ width: '100%' }} /> </Slider.Item>
                    <Slider.Item><img src="image/bing-2.jpg" style={{ width: '100%' }} /></Slider.Item>
                    <Slider.Item><img src="image/bing-3.jpg" style={{ width: '100%' }} /></Slider.Item>
                </Slider.Root>
                </div>
            </Container.Page>
        )
    }
})
export default ListPage;