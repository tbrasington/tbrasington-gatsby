import React from 'react';
import { connect } from "react-redux"
import Helmet from 'react-helmet';
import styled from 'styled-components';
import rehypeReact from "rehype-react"

import HeaderComponent from '../components/HeaderComponent'
import FullBleedImage from '../components/FullBleedImage'

import {colours,breakpoints,typeStyles, spacing,gridSettings} from '../DesignSystem';

const mapDispatchToProps = dispatch => {
  return { 
    setDarkTheme: () => dispatch({ type: `SET_DARK_THEME`  }),
    setLightTheme: () => dispatch({ type: `SET_LIGHT_THEME`  })
 }
}

const mapStateToProps = ({ theme }) => {
  return { theme }
}
// register components
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "full-bleed-image": FullBleedImage,  
    "full-bleed-video": FullBleedImage
},
}).Compiler

 class BlogPage extends React.Component {
  constructor(props){

    super(props)

    let theme = props.data.markdownRemark.frontmatter.theme || 'light'
    console.log('bp '+theme)
    if(theme==='dark'){
      props.setDarkTheme()
    } else {
      props.setLightTheme()
    }
  }
  componentWillReceiveProps(nextProps) {
  }
  
  render() {
    const { markdownRemark: post } = this.props.data;
   // console.log(post.htmlAst)
   // console.log('foo')
    return (
      <Container>
        
        <Helmet title={`Blog | ${post.frontmatter.title} `} />
        <HeaderComponent theme={post.frontmatter.theme} title={post.frontmatter.title} asset={post.frontmatter.header} />
        <Grid>{renderAst(post.htmlAst)}</Grid>
      </Container>
      )
  }
}


const Container = styled.div`
  position:relative;
  width:100%;
  @media (min-width: ${breakpoints.bp3}px) {
   
  }
`

const Grid = styled.div`


> div {
 width:100%;
}


>div > h1,
>div > h2,
>div > h3,
>div > h4,
>div > h5,
>div > p,
>div > ul,
>div > ol,
>div > ul,
>div > .gatsby-highlight,
>div > table,
>div > blockquote,
>div > hr,
.gatsby-resp-image-wrapper {
max-width: 1024px;
width:100%;
margin: 0 auto;
padding: 0 ${spacing * 4}px;
}
.gatsby-resp-image-wrapper img {
width:100%;
height:auto;
}


> div > h1 {  
  font-weight:normal;
  ${typeStyles.heading1.bp1};
    margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading1.bp3};
  }
}

> div > h2 {
  font-weight:normal;
  ${typeStyles.heading2.bp1};
    margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading2.bp3};
  }
}

> div > h3 {
  font-weight:normal;
  ${typeStyles.heading3.bp1};
    margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading3.bp3};
  }
}

> div > h4 {
  font-weight:normal;
  ${typeStyles.heading4.bp1};
    margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading4.bp3};
  }
}

> div > h5 {
  font-weight:normal;
  ${typeStyles.heading5.bp1};
    margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading5.bp3};
  }
}
> div > ul,
> div > ol,
> div > p {
  font-weight:normal;
  color: ${colours.darkGrey};
  ${typeStyles.paragraph2.bp1};
  margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.paragraph2.bp3};
    margin-bottom: ${spacing*3}px;
  }
}

> div > blockquote {
  font-weight:normal;
  color: ${colours.darkGrey};
  ${typeStyles.paragraph1.bp1};
  margin-bottom: ${spacing*3}px;
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.paragraph1.bp3};
    margin-bottom: ${spacing*3}px;
  }
}

>div>ul,
>div > ol {
  list-style-position: inside;
}
>div > hr {
  margin-bottom: ${spacing*3}px;
  border:none;
  border-bottom:1px solid ${colours.midGrey};
  height:1px;
  width:25%;
}

pre {
  border-radius:3px;
}

> div > p > code {
  background : #282c34;
  color:#ABB2BF;
  padding: 8px;
  border-radius:3px;
  font-size: 100%;
  ${typeStyles.paragraph3.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.paragraph3.bp3};
  }
}


` 


export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
        header
        theme
      }
    }
  }
`;
        
export default connect(mapStateToProps,mapDispatchToProps)(BlogPage);