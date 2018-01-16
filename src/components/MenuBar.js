import React , {Component} from 'react';
import { connect } from "react-redux"
import Link from 'gatsby-link'
import styled from 'styled-components';
import {typeStyles,colours, spacing,breakpoints} from '../DesignSystem';

const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    color:${colours.white};
    background:${colours.black};
    ${typeStyles.heading6.bp1};
    @media (min-width: ${breakpoints.bp3}px) {
        ${typeStyles.heading6.bp3};
    }

    span, a {
        color:${colours.white};
        text-decoration:none;
        margin: 0 ${spacing*2}px;
        cursor:pointer;
        @media (min-width: ${breakpoints.bp3}px) {
        }
    }
`
const mapStateToProps = ({ menuOpen }) => {
  return { menuOpen }
}
  
const mapDispatchToProps = dispatch => {
    return { openMenu: () => dispatch({ type: `OPENMENU`  }) }
}

const MenuBar = ({ items,openMenu}) => (
    <Container>
    <span href="#" onClick={openMenu} >Menu</span>
    {items.map((item,i)=>{
        return <Link key={i} to={item.url}>{item.label}</Link>
    })}
    </Container>
);


export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
