import React from 'react';
import styled from 'styled-components'; 
import Img from "gatsby-image";
//https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e
// TODO: write function / prop that uses background image over the respsonvie immge set

export default class Asset extends React.Component {
  constructor(props) {
    super(props)
     this.loaded = this.loaded.bind(this)
     this.state={bg:null}
  }

  loaded() {
    this.setState({"bg":this.props.sizeData.src})
  }
  render() {
    const { sizeData } = this.props
    return (
        <Container useBG={this.props.useBG} bg={this.state.bg}>
         <Img sizes={sizeData} onLoad={this.loaded.bind(this)}/>
        </Container>
    )
  }
}
Asset.defaultProps = {
  useBG: false,
  bg: null,
};

const Container = styled.div`
position:relative;
height:100%;
width:100%;
${props=> props.useBG ? `background-size:cover; ` : null}
${props => props.bg !=null && props.useBG ? `background-image:url(${props.bg});` : null}
${props=> props.useBG ? `img { display:none;}` : null }
`
