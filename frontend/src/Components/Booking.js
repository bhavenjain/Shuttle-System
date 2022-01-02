import React, { useState } from 'react'
// import AddIcon from '@mui/icons-material/Add'
// import RemoveIcon from '@mui/icons-material/Remove'
import Input from './Input'
import './css/Booking.css'

function Booking () {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    number: ''
  })

  const [passengers, setPassengers] = useState(1)

  return (
    <div className='booking center'>
      {/* div for background */}

      {/* Heading */}

      {/* Form */}

      {/* count */}

      {/* submit button */}

      <div className='booking__card center'>
        <form method='POST'>
          <div className='booking__inputs center'>
            <Input field='Name' />
            <Input field='Enter SNU Email' />
            <Input field='Number' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
