export const colours = {
    black : '#000000',
    grey : '#F6F6F6',
    blue : '#0080FF',
    white : '#fff'
}

export const typeStyles = {}

const getTransitionStyles = (timeout) => {
    return {
      entering: {
        opacity: 0,
      },
      entered: {
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: 1,
      },
      exiting: {
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: 0,
      },
    }
  }
  
 export const getTransitionStyle = ({ timeout, status }) =>{
    return getTransitionStyles(timeout)[status]
}