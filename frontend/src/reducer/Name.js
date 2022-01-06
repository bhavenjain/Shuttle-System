import * as actions from '../actions/actionTypes'
const intialState = []

const NameState = (state = intialState, action) => {
  switch (action.type) {
    case actions.CurrentUser:
      return [...state, action.payload.CurrentUser]
    default:
      return state
  }
}

export default NameState
