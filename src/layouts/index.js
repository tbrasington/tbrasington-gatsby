import React from 'react';
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet'; 
import styled from 'styled-components';

import {colours,breakpoints,typeStyles,spacing,getTransitionStyle} from '../DesignSystem';
import Mystic from '../img/mystic'
import LoaderASIC from '../components/LoaderASIC';
import Navigation from '../components/Navigation';
import MenuBar from '../components/MenuBar';
import { setTimeout } from 'timers';

const mapStateToProps = ({ menuOpen,theme }) => {
  return { menuOpen,theme }
}

const mapDispatchToProps = dispatch => {
  return { closeMenu: () => dispatch({ type: `CLOSEMENU`  }) }
}

class TemplateWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpenDelay : true,
      loading : false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.closeMenu()

    }
    // toggles height of page container so that the scale animation doesnt go skew-iff
    if(!nextProps.menuOpen) {
      setTimeout(()=> {
        this.setState({
          menuOpenDelay : false
        })
      },700)
    }
    if(nextProps.menuOpen) {
      this.setState({
        menuOpenDelay : true
      })
    }
  }
  componentDidUpdate(props){
   
  }

  componentWillUpdate(){
  }

  render() {
    const {children} = this.props; 
    const navigationItems = this.props.data.markdownRemark.frontmatter.links

    return (
        <Container menuOpen={this.props.menuOpen} >
          <Helmet title="Thomas Brasington">
          <script type="text/javascript">{`
          (function(d) {
            var config = {
              kitId: 'baw2mif',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
          `}</script>
          <link href="https://fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet" />
          <style>{`
            * { box-sizing: border-box; }
            html,body { margin: 0; display:block;}
            `}
          </style>
          </Helmet>
          {this.state.loading ? <LoaderASIC /> : null}
          <Logo theme={this.props.theme}><Link to="/">tbrasington</Link></Logo>
          <MenuBarContainer menuOpen={this.props.menuOpen}><MenuBar items={navigationItems} /></MenuBarContainer>
          <NavigationContainer menuOpen={this.props.menuOpen} ><Navigation items={navigationItems}/></NavigationContainer>
          <PageContainer menuOpenDelay={this.state.menuOpenDelay} menuOpen={this.props.menuOpen}>{children()}</PageContainer>
          <MysticContainer> <Mystic /> </MysticContainer>
        </Container>
      )
    }
};

const Container = styled.div`
background : ${colours.black};
min-height:100vh;
position:relative;
overflow:${props=> props.menuOpen  ? 'hidden' : 'none' };
`

const MysticContainer = styled.div`
width: 100%;
height: 100%;
 position:absolute;
display:flex;
align-items:center;
justify-content:center;
top:0;

svg {
  position:absolute;
  width:50%;
  max-width: 522px;
  max-height:522px;
  height:auto;
  padding-bottom: 50%;
  top:25%;
}

.Oval {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: dash 25s ease infinite both alternate;
  transform: scaleX(-1);
  transform-origin: center;
}
.Oval2 {
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: dash 35s ease infinite both alternate;
  transform: scaleY(-1);
  transform-origin: center;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
`

const Logo = styled.div`
position:relative;
z-index:3;
padding-top: ${spacing * 2}px;
padding-left: ${spacing * 2}px;
${typeStyles.heading5.bp1};
@media (min-width: ${breakpoints.bp3}px) {
  padding-top: ${spacing * 6}px;
    padding-left: ${spacing * 6}px;
    ${typeStyles.heading5.bp3};
}

a {
    color: ${props=> props.theme==='dark' ? colours.white : colours.black};
    text-decoration:none;
    ${getTransitionStyle({type : 'crossFade', timing : 't5' })}
}

`

const NavigationContainer = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
min-height:100%;
height:auto;
z-index:1;
display:flex;
align-items: center;
padding-left: ${spacing * 2}px;
@media (min-width: ${breakpoints.bp3}px) {
  padding-left: ${spacing * 6}px;
}
`


const PageContainer = NavigationContainer.extend`
padding:0;
z-index:2;
background: ${colours.grey};
transform-origin: 150%;
transform: scale(${props=> props.menuOpen ? 0.5 : 1 });
height:${props=> props.menuOpenDelay  ? '100vh' : 'auto' }; 
overflow:${props=> props.menuOpen  ? 'hidden' : 'none' };
${props => getTransitionStyle({type : 'menuScale', timing : 't5', delay :  (props.menuOpen  ? 't2' : 't0' ) })}
@media (min-width: ${breakpoints.bp3}px) {
  padding:0;
} 
`



const MenuBarContainer = styled.div`
position:fixed;
bottom:0;
left:0;
width:100%;
height:${spacing*9}px;
z-index:4;
transform: translateY(${props=> props.menuOpen ?  `${(spacing*9)}px` : 0});
${ props=> getTransitionStyle({type : 'menuScale', timing : 't3', delay :  (props.menuOpen  ? 't0' : 't3' ) })}
`

export const layoutQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
    frontmatter: { path: { eq: "navigation-structure" } }) {
      frontmatter {
        links {
          label
          url
        }
      }
   }
   
}`


TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateWrapper);
