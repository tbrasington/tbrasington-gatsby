import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `CLOSEMENU`) {
    return Object.assign({}, state, {
      menuOpen: false    })
  }
  if (action.type === `OPENMENU`) {
    return Object.assign({}, state, {
      menuOpen: true    })
  }
  if (action.type === `SET_DARK_THEME`) {
    return Object.assign({}, state, {
      theme : 'dark' 
    })
  }
  if (action.type === `SET_LIGHT_THEME`) {
    return Object.assign({}, state, {
      theme : 'light' 
    })
  }
  return state
}

const initialState = { menuOpen: true, theme : 'dark' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore