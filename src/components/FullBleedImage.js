import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';
import Asset from './Asset';
export default class FullBleedImage extends React.Component {

  render() {
   
    const isInset = (inset !== undefined ? true : false)
    const isCaption = (caption !== undefined  ? true : false)
    const removeBG = (removebg !== undefined  ? true : false)


    return (
        <Container removeBG>
            <AssetWrapper inset={isInset}> 
             <Asset src={assetSizes} sizeData = {parsedData}/>  
            </AssetWrapper>
            {isCaption && <Caption>{caption}</Caption>}
        </Container>
    )
  }
}

const Container = styled.div`
position:relative;
float:left;
height:auto;
width:100%;
background: ${props => props.removeBG ? 'transparent'  :colours.white};
margin: 0 0 ${spacing*4}px;
`

const AssetWrapper = styled.div`
position:relative;
height:auto;
width:100%;
${props=>props.inset ?` max-width: 1024px; ` : ``}
${props=>props.inset ?` margin: auto; ` : ``}
${props=>props.inset ?` padding-top ${spacing*6}px;` : ``}
`

const Caption    = styled.div`
position:relative;
height:auto;
float:left;
width:100%;

padding: ${spacing*6}px;
text-align:center;
color:${colours.darkGrey};
${typeStyles.heading6.bp1};
@media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading6.bp3};
}
`