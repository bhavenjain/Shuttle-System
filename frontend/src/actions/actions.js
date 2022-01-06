import * as actions from './actionTypes'

export const Name = CurrentUser => {
  return {
    type: actions.CurrentUser,
    payload: {
      CurrentUser
    }
  }
}

export const BusBooked = Bus => {
  return {
    type: actions.BusBooked,
    payload: {
      Bus
    }
  }
}
