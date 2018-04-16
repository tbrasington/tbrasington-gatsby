import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';
import Asset from './Asset';
import Video from './Video'
export default class FullBleedImage extends React.Component {

  render() {
    const { comptype, asset, caption, inset, sizedata, videosrc , removebg } = this.props;
    let assetType = comptype || null
    let parsedData
    let videoSrc = videosrc || null;
 
    if(assetType==='image') {

          parsedData=JSON.parse(decodeURIComponent(sizedata)); 
       
    }
    const isInset = (inset !== undefined ? true : false)
    const isCaption = (caption !== undefined  ? true : false)
    const removeBG = (removebg !== undefined  ? true : false)

    return (
        <Container hideBackground={removeBG}>
            <AssetWrapper inset={isInset}> 
                {assetType==='image' && <Asset  sizeData = {parsedData}/>  }
                {assetType==='video' && <Video src={videoSrc} />  }
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
background: ${props => (props.hideBackground ? 'transparent'  : colours.white)};
margin: 0 0 ${spacing*4}px;
`

const AssetWrapper = styled.div`
position:relative;
height:auto;
width:100%;
${props=>props.inset ?` max-width: 1024px; ` : ``}
${props=>props.inset ?` margin: auto; ` : ``}
${props=>props.inset ?` padding ${spacing*3}px ${spacing*4}px  ;` : ``}
@media (min-width: ${breakpoints.bp3}px) {
${props=>props.inset ?` padding ${spacing*6}px ${spacing*4}px  ;` : ``}
}
`

const Caption    = styled.div`
position:relative;
height:auto;
float:left;
width:100%;
text-align:center;
color:${colours.darkGrey};
${typeStyles.heading6.bp1};
    padding: 0 0 ${spacing*3}px 0;
@media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading6.bp3};
    padding: 0 0 ${spacing*6}px 0;
}
`