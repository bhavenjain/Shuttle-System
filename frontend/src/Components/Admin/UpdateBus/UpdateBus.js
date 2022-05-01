import React, { useState, useEffect } from 'react'
import Field from '../../Field/Field'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { getBusesApi } from '../../../http/index'
import styles from './UpdateBus.module.css'
import BusFill from '../../BusLogs/BusFill/BusFill'

const UpdateBus = ({ options, setPage, setUpdateBus }) => {
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  const [adminBus, setAdminBus] = useState(null)
  const [buses, setBuses] = useState([])

  const [date, setDate] = useState('')

  useEffect(() => {
    console.log(adminBus)
  }, [adminBus])

  // Get Buses Data
  const getData = async () => {
    try {
      let query = `?date=${date}&to=${location.to}&from=${location.from}`
      console.log(query)
      const data = await getBusesApi(query)
      setBuses(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeDate = event => {
    console.log(event.target.value)
    let format = event.target.value.split('-')
    setDate(`${format[2]}/${format[1]}/${format[0]}`)
  }

  const handleSubmit = e => {
    getData()
  }

  return (
    <div className={styles.container}>
      <ArrowBackIosIcon
        style={{ alignSelf: 'flex-start', marginBottom: '7%' }}
        onClick={() => setPage(0)}
      />

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
          <input
            type='button'
            onClick={handleSubmit}
            className='addLocation__button addBus__margin'
            value='Submit'
          />
        </div>
      <div className={styles.logs}>
        {buses && buses.map((bus, key) => {
          return <BusFill key={key} bus={bus} sendDate={date} AdminUpdate={true} setAdminBus={setAdminBus} setPage={setPage} setUpdateBus={setUpdateBus} />
        })}
      </div>
    </div>
  )
}

export default UpdateBus
