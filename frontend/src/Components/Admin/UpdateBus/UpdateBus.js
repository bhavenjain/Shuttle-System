import React, { useState } from 'react'
import Field from '../../Field/Field'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import styles from './UpdateBus.module.css'

const UpdateBus = ({ options, setPage }) => {
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  const [date, setDate] = useState('')

  const handleChangeDate = event => setDate(event.target.value)

  const handleSubmit = e => {}

  return (
    <div className={styles.container}>
      <ArrowBackIosIcon
        style={{ alignSelf: 'flex-start', marginBottom: '7%' }}
        onClick={() => setPage(0)}
      />

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
          <input
            type='button'
            onClick={handleSubmit}
            className='addLocation__button addBus__margin'
            value='Submit'
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateBus
