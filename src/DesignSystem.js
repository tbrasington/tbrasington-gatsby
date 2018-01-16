import ms from 'modularscale-js';
import {css} from 'styled-components';

export const breakpoints = {
  bp1 : 320,
  bp3 : 1024
}

export const spacing = 8;

export const gridSettings = {

initGrid : {
  bp1 : 
    css`
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      max-width:1440px;
      width:100%;
      margin:auto;
    `,
    bp3 : 
    css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    `,
  },
  standardGrid : {
    bp1 : 
      css`
      grid-column-start: 1;
      grid-column-end:7;
      `,
      bp3 : 
      css`
      grid-column-start: 2;
      grid-column-end:12;

      `,
    },
    standardPageTopPadding : {
      bp1 : css`
      padding-top: ${spacing * 9}px;
      `, 
      bp3 : css`
      padding-top: ${spacing * 24}px;
      `
    }
}


export const colours = {
    black : '#000000',
    grey : '#F6F6F6',
    blue : '#0080FF',
    white : '#fff'
}

const timings = {
  t0 : 0,
  t1 : 100,
  t2 : 200,
  t3 : 300,
  t4 : 400,
  t5 : 500
}
const getTransitionStyles = (timing,delay) => {
    return {
      menuScale : {
        transition: `all ${timing}ms cubic-bezier(0.075, 0.820, 0.165, 1.000) ${delay}ms`
      },
      crossFade : {
        transition: `all ${timing}ms cubic-bezier(0.075, 0.820, 0.165, 1.000) ${delay}ms`
      }
    }
  }
  
 export const getTransitionStyle = ({ timing, type, delay }) =>{
    return getTransitionStyles(timings[timing],timings[delay])[type]
}


function  msSettings(value){
  return ms(value,{
    base: [16],
    ratio: 1.25
  })
} 

export const typeStyles = {
  heading4 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(3)}px`,
      lineHeight :`${msSettings(3)}px`,
      letterSpacing : `0.05em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(6)}px`,
      lineHeight :`${msSettings(6)}px`,
      letterSpacing : `0.05em`,
    }
  },
  heading5 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(-1)}px`,
      lineHeight :`${msSettings(-1)}px`,
      letterSpacing : `0.01em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(2)}px`,
      lineHeight :`${msSettings(2)}px`,
      letterSpacing : `0.01em`,
    }
  },
  heading6 : {
    bp1 : {
      fontFamily:'PT Mono',
      fontSize :`${msSettings(-1)}px`,
      lineHeight :`${msSettings(-1)}px`,
      letterSpacing : `0.01em`,

    },
    bp3 : {
      fontFamily:'PT Mono',
      fontSize :`${msSettings(-0.5)}px`,
      lineHeight :`${msSettings(-0.5)}px`,
      letterSpacing : `0.1em`,
    }
  },
  paragraph1 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(-0.9)}px`,
      lineHeight :`${msSettings(2)}px`,
      letterSpacing : `0.01em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(3)}px`,
      lineHeight :`${msSettings(5)}px`,
      letterSpacing : `0.01em`,
    }
  }
}