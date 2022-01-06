import BusBooked from './BusBooked'
import NameState from './Name'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
  NameState,
  BusBooked
})

export default rootReducers
