import ms from 'modularscale-js';
import {css} from 'styled-components';

export const breakpoints = {
  bp1 : 320,
  bp2: 768,
  bp3 : 1024
}

export const spacing = 8;

export const gridSettings = {

initStandardGrid : {
  bp1 : 
    css`
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      max-width:1440px;
      width:100%;
      margin: 0 auto;
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
      margin:0;
      `,
      bp3 : 
      css`
      grid-column-start: 2;
      grid-column-end:12;
      `,
    },
    bodyCopyGrid : {
      bp1 : 
        css`
        grid-column-start: 1;
        grid-column-end:7;
        margin:0;

        padding-left: ${spacing * 4}px;
        padding-right: ${spacing * 4}px;
        padding-bottom: ${spacing * 4}px;
        `,
        bp3 : 
        css`
        grid-column-start: 3;
        grid-column-end:11;
        `,
      },
    standardPageTopPadding : {
      bp1 : css`
      padding-top: ${spacing * 9}px;
      `, 
      bp3 : css`
      padding-top: ${spacing * 24}px;
      `
    },
    standardPageBottomPadding : {
      bp1 : css`
      padding-bottom: ${spacing * 9}px;
      `, 
      bp3 : css`
      padding-bottom: ${spacing * 24}px;
      `
    },
    standardSectionTopPadding : {
      bp1 : css`
      padding-top: ${spacing *4}px;
      `, 
      bp3 : css`
      padding-top: ${spacing * 8}px;
      `
    },
    standardSectionBottomPadding : {
      bp1 : css`
      padding-bottom: ${spacing * 4}px;
      `, 
      bp3 : css`
      padding-bottom: ${spacing * 8}px;
      `
    }
}


export const colours = {
    black : '#000000',
    grey : '#F6F6F6',
    darkGrey: '#4A4A4A',
    blue : '#0080FF',
    darkBlue : '#0040ff',
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
  heading0 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(8)}px`,
      lineHeight :`${msSettings(9)}px`,
      letterSpacing : `0.1em`,
      textTransform : 'uppercase'
    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(18)}px`,
      lineHeight :`${msSettings(14)}px`,
      letterSpacing : `0.1em`,
      textTransform : 'uppercase'
    }
  },
  heading1 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(3)}px`,
      lineHeight :`${msSettings(3)}px`,
      letterSpacing : `0.01em`,
    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(6)}px`,
      lineHeight :`${msSettings(6)}px`,
      letterSpacing : `0.01em`,
    }
  },
  heading2 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(2.5)}px`,
      lineHeight :`${msSettings(2.5)}px`,
      letterSpacing : `0em`,
    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(5)}px`,
      lineHeight :`${msSettings(5)}px`,
      letterSpacing : `0em`,
    }
  },
  heading3 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(2)}px`,
      lineHeight :`${msSettings(2)}px`,
      letterSpacing : `0em`,
    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(4)}px`,
      lineHeight :`${msSettings(4)}px`,
      letterSpacing : `0em`,
    }
  },
  heading4 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(1)}px`,
      lineHeight :`${msSettings(1)}px`,
      letterSpacing : `0em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(3)}px`,
      lineHeight :`${msSettings(3)}px`,
      letterSpacing : `0em`,
    }
  },
  heading5 : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(-1)}px`,
      lineHeight :`${msSettings(1)}px`,
      letterSpacing : `0.01em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(2)}px`,
      lineHeight :`${msSettings(3)}px`,
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
      fontSize :`${msSettings(4)}px`,
      lineHeight :`${msSettings(6)}px`,
      letterSpacing : `0.01em`,
    }
  },
  paragraph2 : {
    bp1 : {
      fontFamily:'PT Mono',
      fontSize :`${msSettings(0)}px`,
      lineHeight :`${msSettings(3)}px`,
      letterSpacing : `0.01em`,

    },
    bp3 : {
      fontFamily:'PT Mono',
      fontSize :`${msSettings(0.5)}px`,
      lineHeight :`${msSettings(3)}px`,
      letterSpacing : `0.1em`,
    }
  },
}