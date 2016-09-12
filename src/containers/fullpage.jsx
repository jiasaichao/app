import {NavBar, List, Container, Slider, FullPage} from "../components/index";
import * as React from 'react';
import {Motion, spring} from 'react-motion';
let Page = React.createClass({
    render: function () {
        return (
            <Container.Page>
                <FullPage.Root>
                    <FullPage.Item>
                        <img src="image/bing-1.jpg" style={{ width: '100%', height: '100%' }} />
                        <FullPage.Rest>
                            <Motion
                                defaultStyle={{ x1: 3, x2: 4.5, x3: 3.9, x4: 4.8 }}
                                style={{ x1: spring(.2, { stiffness: 170, damping: 46 }), x2: spring(.3), x3: spring(.2), x4: spring(.4) }}
                                onRest={() => { } }>
                                {
                                    v => (
                                        <div>
                                            <img src="image/bing-2.jpg" style={{ width: '3rem', position: 'absolute', top: 0, left: v.x1 + 'rem' }} />
                                            <img src="image/bing-3.jpg" style={{ width: '4.5rem', position: 'absolute', top: 0, right: v.x2 + 'rem' }} />
                                            <img src="image/bing-4.jpg" style={{ width: '3.9rem', position: 'absolute', top: '50%', left: v.x3 + 'rem' }} />
                                            <img src="image/bing-1.jpg" style={{ width: '4.8rem', position: 'absolute', top: '55%', right: v.x4 + 'rem' }} />
                                        </div>
                                    )
                                }
                            </Motion>
                        </FullPage.Rest>
                    </FullPage.Item>
                    <FullPage.Item><img src="image/bing-2.jpg" style={{ width: '100%', height: '100%' }} /></FullPage.Item>
                    <FullPage.Item><img src="image/bing-3.jpg" style={{ width: '100%', height: '100%' }} /></FullPage.Item>
                </FullPage.Root>
            </Container.Page>
        )
    }
})
export default Page;