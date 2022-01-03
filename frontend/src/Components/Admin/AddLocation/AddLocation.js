import React, { useState, useEffect } from 'react'
import { FormControl, Select, InputLabel } from '@material-ui/core'
import axios from 'axios'
import Input from '../../Input/Input'

import './AddLocation.css'

const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

const AddLocation = () => {
  const [addLocation, setAddLocation] = useState(null)
  const [deleteLocation, setDeleteLocation] = useState('')
  //   const [addLocationButton, setAddLocationButton] = useState(false)

  const handleChange = event => {
    setAddLocation(event.target.value)
  }

  const handleChangeFrom = event => {
    setDeleteLocation(event.target.value)
  }

  const handleSubmit = async () => {
    const loginFormData = new FormData()
    loginFormData.append('addLocation', addLocation)
    loginFormData.append('deleteLocation', deleteLocation)

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: '/',
        data: loginFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(deleteLocation)
  }, [deleteLocation])

  return (
    <div className='addLocation'>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Add location, leave empty if only delete:</label>
        <Input field='Add Location' handleChange={handleChange} />

        {/* 
            
            Delete location
            
         */}

        <label htmlFor='' style={{ marginTop: '30px' }}>
          Delete location:
        </label>
        <FormControl className='addLocation__form'>
          <InputLabel id='demo-simple-select-label'>Delete Location</InputLabel>
          <Select
            native
            className='addLocation__select'
            renderValue={value => {
              return { value }
            }}
            value={deleteLocation}
            // ref={fromRef}
            label='Delete'
            onChange={handleChangeFrom}
            defaultValue={options[0]}
          >
            <option value=''>Delete Location</option>

            {options.map((option, key) => (
              <option key={key} id={key} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default AddLocation
