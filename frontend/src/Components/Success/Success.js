import React from 'react'
import Document from './Document/Document'
import { useSelector } from 'react-redux'
import BusFill from '../BusLogs/BusFill/BusFill'
import './Success.css'

const Success = () => {
  const name = useSelector(state => state.NameState)
  const bus = useSelector(state => state.BusBooked)
  const order = useSelector(state => state.OrderDetails)
  console.log(name)
  console.log(bus)
  console.log(order)

  return (
    <div className='success'>
      <h1 className='success__heading'>Ticket Confirmation</h1>
      <BusFill bus={bus} />
      <Document bus={bus} name={name} />
    </div>
  )
}

export default Success
