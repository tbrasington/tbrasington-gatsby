import React from 'react';
import styled from 'styled-components'; 
import {colours,breakpoints,typeStyles,gridSettings,spacing} from '../DesignSystem';

export default class GalleryGrid extends React.Component {

  render() {
 
    const {cols,rows} = this.props;

    return (
        <Container cols={cols} rows={rows} className='grid-container'> 
        {this.props.children}
        </Container>
    )
  }
}

const Container = styled.div`
width:100%;
display:grid;
grid-template-columns: repeat(${props=>props.cols}, 1fr);
grid-gap:${spacing*2}px;
`
 