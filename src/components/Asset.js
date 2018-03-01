import React from 'react';
import styled from 'styled-components'; 
import Img from "gatsby-image";
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';
//https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e
export default class Asset extends React.Component {

  render() {
    const { sizeData } = this.props
    console.log(sizeData)
    return (
        <Container>
         <Img
            sizes={sizeData}
            />
        </Container>
    )
  }
}

const Container = styled.div`
position:relative;
height:auto;
width:100%;
`
