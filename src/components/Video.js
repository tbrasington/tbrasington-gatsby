import React from 'react';
import styled from 'styled-components'; 
import ReactPlayer from 'react-player'

export default class Video extends React.Component {

  render() {
    const { src } = this.props
    return (
        <Container>
            <ReactPlayer url={src} playing  width='100%' height='100%' />
        </Container>
    )
  }
}

const Container = styled.div`
position:relative;
height:auto;
width:100%;
`