import React, { useState } from 'react'
import Field from '../../Field/Field'
import { addBusesApi } from '../../../http'
import './AddBus.css'

const AddBus = ({ options }) => {
  // Users' selected locations
  const [location, setLocation] = useState({
    from: '',
    to: '',
  })

  // State for Bus data
  const [data, setData] = useState({
    date: '',
    time: '',
    busNo: '',
    totalSeats: 0,
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
      const sendData = {
        to: location.to,
        from: location.from,
        date: date,
        time: data.time,
        busNo: data.busNo,
        remaining: data.totalSeats,
        total: data.totalSeats,
      }
      return await addBusesApi(sendData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeDate = (event) => {
    setData({
      ...data,
      date: event.target.value,
    })
  }

  const handleChangeTime = (event) => {
    setData({
      ...data,
      time: event.target.value,
    })
  }

  const handleChangeNum = (event) => {
    setData({
      ...data,
      busNo: event.target.value,
    })
  }

  const handleChangeSeats = (event) => {
    setData({
      ...data,
      totalSeats: event.target.value,
    })
  }

  return (
    <div className="addBus">
      <form>
        <Field
          options={options}
          location={location}
          setLocation={setLocation}
        />
        <div className="addBus__data">
          <div className="addBus__box">
            <label htmlFor="">Date: </label>
            <input
              type="date"
              onChange={handleChangeDate}
              name="date"
              id="time"
            />
          </div>

          <div className="addBus__box addBus__margin">
            <label htmlFor="">Time: </label>
            <input
              type="time"
              onChange={handleChangeTime}
              name="time"
              id="time"
            />
          </div>

          <div className="addBus__box addBus__margin">
            <h4 className="addBus__font">Bus Number: </h4>
            <input
              type="text"
              name="bus-number"
              onChange={handleChangeNum}
              id="time"
              placeholder="Bus Number"
            />
          </div>

          <div className="addBus__box addBus__margin">
            <h4 className="addBus__font">Total Seats: </h4>
            <input
              type="number"
              name="total-seats"
              onChange={handleChangeSeats}
              id="seats"
              placeholder="Seats"
            />
          </div>
          <input
            type="button"
            onClick={handleSubmit}
            className="addLocation__button addBus__margin"
            value="Submit"
          />
        </div>
      </form>
    </div>
  )
}

export default AddBus
