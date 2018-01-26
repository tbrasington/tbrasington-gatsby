import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `CLOSEMENU`) {
    return Object.assign({}, state, {
      menuOpen: false,
      theme : 'light' //light || dark
    })
  }
  if (action.type === `OPENMENU`) {
    return Object.assign({}, state, {
      menuOpen: true,
      theme : 'dark' //light || dark
    })
  }
  return state
}

const initialState = { menuOpen: false, theme : 'light' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore