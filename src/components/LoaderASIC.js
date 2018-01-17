import React , {Component} from 'react';
import styled from 'styled-components';
import {typeStyles, colours, spacing,breakpoints} from '../DesignSystem';

const Container = styled.div`
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
overflow: hidden;
white-space: nowrap;
display:flex;
align-items:center;
z-index:100;
`

const Message = styled.div`
position: absolute;
color:${colours.white};
${typeStyles.heading0.bp1};
animation: marquee 20s linear infinite;
display:flex;
flex-direction: row;
span {
    float:left;
    margin-right: ${spacing  * 4}px;
}

@media (min-width: ${breakpoints.bp3}px) {
   
    ${typeStyles.heading0.bp3};
}

@keyframes marquee {
  0% { left: 0; }
  100% { left: -200%; }
}
` 


function shuffle(a) {
	var x, t, r = new Uint32Array(1);
	for (var i = 0, c = a.length - 1, m = a.length; i < c; i++, m--) {
		crypto.getRandomValues(r);
		x = Math.floor(r / 65536 / 65536 * m) + i;
		t = a [i], a [i] = a [x], a [x] = t;
	}

	return a;
}

const messages = [
    "A system is calling",
    "A system is searching",
    "A system is haunting",
    "helvetica protects",
    "A system is scaling",
    "this.that.self"
]

const message = shuffle(messages)[0];

const LoaderASIC = ({ items,closeMenu}) => (
    <Container>
        <Message><span>{message}</span><span>{message}</span></Message> 
    </Container>
);


export default LoaderASIC;
