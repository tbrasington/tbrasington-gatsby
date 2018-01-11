import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import styled from 'styled-components'
import {colours,breakpoints,typeStyles,spacing,gridSettings} from '../DesignSystem';


export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    return (
      <Container>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        
        <About dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />

      </Container>
    );
  }
}


const Container = styled.div`
${gridSettings.initGrid.bp1};
  @media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.initGrid.bp3};
  }
`

const About = styled.div`
${gridSettings.standardGrid.bp1};
${typeStyles.paragraph1.bp1};
@media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.standardGrid.bp3};
  ${typeStyles.paragraph1.bp3};
  }
`


export const pageQuery = graphql`
  query IndexQuery {
    markdownRemark(frontmatter: {path: {eq: "/about"}}) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`