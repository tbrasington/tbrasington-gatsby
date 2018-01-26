import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent'

import {colours,breakpoints,typeStyles, spacing,gridSettings} from '../DesignSystem';

export default class BlogPage extends React.Component {

  render() {
    const { markdownRemark: post } = this.props.data;
    return (
      <Container>
        
        <Helmet title={`Blog | ${post.frontmatter.title} `} />
        <HeaderComponent title={post.frontmatter.title} />
        <Grid dangerouslySetInnerHTML={{ __html: post.html }} />
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
${gridSettings.initStandardGrid.bp1};
@media (min-width: ${breakpoints.bp3}px) {
${gridSettings.initStandardGrid.bp3};
}

>h1,h2,h3,h4,h5, p{
  ${gridSettings.standardGrid.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.standardGrid.bp3};
  }

}
> h1 {  
  

  font-weight:normal;
  ${typeStyles.heading1.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading1.bp3};
  }
}

> h2 {
  font-weight:normal;
  ${typeStyles.heading2.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading2.bp3};
  }
}

> h3 {
  font-weight:normal;
  ${typeStyles.heading3.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading3.bp3};
  }
}

> h4 {
  font-weight:normal;
  ${typeStyles.heading4.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading4.bp3};
  }
}

> h5 {
  font-weight:normal;
  ${typeStyles.heading5.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.heading5.bp3};
  }
}

> p {
  font-weight:normal;
  color: ${colours.darkGrey};
  ${typeStyles.paragraph2.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.paragraph2.bp3};
  }
}

`

        
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;


