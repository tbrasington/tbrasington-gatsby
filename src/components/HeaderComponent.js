import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';

export default class HeaderComponent extends React.Component {

  render() {
    const { title, asset,theme} = this.props;
    console.log('hc  '+theme)
    return (
        <Container backgroundAsset={asset} theme={theme}>
            <Grid>
                <Title>{title}</Title>
            </Grid>
        </Container>
    )
  }
}

const Container = styled.div`
position:relative;
display:flex;
flex-direction:column;
justify-content:flex-end;
margin-bottom: ${spacing*2}px;
min-height: 40vh;
height:auto;
width:100%;
color:${props => (props.theme ==='dark'  ? colours.white : colours.black)};
background:${props => (props.theme ==='dark'  ? colours.black : colours.white)};
background-image:${props => props.backgroundAsset ? `url(${props.backgroundAsset})` : 'none'};
@media (min-width: ${breakpoints.bp3}px) {
margin-bottom: ${spacing*4}px;
}
`

const Grid = styled.div`
${gridSettings.initStandardGrid.bp1};
display:flex;
flex-direction:column;
justify-content:flex-end;
@media (min-width: ${breakpoints.bp3}px) {
${gridSettings.initStandardGrid.bp3};
}
`

const Title = styled.h1`

${gridSettings.standardGrid.bp1};
font-weight:normal;
${typeStyles.heading1.bp1};
padding-left: ${spacing * 4}px;
padding-right: ${spacing * 4}px;
padding-bottom: ${spacing * 4}px;
@media (min-width: ${breakpoints.bp3}px) {
${gridSettings.standardGrid.bp3};
${typeStyles.heading1.bp3};
padding-left: 0;
padding-right: 0;
}
`