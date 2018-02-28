import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';

//https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e
export default class FullBleedImage extends React.Component {

  render() {
    const { asset } = this.props
    return (
        <Container>
            <Asset></Asset>
            <Caption></Caption>
        </Container>
    )
  }
}

const Container = styled.div`
position:relative;
height:auto;
width:100%;
padding: ${spacing*2}px;
background: ${colours.white};
`

const Asset = styled.div`
position:relative;
height:auto;
width:100%;
`

const Caption    = styled.div`
position:relative;
height:auto;
width:100%;
`
