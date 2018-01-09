import React , {Component} from 'react';
import Link from 'gatsby-link'
import styled from 'styled-components';
import {typeStyles,colours, breakpoints} from '../DesignSystem';

const Container = styled.div`
    color:${colours.white};
    ${typeStyles.menu.bp1};
    display:flex;
    flex-direction:column;
    justify-items:center;
    @media (min-width: ${breakpoints.bp3}px) {
        ${typeStyles.menu.bp3};
    }

    a {
        color:${colours.white};
        text-decoration:none;
    }
`

const  Navigation = ({ items}) => (
    <Container>
    {items.map((item,i)=>{
        return <Link key={i} to={item.url}>{item.label}</Link>
    })}
    </Container>
);


export default Navigation;