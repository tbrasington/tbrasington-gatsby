import React , {Component} from 'react';
import { connect } from "react-redux"
import Link from 'gatsby-link'
import styled from 'styled-components';
import {typeStyles,colours, spacing,breakpoints,getTransitionStyle} from '../DesignSystem';

const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    color:${colours.white};
    background:${colours.black};
    box-shadow: 0 -2px 10px 2px rgba(28,32,38,0.5);
    ${getTransitionStyle({type : 'crossFade', timing : 't5', delay: 't0' })};

   ${typeStyles.label1.bp1};
    @media (min-width: ${breakpoints.bp3}px) {
    ${typeStyles.label1.bp3};
    }

    &:hover{
     box-shadow: 0 -2px 10px 2px rgba(0,64,255,0.25);  
    }

  
    span, a {
        color:${colours.white};
        text-decoration:none;
        padding: 0 ${spacing*2}px;
        cursor:pointer;
        width:auto;
        height:100%;
        background:${colours.black};
        display:flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        ${getTransitionStyle({type : 'crossFade', timing : 't5', delay: 't0' })}

        @media (min-width: ${breakpoints.bp3}px) {
        }
        

        &:hover {
            background:${colours.midBlue};
            ${getTransitionStyle({type : 'crossFade', timing : 't5', delay: 't0' })}
        }
    }

    ${'' /* span.special {
        opacity:0.4;
        ${typeStyles.label1.bp1};
        @media (min-width: ${breakpoints.bp3}px) {
        ${typeStyles.label1.bp3};
        }
    } */}

`
const mapStateToProps = ({ menuOpen }) => {
  return { menuOpen }
}
  
const mapDispatchToProps = dispatch => {
    return { openMenu: () => dispatch({ type: `OPENMENU`  }) }
}

const MenuBar = ({ items,openMenu}) => (
    <Container>
    {/* <span className="special" href="#" onClick={openMenu} >menu</span> */}
    {items.map((item,i)=>{
        return <Link key={i} to={item.url}>{item.label}</Link>
    })}
    </Container>
);


export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
