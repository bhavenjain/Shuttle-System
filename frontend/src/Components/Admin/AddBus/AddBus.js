import React, { useState } from 'react'
import Field from '../../Field/Field'
import { addBusesApi } from '../../../http'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import './AddBus.css'

const AddBus = ({ options, setPage }) => {
  // Toast
  const notify = text =>
    toast.success(text, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

  // Users' selected locations
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  // State for Bus data
  const [data, setData] = useState({
    date: '',
    time: '',
    busNo: '',
    price: '',
    totalSeats: 0
  })

  // Handle submit
  const handleSubmit = async () => {
    let date =
      data.date.slice(8, 10) +
      '/' +
      data.date.slice(5, 7) +
      '/' +
      data.date.slice(0, 4)

    try {
      // make axios post request
      const sendData = { bus :{

        to: location.to,
        from: location.from,
        date: date,
        time: data.time,
        busNo: data.busNo,
        remaining: data.totalSeats,
        total: data.totalSeats
      }
      };
      const res = await addBusesApi(sendData)
      document.getElementById('addBusForm').reset()
      if (res.status === 201) {
        notify('Bus Added')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeDate = event => {
    setData({
      ...data,
      date: event.target.value
    })
  }

  const handleChangeTime = event => {
    console.log(data.date)
    const date = new Date(`${data.date}T${event.target.value}:00+0530`)
    console.log(Date.now())
    console.log(date.getTime())
    setData({
      ...data,
      time: event.target.value
    })
  }

  const handleChangeNum = event => {
    setData({
      ...data,
      busNo: event.target.value
    })
  }

  const handleChangeSeats = event => {
    setData({
      ...data,
      totalSeats: event.target.value
    })
  }

  const handleChangePrice = event => {
    setData({
      ...data,
      price: event.target.value
    })
  }

  return (
    <div className='addBus'>
          <ArrowBackIosIcon style={{alignSelf: "flex-start", marginBottom: "7%"}} onClick={() => setPage(0)} />

      <form id='addBusForm'>
        <Field
          options={options}
          location={location}
          setLocation={setLocation}
        />
        <div className='addBus__data'>
          <div className='addBus__box'>
            <label htmlFor=''>Date: </label>
            <input
              type='date'
              onChange={handleChangeDate}
              name='date'
              id='time'
            />
          </div>

          <div className='addBus__box addBus__margin'>
            <label htmlFor=''>Time: </label>
            <input
              type='time'
              onChange={handleChangeTime}
              name='time'
              id='time'
            />
          </div>

          <div className='addBus__box addBus__margin'>
            <h4 className='addBus__font'>Bus Number: </h4>
            <input
              type='text'
              name='bus-number'
              onChange={handleChangeNum}
              id='BusNumber'
              placeholder='Bus Number'
            />
          </div>

          <div className='addBus__box addBus__margin'>
            <h4 className='addBus__font'>Ticket Cost: </h4>
            <input
              type='text'
              name='price'
              onChange={handleChangePrice}
              id='Price'
              placeholder='Ticket Price'
            />
          </div>

          <div className='addBus__box addBus__margin'>
            <h4 className='addBus__font'>Total Seats: </h4>
            <input
              type='number'
              name='total-seats'
              onChange={handleChangeSeats}
              id='seats'
              placeholder='Seats'
            />
          </div>
          <input
            type='button'
            onClick={handleSubmit}
            className='addLocation__button addBus__margin'
            value='Submit'
          />
        </div>
      </form>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default AddBus
