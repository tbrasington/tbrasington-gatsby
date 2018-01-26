import React , {Component} from 'react';
import { connect } from "react-redux"
import Link from 'gatsby-link'
import styled from 'styled-components';
import {typeStyles,colours, spacing,breakpoints,getTransitionStyle} from '../DesignSystem';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-end;
    padding : ${spacing  * 2}px;
    background:${colours.white};
    ${typeStyles.heading5.bp1};

    &:before {
        content : ' ';
        padding-bottom: calc(50% -  ${spacing * 2}px);
    }

    @media (min-width: ${breakpoints.bp3}px) {
        ${typeStyles.heading5.bp3};
        padding : ${spacing  * 4}px;

        &:before {
            content : ' ';
            padding-bottom: calc(50% -  ${spacing * 4}px);
        }

    }

    a {
        margin-bottom: ${spacing}px;
        color:${colours.blue};
        text-decoration:none;
        ${getTransitionStyle({type : 'crossFade', timing : 't2', delay: 't0' })}
        @media (min-width: ${breakpoints.bp3}px) {
            margin-bottom: ${spacing*2}px;
        }
    }

    a:hover {
        color: ${colours.darkBlue};
    }

`

const Sub = styled.span`
  ${typeStyles.heading6.bp1};
  color: ${colours.darkGrey};
  @media (min-width: ${breakpoints.bp3}px) {
      ${typeStyles.heading6.bp3};
  }
`

const TextCard = ({ path, title ,date}) => (
    <Container>
    <Link to={path}>{title}</Link>
    <Sub>{date}</Sub>
    </Container>
);


export default TextCard;
