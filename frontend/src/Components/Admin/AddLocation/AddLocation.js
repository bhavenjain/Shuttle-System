import React, { useState, useEffect } from 'react'
import { FormControl, Select, InputLabel } from '@material-ui/core'
import { addLocationsApi } from '../../../http'
import Input from '../../Input/Input'

import './AddLocation.css'

const AddLocation = ({ options }) => {
  const [addLocation, setAddLocation] = useState(null)
  const [deleteLocation, setDeleteLocation] = useState(null)

  const handleChange = (event) => {
    setAddLocation(event.target.value)
  }

  const handleChangeFrom = (event) => {
    setDeleteLocation(event.target.value)
  }

  // handle response
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('addLocation', addLocation)
    formData.append('deleteLocation', deleteLocation)

    try {
      // make post request to add location
      const response = await addLocationsApi({
        add: addLocation,
        delete: deleteLocation,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(deleteLocation)
  }, [deleteLocation])

  return (
    <div className="addLocation">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add location, leave empty if only delete:</label>
        <Input field="Add Location" handleChange={handleChange} />

        {/* 
            
            Delete location
            
         */}

        <label htmlFor="" style={{ marginTop: '30px' }}>
          Delete location:
        </label>
        <FormControl className="addLocation__form">
          <InputLabel id="demo-simple-select-label">Delete Location</InputLabel>
          <Select
            native
            className="addLocation__select"
            renderValue={(value) => {
              return { value }
            }}
            value={deleteLocation}
            label="Delete"
            onChange={handleChangeFrom}
            defaultValue={null}
          >
            <option value=""></option>

            {options.map((option, key) => (
              <option key={key} id={key} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <input type="submit" className="addLocation__button" value="Submit" />
      </form>
    </div>
  )
}

export default AddLocation
