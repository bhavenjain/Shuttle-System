import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import BusFill from './BusFill/BusFill'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Payments from './Payments'
import './BusLogs.css'

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  p: 2,
}

const BusLogs = ({ buses, dates, sendDate }) => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [click, setClick] = useState(null)

  useEffect(() => {
    console.log(click)
  }, [click])

  const handleChange = (event) => {
    setName(event.target.value)
  }
  const handleClose = () => setOpen(false)

  const useScript = () => {
    useEffect(() => {
      const Script = document.createElement('script')
      //id should be same as given to form element
      const Form = document.getElementById('donateForm')
      Script.setAttribute(
        'src',
        'https://checkout.razorpay.com/v1/payment-button.js',
      )
      Script.setAttribute('data-payment_button_id', 'pl_Ifhp37s9Kw6C5d')
      Form.appendChild(Script)
    }, [])
  }

  return (
    <div className="busLogs">
      {buses.map((bus, key) => {
        return (
          <div className="busLogs__card">
            <div className="busLogs__s1">
              <label>From:</label>
              <h4>{bus.from.toUpperCase()}</h4>
              <label>To:</label>
              <h4>{bus.to.toUpperCase()}</h4>
              <h3>{sendDate}</h3>
            </div>
            <div className="busLogs__s2">
              <h3>{bus.time}</h3>
            </div>
            <div className="busLogs__s3">
              <h3>
                <strong>{bus.remaining}</strong> seats available
              </h3>
              <h3>
                <strong>{bus.total}</strong> total seates.
              </h3>
              <div
                className="busLogs__button"
                // onChange={setClick(bus)}
                onClick={() => {
                  setClick(bus)
                  setOpen(true)
                }}
                id="pl_Ifhp37s9Kw6C5d"
              >
                Book a Seat {'>'}
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h3>Bus Details</h3>
                  <BusFill bus={bus} sendDate={sendDate} />

                  <br />
                  <div className="busLogs__modalForm">
                    {/* <h3>Enter Details</h3>
                    <label>Enter your Name:</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={handleChange}
                    /> */}

                    {/* <label>Number of Seats:</label> */}
                    <div>
                      <Payments />
                      {/* <AddIcon />
                      <RemoveIcon /> */}
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
