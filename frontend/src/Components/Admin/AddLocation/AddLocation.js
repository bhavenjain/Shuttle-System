import React, { useState, useEffect } from 'react'
import { FormControl, Select, InputLabel } from '@material-ui/core'
import { addLocationsApi } from '../../../http'
import Input from '../../Input/Input'
import { useHistory } from "react-router-dom";

import './AddLocation.css'

const AddLocation = ({ options }) => {
  const [addLocation, setAddLocation] = useState(null)
  const [deleteLocation, setDeleteLocation] = useState(null)
  let history = useHistory();

  const handleChange = (event) => {
    setAddLocation(event.target.value)
  }

  const handleChangeFrom = (event) => {
    setDeleteLocation(event.target.value)
  }

  // handle response
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData()
    // formData.append('addLocation', addLocation)
    // formData.append('deleteLocation', deleteLocation)

    try {
      console.log("hgfhjsghjfs");
      // make post request to add location
      console.log(addLocation,deleteLocation);
      let d = {
        add: addLocation,
        delete: deleteLocation,
      }
      console.log(d);
      const response = await addLocationsApi(d)
      // document.getElementById('addlocationform').reset()
      window.location.reload();
      // document.getElementById('delete').reset()
      console.log(response)
      // history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(deleteLocation)
    console.log(addLocation)
  }, [])

  return (
    <div className="addLocation">
      <form id="addlocationform">
        <label htmlFor="">Add location, leave empty if only delete:</label>
        <Input field="Add Location" handleChange={handleChange} />

        {/* 
            
            Delete location
            
         */}

        <FormControl className="addLocation__form">
          <InputLabel id="demo-simple-select-label">Delete Location</InputLabel>
          <Select
            native
            id='delete'
            className="addLocation__select"
            renderValue={(value) => {
              return { value }
            }}
            value={deleteLocation}
            label="Delete"
            onChange={handleChangeFrom}
          >
            <option value=""></option>

            {options.map((option, key) => (
              <option key={key} id={key} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <input type="submit" onClick={handleSubmit} className="addLocation__button" value="Submit" />
      </form>
    </div>
  )
}

export default AddLocation
