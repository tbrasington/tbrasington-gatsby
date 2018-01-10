import React from 'react';
import styled from 'styled-components'
import {colours,breakpoints,typeStyles,spacing,gridSettings} from '../DesignSystem';



export default ({ data }) => {
  const { markdownRemark: post } = data;
  return <Container dangerouslySetInnerHTML={{ __html: post.html }} />;
};


const Container = styled.div`
background:red;
${gridSettings.initGrid.bp1};
`


export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
