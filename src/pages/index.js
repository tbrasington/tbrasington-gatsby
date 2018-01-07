import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content';
 

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
        <HTMLContent content = {data.markdownRemark.html}/>

        <Link to="/blog/getting-started-with-react-sketchapp">blog</Link>
      </Container>
    );
  }
}

const Container = styled.div`
position:relative;
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