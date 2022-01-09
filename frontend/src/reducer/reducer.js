import BusBooked from './BusBooked'
import NameState from './Name'
import OrderDetails from './OrderDetails'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
  NameState,
  BusBooked,
  OrderDetails
})

export default rootReducers
