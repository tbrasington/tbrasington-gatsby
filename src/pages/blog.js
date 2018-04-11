import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { connect } from "react-redux"
import styled from 'styled-components'
import {colours,breakpoints,typeStyles,spacing,gridSettings} from '../DesignSystem';

import TextCard from '../components/TextCard';

const mapDispatchToProps = dispatch => {
  return { 
    setLightTheme: () => dispatch({ type: `SET_LIGHT_THEME`  })
 }
}

const mapStateToProps = ({ theme }) => {
  return { theme }
}

        
class BlogPage extends React.Component {
 
  constructor(props){
    super(props)
    this.props.setLightTheme()
 }
  render() {
   
    const { data } = this.props;
    const posts = this.props.data.entries.edges.filter(entry => entry.node.frontmatter.templateKey==='blog-post');
   
    return (
      <Container>
        
        <Helmet title={`Blog`} />

        <About dangerouslySetInnerHTML={{ __html: data.page.html }} />

        <Posts>
        {
          posts.map(({ node: entry }) => { 
            return (
              <TextCard key={entry.id}
                path={entry.frontmatter.path}
                title={entry.frontmatter.title}
                date={entry.frontmatter.date}
              />
            )
          })  
        }
        </Posts>
        

      </Container>
    );
  }
}


const Container = styled.div`
  ${gridSettings.initStandardGrid.bp1};
  position:relative;
  padding-left: ${spacing*4}px;
  padding-right: ${spacing*4}px;

  @media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.initStandardGrid.bp3};
    padding-left: ${spacing*6}px;
    padding-right: ${spacing*6}px;
  }
`

const About = styled.div`
position:relative;
${gridSettings.standardGrid.bp1};
${gridSettings.standardPageTopPadding.bp1};
${typeStyles.paragraph1.bp1};
@media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.standardGrid.bp3};
    ${gridSettings.standardPageTopPadding.bp3};
    ${typeStyles.paragraph1.bp3};
  }
`


const Posts = styled.div`
position:relative;
${gridSettings.standardGrid.bp1};
${gridSettings.standardSectionTopPadding.bp1};
${gridSettings.standardPageBottomPadding.bp1};

@media (min-width: ${breakpoints.bp3}px) {
    ${gridSettings.standardGrid.bp3};
    ${gridSettings.standardSectionTopPadding.bp3};
    ${gridSettings.standardPageBottomPadding.bp3};
  }

  > div {
    float:left;
    margin: 0 0 24px 0;
    width:100%;
    @media (min-width: ${breakpoints.bp2}px) {
    width:calc(50% - 24px);
    margin: 0 24px 24px 0;
    }

  }
`



export const pageQuery = graphql`
query BlogQueryPage {
  page:  markdownRemark(frontmatter: {path: {eq: "/blog"}}) {
    id
    html
    frontmatter {
      title
    }
  }
  entries : allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
    edges {
      node {
         id
        frontmatter {
          title
          templateKey
          date(formatString: "MMMM DD, YYYY")
          path
        }
      }
    }
  }
}
`

export default connect(mapStateToProps,mapDispatchToProps)(BlogPage);