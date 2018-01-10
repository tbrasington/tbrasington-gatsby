import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `CLOSEMENU`) {
    return Object.assign({}, state, {
      menuOpen: false,
    })
  }
  if (action.type === `OPENMENU`) {
    return Object.assign({}, state, {
      menuOpen: true,
    })
  }
  return state
}

const initialState = { menuOpen: true }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore