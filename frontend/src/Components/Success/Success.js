import React from 'react'
import Document from './Document/Document'
import { useSelector } from 'react-redux'
import './Success.css'

const Success = () => {
  const name = useSelector(state => state.NameState)
  const bus = useSelector(state => state.BusBooked)
  console.log(name)
  console.log(bus)

  return (
    <div className='success'>
      <h1>{name}</h1>
      <Document />
    </div>
  )
}

export default Success
