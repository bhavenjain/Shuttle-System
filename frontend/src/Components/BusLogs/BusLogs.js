import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import BusFill from './BusFill/BusFill'
// import { Link } from 'react-router-dom'
// import AddIcon from '@mui/icons-material/Add'
// import RemoveIcon from '@mui/icons-material/Remove'
// import Payments from './Payments/Payments'
import axios from 'axios'
import Booking from '../Booking/Booking'
import { useSelector, useDispatch } from 'react-redux'
import { Name, BusBooked } from '../../actions/actions'
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
      axios
        .post('http://localhost:5000/api/reserveseat', {
          selectedBus,
          userName
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(click)
  }, [])

  const handleChange = event => {
    setName(event.target.value)
  }
  const handleClose = () => setOpen(false)

  return (
    <div className='busLogs'>
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
                // onChange={setClick(bus)}
                onClick={() => {
                  setClick(bus)
                  setOpen(true)
                }}
                id='pl_Ifhp37s9Kw6C5d'
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
                        }}
                        style={{ background: 'none' }}
                      >
                        {/* <Link to='/success'>
                          <button>link</button>
                        </Link> */}
                        <Booking />
                        {/* <Payments /> */}
                        {/* <AddIcon />
                      <RemoveIcon /> */}
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
