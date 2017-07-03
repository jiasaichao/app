import React from 'react';
import styled from 'styled-components';

export default class Page extends React.Component {
    render() {
        const Wrapper = styled.section`
	        height: 100%;
	        width: 100%;
            overflow:hidden;
        `;
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}