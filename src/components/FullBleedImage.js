import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';
import Asset from './Asset';
//https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e
export default class FullBleedImage extends React.Component {

  render() {
    const { asset,caption, assetsizes,sizedata } = this.props;
    const assetSizes =Object.assign({}, assetsizes.split(','));
    const parsedData=JSON.parse(decodeURIComponent(sizedata)); 
    //= JSON.parse(sizedata)
    return (
        <Container>
            <AssetWrapper> 
             <Asset src={assetSizes} sizeData = {parsedData}/>  
            </AssetWrapper>
            <Caption>{caption}</Caption>
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

const AssetWrapper = styled.div`
position:relative;
height:auto;
width:100%;
`

const Caption    = styled.div`
position:relative;
height:auto;
width:100%;
color:${colours.darkBlue};
`