import React , {Component} from 'react';
import { connect } from "react-redux"
import Link from 'gatsby-link'
import styled from 'styled-components';
import {typeStyles,colours, spacing,breakpoints,getTransitionStyle} from '../DesignSystem';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-items:center;
    
    ${typeStyles.heading1.bp1};
    @media (min-width: ${breakpoints.bp3}px) {
        ${typeStyles.heading1.bp3};
    }

    :hover a {
        color: ${colours.midGrey};
    }
    a {
        margin-bottom: ${spacing}px;
        color:${colours.white};
        text-decoration:none;

            margin-bottom: ${spacing*2}px;
        }
    }

    a:hover {
        color:${colours.white};        
    }
`
const mapStateToProps = ({ menuOpen }) => {
  return { menuOpen }
}
  
const mapDispatchToProps = dispatch => {
    return { closeMenu: () => dispatch({ type: `CLOSEMENU`  }) }
}

const Navigation = ({ items,closeMenu}) => (
    <Container>
    {items.map((item,i)=>{
        return <Link key={i} onClick={closeMenu} to={item.url}>{item.label}</Link>
    })}
    </Container>
);


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
