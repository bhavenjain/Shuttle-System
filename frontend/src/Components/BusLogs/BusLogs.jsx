import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './BusLogs.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const BusLogs = ({ buses, dates, sendDate }) => {
  const [open, setOpen] = useState(false)
  const [click, setClick] = useState(null)

  useEffect(() => {}, [])

  // const handleOpen = (event) => {
  //   console.log(click)
  //   setOpen(true)
  // }
  const handleClose = () => setOpen(false)

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
                  <h1>Enter Details</h1>
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
