import ms from 'modularscale-js';

export const breakpoints = {
  bp1 : 320,
  bp3 : 1024
}

export const spacing = 8;

export const colours = {
    black : '#000000',
    grey : '#F6F6F6',
    blue : '#0080FF',
    white : '#fff'
}

function  msSettings(value){
  return ms(value,{
    base: [16],
    ratio: 1.25
  })
} 

export const typeStyles = {
  menu : {
    bp1 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(3)}px`,
      letterSpacing : `0.1em`,

    },
    bp3 : {
      fontFamily:'aktiv-grotesk-extended',
      fontSize :`${msSettings(6)}px`,
      letterSpacing : `0.1em`,
    }
  }
}

const timings = {
  t1 : 100,
  t2 : 200,
  t3 : 300,
  t4 : 400,
  t5 : 500
}
const getTransitionStyles = (timing) => {
    return {
      entering: {
        opacity: 0,
      },
      entered: {
        transition: `opacity ${timing}ms ease-in-out`,
        opacity: 1,
      },
      exiting: {
        transition: `opacity ${timing}ms ease-in-out`,
        opacity: 0,
      },
      menuScale : {
        transition: `all ${timing}ms cubic-bezier(0.075, 0.820, 0.165, 1.000)`
      }
    }
  }
  
 export const getTransitionStyle = ({ timing, type }) =>{
    return getTransitionStyles(timings[timing])[type]
}