import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Name, BusBooked } from '../../actions/actions'
import { addBookingApi, reserveSeatApi } from '../../http'
import Booking from '../Booking/Booking'
import BusFill from './BusFill/BusFill'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { currentDate } from '../../util'
import { v4 as uuidv4 } from 'uuid'
import './BusLogs.css'

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: '#e6e6e6',
  border: '1px solid lightgray',
  boxShadow: 24,
  p: 2
}

const BusLogs = ({ buses, dates, sendDate }) => {
  const [name, setName] = useState('') // Name the user enters
  const [open, setOpen] = useState(false) // modal status
  const [click, setClick] = useState(null) // selected bus
  const userName = useSelector(state => state.NameState)
  const dispatch = useDispatch()

  // Function to reserve a seat in the bus
  const reserveSeat = async selectedBus => {
    try {
      return await reserveSeatApi({
        selectedBus,
        userName
      })
      // console.log(reserve)
    } catch (error) {
      console.log(error)
    }
  }

  // Add a booking
  const addBooking = async booking => {
    try {
      const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ]

      const date =
        JSON.stringify(currentDate.getDate()) +
        '/' +
        months[JSON.stringify(currentDate.getMonth())] +
        '/' +
        JSON.stringify(currentDate.getFullYear())

      return await addBookingApi({
        booking,
        userName,
        bookingDate: date
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Handle name
  const handleChange = event => {
    setName(event.target.value)
  }

  // For the modal
  const handleClose = () => setOpen(false)

  return (
    <div className='busLogs'>
    {console.log(buses)}
      {buses.map((bus, key) => {
        return (
          <div key={key} className='busLogs__card'>
            <div className='busLogs__s1'>
              <label>From:</label>
              <h4>{bus.from.toUpperCase()}</h4>
              <label>To:</label>
              <h4>{bus.to.toUpperCase()}</h4>
              <h3>{sendDate}</h3>
            </div>
            <div className='busLogs__s2'>
              <h3>{bus.time}</h3>
            </div>
            <div className='busLogs__s3'>
              <h3>
                <strong>{bus.remaining}</strong> seats available
              </h3>
              <h3>
                <strong>{bus.total}</strong> total seats.
              </h3>
              <div
                className='busLogs__button'
                onClick={() => {
                  setClick(bus)
                  setOpen(true)
                }}
              >
                Book a Seat {'>'}
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <div className='busLogs__adjust'>
                    <h3>Bus Details</h3>
                    <BusFill bus={bus} sendDate={sendDate} />

                    <br />
                    <div className='busLogs__modalForm'>
                      <h3>Enter Details</h3>
                      <label>Enter your Name:</label>
                      <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={handleChange}
                      />

                      <div
                        onClick={() => {
                          dispatch(BusBooked(click))
                          dispatch(Name({ name: name, id: uuidv4() }))
                          reserveSeat(click)
                          addBooking(click)
                        }}
                        style={{ background: 'none' }}
                      >
                        <Booking />
                        {/* <Payments /> */}
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BusLogs
