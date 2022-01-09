import * as actions from '../actions/actionTypes'
const initialState = {}

const OrderDetails = (state = initialState, action) => {
  switch (action.type) {
    case actions.OrderDetails:
      return action.payload.Order
    default:
      return state
  }
}

export default OrderDetails
