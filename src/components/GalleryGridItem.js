import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';
import Asset from './Asset';

export default class GalleryGridItem extends React.Component {

  render() {
  const {  sizedata , row, span } = this.props;
  let parsedData = parsedData=JSON.parse(decodeURIComponent(sizedata)); 
    return (
        <Container row={row} span={span}> 
          <Asset useBG={true} sizeData={parsedData}/> 
        </Container>
    )
  }
}

const Container = styled.div`
grid-column:  ${props=>props.span};
grid-row:  ${props=>props.row};

overflow:hidden;
`
 